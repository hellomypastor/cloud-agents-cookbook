---
schema_version: 1
slug: "refinery-cockpit-en"
title: "Refinery Cockpit"
summary: "A refinery cockpit organizes unit loads, material flow, trends, and safety indicators using demonstration data."
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "何傲"}
locale: "en-US"
translation_of: "refinery-cockpit"
source_url: "https://hao2-lzsh-refinery.vercel.app"
---

## Scenario and outcome

[Open the online entry](https://hao2-lzsh-refinery.vercel.app)

A refinery cockpit organizes unit loads, material flow, trends, and safety indicators using demonstration data.

This editorial overview is based on the supplied showcase material, attributed to 何傲. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Label static context, simulated readings, and live data separately. The public page is a cockpit demonstration, not evidence of a production integration.

### Worked implementation exercise

Inspect a simulated unit-load change from overview to trend and alert timeline, focusing on clear data semantics.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Separate data sources

Distinguish public background facts, simulated readings, and future live inputs.

#### 2. Create a hierarchy

Use overview for location, trends for timing, and details for values and units.

#### 3. Explain alerts

Attach thresholds, windows, and observations rather than relying on color alone.

#### 4. Verify navigation

Replay a fixed simulated event and reconcile overview with detail.

### Input and output record

```json
{
  "unit": "demo-unit",
  "data_mode": "simulation",
  "metric": "load_percent",
  "value": 72,
  "observed_at": "2026-08-01T09:00:00Z",
  "unit_of_measure": "percent"
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

The public cockpit is a demonstration. If an Agent explains its values, preserve the simulation label so the report cannot be mistaken for production evidence.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Stale feed | Display staleness instead of a live indicator. |
| Mixed units | Label units and avoid ambiguous axes. |
| Alert clears | Retain occurrence and resolution times. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "data_mode": "simulation",
    "load_percent": 72
  },
  "expected": {
    "label": "simulated load",
    "production_claim": false
  }
}
```

Preserve data identity across overview, detail, and exports rather than relying on a single footer label.
