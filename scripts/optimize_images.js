import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '..', 'public', 'images', 'wedding');
const OUT_DIR = SRC_DIR; // overwrite in place

const targets = [
  { in: 'vino.png', out: 'table.jpg' },
  { in: 'viñedoAlAtardecer.png', out: 'landscape.jpg' },
  { in: 'pareja.png', out: 'moment.jpg' },
  { in: 'ramoDeFLores.png', out: 'bouquet.jpg' },
];

async function processImage(item) {
  const inPath = path.join(SRC_DIR, item.in);
  const outPath = path.join(OUT_DIR, item.out);
  if (!fs.existsSync(inPath)) {
    console.warn('Missing source', inPath);
    return;
  }
  try {
    await sharp(inPath)
      .resize({ width: 2400, height: 3000, fit: 'cover' })
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(outPath);
    console.log('Wrote', outPath);
  } catch (e) {
    console.error('Failed', inPath, e.message || e);
  }
}

async function main() {
  for (const t of targets) await processImage(t);
}

main();
