---
schema_version: 1
slug: "remote-agent-en"
title: "Remote Agent"
summary: "A web task interface exposes cloud execution, progress, and artifacts without requiring the local device to stay connected."
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "Qoder Agents 团队"}
locale: "en-US"
translation_of: "remote-agent"
source_url: "https://qoder.com/agents/session/new"
---

## Scenario and outcome

[Open the online entry](https://qoder.com/agents/session/new)

A web task interface exposes cloud execution, progress, and artifacts without requiring the local device to stay connected.

This editorial overview is based on the supplied showcase material, attributed to Qoder Agents 团队. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Start with an explicit file deliverable. Verify reconnect behavior, persistent task state, artifact retrieval, and whether cancellation actually stops execution.

### Worked implementation exercise

Submit a comparison report over three test documents, leave the page, and return to verify task and artifact continuity.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Specify the goal

Define input documents, output format, and completion criteria.

#### 2. Prepare execution

Make inputs available and record tool scope, reporting missing files explicitly.

#### 3. Run persistently

Keep task state independent of the browser, exposing running, waiting, and failed stages.

#### 4. Deliver artifacts

Provide a downloadable report and citations that remain associated with the same task after reconnection.

### Input and output record

```json
{
  "task_id": "comparison-demo",
  "inputs": [
    "document-a",
    "document-b",
    "document-c"
  ],
  "deliverable": "comparison-report",
  "state": "running",
  "browser_connection": "optional"
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

Persistent execution needs observable state rather than an indefinite spinner. Explain current work, dependencies, and artifact availability.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Browser closed | Preserve the task and expose state after reconnection. |
| Task cancelled | Stop execution or report that cancellation is pending. |
| Empty report artifact | Fail content validation despite file presence. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "task": "running",
    "browser": "disconnected"
  },
  "expected": {
    "task": "running",
    "resume_ui": "query same task"
  }
}
```

Browser connection state is separate from task state. Reconnect to the same task instead of resubmitting and creating duplicate work.
