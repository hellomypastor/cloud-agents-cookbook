---
schema_version: 1
slug: "marlin-data-agent"
title: "Marlin 数据分析 Agent"
summary: "围绕指标口径、SQL、问数、分析和实验报告组织数据服务，以知识和流程支持可复用的分析交付。"
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "权栩"}
locale: "zh-CN"
---

## 场景与成果

**案例文档** · 无需访问原内网入口或演示视频，可在本页了解场景与复用方法。

围绕指标口径、SQL、问数、分析和实验报告组织数据服务，以知识和流程支持可复用的分析交付。

本篇根据 showcase 资料整理，原案例贡献者：权栩。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

案例材料将表元数据与分析方法库作为知识底座，并把分析结果接回需求流程。可复用的关键是口径、查询、证据和报告之间的关联。

## 复用建议

先限定一个业务域，用获授权的数据和已知答案验证查询；交付报告同时保存指标定义、查询版本及数据时间范围。
