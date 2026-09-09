---
schema_version: 1
slug: "excel-industry-analysis"
title: "行业 Excel 智能分析"
summary: "以字段映射和问题分析两个角色理解陌生表格，将自然语言问题转成受约束的计算配置。"
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "淘天-阿米"}
locale: "zh-CN"
---

## 场景与成果

**案例文档** · 无需访问原内网入口或演示视频，可在本页了解场景与复用方法。

以字段映射和问题分析两个角色理解陌生表格，将自然语言问题转成受约束的计算配置。

本篇根据 showcase 资料整理，原案例贡献者：淘天-阿米。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

Mapper 识别字段与业务口径，Analyzer 生成聚合配置，确定性引擎执行和校验。人工确认字段映射后，再将该映射复用于后续问题。

## 复用建议

用合成表格覆盖别名、空值、混合单位和重复行；让模型输出配置而不是直接编造统计结果，保存映射版本。
