// SPDX-License-Identifier: Apache-2.0
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog } from "./build-catalog.mjs";
import { createMarkdownParser, analyzeMarkdown } from "./lib/markdown.mjs";

const repository =
  process.env.GITHUB_REPOSITORY ?? "hellomypastor/cloud-agents-cookbook";
const revision = process.env.GITHUB_SHA ?? "codex/cookbook-pages";
const repo = `https://github.com/${repository}`;
const sourceRoot = `${repo}/blob/${revision}`;
const esc = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const words = {
  "zh-CN": {
    intro: "使用 Qoder Cloud Agents 的实用指南与示例",
    search: "搜索指南、案例、标签…",
    category: "全部主题",
    type: "全部类型",
    all: "全部案例与指南",
    title: "标题",
    categories: "分类",
    author: "作者",
    date: "更新日期",
    contribute: "分享你的实践",
    welcome: "有值得复用的方法或案例？欢迎向 Cookbook 投稿。",
    guide: "投稿指南",
    back: "返回 Cookbook",
    toc: "本页目录",
    copy: "复制 Markdown",
    source: "在 GitHub 查看",
    read: "分钟阅读",
    empty: "没有找到相关内容。试试其他关键词，或清除筛选。",
    reset: "清除筛选",
    count: "篇内容",
  },
  "en-US": {
    intro: "Practical guides and examples for building with Qoder Cloud Agents",
    search: "Search guides, cases, and tags…",
    category: "All topics",
    type: "All types",
    all: "All cases and guides",
    title: "Title",
    categories: "Categories",
    author: "Author",
    date: "Updated",
    contribute: "Contributions welcome",
    welcome:
      "Have a useful pattern or case to share? Contribute it to the Cookbook.",
    guide: "Contribution guide",
    back: "Back to Cookbook",
    toc: "On this page",
    copy: "Copy Markdown",
    source: "View on GitHub",
    read: "min read",
    empty: "No matching content. Try another keyword or clear the filters.",
    reset: "Clear filters",
    count: "articles",
  },
};
function icon(type, slug = "") {
  const paths = {
    recipe:
      '<rect x="12" y="13" width="45" height="35" rx="5" fill="#dce8df"/><path d="m22 24 7 6-7 6m15 1h10M20 53h30"/>',
    "best-practice":
      '<rect x="17" y="9" width="35" height="46" rx="4" fill="#e5e4f0"/><path d="m24 24 4 4 8-9m-12 23 4 4 8-9M41 24h5m-5 18h5"/>',
    showcase:
      '<path d="M14 22 34 11l20 11v24L34 57 14 46Z" fill="#e9dfd2"/><path d="m14 22 20 12 20-12M34 34v23M24 17l20 12v10"/>',
    workshop:
      '<rect x="10" y="13" width="47" height="32" rx="3" fill="#dce7ee"/><path d="M33 45v12m-12 0h24M19 34l9-10 8 7 12-12"/>',
  };
  const illustrations = {
    "portal-rag-assistant": '<rect x="8" y="12" width="50" height="36" rx="4" fill="#e1e9e0"/><path d="M8 22h50M15 17h1m4 0h1M16 30h20m-20 6h12"/><path d="M35 35h25v18H47l-7 6v-6h-5Z" fill="#f7f6ef"/><path d="M41 42h13m-13 5h8"/>',
    "delivery-bot": '<path d="M11 16h20v17H11Zm28 21h20v17H39Z" fill="#dbe7df"/><path d="M31 24h17v13m-4-5 4 5 4-5M39 46H21V33m-4 5 4-5 4 5"/><path d="m16 24 3 3 7-7m19 25 3 3 7-7"/>',
    "llm2cad-pipeline": '<path d="m11 25 22-12 23 12v26L33 62 11 50Z" fill="#e1e9e0"/><path d="m11 25 22 12 23-12M33 37v25M21 20l23 12v25M11 38l22 12 23-12"/><path d="M8 8h22M8 5v6m22-6v6"/>',
    "welllog-ai": '<rect x="10" y="9" width="47" height="50" rx="3" fill="#e1e9e0"/><path d="M23 9v50m16-50v50M10 22h47M10 36h47M10 49h47" stroke-opacity=".4"/><path d="m16 14 3 9-5 7 6 10-5 13m16-39-4 12 7 8-6 10 4 10m16-40 4 9-6 9 7 11-5 11"/>',

    "managed-mode-quickstart":
      '<path d="M13 17h41l2 31H12Z" fill="#d5e5db"/><path d="m13 17 3-5h40v32l-2 4M13 24h42m-34 8 6 5-6 5m14 0h10M18 20h1m4 0h1"/><path d="m19 53 28 1"/>',
    "product-experience-officer":
      '<path d="M12 11h37l5 6v28H12Z" fill="#e7e9e1"/><path d="M12 21h42m-36-5h2m4 0h2"/><circle cx="33" cy="37" r="12" fill="#d7e6de"/><circle cx="33" cy="37" r="8"/><path d="m41 46 11 12 5-5-12-11" fill="#d7e6de"/>',
    "integrate-qoder-cloud-runtime":
      '<path d="M8 19h22v27H8Zm32 9h21v25H40Z" fill="#e4ddd0"/><path d="M8 26h22m10 9h21M14 33h9m-9 6h6m25 3h10m-10 5h7M30 32h10m-4-4 4 4-4 4"/><path d="M24 14c-2-9 10-11 13-5 7-3 14 5 9 10H28" fill="#d7e6de"/>',
    "littlememeworld-qca-showcase":
      '<circle cx="33" cy="35" r="22" fill="#d7e6de"/><path d="M11 35h44M33 13c-17 11-16 35 0 44m0-44c17 11 16 35 0 44M15 23c10 6 26 6 36 0M15 47c10-6 26-6 36 0"/><path d="m43 13 1-9 8 5 8-3-1 10c5 11-19 14-16-3Z" fill="#f3e4cc"/><path d="M49 15h.5m6-1h.5m-5 5 3-.5"/>',
    "batch-sdk-migration-with-qca":
      '<path d="M8 13h17v20H8Zm23 0h17v20H31Zm-13 27h17v20H18Zm23 0h17v20H41Z" fill="#d7e6de"/><path d="m12 20 3 3-3 3m23-6 3 3-3 3m-13 20 3 3-3 3m23-6 3 3-3 3M52 17h9v18m-4-4 4 4 4-4M9 49H3V36"/>',
  };
  return `<svg viewBox="0 0 68 68" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${illustrations[slug.replace(/-en$/, "")] ?? paths[type]}</svg>`;
}
function shell(locale, prefix, title, content, alternate, article = false) {
  const w = words[locale];
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="description" content="${esc(w.intro)}"><script src="${prefix}theme.js"></script><title>${esc(title)} · Qoder Cookbook</title><link rel="stylesheet" href="${prefix}site.css"></head><body><a class="skip" href="#main">${locale === "zh-CN" ? "跳至正文" : "Skip to content"}</a><header class="topbar"><a class="brand" href="${prefix}${locale}/"><span class="brand-mark" aria-hidden="true">Q</span><strong>Qoder</strong><span>Cookbook</span></a><nav aria-label="${locale === "zh-CN" ? "主导航" : "Main navigation"}"><a href="https://qoder.com/cloud/quickstart">${locale === "zh-CN" ? "文档" : "Docs"}</a><a href="${repo}">GitHub ↗</a><a class="language" href="${alternate}" lang="${locale === "zh-CN" ? "en" : "zh"}">${locale === "zh-CN" ? "English" : "中文"}</a><button class="theme-toggle" id="theme-toggle" aria-label="${locale === "zh-CN" ? "切换深色主题" : "Toggle dark theme"}" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M12 17v4m-4 0h8"/></svg></button></nav></header><main id="main" class="${article ? "article-main" : "home"}">${content}</main><footer><span>Qoder Cloud Agents Cookbook</span><a href="${sourceRoot}/LICENSE">CC BY 4.0 / Apache 2.0</a></footer>${article ? `<script src="${prefix}mermaid.min.js"></script>` : ""}<script src="${prefix}site.js" defer></script></body></html>`;
}
export async function buildSite(root = process.cwd(), options = {}) {
  const contractRoot = options.contractRoot ?? root;
  const outDir = options.outDir ?? path.join(root, "dist", "site");
  const bundle = await mkdtemp(path.join(tmpdir(), "qca-site-"));
  try {
    const { catalog } = await buildCatalog(root, {
      contractRoot,
      outDir: bundle,
    });
    const governance = JSON.parse(
      await readFile(path.join(bundle, "governance.json"), "utf8"),
    );
    const showcaseSelection = JSON.parse(await readFile(path.join(contractRoot, "site/showcases.json"), "utf8"));
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    await cp(path.join(contractRoot, "site/media"), path.join(outDir, "media"), { recursive: true });
    for (const name of ["site.css", "site.js", "theme.js"])
      await cp(path.join(contractRoot, "site", name), path.join(outDir, name));
    await cp(
      path.join(contractRoot, "node_modules/mermaid/dist/mermaid.min.js"),
      path.join(outDir, "mermaid.min.js"),
    );
    await cp(
      path.join(contractRoot, "THIRD_PARTY_NOTICES.md"),
      path.join(outDir, "THIRD_PARTY_NOTICES.md"),
    );
    try {
      await cp(path.join(bundle, "assets"), path.join(outDir, "assets"), {
        recursive: true,
      });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const categoryLabel = (item) =>
      governance.taxonomy.categories.find((c) => c.id === item.category).labels[
        item.locale
      ];
    const typeLabel = (item) =>
      governance.content_types.types[item.type].labels[item.locale];
    for (const locale of Object.keys(words)) {
      const w = words[locale],
        other = locale === "zh-CN" ? "en-US" : "zh-CN";
      const items = catalog.items
        .filter((i) => i.locale === locale)
        .sort(
          (a, b) =>
            (b.updated_at ?? "").localeCompare(a.updated_at ?? "") ||
            a.slug.localeCompare(b.slug),
        );
      const selected = showcaseSelection.featured
        .map((s) => items.find((i) => i.slug === s || i.translation_of === s))
        .filter(Boolean);
      if (selected.length !== 6) throw new Error(`Expected six curated showcases for ${locale}`);
      for (const entry of showcaseSelection.cases) {
        if (!items.some((i) => i.slug === entry.slug || i.translation_of === entry.slug))
          throw new Error(`Missing showcase ${entry.slug} for ${locale}`);
      }
      const featured = selected;
      const dir = path.join(outDir, locale);
      await mkdir(dir, { recursive: true });
      const filters = `<div class="filters"><label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input type="search" id="search" aria-label="${w.search}" placeholder="${w.search}"><kbd>/</kbd></label><select id="category" aria-label="${w.category}"><option value="">${w.category}</option>${governance.taxonomy.categories.map((c) => `<option value="${c.id}">${esc(c.labels[locale])}</option>`).join("")}</select><select id="type" aria-label="${w.type}"><option value="">${w.type}</option>${Object.entries(
        governance.content_types.types,
      )
        .map(
          ([key, t]) =>
            `<option value="${key}">${esc(t.labels[locale])}</option>`,
        )
        .join("")}</select></div>`;
      const resourcesFor = (i) => showcaseSelection.cases.find((c) => c.slug === (i.translation_of ?? i.slug))?.resources ?? [];
      const resourceLabel = (kind) => ({live: locale === "zh-CN" ? "在线体验" : "Live demo", video: locale === "zh-CN" ? "演示视频" : "Video", document: locale === "zh-CN" ? "公开文档" : "Documentation"})[kind];
      const resourceLinks = (i, article = false) => {
        const resources = resourcesFor(i).filter((r, n, all) => all.findIndex((v) => v.kind === r.kind) === n);
        if (!resources.length) return "";
        return `<span class="case-resources${article ? " article-resources" : " inline-resources"}">${resources.map((r) => `<a class="resource-link resource-${r.kind}" aria-label="${esc(resourceLabel(r.kind) + ': ' + i.title)}" title="${resourceLabel(r.kind)}" href="${esc(r.kind === "video" ? (article ? "#case-videos" : `./${i.slug}/#case-videos`) : r.url)}"${r.kind === "video" ? "" : ' target="_blank" rel="noopener noreferrer"'}>${article ? resourceLabel(r.kind) + " " : ""}<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${r.kind === "video" ? '<rect x="2.5" y="4" width="15" height="12" rx="3"/><path d="m8 7 5 3-5 3Z"/>' : r.kind === "live" ? '<path d="M11 3h6v6m0-6-8 8M8 4H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4"/>' : '<path d="M5 2h7l4 4v12H5ZM12 2v5h4M8 10h5m-5 3h5"/>'}</svg></a>`).join("")}</span>`;
      };
      const mediaSection = (i) => {
        const videos = resourcesFor(i).filter((r) => r.kind === "video");
        return videos.length ? `<section class="case-videos" id="case-videos"><h2>${resourceLabel("video")}</h2>${videos.map((r) => `<figure><figcaption>${esc(r.title[locale])}</figcaption><video controls playsinline preload="none" poster="../../media/${esc(r.file.replace(/\.mp4$/, ".jpg"))}" aria-label="${esc(r.title[locale])}"><source src="../../media/${esc(r.file)}" type="video/mp4"></video><a href="../../media/${esc(r.file)}">${locale === "zh-CN" ? "单独打开视频" : "Open video"} ↗</a></figure>`).join("")}</section>` : "";
      };
      const cards = featured
        .map(
          (i) =>
            `<a class="feature" href="./${i.slug}/">${icon(i.type, i.slug)}<h2>${esc(i.title)}</h2><p>${esc(i.summary)}</p></a>`,
        )
        .join("");
      const rows = items
        .map(
          (i) =>
            `<tr data-entry data-category="${i.category}" data-type="${i.type}" data-search="${esc([i.title, i.summary, i.author.name, ...i.tags, categoryLabel(i), typeLabel(i)].join(" ").toLowerCase())}"><td><div class="entry-heading"><a class="entry-title" href="./${i.slug}/">${esc(i.title)}</a>${resourceLinks(i)}</div><p>${esc(i.summary)}</p></td><td class="category-cell"><a class="pill topic-${i.category}" href="?category=${i.category}" data-filter="${i.category}">${esc(categoryLabel(i))}</a><span class="pill type-${i.type}">${esc(typeLabel(i))}</span></td><td><span class="author"><span class="avatar" aria-hidden="true">${esc([...i.author.name][0])}</span>${esc(i.author.name)}</span></td><td class="date">${i.updated_at ? esc(new Intl.DateTimeFormat(locale, { year: "numeric", month: "short" }).format(new Date(i.updated_at))) : "—"}</td></tr>`,
        )
        .join("");
      const home = `<section class="intro"><h1>Cookbook</h1><p>${w.intro}</p></section>${filters}<section class="featured" aria-label="${locale === "zh-CN" ? "精选内容" : "Featured cookbooks"}">${cards}</section><section class="library"><div class="section-head"><h2 class="sr-only">${w.all}</h2><span id="result-count" data-unit="${w.count}" aria-live="polite">${items.length} ${w.count}</span></div><table class="catalog"><thead><tr><th scope="col">${w.title}</th><th scope="col">${w.categories}</th><th scope="col">${w.author}</th><th scope="col">${w.date}</th></tr></thead><tbody>${rows}</tbody></table><div class="empty" hidden><p>${w.empty}</p><button id="reset">${w.reset}</button></div></section><section class="contribute"><h2>${w.contribute}</h2><p>${w.welcome}</p><a href="${sourceRoot}/CONTRIBUTING${locale === "zh-CN" ? ".zh-CN" : ""}.md">${w.guide} ↗</a></section>`;
      await writeFile(
        path.join(dir, "index.html"),
        shell(locale, "../", "Cookbook", home, `../${other}/`),
      );
      for (const item of items) {
        const article = JSON.parse(
          await readFile(
            path.join(bundle, "content", locale, `${item.slug}.json`),
            "utf8",
          ),
        );
        const articleDir = path.join(dir, item.slug);
        await mkdir(articleDir, { recursive: true });
        const md = createMarkdownParser();
        const headings = analyzeMarkdown(article.body).headings;
        let headingIndex = 0;
        md.renderer.rules.heading_open = (tokens, index, opts, env, self) => {
          tokens[index].attrSet("id", headings[headingIndex++].id);
          return self.renderToken(tokens, index, opts);
        };
        const fence = md.renderer.rules.fence;
        md.renderer.rules.fence = (tokens, index, opts, env, self) =>
          tokens[index].info.trim() === "mermaid"
            ? `<pre class="mermaid">${esc(tokens[index].content)}</pre>`
            : fence(tokens, index, opts, env, self);
        const defaultImage = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, index, opts, env, self) => {
          const token = tokens[index];
          const src = token.attrGet("src");
          if (src.startsWith("./assets/"))
            token.attrSet(
              "src",
              `../../assets/${locale}/${item.slug}/${src.slice(9)}`,
            );
          return defaultImage(tokens, index, opts, env, self);
        };
        const defaultLink =
          md.renderer.rules.link_open ??
          ((tokens, index, opts, env, self) =>
            self.renderToken(tokens, index, opts));
        md.renderer.rules.link_open = (tokens, index, opts, env, self) => {
          const token = tokens[index],
            href = token.attrGet("href");
          if (!/^(?:[a-z]+:|#|\/)/i.test(href)) {
            const [target, anchor] = href.split("#");
            const source = path.posix.normalize(
              path.posix.join(path.posix.dirname(item.source_path), target),
            );
            const match = catalog.items.find((i) => i.source_path === source);
            token.attrSet(
              "href",
              match
                ? `../../${match.locale}/${match.slug}/${anchor ? "#" + anchor : ""}`
                : `${sourceRoot}/${source}${anchor ? "#" + anchor : ""}`,
            );
          }
          return defaultLink(tokens, index, opts, env, self);
        };
        const translation = catalog.items.find(
          (i) =>
            i.locale === other &&
            (i.slug === item.translation_of || i.translation_of === item.slug),
        );
        const body = `<a class="back" href="../">← ${w.back}</a><div class="article-layout"><article><header class="article-header"><div class="article-tags"><span class="pill topic-${item.category}">${esc(categoryLabel(item))}</span><span>${esc(typeLabel(item))}</span></div><h1>${esc(item.title)}</h1><p class="summary">${esc(item.summary)}</p><div class="byline"><span class="author"><span class="avatar">${esc([...item.author.name][0])}</span>${esc(item.author.name)}</span><span>${item.reading_time_minutes} ${w.read}</span></div><div class="article-actions"><button id="copy-markdown">${w.copy}</button><a href="${sourceRoot}/${item.source_path}">${w.source} ↗</a><a href="./index.md" download>Markdown ↓</a></div>${resourceLinks(item, true)}</header>${mediaSection(item)}<div class="prose">${md.render(article.body)}</div><div class="article-end"><a href="../">← ${w.back}</a></div></article><nav class="toc" aria-label="${w.toc}"><strong>${w.toc}</strong>${item.toc.map((h) => `<a class="depth-${h.depth}" href="#${esc(h.id)}">${esc(h.text)}</a>`).join("")}</nav></div>`;
        await writeFile(
          path.join(articleDir, "index.html"),
          shell(
            locale,
            "../../",
            item.title,
            body,
            translation
              ? `../../${other}/${translation.slug}/`
              : `../../${other}/`,
            true,
          ),
        );
        await writeFile(path.join(articleDir, "index.md"), article.body);
      }
    }
    await writeFile(
      path.join(outDir, "index.html"),
      '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=./zh-CN/"><title>Qoder Cookbook</title><a href="./zh-CN/">中文</a> <a href="./en-US/">English</a></html>',
    );
    await writeFile(path.join(outDir, ".nojekyll"), "");
    await writeFile(
      path.join(outDir, "404.html"),
      '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · Qoder Cookbook</title><h1>Page not found</h1><p>This cookbook page does not exist.</p><a href="https://' +
        "cookbook.anchen.me" +
        '/">Back to Cookbook</a></html>',
    );
    return { outDir, itemCount: catalog.items.length };
  } finally {
    await rm(bundle, { recursive: true, force: true });
  }
}
if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url))
  buildSite()
    .then((r) => console.log(`Built ${r.itemCount} articles in ${r.outDir}`))
    .catch((e) => {
      console.error(e);
      process.exitCode = 1;
    });
