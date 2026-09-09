---
schema_version: 1
slug: "cloud-use"
title: "Cloud Use：云资源操作"
summary: "将云资源查询、分析与运维能力通过工具接口交给 Agent，并围绕机器身份与权限边界组织执行。"
type: "showcase"
category: "operations-governance"
tags: ["agent", "workflow-automation"]
author: {"name": "QCA Cloud Use 团队"}
locale: "zh-CN"
source_url: "https://docs.qoder.com/zh/cloud-agents/best-practices/cloud-use"
---

## 场景与成果

[阅读公开文档](https://docs.qoder.com/zh/cloud-agents/best-practices/cloud-use)

将云资源查询、分析与运维能力通过工具接口交给 Agent，并围绕机器身份与权限边界组织执行。

本篇根据 showcase 资料整理，原案例贡献者：QCA Cloud Use 团队。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

案例强调使用受治理的身份连接 OpenAPI MCP 与 Skill。资源状态来自工具调用，Agent 负责理解目标、选择工具与整理执行结果。

## 复用建议

从只读资源盘点开始，限定资源范围并记录调用结果；写操作应有明确授权、可核对目标和失败恢复路径。
