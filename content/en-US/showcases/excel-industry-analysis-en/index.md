---
schema_version: 1
slug: "excel-industry-analysis-en"
title: "Excel Industry Analysis"
summary: "A mapper interprets spreadsheet fields while an analyzer produces constrained aggregation configurations for deterministic execution."
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "阿米"}
locale: "en-US"
translation_of: "excel-industry-analysis"
---

## Scenario and outcome

**Case document** · This page provides the scenario and reusable method without requiring access to the original internal or video entry.

A mapper interprets spreadsheet fields while an analyzer produces constrained aggregation configurations for deterministic execution.

This editorial overview is based on the supplied showcase material, attributed to 阿米. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Test aliases, missing values, mixed units, and duplicates using synthetic sheets. Confirm mappings, version them, and compute results with a deterministic engine.

### Worked implementation exercise

Use a synthetic sales workbook to calculate monthly net revenue by region, including refunds, aliases, and duplicate orders. Separate metric agreement from arithmetic.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Inspect structure

Read sheet names, headers, and samples. Establish row granularity before interpreting an amount column.

#### 2. Confirm mappings

Propose canonical fields, units, and missing-value policies. Resolve ambiguous mappings before freezing a version.

#### 3. Compile the question

Produce dimensions, measures, filters, and aggregations. The executor accepts only supported fields and operations.

#### 4. Compute and reconcile

Filter, deduplicate, and aggregate deterministically. Return excluded-row counts and cite computed results.

### Input and output record

```json
{
  "dataset": "synthetic-sales",
  "mapping_version": "v1",
  "group_by": [
    "region"
  ],
  "measure": {
    "operation": "sum",
    "field": "net_amount"
  },
  "deduplicate_by": "order_id"
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

The two roles separate schema interpretation from question compilation, not duplicate arithmetic. A single role may suffice for stable small tables; split responsibilities when mappings and definitions need independent reuse.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Tax-inclusive and exclusive amounts | Require an explicit metric definition before combining values. |
| Duplicates and missing regions | Reconcile exclusion counts and totals against a reference sheet. |
| Unsupported metric | Ask for clarification instead of inventing a value. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "rows": [
      {
        "order": "a",
        "region": "east",
        "gross": 100,
        "refund": 20
      },
      {
        "order": "b",
        "region": "east",
        "gross": 50,
        "refund": 0
      }
    ]
  },
  "expected": {
    "region": "east",
    "net_amount": 130
  }
}
```

Deduplicate orders, subtract refunds per row, then sum by region. This fixture uses one currency; mixed currencies must not be summed without a conversion policy.
