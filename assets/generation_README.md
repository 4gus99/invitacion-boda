Generating the 4-image vineyard wedding set

Options and what I need from you:

1) Automatic1111 (local) — recommended if you run the Web UI locally
- Requirements: Automatic1111 Web UI running and API enabled (default URL http://127.0.0.1:7860)
- What to provide: nothing if running locally on this machine; otherwise set env `WEBUI_URL` to your webui address and `WEBUI_API_KEY` if you use an API key
- How to run (from project root):

```bash
node scripts/generate_automatic1111.js
```

- Output: `assets/generated/*.png` (one or more images per scene)

2) Stability AI / SDXL (cloud API)
- Requirements: Stability API key
- What to provide if you want me to run it: paste your Stability API key here (or tell me to run a script locally)
- Quick example (replace <YOUR_API_KEY>, may need model/version adjustment):

```bash
curl -X POST 'https://api.stability.ai/v1/generation/sdxl-1/text-to-image' \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"text_prompts":[{"text":"YOUR PROMPT"}],"width":2400,"height":3000,"cfg_scale":9,"steps":28}'
```

3) Midjourney (Discord)
- Midjourney is Discord-based and doesn't have a simple public REST API for automated generation. If you prefer Midjourney I will provide the 4 scene prompts (ready-to-paste) and the stylize/--ar flags; you would then run them inside the Midjourney bot on Discord.

Defaults used by the included Automatic1111 script:
- Resolution: 2400x3000 (4:5)
- Sampler: DPM++ 2M Karras
- Steps: 28
- CFG scale: 9
- Negative prompt includes face-related exclusions to ensure faces are not identifiable

If you'd like me to generate now, reply with one of the following:
- "Automatic1111" (and confirm your Web UI is running at `http://127.0.0.1:7860` or provide `WEBUI_URL`/`WEBUI_API_KEY`), or
- "Stability" and paste your API key (or tell me to generate locally with a script), or
- "Midjourney" and I'll post ready-to-use prompts and flags for you to run in Discord.

Would you like me to proceed with Automatic1111 (local) or Stability (API)?