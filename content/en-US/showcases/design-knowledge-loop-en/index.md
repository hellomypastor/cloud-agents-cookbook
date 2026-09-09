---
schema_version: 1
slug: "design-knowledge-loop-en"
title: "Design Knowledge Loop"
summary: "Design interactions produce knowledge proposals that pass evaluation and review before becoming a new knowledge version."
type: "showcase"
category: "enterprise-integration"
tags: ["agent", "workflow-automation"]
author: {"name": "Qoder Agents 团队"}
locale: "en-US"
translation_of: "design-knowledge-loop"
---
## Scenario and outcome

Design libraries accumulate documents but often lose the outcome of their advice. A designer revises a recommendation or an expert rejects a rule, yet the next task retrieves the same unchanged guidance.

The original showcase connects service outcomes to knowledge maintenance: detect gaps, propose changes, evaluate, review, and release narrowly. Evolution means controlled knowledge versioning, not automatic global rule changes after individual feedback.

![Eight-stage design service and knowledge maintenance loop](./assets/showcase-view.png)

Original concept diagram, not a runtime screenshot. Service and maintenance connect through evidence from actual task outcomes.

## Implementation approach

### Separate service from publication

The current user needs an answer; maintainers need evidence that a change applies more broadly. Capture rule versions and outcomes during delivery, then process proposals separately. Generated candidates must not silently become the rules used by everyone.

| Stage | Output | Required connection |
|---|---|---|
| Task intake | Design and question | Scope and accessible material |
| Retrieval | Rules, components, examples | Valid versions |
| Interaction | Findings or recommendations | Rule and affected location |
| Feedback | Acceptance, edits, review outcome | Original suggestion |
| Gap detection | Conflict or missing knowledge | Task evidence |
| Proposal | Change, rationale, scope | Examples and impact |
| Evaluation and review | Comparisons and decision | Risk and counterexamples |
| Narrow release | Scoped version | Metrics and rollback condition |

The source assigns execution and synthesis to the Agent, consequential decisions to experts, and versioned inputs and outputs to the knowledge base. Acceptance rate alone cannot govern brand, design-system, or copyright-related rules.

### Follow one spacing disagreement

In this exercise, a campaign designer prefers tighter spacing than a general-page rule. The Agent identifies the difference; the designer retains the tighter layout specifically for the campaign.

That does not establish a defective global rule. It supports a possible scoped exception. Preserve the base version, task, recommendation, final design, applicable project, rationale, affected pages, and reviewer. “The user disliked the spacing” is insufficient evidence for publication.

### Evaluate fixes and regressions together

| Reference design | Candidate behavior |
|---|---|
| Campaign page | Recognize the scoped exception |
| Ordinary page | Preserve valid existing checks |
| Unspecified context | Ask rather than assume the exception |
| Another project | Remain unaffected |

A candidate that improves the campaign while weakening ordinary checks should not broaden automatically. During a narrow rollout, inspect appropriateness and expert findings rather than clicks alone.

### Roll back versions without erasing learning

Restore the prior applicable version if outcomes deteriorate, retaining proposals and evaluations. Deleting failed proposals discards counterexamples and encourages repeated mistakes. Version history also explains why the same question produced different advice over time.

## Reuse guidance

Start with a frequent task whose final result is observable, such as button checks. Link rule citations, designer changes, and expert decisions to one task before attempting automatic synthesis.

Success means traceable proposals, locally scoped preferences, regression gates, and a working rollback. Expand into component recommendations only after these properties are demonstrated.
