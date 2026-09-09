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

**Case document** · This page provides the scenario and reusable method without requiring access to the original internal or video entry.

An ERP proof of concept connects conversational requirements to materials, bills of materials, pricing, and draft quotations.

This editorial overview is based on the supplied showcase material, attributed to 泡鲁达. It describes the presented approach; it does not establish production deployment or independently measured performance.

## Implementation approach

Use test catalogs first. Preserve quantity, units, price validity, and tax assumptions, and separate draft generation from submitting a binding quotation.

### Worked implementation exercise

Generate standard and enhanced draft quotations for ten equipment spare-parts kits using a test catalog.

The following is a suggested implementation exercise, not a claim that the demonstration exposes this backend or that these checks have already passed. Use synthetic or authorized inputs. The JSON is an application-level record sketch, not a QCA API request.

### Step-by-step implementation

#### 1. Clarify requirements

Extract use, quantity, delivery date, and constraints; ask about missing specifications.

#### 2. Resolve materials

Query candidate part numbers, bills of materials, and substitutes while retaining identifiers.

#### 3. Calculate prices

Use ERP prices, currency, validity, and tax treatment; calculate subtotals deterministically.

#### 4. Compare drafts

Show differences, unresolved conditions, and price sources without submitting a binding quote.

### Input and output record

```json
{
  "request_id": "quote-demo",
  "quantity": 10,
  "currency": "CNY",
  "price_list_version": "test-v1",
  "status": "draft",
  "options": [
    "standard",
    "enhanced"
  ]
}
```

Keep this record with the generated artifact or report. It should identify which input and version produced the result; keep sensitive credentials outside the record. If an input changes, do not silently reuse a result from the earlier version.

## Reuse guidance


### Design tradeoff

The model can interpret requirements but must not replace ERP pricing facts. Separate drafting from submission so users can inspect parts, quantities, taxes, and validity.

### Failure and acceptance checks

| Test condition | Expected result |
|---|---|
| Ambiguous material name | Explain alternatives and request a selection. |
| Expired price | Refresh the price or mark it unresolved. |
| Repeated generation request | Reuse the draft identifier rather than duplicate documents. |

Run each check with a reproducible input and retain actual observations. A plausible narrative is insufficient: compare the returned artifact, state, or numerical result with the expected behavior. Record incomplete checks rather than treating them as passes.

### A concrete acceptance fixture

The following synthetic fixture specifies expected behavior, not an observed production result. Use it as a baseline, then add the failure cases above.

```json
{
  "input": {
    "part": "test-kit",
    "quantity": 10,
    "unit_price": 120,
    "tax_basis": "excluded"
  },
  "expected": {
    "subtotal": 1200,
    "tax": "unresolved",
    "state": "draft"
  }
}
```

The subtotal is known, but taxes remain unresolved. Do not invent a tax rate merely to complete the quotation.
