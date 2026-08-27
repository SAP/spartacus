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

3. If `node_modules/@spartacus/<feature>` is missing, Spartacus may still offer the feature as an installable library — it's just not added to this app yet. Inspect the installable feature list in the schematic schema:

   ```bash
   cat node_modules/@spartacus/schematics/src/add-spartacus/schema.json | jq '.properties.features.items.enum'
   ```

   If the feature is listed, install it via `ng add @spartacus/schematics --features <FeatureName>` (or the feature lib's own `ng add`, e.g. `ng add @spartacus/order`) and follow the official setup docs. After install it appears under `node_modules/@spartacus/` and `src/app/spartacus/features/`.

## If the feature exists

**Extend or customize it** rather than building from scratch (see [cms-component-wiring.md](./cms-component-wiring.md) and [extending-spartacus-classes.md](./extending-spartacus-classes.md) for how).

## If the feature doesn't exist

Build it, reaching for the reference topic that matches each part of the task — e.g. [backend-communication.md](./backend-communication.md) for data access, [cms-component-wiring.md](./cms-component-wiring.md) for placement, [lazy-loading.md](./lazy-loading.md) for a new feature module.
