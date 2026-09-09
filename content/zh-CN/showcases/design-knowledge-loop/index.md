---
schema_version: 1
slug: "design-knowledge-loop"
title: "设计知识自进化"
summary: "把设计问答、规范检查和用户采纳反馈转成知识提案，经评测与审核后更新知识版本。"
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "Qoder Agents 团队"}
locale: "zh-CN"
---

## 场景与成果

**案例文档** · 无需访问原内网入口或演示视频，可在本页了解场景与复用方法。

把设计问答、规范检查和用户采纳反馈转成知识提案，经评测与审核后更新知识版本。

本篇根据 showcase 资料整理，原案例贡献者：Qoder Agents 团队。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

案例描述八步链路：任务进入、知识服务、交互执行、结果反馈、缺口识别、提案生成、评测审核和灰度发布。知识消费产生的新信号进入受控更新流程。

## 复用建议

从一种规范检查开始，记录修改原因与证据；将提案和已发布规则分开，通过参考样本评测后再发布，并保留回滚版本。
