import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "scenes.json");
const outPath = path.join(root, "compositions", "website-video.html");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const px = (value) => `${value}px`;

function sceneStyle(scene, theme) {
  return `
    --scene-start:${scene.start};
    --scene-duration:${scene.duration};
    background:${theme.background};
    color:${theme.foreground};
    font-family:${theme.fontFamily};
  `;
}

function renderHero(scene, theme) {
  return `
<section class="scene scene-hero anim-${scene.animation}" data-scene-id="${scene.id}" style="${sceneStyle(scene, theme)}">
  <div class="content center">
    <p class="eyebrow">${escapeHtml(scene.eyebrow)}</p>
    <h1>${escapeHtml(scene.headline)}</h1>
    <p class="subheadline">${escapeHtml(scene.subheadline)}</p>
    <div class="caption">${escapeHtml(scene.caption)}</div>
  </div>
</section>`;
}

function renderSplit(scene, theme) {
  return `
<section class="scene scene-split anim-${scene.animation}" data-scene-id="${scene.id}" style="${sceneStyle(scene, theme)}">
  <div class="content grid">
    <h2>${escapeHtml(scene.headline)}</h2>
    <p>${escapeHtml(scene.body)}</p>
  </div>
  <div class="caption">${escapeHtml(scene.caption)}</div>
</section>`;
}

function renderCards(scene, theme) {
  const cards = (scene.items ?? [])
    .map((item, index) => `<li style="--i:${index}">${escapeHtml(item)}</li>`)
    .join("");

  return `
<section class="scene scene-cards anim-${scene.animation}" data-scene-id="${scene.id}" style="${sceneStyle(scene, theme)}">
  <div class="content">
    <h2>${escapeHtml(scene.headline)}</h2>
    <ul>${cards}</ul>
    <div class="caption">${escapeHtml(scene.caption)}</div>
  </div>
</section>`;
}

function renderQuote(scene, theme) {
  return `
<section class="scene scene-quote anim-${scene.animation}" data-scene-id="${scene.id}" style="${sceneStyle(scene, theme)}">
  <div class="content center">
    <h2>${escapeHtml(scene.headline)}</h2>
    <blockquote>${escapeHtml(scene.body)}</blockquote>
    <div class="caption">${escapeHtml(scene.caption)}</div>
  </div>
</section>`;
}

function renderCta(scene, theme) {
  return `
<section class="scene scene-cta anim-${scene.animation}" data-scene-id="${scene.id}" style="${sceneStyle(scene, theme)}">
  <div class="content center">
    <h2>${escapeHtml(scene.headline)}</h2>
    <p>${escapeHtml(scene.body)}</p>
    <button>${escapeHtml(scene.button)}</button>
    <div class="caption">${escapeHtml(scene.caption)}</div>
  </div>
</section>`;
}

function renderScene(scene, theme) {
  switch (scene.type) {
    case "hero":
      return renderHero(scene, theme);
    case "split":
      return renderSplit(scene, theme);
    case "cards":
      return renderCards(scene, theme);
    case "quote":
      return renderQuote(scene, theme);
    case "cta":
      return renderCta(scene, theme);
    default:
      throw new Error(`Unknown scene type: ${scene.type}`);
  }
}

function renderHtml(config) {
  const { meta, theme, scenes } = config;
  const totalDuration = scenes.reduce(
    (max, scene) => Math.max(max, scene.start + scene.duration),
    0
  );

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(meta.title)}</title>
  <style>
    :root {
      --accent: ${theme.accent};
      --muted: ${theme.muted};
      --foreground: ${theme.foreground};
      --background: ${theme.background};
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      width: ${px(meta.width)};
      height: ${px(meta.height)};
      overflow: hidden;
      background: var(--background);
      font-family: ${theme.fontFamily};
    }

    [data-composition-id="${meta.id}"] {
      width: ${px(meta.width)};
      height: ${px(meta.height)};
      position: relative;
      overflow: hidden;
      background: var(--background);
    }

    .scene {
      position: absolute;
      inset: 0;
      display: flex;
      padding: 96px;
      opacity: 0;
      transform: translateY(24px);
    }

    .content {
      width: 100%;
      max-width: 1400px;
      margin: auto;
      position: relative;
      z-index: 2;
    }

    .center {
      text-align: center;
    }

    .grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 80px;
      align-items: center;
    }

    .eyebrow {
      color: var(--accent);
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin: 0 0 28px;
    }

    h1, h2 {
      margin: 0;
      letter-spacing: -0.06em;
      line-height: 0.92;
    }

    h1 {
      font-size: 126px;
    }

    h2 {
      font-size: 96px;
    }

    p, blockquote {
      color: var(--muted);
      font-size: 42px;
      line-height: 1.18;
      margin: 40px 0 0;
    }

    .subheadline {
      font-size: 46px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 52px 0 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    li {
      border: 1px solid rgba(255,255,255,0.16);
      border-radius: 32px;
      padding: 34px;
      font-size: 34px;
      background: rgba(255,255,255,0.06);
    }

    button {
      margin-top: 54px;
      border: 0;
      border-radius: 999px;
      padding: 28px 54px;
      font-size: 34px;
      font-weight: 800;
      color: white;
      background: var(--accent);
    }

    .caption {
      position: absolute;
      left: 96px;
      bottom: 72px;
      color: var(--muted);
      font-size: 28px;
      letter-spacing: 0.02em;
    }
  </style>
</head>

<body>
  <main
    data-composition-id="${meta.id}"
    data-width="${meta.width}"
    data-height="${meta.height}"
    data-fps="${meta.fps}"
    data-duration="${totalDuration}"
  >
    ${scenes.map((scene) => renderScene(scene, theme)).join("\n")}
  </main>

  <script type="module">
    import gsap from "https://esm.sh/gsap@3.12.5";

    const fps = ${meta.fps};
    const scenes = ${JSON.stringify(scenes, null, 2)};

    const tl = gsap.timeline({ paused: true });

    for (const scene of scenes) {
      const el = document.querySelector('[data-scene-id="' + scene.id + '"]');
      const start = scene.start;
      const duration = scene.duration;

      tl.set(el, { opacity: 1, y: 0 }, start);

      if (scene.animation === "fade-up") {
        tl.fromTo(el.querySelector(".content"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, start);
      }

      if (scene.animation === "slide-left") {
        tl.fromTo(el.querySelector(".content"), { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, start);
      }

      if (scene.animation === "stagger") {
        tl.fromTo(el.querySelector("h2"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.7 }, start);
        tl.fromTo(el.querySelectorAll("li"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.14, duration: 0.6 }, start + 0.35);
      }

      if (scene.animation === "zoom") {
        tl.fromTo(el.querySelector(".content"), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, start);
      }

      if (scene.animation === "pop") {
        tl.fromTo(el.querySelector(".content"), { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, start);
      }

      tl.to(el, { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" }, start + duration - 0.45);
    }

    window.__timelines = window.__timelines || {};
    window.__timelines["${meta.id}"] = tl;
  </script>
</body>
</html>`;
}

async function main() {
  const raw = await fs.readFile(dataPath, "utf8");
  const config = JSON.parse(raw);

  if (!Array.isArray(config.scenes) || config.scenes.length === 0) {
    throw new Error("data/scenes.json must include at least one scene.");
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, renderHtml(config), "utf8");

  console.log(`Generated ${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
