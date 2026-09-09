// SPDX-License-Identifier: Apache-2.0
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, mkdtemp, readdir, access, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { JSDOM } from "jsdom";
import { buildSite } from "../scripts/build-site.mjs";
const root = path.resolve(import.meta.dirname, "..");
test("site renders real bilingual articles with resolvable static links and filters", async () => {
  const outDir = await mkdtemp(path.join(tmpdir(), "qca-site-test-"));
  try {
    const result = await buildSite(root, { outDir });
    assert.ok(result.itemCount > 0);
    const visit = async (dir) => {
      for (const entry of await readdir(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);
        if (entry.isDirectory()) await visit(file);
        else if (file.endsWith(".html")) {
          const dom = new JSDOM(await readFile(file, "utf8"));
          for (const el of dom.window.document.querySelectorAll(
            "[href],[src]",
          )) {
            const target = el.getAttribute("href") ?? el.getAttribute("src");
            if (/^(?:[a-z]+:|#)/i.test(target)) continue;
            const clean = target.split(/[?#]/)[0];
            if (!clean) continue;
            await access(
              path.resolve(path.dirname(file), decodeURIComponent(clean)),
            );
          }
          dom.window.close();
        }
      }
    };
    await visit(outDir);
    const dom = new JSDOM(
      await readFile(path.join(outDir, "zh-CN/index.html"), "utf8"),
      {
        url: "http://localhost/cloud-agents-cookbook/zh-CN/",
        runScripts: "outside-only",
      },
    );
    dom.window.eval(await readFile(path.join(root, "site/site.js"), "utf8"));
    const doc = dom.window.document;
    const selection = JSON.parse(await readFile(path.join(root, "site/showcases.json"), "utf8"));
    assert.equal(selection.cases.length, 26);
    assert.equal(new Set(selection.cases.map((i) => i.slug)).size, 26);
    assert.deepEqual([...doc.querySelectorAll(".feature")].map((el) => el.getAttribute("href")), selection.featured.map((slug) => `./${slug}/`));
    for (const entry of selection.cases) assert.ok(doc.querySelector(`.entry-title[href="./${entry.slug}/"]`), entry.title);
    assert.equal(doc.querySelectorAll(".catalog .resource-live").length, 9);
    assert.equal(doc.querySelectorAll(".catalog .resource-video").length, 4);
    const film = new JSDOM(await readFile(path.join(outDir, "zh-CN/maqu-ai-studio/index.html"), "utf8"));
    assert.equal(film.window.document.querySelectorAll("video[controls] source[type='video/mp4']").length, 2);
    film.window.close();
    const initialCount = doc.querySelectorAll("[data-entry]").length;
    const showcaseCount = doc.querySelectorAll('[data-entry][data-type="showcase"]').length;
    assert.ok(initialCount > 0 && showcaseCount > 0);
    const search = doc.querySelector("#search");
    search.value = "LittleMemeWorld";
    search.dispatchEvent(new dom.window.Event("input"));
    assert.equal(doc.querySelectorAll("[data-entry]:not([hidden])").length, 1);
    assert.equal(doc.querySelector(".featured").hidden, true);
    search.value = "no-such-article";
    search.dispatchEvent(new dom.window.Event("input"));
    assert.equal(doc.querySelector(".empty").hidden, false);
    doc.querySelector("#reset").click();
    assert.equal(doc.querySelectorAll("[data-entry]:not([hidden])").length, initialCount);
    doc.querySelector("#theme-toggle").click();
    assert.equal(doc.documentElement.dataset.theme, "dark");
    doc.querySelector("#theme-toggle").click();
    assert.equal(doc.documentElement.dataset.theme, "light");
    const type = doc.querySelector("#type");
    type.value = "showcase";
    type.dispatchEvent(new dom.window.Event("input"));
    assert.equal(doc.querySelectorAll("[data-entry]:not([hidden])").length, showcaseCount);
    assert.equal(dom.window.location.pathname, "/cloud-agents-cookbook/zh-CN/");
    dom.window.close();
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
