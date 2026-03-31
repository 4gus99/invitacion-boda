/*
 * generate_automatic1111.js
 *
 * Usage:
 *  - Start Automatic1111 Web UI (http://127.0.0.1:7860)
 *  - Optionally set env: WEBUI_URL (default http://127.0.0.1:7860) and WEBUI_API_KEY (if your webui uses an API key)
 *  - Run: node scripts/generate_automatic1111.js
 *
 * Outputs will be written to `assets/generated/`.
 * Requires Node v18+ (global fetch).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

if (typeof fetch === 'undefined') {
  console.error('This script requires Node v18+ (global fetch).');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBUI_URL = process.env.WEBUI_URL || 'http://127.0.0.1:7860';
const API_KEY = process.env.WEBUI_API_KEY || '';
const OUT_DIR = process.env.OUT_DIR || path.join(__dirname, '..', 'assets', 'generated');

const width = 2400;
const height = 3000;
const steps = 28;
const sampler_name = 'DPM++ 2M Karras';
const cfg_scale = 9;
const n_iter = 1;
const batch_size = 1;

const negative_prompt = 'harsh lighting, blue cast, oversaturated, watermark, logo, text, oversharpened, HDR look, low quality, cartoon, deformed, identifiable faces, face details, frontal face, visible facial features';

const prompts = [
  {
    id: 'table',
    prompt: "Portrait 4:5, elegant vineyard table setup during golden hour: a long wooden table dressed in cream linen and beige napkins, delicate floral runner of soft pink roses, cream peonies and dried olive-green foliage, burgundy/wine accents, crystal wine glasses with red wine catching warm rim light, shallow depth of field (85mm f/1.8), soft bokeh vineyard rows in background, warm cinematic tones, subtle film grain, editorial luxury wedding photography — avoid harsh lighting, avoid blue tones, avoid oversaturation"
  },
  {
    id: 'landscape',
    prompt: "Portrait 4:5, vineyard rows leading into a warm sunset sky, golden hour, soft volumetric light and haze, rolling vines with olive-green leaves and hints of burgundy, warm beige and soft pink sky tones, cinematic composition with leading lines, shallow depth of field foreground to midground, filmic color grade — avoid cold blue tones or HDR pop"
  },
  {
    id: 'moment',
    prompt: "Portrait 4:5, emotional wedding moment at the edge of the vineyard at golden hour: couple embracing from behind or in silhouette, faces not visible or heavily out-of-focus (no identifiable facial features), soft backlight rim glow creating rim light and gentle silhouette, bride bouquet and groom's hand visible in foreground, warm tones (beige, cream, soft pink, olive green, wine accents), shallow depth of field, cinematic romantic mood, editorial luxury wedding photography, subtle film grain — avoid frontal faces, avoid clear facial details, no harsh lighting, no oversaturation"
  },
  {
    id: 'bouquet',
    prompt: "Portrait 4:5, intimate close-up of a bridal bouquet: cream roses, soft pink peonies, dried olive branches, burgundy accents, dewy texture, soft golden-hour light, extreme shallow depth of field with creamy bokeh, tactile detail, filmic warmth, editorial styling — avoid harsh contrast"
  }
];

async function generatePrompt(p) {
  const payload = {
    prompt: p.prompt,
    negative_prompt,
    width,
    height,
    sampler_name,
    steps,
    cfg_scale,
    n_iter,
    batch_size,
    restore_faces: false
  };

  const res = await fetch(`${WEBUI_URL}/sdapi/v1/txt2img`, {
    method: 'POST',
    headers: Object.assign({'Content-Type': 'application/json'}, API_KEY ? {'X-API-Key': API_KEY} : {}),
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, {recursive:true});

  for (let i = 0; i < (data.images || []).length; i++) {
    const b64 = data.images[i].split(',').pop();
    const buffer = Buffer.from(b64, 'base64');
    let seed = 'unknown';
    try {
      if (data.info) {
        const info = JSON.parse(data.info);
        if (info.seed) seed = info.seed;
      }
    } catch (e) {}
    const fileName = `${p.id}_seed${seed}_${i+1}.png`;
    const outPath = path.join(OUT_DIR, fileName);
    fs.writeFileSync(outPath, buffer);
    console.log('Saved', outPath);
  }
}

async function main() {
  for (const p of prompts) {
    console.log('Generating:', p.id);
    try {
      await generatePrompt(p);
    } catch (e) {
      console.error('Failed:', p.id, e.message || e);
    }
  }
}

main();
