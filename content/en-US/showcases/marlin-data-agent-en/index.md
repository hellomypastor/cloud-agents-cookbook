---
schema_version: 1
slug: "marlin-data-agent-en"
title: "Marlin Data Agent"
summary: "Marlin connects metric definitions, SQL, data questions, analysis, and experiment reports in a knowledge-backed workflow."
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "权栩"}
locale: "en-US"
translation_of: "marlin-data-agent"
---

## Scenario and outcome

**Case document** · This page provides the scenario and reusable method without requiring access to the original internal or video entry.

Marlin connects metric definitions, SQL, data questions, analysis, and experiment reports in a knowledge-backed workflow.

This editorial overview is based on the supplied showcase material, attributed to 权栩. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Start with one domain and authorized data. Preserve metric definitions, query versions, and time ranges alongside reports so conclusions remain reproducible.

### Worked implementation exercise

Investigate a conversion-rate decline using synthetic event tables and deliver a report with metric definitions, query results, and evidence limits.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Agree on definitions

Specify new-user eligibility, conversion events, deduplication entity, timezone, numerator, and denominator.

#### 2. Select data

Use metadata and analysis procedures to identify joins, permissions, and the relevant time range.

#### 3. Execute analysis

Constrain read-only queries and retain SQL versions, result tables, and segment comparisons.

#### 4. Deliver a report

Separate observations, hypotheses, and proposed experiments, linking the report to query evidence.

### Input and output record

```json
{
  "question": "conversion decline",
  "metric_version": "conversion-v1",
  "time_range": [
    "2026-08-01",
    "2026-08-07"
  ],
  "query_mode": "read-only",
  "deliverables": [
    "query",
    "result-table",
    "report"
  ]
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

Reproducibility depends on data versions and definitions rather than report length. Retrieval supplies methods, query tools supply facts, and the model explains their scope.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Conflicting definitions | Resolve the metric definition before querying. |
| Empty result | Report missing data rather than a trend. |
| Correlation presented as causation | Label hypotheses and propose a verification experiment. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "period_a": {
      "eligible": 100,
      "converted": 20
    },
    "period_b": {
      "eligible": 100,
      "converted": 15
    }
  },
  "expected": {
    "conversion_a": 0.2,
    "conversion_b": 0.15,
    "difference_percentage_points": -5
  }
}
```

The report can establish a five-percentage-point decline. Without channel, cohort, or experiment data, it cannot attribute the change to a product release.
