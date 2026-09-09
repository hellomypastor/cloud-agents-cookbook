---
schema_version: 1
slug: "cloud-use-en"
title: "Cloud Use"
summary: "Governed machine identities and tool interfaces support Agent-driven cloud resource inspection and operations."
type: "showcase"
category: "operations-governance"
tags: ["agent", "workflow-automation"]
author: {"name": "QCA Cloud Use 团队"}
locale: "en-US"
translation_of: "cloud-use"
source_url: "https://docs.qoder.com/zh/cloud-agents/best-practices/cloud-use"
---

## Scenario and outcome

[Open the documentation](https://docs.qoder.com/zh/cloud-agents/best-practices/cloud-use)

Governed machine identities and tool interfaces support Agent-driven cloud resource inspection and operations.

This editorial overview is based on the supplied showcase material, attributed to QCA Cloud Use 团队. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Begin with read-only inventory and a bounded resource scope. Require explicit action targets and authorization for writes, and retain tool results for review.

### Worked implementation exercise

Inventory potentially idle resources in a test group, returning evidence without changing or deleting anything.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Scope identity

Limit tool access to the intended resource group and read-only permissions.

#### 2. Collect facts

Query state and utilization over a defined interval rather than inferring from names.

#### 3. Generate candidates

Combine usage, dependencies, and missing metrics into a review list.

#### 4. Review separately

Require a separate authorized task for changes rather than treating the report as permission.

### Input and output record

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

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

Separate observation, recommendation, and mutation. Resource identifiers, permissions, and tool results define execution boundaries.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Missing metrics | Report insufficient evidence rather than zero usage. |
| Dependent resource | Expose the dependency before recommending action. |
| Insufficient tool permissions | Report the limitation instead of widening privileges. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

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

Missing metrics are not zero. Dependency and business context are also required; this fixture checks restraint when evidence is insufficient.
