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

### 实践演练：从任务到验收

只读盘点一个测试资源组的闲置资源，返回资源清单与判断依据，不自动删除或修改资源。

以下是可复用的实现与验收建议，不代表演示站已公开这些后端能力，也不表示这些检查已经执行通过。演练使用合成或获授权输入；JSON 是应用侧记录示意，不是 QCA API 请求。

### 分步实现与交付物

#### 1. 限定身份范围

为工具调用配置最小资源范围，明确此次只有查询权限。

#### 2. 收集资源事实

查询资源状态和相关指标，保留时间窗口，不能只凭名字判断闲置。

#### 3. 生成候选建议

将使用率、关联依赖和缺失指标共同呈现，给出待确认清单。

#### 4. 人工核对

用户核对后再决定是否发起新的变更任务；查询报告不隐含操作授权。

### 输入输出记录示例

```json
{
  "resource_scope": "test-group",
  "mode": "read-only",
  "lookback_days": 7,
  "deliverables": [
    "inventory",
    "evidence",
    "recommendations"
  ],
  "mutations": false
}
```

将这份记录与产物或报告一起保存，用来回答“这份结果来自哪个输入、哪个版本”。凭证不写入记录。输入变化后应重新判断旧结果是否适用，不能静默复用。

## 复用建议
从只读资源盘点开始，限定资源范围并记录调用结果；写操作应有明确授权、可核对目标和失败恢复路径。

### 关键取舍

云操作场景需要把观察、建议与变更分为不同阶段。模型可以组织信息，但资源身份、权限与工具返回值才是执行边界。

### 故障与验收检查

| 检查条件 | 预期结果 |
|---|---|
| 指标缺失 | 标记无法判断，不将其当作零使用率。 |
| 资源仍有依赖 | 在建议中说明依赖阻塞。 |
| 工具权限不足 | 报告失败范围，不扩大权限重试。 |

为每个检查准备可重复输入，记录实际观察。验收时对照产物、状态或数值，不只阅读一段看似合理的解释；尚未验证的项目保留为待验收，不能按通过统计。

### 一组可直接核对的验收样例

以下为合成验收样例，展示预期行为，不是生产环境的实测结果。可先实现这一最小样例，再加入前面的故障条件。

```json
{
  "input": {
    "cpu_metric": null,
    "resource_exists": true
  },
  "expected": {
    "idle": "undetermined",
    "delete_recommended": false
  }
}
```

缺失指标不能按零处理。闲置判断还需要资源依赖与业务用途，示例只验证数据不足时不会给出越界建议。
