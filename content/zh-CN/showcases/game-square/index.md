---
schema_version: 1
slug: "game-square"
title: "游戏广场：浏览器游戏交付"
summary: "将多种轻量游戏汇聚到浏览器入口，展示 Agent 交付可操作、可分享前端产品的一种形态。"
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "何傲"}
locale: "zh-CN"
source_url: "https://hao2-games.vercel.app"
---

## 场景与成果

[打开在线入口](https://hao2-games.vercel.app)

将多种轻量游戏汇聚到浏览器入口，展示 Agent 交付可操作、可分享前端产品的一种形态。

本篇根据 showcase 资料整理，原案例贡献者：何傲。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

原案例集合包括棋牌和休闲游戏，规则判定、状态更新和电脑玩家运行在浏览器端。它展示的是软件交付成果，不表示每次出牌都由在线 Agent 推理。

## 复用建议

按规则、状态机和界面三层实现；测试胜负判定、非法操作和重新开局。用可重复对局验证规则完整性。
