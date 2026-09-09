---
schema_version: 1
slug: "maqu-ai-studio-en"
title: "Maqu Ai Studio"
summary: "A cloud film studio coordinates writing, storyboards, art, performance, music, and editing."
type: "showcase"
category: "build-deploy"
tags: ["agent", "workflow-automation"]
author: {"name": "何傲"}
locale: "en-US"
translation_of: "maqu-ai-studio"
---

## Scenario and outcome

A short film requires alignment across script, shots, images, and sound. Maqu divides the work among roles and reunites it through shared artifacts and versions.

A cloud film studio coordinates writing, storyboards, art, performance, music, and editing.

This account is based on showcase material contributed by 何傲. The diagram and responsibility table organize that material; the worked example below is suggested implementation guidance, not a production measurement.

### Result preview

![Showcase view](./assets/showcase-view.webp)

A frame from the original showcase film; the videos on this page show the full result. Source: original showcase material.

## Implementation approach

### How the work moves through the product

Give each role an explicit artifact contract and dependencies. Track versions and revision requests across sessions, with human approval of the final cut.

```mermaid
flowchart LR
  N0["Freeze the brief"] --> N1
  N1["Define role outputs"] --> N2
  N2["Coordinate dependencies"] --> N3
  N3["Review the film"]
```

Each transition should carry its input and result forward. This lets the next step use a specific artifact or observation rather than a conversational claim that work is complete.

### Responsibilities and authoritative facts

| Component | Responsibility |
|---|---|
| Coordinator | Brief, dependencies, revisions |
| Specialists | Script, shots, images, sound |
| Edit and review | Assemble assets and approve the film |

Parallelism works where dependencies are clear. More roles require shared manifests and version contracts, or generation savings are lost to rework.

### Follow one concrete request

Produce a thirty-second test film with explicit duration, style, and asset constraints across writing, storyboards, art, performance, music, and editing.

1. **Freeze the brief.** Record audience, duration, style, and prohibited assets; route scope changes through the coordinator.
2. **Define role outputs.** Use scene scripts, shot lists, identified assets, and explicit edit versions.
3. **Coordinate dependencies.** Parallelize independent assets, gate script-dependent work, and revise affected shots only.
4. **Review the film.** Check duration, continuity, audio, and provenance before human approval of a final version.

The result needs to preserve the evidence used along the way. When a step lacks data or fails, keep that state visible rather than letting the next step treat it as a successful result.

### A result that can be checked

The following synthetic example makes the expected result concrete. It is an application-level example, not a QCA API request or an observed production record.

```json
{
  "input": {
    "approved_script": "v2",
    "shot_assets": [
      {
        "shot": "s01",
        "script_version": "v1"
      }
    ]
  },
  "expected": {
    "ready_to_edit": false,
    "regenerate_or_review": [
      "s01"
    ]
  }
}
```

An existing asset is not automatically ready for editing. Check it against the approved script before reuse, regeneration, or review.

## Reuse guidance

Start by reproducing the request above with a known input. Check the resulting state or artifact against the expected output, then add the following failure cases before widening the task scope.

| Failure or ambiguity | Required behavior |
|---|---|
| Script revision | Invalidate affected shots and assets. |
| Late role deliverable | Show dependency blockage rather than fill with an unexplained gap. |
| Unclear asset provenance | Resolve or replace the asset before finalization. |