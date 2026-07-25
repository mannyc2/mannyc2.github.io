import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("builds the GitHub Pages homepage with the intended projects", async () => {
  const [index, app, styles, builtAssets, previewFiles] = await Promise.all([
    readFile(new URL("../dist/index.html", import.meta.url), "utf8"),
    readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
    readdir(new URL("../dist/assets/", import.meta.url)),
    readdir(new URL("../dist/previews/", import.meta.url)),
  ]);

  assert.match(index, /<title>Chris<\/title>/i);
  assert.match(index, /id="root"/i);
  assert.ok(builtAssets.some((file) => /^index-.*\.js$/.test(file)));
  assert.ok(builtAssets.some((file) => /^index-.*\.css$/.test(file)));

  for (const project of [
    "Bus Priority Impact Studio",
    "Sprite.exe",
    "Watchify",
    "Set Visualizer",
    "Plato Wiki",
    "nyc-transit-kit",
    "MTA Wiki",
    "ts-release",
    "open-design-cli",
  ]) {
    assert.match(app, new RegExp(project, "i"));
  }

  for (const preview of [
    "bus-priority.png",
    "bus-priority-route-detail.png",
    "bus-priority-interventions.png",
    "plato-wiki.png",
    "plato-wiki-dialogues.png",
    "plato-wiki-reading.png",
    "sprite-exe.jpg",
    "sprite-exe-features.png",
    "watchify.png",
    "set-visualizer.png",
    "set-visualizer-intersection.png",
  ]) {
    assert.ok(previewFiles.includes(preview));
  }

  assert.doesNotMatch(app, /badge|pill|card|[•·]/i);
  assert.doesNotMatch(
    app,
    /writes software|looking for software engineering work|visit the project|read the source/i,
  );
  assert.doesNotMatch(app.replaceAll(/https?:\/\/[^"]+/gi, ""), /strauss/i);
  assert.match(app, /searchable knowledge base and guided reading/i);
  assert.match(app, /audio readings generated using local models/i);
  assert.match(app, /original, source-backed dataset/i);
  assert.doesNotMatch(
    app,
    /mailto:|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  );
  assert.match(styles, /\.project\s*\{/);
  assert.match(styles, /\.tool\s*\{/);
  assert.doesNotMatch(styles, /\.card|\.badge|\.pill/i);
});

test("contains no ChatGPT Sites or Cloudflare runtime configuration", async () => {
  const [packageJson, viteConfig, readme] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);
  const source = `${packageJson}\n${viteConfig}\n${readme}`;

  assert.doesNotMatch(
    source,
    /chatgpt|site-creator|vinext|wrangler|cloudflare|drizzle/i,
  );
  assert.match(readme, /mannyc2\.github\.io/);
});
