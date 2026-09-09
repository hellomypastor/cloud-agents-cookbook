---
schema_version: 1
slug: "tam-digital-twin"
title: "智驾 TAM 数字分身"
summary: "通过常驻协作入口路由行业排障任务，将知识检索、专业 Skill 和云资源诊断连接起来。"
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "俊行"}
locale: "zh-CN"
---

## 场景与成果

**案例文档** · 无需访问原内网入口或演示视频，可在本页了解场景与复用方法。

通过常驻协作入口路由行业排障任务，将知识检索、专业 Skill 和云资源诊断连接起来。

本篇根据 showcase 资料整理，原案例贡献者：俊行。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

原案例描述由主 Agent 分派多个专项 Agent。知识检索给出排查方向，实时资源工具补充当前状态，汇总时需要区分两类证据。

## 复用建议

先覆盖一种常见故障，统一事件时间线与资源标识；排障建议附工具证据，修复动作由独立的授权步骤控制。
