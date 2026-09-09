---
schema_version: 1
slug: "realtime-companion-en"
title: "Realtime Companion"
summary: "A realtime voice companion supports sharing and questions through conversational interaction."
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "Qoder Agents 团队"}
locale: "en-US"
translation_of: "realtime-companion"
source_url: "https://qca-realtime-agent.vercel.app/"
---

## Scenario and outcome

[Open the online entry](https://qca-realtime-agent.vercel.app/)

A realtime voice companion supports sharing and questions through conversational interaction.

This editorial overview is based on the supplied showcase material, attributed to Qoder Agents 团队. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Validate interruption, mute, network failure, and ending a session. Child-oriented experiences also require guardian awareness, minimal data collection, and age-appropriate content.

### Worked implementation exercise

Use an adult test account to share a daily event and verify listening, response, interruption, and session ending without collecting children’s recordings.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Start a session

Make microphone state, purpose, and ending controls explicit before capture.

#### 2. Receive speech

Track turns and silence with clear listening and processing states.

#### 3. Respond and interrupt

Allow interruption and discard obsolete queued output.

#### 4. End and clean up

Stop capture and playback, apply the retention policy, and show a closed state.

### Input and output record

```json
{
  "session": "voice-demo",
  "state": "listening",
  "turn_id": "turn-03",
  "capture_enabled": true,
  "retention": "test-session-only"
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

Companionship depends on turn-taking and user control as much as fluent speech. Stabilize stop, interruption, and reconnection before adding inspectable, deletable memory.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| User interrupts | Stop old playback and isolate the new turn. |
| Network loss | Show disconnection rather than waiting indefinitely. |
| Speech after ending | Do not capture or respond after closure. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "playing_turn": "t1",
    "new_user_turn": "t2"
  },
  "expected": {
    "cancel_playback": "t1",
    "active_turn": "t2"
  }
}
```

Content appropriateness and turn-state correctness are separate checks. First ensure that obsolete speech is not mixed with the new turn.
