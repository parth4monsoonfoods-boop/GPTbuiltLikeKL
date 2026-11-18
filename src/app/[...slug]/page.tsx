import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/views/SitePage';
import { servicePages, guides } from '@/content/pages';
const routes = ['services','areas','areas/kuala-lumpur','areas/selangor','work','blog','contact','faq','about',...servicePages.map(s=>'services/'+s.slug),...guides.map(g=>'blog/'+g.slug)];
export const dynamicParams = false;
export function generateStaticParams(){return routes.map(path=>({slug:path.split('/')}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const path=(await params).slug.join('/');const service=servicePages.find(s=>path==='services/'+s.slug);const guide=guides.find(g=>path==='blog/'+g.slug);const title=service?.name||guide?.title||path.split('/').pop()!.replaceAll('-',' ');return {title:title+' | MYN Deco',description:service?.headline||guide?.intro||'MYN Deco renovation, construction and repair in Kuala Lumpur and Selangor.'}}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const path=(await params).slug.join('/');if(!routes.includes(path))notFound();return <SitePage path={path}/>}
