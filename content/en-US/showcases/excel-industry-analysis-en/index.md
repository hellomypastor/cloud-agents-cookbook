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

The same sales question can require new field, unit, and metric interpretations for each workbook. This case connects that confirmation step to natural-language analysis.

A mapper interprets spreadsheet fields while an analyzer produces constrained aggregation configurations for deterministic execution.

This account is based on showcase material contributed by 阿米. The diagram and responsibility table organize that material; the worked example below is suggested implementation guidance, not a production measurement.

### Result preview

![Regional summary](./assets/result-preview.png)

Illustrative output based on this article’s example; synthetic data, not a product screenshot. One currency · deduplicate orders · subtract refunds.

## Implementation approach

### How the work moves through the product

Test aliases, missing values, mixed units, and duplicates using synthetic sheets. Confirm mappings, version them, and compute results with a deterministic engine.

```mermaid
flowchart LR
  N0["Inspect structure"] --> N1
  N1["Confirm mappings"] --> N2
  N2["Compile the question"] --> N3
  N3["Compute and reconcile"]
```

Each transition should carry its input and result forward. This lets the next step use a specific artifact or observation rather than a conversational claim that work is complete.

### Responsibilities and authoritative facts

| Component | Responsibility |
|---|---|
| Mapper | Field, unit, and metric mappings |
| Analyzer | Question to constrained aggregation |
| Executor | Deterministic computation and validation |

The two roles separate schema interpretation from question compilation, not duplicate arithmetic. A single role may suffice for stable small tables; split responsibilities when mappings and definitions need independent reuse.

### Follow one concrete request

Use a synthetic sales workbook to calculate monthly net revenue by region, including refunds, aliases, and duplicate orders. Separate metric agreement from arithmetic.

1. **Inspect structure.** Read sheet names, headers, and samples. Establish row granularity before interpreting an amount column.
2. **Confirm mappings.** Propose canonical fields, units, and missing-value policies. Resolve ambiguous mappings before freezing a version.
3. **Compile the question.** Produce dimensions, measures, filters, and aggregations. The executor accepts only supported fields and operations.
4. **Compute and reconcile.** Filter, deduplicate, and aggregate deterministically. Return excluded-row counts and cite computed results.

The result needs to preserve the evidence used along the way. When a step lacks data or fails, keep that state visible rather than letting the next step treat it as a successful result.

### A result that can be checked

The following synthetic example makes the expected result concrete. It is an application-level example, not a QCA API request or an observed production record.

```json
{
  "input": {
    "rows": [
      {
        "order": "a",
        "region": "east",
        "gross": 100,
        "refund": 20
      },
      {
        "order": "b",
        "region": "east",
        "gross": 50,
        "refund": 0
      }
    ]
  },
  "expected": {
    "region": "east",
    "net_amount": 130
  }
}
```

Deduplicate orders, subtract refunds per row, then sum by region. This fixture uses one currency; mixed currencies must not be summed without a conversion policy.

### Full walkthrough: from unfamiliar rows to regional net revenue

Suppose the user asks for August net revenue by region. The runnable fixture below contains six rows: a region alias, an exact duplicate, a July order, and an order without a region. This exposes interpretation decisions before a polished report hides them.

### Step 1: ask the Mapper for a proposal

> Identify the order key, business date, region, gross amount, refund, and currency. List definitions, aliases, and exception policies that need confirmation. Do not calculate a final result yet.

Confirm that each row is a complete order rather than a line item. Only then is order-level deduplication valid. Confirm that gross precedes refunds, that East and east mean the same region, and that missing regions must remain unresolved. Save the approved mapping version for subsequent questions; changed units or row granularity require renewed agreement.

### Step 2: compile the question into permitted operations

> Using the approved mapping, calculate August 2026 net revenue by region. Remove exact duplicates, filter business dates, group by canonical region, and sum gross minus refunds. Return a calculation plan and exception policy without executing arbitrary code.

The executor checks supported fields, operations, and dates. This example uses an inclusive August start and exclusive September start, fixes currency to CNY, and excludes unmapped regions with reasons. A repeated identifier with different values is a conflict, not a reason to silently keep the first row.

### Step 3: run deterministic arithmetic

Save and run this Python 3 example using the standard library. CSV text stands in for rows extracted from a workbook. This is an educational calculation example, not original product source; it does not implement Excel upload, model calls, or access controls.

```python
import csv
import io
from decimal import Decimal

source = """order_id,date,region,gross,refund,currency
A,2026-08-01,east,100,20,CNY
B,2026-08-02,East,50,0,CNY
B,2026-08-02,East,50,0,CNY
C,2026-08-03,west,80,10,CNY
D,2026-07-31,east,40,0,CNY
E,2026-08-04,,60,0,CNY
"""
aliases = {"east": "east", "west": "west"}
seen, totals, excluded = {}, {}, []
for row in csv.DictReader(io.StringIO(source)):
    key = row["order_id"]
    if key in seen:
        if seen[key] != row:
            raise ValueError(f"Conflicting duplicate: {key}")
        excluded.append((key, "duplicate"))
        continue
    seen[key] = row
    if not "2026-08-01" <= row["date"] < "2026-09-01":
        excluded.append((key, "outside period"))
        continue
    region = aliases.get(row["region"].strip().lower())
    if region is None:
        excluded.append((key, "unmapped region"))
        continue
    if row["currency"] != "CNY":
        raise ValueError("A currency conversion policy is required")
    gross, refund = Decimal(row["gross"]), Decimal(row["refund"])
    if not gross.is_finite() or not refund.is_finite():
        raise ValueError("Non-finite amount")
    totals[region] = totals.get(region, Decimal(0)) + gross - refund

assert totals == {"east": Decimal(130), "west": Decimal(70)}
assert len(excluded) == 3
print({region: str(value) for region, value in totals.items()})
print(excluded)
```

### Step 4: explain both the totals and the exclusions

The result is east 130 and west 70, totaling 200 CNY. Three of six input rows are excluded: the duplicate B, July order D, and unmapped-region order E. Present exclusions next to the aggregate so that missing data is not mistaken for zero revenue.

> August net revenue for mapped regions is 200 CNY: east 130 and west 70. One exact duplicate, one out-of-period order, and one order without a region were excluded. The unmapped August order contributes another 60 CNY that has not been assigned to a region.

This does not establish that all August revenue is 200. Resolve the missing region and recompute while retaining the previous mapping and exclusion manifest for reconciliation.

### Change three inputs to exercise the boundaries

Change the duplicated B amount to 55: expect a conflict instead of arbitrarily choosing one value. Change C to USD: expect a conversion-policy error instead of a mixed-currency total. Map E to west: expect west 130, total 260, and two exclusions.

The example deliberately assumes ISO dates and known columns. A real workbook reader must also handle multiple sheets, Excel date serials, merged headers, and cell types. Those belong in ingestion and mapping, not hidden inside the report-writing prompt.

## Reuse guidance

Start by reproducing the request above with a known input. Check the resulting state or artifact against the expected output, then add the following failure cases before widening the task scope.

| Failure or ambiguity | Required behavior |
|---|---|
| Tax-inclusive and exclusive amounts | Require an explicit metric definition before combining values. |
| Duplicates and missing regions | Reconcile exclusion counts and totals against a reference sheet. |
| Unsupported metric | Ask for clarification instead of inventing a value. |