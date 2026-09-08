// SPDX-License-Identifier: Apache-2.0
const search = document.querySelector("#search");
if (search) {
  const category = document.querySelector("#category"),
    type = document.querySelector("#type");
  const entries = [...document.querySelectorAll("[data-entry]")];
  const restore = () => {
    const p = new URLSearchParams(location.search);
    search.value = p.get("q") ?? "";
    category.value = p.get("category") ?? "";
    type.value = p.get("type") ?? "";
  };
  const filter = (save = true) => {
    const terms = search.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    let count = 0;
    for (const row of entries) {
      row.hidden = !(
        terms.every((t) => row.dataset.search.includes(t)) &&
        (!category.value || row.dataset.category === category.value) &&
        (!type.value || row.dataset.type === type.value)
      );
      if (!row.hidden) count++;
    }
    const counter = document.querySelector("#result-count");
    counter.textContent = `${count} ${counter.dataset.unit}`;
    document.querySelector(".empty").hidden = count > 0;
    document.querySelector(".featured").hidden = Boolean(
      terms.length || category.value || type.value,
    );
    if (save) {
      const p = new URLSearchParams();
      if (search.value) p.set("q", search.value);
      if (category.value) p.set("category", category.value);
      if (type.value) p.set("type", type.value);
      history.replaceState(
        null,
        "",
        location.pathname + (p.size ? "?" + p : ""),
      );
    }
  };
  for (const el of [search, category, type])
    el.addEventListener("input", () => filter());
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = category.value = type.value = "";
    filter();
    search.focus();
  });
  document.querySelectorAll("[data-filter]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      category.value = a.dataset.filter;
      filter();
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "/" &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
    ) {
      e.preventDefault();
      search.focus();
    }
  });
  window.addEventListener("popstate", () => {
    restore();
    filter(false);
  });
  restore();
  filter(false);
}
const zh = document.documentElement.lang === "zh-CN";
async function copy(button, text) {
  const before = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = zh ? "已复制" : "Copied";
  } catch {
    button.textContent = zh
      ? "复制失败，请手动选择文本"
      : "Select text to copy";
  }
  setTimeout(() => (button.textContent = before), 2000);
}
document
  .querySelector("#copy-markdown")
  ?.addEventListener("click", async (e) => {
    const button = e.currentTarget;
    try {
      const response = await fetch("./index.md");
      if (!response.ok) throw new Error("Markdown unavailable");
      await copy(button, await response.text());
    } catch {
      button.textContent = zh ? "请下载 Markdown" : "Download Markdown instead";
    }
  });
document.querySelectorAll(".prose pre:not(.mermaid)").forEach((pre) => {
  const button = document.createElement("button");
  button.className = "copy-code";
  button.textContent = zh ? "复制" : "Copy";
  button.addEventListener("click", () =>
    copy(button, pre.querySelector("code")?.textContent ?? ""),
  );
  pre.append(button);
});
if (globalThis.mermaid)
  globalThis.mermaid.initialize({
    startOnLoad: true,
    securityLevel: "strict",
    htmlLabels: false,
    theme: "neutral",
  });
const themeButton = document.querySelector("#theme-toggle");
const syncThemeButton = () => {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton?.setAttribute("aria-pressed", String(dark));
  themeButton?.setAttribute(
    "aria-label",
    zh
      ? `切换${dark ? "浅色" : "深色"}主题`
      : `Switch to ${dark ? "light" : "dark"} theme`,
  );
};
themeButton?.addEventListener("click", () => {
  const theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("cookbook-theme", theme);
  } catch {
    /* Theme still works without storage. */
  }
  syncThemeButton();
});
syncThemeButton();
