import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

// Pure-Node PNG generator for crisp 192x192 & 512x512 Spire of Azure app icons
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function pointInTri(px, py, x1, y1, x2, y2, x3, y3) {
  const d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
  const d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3);
  const d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

function generateIcon(size, outPath) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  const cx = size / 2;

  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0; // No filter
    const ny = y / size;

    for (let x = 0; x < size; x++) {
      const nx = x / size;
      // AMOLED dark background #030712
      let r = 3, g = 7, b = 18;

      // Subtle radial glow behind spire
      const dist = Math.hypot(nx - 0.5, ny - 0.52);
      if (dist < 0.45) {
        const glow = (0.45 - dist) / 0.45;
        r += Math.round(glow * 12);
        g += Math.round(glow * 34);
        b += Math.round(glow * 68);
      }

      // Outer Azure Spire chevron
      const inOuter = pointInTri(nx, ny, 0.5, 0.12, 0.78, 0.78, 0.22, 0.78);
      const inInnerCut = pointInTri(nx, ny, 0.5, 0.46, 0.63, 0.80, 0.37, 0.80);
      const inCrown = pointInTri(nx, ny, 0.5, 0.12, 0.60, 0.37, 0.40, 0.37);
      const inBaseBar = ny >= 0.82 && ny <= 0.855 && nx >= 0.30 && nx <= 0.70;

      if (inCrown) {
        r = 224; g = 242; b = 254; // Ice white-cyan tip
      } else if (inOuter && !inInnerCut) {
        const t = (nx + ny) * 0.5;
        r = Math.round(56 * (1 - t) + 79 * t);
        g = Math.round(189 * (1 - t) + 70 * t);
        b = Math.round(248 * (1 - t) + 229 * t);
      } else if (inBaseBar) {
        r = 56; g = 189; b = 248;
      }

      const idx = rowStart + 1 + x * 4;
      raw[idx] = Math.min(255, r);
      raw[idx + 1] = Math.min(255, g);
      raw[idx + 2] = Math.min(255, b);
      raw[idx + 3] = 255;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const png = Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(outPath, png);
}

const pubDir = path.resolve('C:/Users/bsefc/.gemini/antigravity/scratch/spire-of-azure/public');
generateIcon(192, path.join(pubDir, 'icon-192.png'));
generateIcon(512, path.join(pubDir, 'icon-512.png'));
console.log('Generated PNG PWA icons successfully.');
