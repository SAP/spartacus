---
name: existing-features
description: Use this skill before building any feature in a Spartacus app — Spartacus may already ship the feature out of the box. Covers how to inspect installed `@spartacus/*` packages, configured feature modules, and the `@spartacus/schematics` installable feature list.
---

<!-- spartacus-version: 221121.7.0 -->

# Check Existing Features

## Rule

Before implementing a feature, ALWAYS check whether Spartacus already provides it out of the box.

## Where to look

1. `node_modules/@spartacus/` — every installed Spartacus package. List them with:

   ```bash
   ls node_modules/@spartacus/
   ```

   Then read each package's `README.md` and `package.json#description` for the feature surface it ships.

2. `src/app/spartacus/features/` — feature modules already configured in this app. If a `*-feature.module.ts` exists, the feature is already wired up; extend it instead of starting fresh.

3. If `node_modules/@spartacus/<feature>` is missing, the feature lib may still ship — it's just not installed in this app yet. Inspect the installable feature list in the schematic schema:

   ```bash
   cat node_modules/@spartacus/schematics/src/add-spartacus/schema.json | jq '.properties.features.items.enum'
   ```

   If the feature is listed, install it via `ng add @spartacus/schematics --features <FeatureName>` (or the feature lib's own `ng add`, e.g. `ng add @spartacus/order`) and follow the official setup docs. After install it appears under `node_modules/@spartacus/` and `src/app/spartacus/features/`.

## If the feature exists

**Extend or customize it** rather than building from scratch. Use CMS component mapping to override specific components, or extend the existing service/facade.

## If the feature doesn't exist

Build it following all the other skills (backend communication pipeline, CMS wiring, etc.).
