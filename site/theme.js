// SPDX-License-Identifier: Apache-2.0
try {
  const saved = localStorage.getItem("cookbook-theme");
  const dark = saved
    ? saved === "dark"
    : globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = "light";
}
