---
schema_version: 1
slug: "erp-quotation-en"
title: "Erp Quotation"
summary: "An ERP proof of concept connects conversational requirements to materials, bills of materials, pricing, and draft quotations."
type: "showcase"
category: "operations-governance"
tags: ["agent", "workflow-automation"]
author: {"name": "泡鲁达"}
locale: "en-US"
translation_of: "erp-quotation"
---
## Scenario and outcome

Nonstandard quotation work starts before a price table. “Ten sets of spare parts” leaves product compatibility, kit contents, alternatives, and commercial terms unresolved.

泡鲁达’s ERP POC connects material, BOM, pricing, and quotation capabilities through MCP. The available summary does not publish complete tool definitions, customer orders, or measured results. This synthetic exercise develops a reviewable draft without repeating unverified speed claims.

## Implementation approach

### Confirm the demand before pricing

Agree on product family, purpose, mandatory conditions, permitted alternatives, region, and currency. Ten sets does not define their contents. A requirement confirmation sheet can be the correct first deliverable; it prevents a misunderstood request from propagating into a BOM.

### Pass business identifiers between capabilities

These are reference responsibilities, not original tool names or protocols.

| Capability | Input | Output | Check |
|---|---|---|---|
| Material search | Confirmed constraints | Candidate IDs and attributes | Actual fit |
| BOM expansion | Selected kit | Components, quantities, version | Units and validity |
| Pricing | Material and quantity conditions | Price, currency, validity | Applicable tier and customer |
| Draft creation | Confirmed lines and price references | Draft ID and details | Required terms and gaps |

Confirm a candidate before expanding its BOM. Keep price references with each line. Passing free-form generated descriptions between stages weakens traceability to ERP records.

### Compare two synthetic configurations

Assume a base kit costs 120 and an optional component costs 30, with ten of each where applicable. Taxes, discounts, and shipping are not provided.

| Configuration | Arithmetic | Known subtotal | Unresolved |
|---|---|---|---|
| Standard | 10 × 120 | 1,200 | Tax, shipping, lead time, validity |
| Enhanced | 10 × 120 + 10 × 30 | 1,500 | Same, plus option compatibility |

The difference is an explicit material line, not an invented percentage surcharge. Real prices must come from business records; calculation should be deterministic.

### Preserve the reasoning in the draft

Read the draft from requirements to differences, line items, price sources, and unresolved terms. The enhanced subtotal must resolve to its components and selection rationale.

A useful draft can state standard 1,200, enhanced 1,500, optional compatibility pending, and missing commercial terms. It supports discussion but is not a final commitment. An inconspicuous disclaimer does not replace explicit unresolved fields.

### Handle changes and ambiguous retries

A quantity change can trigger tier pricing, so retrieve affected prices again. After a draft-creation timeout, look for the existing draft by request identity before creating another. Expired pricing requires refreshed references and review of changed lines.

These paths determine whether the POC can support everyday work. A polished document demonstrates only the successful path.

## Reuse guidance

Start with a simple BOM and an independently checked quote. Compare material, quantity, unit, price, and subtotal. Then test missing prices, conflicting models, changed quantities, and duplicate requests.

![Illustrative quotation draft with unresolved tax](./assets/result-preview.png)

The synthetic preview illustrates a draft, not an ERP screenshot. Verify traceable line items, explicit missing terms, and distinct draft and sending states.

Make each alternative independently calculable before comparing cost or delivery. Measure the complete business cycle, including confirmation and corrections, rather than only text generation time.
