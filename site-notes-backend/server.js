const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { Storage } = require('@google-cloud/storage');

const BUCKET = process.env.BUCKET_NAME;
const ADMIN = process.env.ADMIN_PASSWORD;
if (!BUCKET || !ADMIN) { console.error('Set BUCKET_NAME and ADMIN_PASSWORD'); process.exit(1); }

const bucket = new Storage().bucket(BUCKET);
const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 12 } });

const wrap = fn => (req, res, next) => fn(req, res, next).catch(e => { console.error(e); res.status(500).json({ error: 'Server error' }); });
const auth = (req, res, next) => (req.get('x-admin-key') === ADMIN ? next() : res.status(401).json({ error: 'Wrong password' }));
const validId = id => /^[a-f0-9]{16}$/.test(id);
const file = id => bucket.file(`projects/${id}.json`);
const read = async id => { try { const [b] = await file(id).download(); return JSON.parse(b.toString()); } catch { return null; } };
const write = m => file(m.id).save(JSON.stringify(m), { contentType: 'application/json' });
const clean = (v, n = 4000) => String(v || '').slice(0, n);
// Simple running number: Property #1, Property #2, ... (never reused, even after deleting)
const nextCode = async () => {
  const f = bucket.file('counter.json'); let n = 0;
  try { n = JSON.parse((await f.download())[0].toString()).n; } catch {}
  n++; await f.save(JSON.stringify({ n }), { contentType: 'application/json' });
  return 'Property #' + n;
};

// ---- Admin (you): optional note and optional photos; the app numbers each property ----
app.post('/api/projects', auth, upload.array('photos', 12), wrap(async (req, res) => {
  const id = crypto.randomBytes(8).toString('hex');
  const files = req.files || [];
  await Promise.all(files.map((f, i) => bucket.file(`projects/${id}/photos/${i}`).save(f.buffer, { contentType: f.mimetype })));
  const meta = { id, code: await nextCode(), reference: clean(req.body.reference, 1000),
    photos: files.length, createdAt: new Date().toISOString(), response: null };
  await write(meta);
  res.json(meta);
}));

app.get('/api/projects', auth, wrap(async (req, res) => {
  const [files] = await bucket.getFiles({ prefix: 'projects/' });
  const all = await Promise.all(files.filter(f => f.name.endsWith('.json')).map(async f => JSON.parse((await f.download())[0].toString())));
  res.json(all.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
}));

app.delete('/api/projects/:id', auth, wrap(async (req, res) => {
  if (!validId(req.params.id)) return res.status(400).json({ error: 'Bad id' });
  await bucket.deleteFiles({ prefix: `projects/${req.params.id}` });
  res.json({ ok: true });
}));

// ---- Client (shared link, no password; the link itself is the secret) ----
app.get('/api/p/:id', wrap(async (req, res) => {
  const m = validId(req.params.id) && await read(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  res.json({ code: m.code, reference: m.reference, photos: m.photos || 0, response: m.response });
}));

app.get('/api/p/:id/photo/:n', wrap(async (req, res) => {
  const { id, n } = req.params;
  if (!validId(id) || !/^\d{1,2}$/.test(n)) return res.status(400).end();
  const f = bucket.file(`projects/${id}/photos/${n}`);
  const [meta] = await f.getMetadata().catch(() => [null]);
  if (!meta) return res.status(404).end();
  res.set({ 'Content-Type': meta.contentType || 'image/jpeg', 'Cache-Control': 'private, max-age=86400' });
  f.createReadStream().on('error', () => res.end()).pipe(res);
}));

app.post('/api/p/:id/response', wrap(async (req, res) => {
  const m = validId(req.params.id) && await read(req.params.id);
  if (!m) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  if (!clean(b.siteName).trim()) return res.status(400).json({ error: 'Site name is required' });
  m.response = { siteName: clean(b.siteName, 150), customerName: clean(b.customerName, 150), location: clean(b.location, 300),
    workDone: clean(b.workDone), majorWork: clean(b.majorWork), challenges: clean(b.challenges),
    price: clean(b.price, 100), duration: clean(b.duration, 100), submittedAt: new Date().toISOString() };
  await write(m);
  res.json({ ok: true });
}));

app.get('/p/:id', (req, res) => res.sendFile(path.join(__dirname, 'public', 'project.html')));
app.use((err, req, res, next) => res.status(400).json({ error: err.message || 'Upload failed' }));
app.listen(process.env.PORT || 8080, () => console.log('Site Notes running'));
