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

> **Source material incomplete.** The detailed source article is inaccessible; an authorized workbook, mapping interface, and actual analysis report are missing.

The same sales question can require new field, unit, and metric interpretations for each workbook. This case connects that confirmation step to natural-language analysis.

A mapper interprets spreadsheet fields while an analyzer produces constrained aggregation configurations for deterministic execution.

This account is based on showcase material contributed by 阿米. The original workbook and actual analysis report are not yet available.

## Implementation approach

The two roles separate schema interpretation from question compilation. The Mapper proposes fields and units; the Analyzer builds a permitted calculation plan; deterministic code calculates the result. These roles come from the source summary; mapping screens and execution records are still needed.

## Reuse guidance

The following are suggested checks for reuse, not verified capabilities or test results of the original case. Evaluate each with an approved input sample and a human-reviewed reference result.

| Failure or ambiguity | Required behavior |
|---|---|
| Tax-inclusive and exclusive amounts | Require an explicit metric definition before combining values. |
| Duplicates and missing regions | Reconcile exclusion counts and totals against a reference sheet. |
| Unsupported metric | Ask for clarification instead of inventing a value. |