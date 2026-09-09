---
schema_version: 1
slug: "game-square-en"
title: "Game Square"
summary: "A browser game collection demonstrates playable frontend artifacts delivered with Agent assistance."
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "何傲"}
locale: "en-US"
translation_of: "game-square"
source_url: "https://hao2-games.vercel.app"
---

## Scenario and outcome

[Open the online entry](https://hao2-games.vercel.app)

A browser game collection demonstrates playable frontend artifacts delivered with Agent assistance.

This editorial overview is based on the supplied showcase material, attributed to 何傲. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Separate game rules, state transitions, and presentation. Test illegal moves, win conditions, and restarting; browser gameplay does not imply live Agent inference on every move.

### Worked implementation exercise

Use a reproducible test match to distinguish a loading game from a correct game, checking legal moves, scoring, and restart behavior.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Define the rules

Pin the game variant, turns, win conditions, and illegal-action behavior.

#### 2. Model transitions

Drive presentation from a coherent state machine rather than independent UI mutations.

#### 3. Add a computer player

Validate computer actions through the same rules as human actions.

#### 4. Verify delivery

Test touch input, end states, and restart using reproducible seeds or action traces.

### Input and output record

```json
{
  "game": "test-card-game",
  "rules_version": "v1",
  "seed": 42,
  "state": "in-progress",
  "action_trace": [
    "deal",
    "player-move",
    "computer-move"
  ]
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

The artifact is browser software. Agent-assisted development does not imply runtime model inference, and deterministic rule checks remain appropriate.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Repeated action clicks | Accept one valid action per turn. |
| Illegal computer action | Reject it and select a valid fallback. |
| Restart after completion | Reset scores and pending timers. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "state": "finished",
    "action": "player-move"
  },
  "expected": {
    "accepted": false,
    "state": "finished"
  }
}
```

A finished game rejects ordinary moves while allowing an explicit restart. Enforce this in rules, not just by hiding buttons.
