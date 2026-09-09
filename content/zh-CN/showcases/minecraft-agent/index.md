---
schema_version: 1
slug: "minecraft-agent"
title: "Minecraft 世界 Agent"
summary: "让 Agent 以游戏角色进入共享世界，通过环境感知和行动与玩家互动，探索具身陪伴的产品形态。"
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "Qteam-残风"}
locale: "zh-CN"
---

## 场景与成果

**案例文档** · 无需访问原内网入口或演示视频，可在本页了解场景与复用方法。

让 Agent 以游戏角色进入共享世界，通过环境感知和行动与玩家互动，探索具身陪伴的产品形态。

本篇根据 showcase 资料整理，原案例贡献者：Qteam-残风。内容介绍材料中的方案，不将其等同于已验证的生产部署或量化收益。

## 实现思路

原 showcase 以视频呈现游戏内交互。本篇提供场景说明：任务上下文需要包含角色状态与环境变化，行动结果应回到下一轮感知。

## 复用建议

可从跟随、寻路或协作建造中的单一任务入手。记录动作前后状态，区分模型意图、实际动作与环境反馈。
