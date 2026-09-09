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

The same sales question can require new field, unit, and metric interpretations for each workbook. This case connects that confirmation step to natural-language analysis.

A mapper interprets spreadsheet fields while an analyzer produces constrained aggregation configurations for deterministic execution.

This account is based on showcase material contributed by 阿米. The diagram and responsibility table organize that material; the worked example below is suggested implementation guidance, not a production measurement.

### Result preview

![Regional summary](./assets/result-preview.png)

Illustrative output based on this article’s example; synthetic data, not a product screenshot. One currency · deduplicate orders · subtract refunds.

## Implementation approach

### How the work moves through the product

Test aliases, missing values, mixed units, and duplicates using synthetic sheets. Confirm mappings, version them, and compute results with a deterministic engine.

```mermaid
flowchart LR
  N0["Inspect structure"] --> N1
  N1["Confirm mappings"] --> N2
  N2["Compile the question"] --> N3
  N3["Compute and reconcile"]
```

Each transition should carry its input and result forward. This lets the next step use a specific artifact or observation rather than a conversational claim that work is complete.

### Responsibilities and authoritative facts

| Component | Responsibility |
|---|---|
| Mapper | Field, unit, and metric mappings |
| Analyzer | Question to constrained aggregation |
| Executor | Deterministic computation and validation |

The two roles separate schema interpretation from question compilation, not duplicate arithmetic. A single role may suffice for stable small tables; split responsibilities when mappings and definitions need independent reuse.

### Follow one concrete request

Use a synthetic sales workbook to calculate monthly net revenue by region, including refunds, aliases, and duplicate orders. Separate metric agreement from arithmetic.

1. **Inspect structure.** Read sheet names, headers, and samples. Establish row granularity before interpreting an amount column.
2. **Confirm mappings.** Propose canonical fields, units, and missing-value policies. Resolve ambiguous mappings before freezing a version.
3. **Compile the question.** Produce dimensions, measures, filters, and aggregations. The executor accepts only supported fields and operations.
4. **Compute and reconcile.** Filter, deduplicate, and aggregate deterministically. Return excluded-row counts and cite computed results.

The result needs to preserve the evidence used along the way. When a step lacks data or fails, keep that state visible rather than letting the next step treat it as a successful result.

### A result that can be checked

The following synthetic example makes the expected result concrete. It is an application-level example, not a QCA API request or an observed production record.

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

## Reuse guidance

Start by reproducing the request above with a known input. Check the resulting state or artifact against the expected output, then add the following failure cases before widening the task scope.

| Failure or ambiguity | Required behavior |
|---|---|
| Tax-inclusive and exclusive amounts | Require an explicit metric definition before combining values. |
| Duplicates and missing regions | Reconcile exclusion counts and totals against a reference sheet. |
| Unsupported metric | Ask for clarification instead of inventing a value. |