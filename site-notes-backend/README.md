# Site Notes

Admin page (`/`): add the photos (and an optional note) for a property, get a link for your client, read his answers.
Client page (`/p/<id>`): shows the property code and photos, then asks for the site name (required), customer name, location, work done, major work, challenges, price and duration. He types text only.
Data is kept in one Google Cloud Storage bucket: one small JSON file per property, plus the photos.

## Deploy to Google Cloud Run

Run these in Cloud Shell or any terminal with `gcloud` installed, from this folder.

```bash
PROJECT_ID=your-project-id
BUCKET=your-unique-bucket-name
REGION=asia-southeast1          # Singapore, closest to Johor
PASSWORD='choose-a-strong-password'

gcloud config set project $PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com storage.googleapis.com

# 1. Storage bucket (private)
gcloud storage buckets create gs://$BUCKET --location=$REGION --uniform-bucket-level-access

# 2. Deploy the app
gcloud run deploy site-notes --source . --region $REGION --allow-unauthenticated \
  --set-env-vars BUCKET_NAME=$BUCKET,ADMIN_PASSWORD=$PASSWORD

# 3. Let the app read/write the bucket
SA=$(gcloud run services describe site-notes --region $REGION --format='value(spec.template.spec.serviceAccountName)')
gcloud storage buckets add-iam-policy-binding gs://$BUCKET \
  --member=serviceAccount:$SA --role=roles/storage.objectAdmin
```

Open the URL printed by step 2, sign in with your password, and create your first site.

## Notes
- `--allow-unauthenticated` is needed so your client can open his link. Only the admin page actions need the password; client links are long random IDs.
- To change the password later: `gcloud run services update site-notes --region $REGION --update-env-vars ADMIN_PASSWORD=new`.
- Local test: `npm install && BUCKET_NAME=... ADMIN_PASSWORD=... npm start` (needs `gcloud auth application-default login`).
- Each property is numbered automatically: Property #1, Property #2 and so on. The number shows on your page, on your client's page and in the copied summary. A small `counter.json` file in the bucket keeps count, so a deleted number is never reused.
