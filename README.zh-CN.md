# Qoder Cloud Agents Cookbook

[English](./README.md) · [投稿说明](./CONTRIBUTING.zh-CN.md) · [内容契约](./docs/metadata-contract.md) · [Qoder Cloud Agents](https://qoder.com/cloud/quickstart)

Qoder Cloud Agents Cookbook 是面向 Cloud Agents 用户的公开实践内容源。Cookbook 页面只提供阅读能力；每一篇公开内容都来自本仓库中经过自动检查和人工审核的 Pull Request。文章还可以附带强绑定的 Demo 源码，但源码只保留在 GitHub，不进入 Cookbook 发布物。

## 内容类型

| 类型 | 适合的内容 |
|---|---|
| Recipe | 完成一个明确任务的可复用方法 |
| Best Practice | 生产建议、适用边界与关键权衡 |
| Showcase | 完整场景、实现思路与成果 |
| Workshop | 培训、分享或团队学习材料 |

仓库支持 `zh-CN` 和 `en-US`，内容路径为 `content/<locale>/<type>/<slug>/index.md`。可选源码路径为 `demos/<slug>/`，Demo slug 必须与其所属文章一致。终稿 PRD 中首发内容为待补充，因此初始仓库不会放入虚构的可发布文章或可运行 Demo，后续内容通过 PR 持续增加。

```text
content/<locale>/<type>/<slug>/index.md   发布为 Cookbook 页面
demos/<slug>/                             可选、仅保留在 GitHub 的 Demo 源码
```

## 投稿

1. 阅读 [中文投稿说明](./CONTRIBUTING.zh-CN.md)。
2. 从 [`templates/`](./templates/) 复制对应模板。
3. 在 `content/` 的正确目录中创建文章和本地资源。
4. 可选：增加强绑定的 `demos/<slug>/`，并在文章正文中链接它。
5. 如果本地有 Node.js 20 或更高版本，可选择运行推荐的本地检查。
6. 使用 `git commit -s` 提交并创建 Pull Request。

提交投稿不强制要求本地检查。作者创建或更新 PR 后，GitHub Actions 会自动检查格式与渲染契约，并生成必需的文章预览。Demo 源码只作为不可信数据接受静态检查，自动化不会安装、构建、测试或运行它。自动检查通过不代表内容自动发布；Maintainer 仍会人工审核事实、源码、运行说明、公开范围、风险、授权和内容价值，并人工 Merge。

## 可选的本地检查

如果本地有 Node.js 20 或更高版本，建议运行以下命令以便更快发现问题：

```bash
npm ci --ignore-scripts
npm run check
```

页面预览写入 `dist/preview/`，不提交到仓库。没有 Node.js 的投稿者可以直接创建 PR，并查看 GitHub Actions 生成的预览。

## 内容契约

- [Metadata 规范](./docs/metadata-contract.md)
- [写作与渲染规范](./docs/authoring-and-rendering-contract.md)
- [Demo 规范](./docs/demo-contract.md)
- [分类与标签](./docs/taxonomy.md)
- [自动检查](./docs/automated-checks.md)
- [仓库治理](./docs/repository-governance.md)
- [前端接入契约](./docs/frontend-integration-contract.md)
- [仓库设置清单](./docs/maintainers/repository-settings.md)
- [发布与回退](./docs/maintainers/release-and-rollback.md)

## 许可证

正文、内容图片、模板和文档使用 [CC BY 4.0](./LICENSES/CC-BY-4.0.txt)；Demo 源码、可执行工具、工作流、测试和独立示例代码使用 [Apache-2.0](./LICENSES/Apache-2.0.txt)。详细适用范围见 [LICENSE](./LICENSE) 和 [NOTICE](./NOTICE)。

投稿内容适用相同许可证，并要求所有 commit 满足 DCO 签署。

## 本地浏览站点

```bash
npm ci --ignore-scripts
npm run dev
```

打开 <http://localhost:4173/zh-CN/>（英文入口为 `/en-US/`）。支持搜索、主题与类型筛选、独立文章页和语言切换。修改内容或页面后运行 `npm run build:site` 并刷新浏览器；端口可通过 `PORT` 环境变量指定。

`npm run build:site` 输出纯静态站点到 `dist/site/`，可以作为 GitHub Pages 的发布目录。当前命令只构建本地文件，不执行线上部署；原有 `npm run preview` 继续提供审核预览。运行 `npm run check` 会重建 `dist/`，之后需要重新运行 `npm run build:site`。

## 个人 GitHub Pages

个人预览地址：<https://cookbook.anchen.me/zh-CN/>。

`.github/workflows/pages.yml` 仅在 `hellomypastor/cloud-agents-cookbook` 执行部署。推送 `codex/cookbook-pages`（或将该工作流合入 `main` 后推送主干）会先运行完整校验，再构建并发布 `dist/site/`。GitHub 仓库 Settings → Pages 的 Source 使用 **GitHub Actions**。部署不需要额外密钥，写权限仅授予部署 job。

正文源码与投稿链接使用构建时的 `GITHUB_REPOSITORY` 和 `GITHUB_SHA`，指向实际构建仓库和版本。发布目录不含 Demo 源码。回退时可将发布分支 revert 到已验证版本并推送，触发重新部署。

独立域名为 `cookbook.anchen.me`，DNS 需要添加 `CNAME cookbook → hellomypastor.github.io`。GitHub Pages 设置中的 Custom domain 使用 `cookbook.anchen.me`，DNS 生效且证书签发后启用 Enforce HTTPS。此设置不更改个人主站 `anchen.me`。
