import { preview } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/bsefc/.gemini/antigravity/scratch/spire-of-azure';
const srv = await preview({
  root,
  preview: { port: 4188, host: '127.0.0.1' }
});

try {
  for (const route of ['/', '/manifest.webmanifest', '/sw.js', '/icon-192.png', '/icon-512.png']) {
    const res = await fetch(`http://127.0.0.1:4188${route}`);
    console.log(`${route} -> HTTP ${res.status} (${res.headers.get('content-type')})`);
    if (!res.ok) throw new Error(`Failed asset check: ${route}`);
  }

  const swContent = fs.readFileSync(path.join(root, 'dist', 'sw.js'), 'utf8');
  if (!swContent.includes('precacheAndRoute')) {
    throw new Error('Service Worker missing Workbox precacheAndRoute!');
  }
  console.log('Offline Workbox Service Worker precache verified OK!');
} finally {
  srv.httpServer.close();
}
