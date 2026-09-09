---
schema_version: 1
slug: "harness-en"
title: "Harness"
summary: "A task graph organizes clarification, planning, implementation, verification, and release."
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "蛋总/与天"}
locale: "en-US"
translation_of: "harness"
---

## Scenario and outcome

**Case document** · This page provides the scenario and reusable method without requiring access to the original internal or video entry.

A task graph organizes clarification, planning, implementation, verification, and release.

This editorial overview is based on the supplied showcase material, attributed to 蛋总/与天. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Define inputs, outputs, evidence, and completion conditions for each node. Place human decisions at explicit transitions and resume failed nodes without restarting unrelated work.

### Worked implementation exercise

Implement input validation in a test repository using resumable requirement, implementation, and verification nodes.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Define completion

Specify accepted inputs, error behavior, and reference cases.

#### 2. Build dependencies

Gate implementation on requirements, verification on artifacts, and release on authorization and passing results.

#### 3. Execute nodes

Record input versions, outputs, and tool results; invalidate only affected downstream work.

#### 4. Collect outcomes

Expose evidence and unresolved issues, and make human decisions explicit state transitions.

### Input and output record

```json
{
  "task": "validation-feature",
  "nodes": [
    {
      "id": "requirements",
      "state": "approved"
    },
    {
      "id": "implementation",
      "depends_on": [
        "requirements"
      ]
    },
    {
      "id": "verification",
      "depends_on": [
        "implementation"
      ]
    }
  ]
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

Graphs suit dependencies, rollback, and human gates. Keep simple tasks linear; additional graph complexity requires stronger node contracts.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Requirements change after coding | Invalidate affected downstream nodes. |
| Verification failure | Return to implementation with evidence. |
| Retry produces stale artifact | Reject outputs from obsolete input versions. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "requirements_version": 2,
    "implementation_based_on": 1,
    "tests": "passed"
  },
  "expected": {
    "implementation": "stale",
    "delivery": "blocked"
  }
}
```

Passing tests validate the old requirement version only. Reassess implementation and test relevance after requirements change.
