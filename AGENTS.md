# Spartacus

Angular meta-framework for SAP Commerce Cloud e-commerce storefronts. Monorepo using npm workspaces + Nx.

## Critical Rules

- **NEVER** add/change `peerDependencies` in library `package.json` files — causes breaking changes for customers. Add `devDependencies` to root `package.json` only if truly needed for development.
- **NEVER** introduce breaking changes without feature toggles (since v2211.19, no SemVer). If you must change behavior, styling, or public API, add a feature toggle.
- **ALWAYS** export public APIs through `public_api.ts` files via barrel files. Never export APIs explicitly marked as internal.

## Directory Quick Reference

| Path | What belongs there |
|------|--------------------|
| `feature-libs/` | Optional features for standard SAP Commerce backend (cart, checkout, order, etc.) |
| `integration-libs/` | Features requiring special backend addons (cdc, cds, digital-payments, opf) |
| `core-libs/setup/` | Core setup utilities, SSR engine |
| `projects/core/` | Core non-UI library |
| `projects/storefrontlib/` | UI-related core, CMS engine |
| `projects/schematics/` | Installation and migration schematics |
| `projects/storefrontapp/` | Demo application |

## Common Commands

```bash
# Dev
npm run start          # B2C dev server
npm run start:b2b      # B2B dev server

# Build (always build libs before app)
npm run build:libs     # All libraries
npm run build          # Demo app (requires libs built first)

# Test
npm run test:libs              # All library tests
nx test <library-name>         # Single library (e.g., nx test storefrontlib)
npm run test:all-schematics    # All schematics tests

# Lint & Format
npm run lint
npm run prettier:fix

# E2E
npm run e2e:run
npm run e2e:run:b2b

# SSR E2E
npm run build:ssr:local-http-backend # special build prerequisite before SSR E2E
npm run test:sst
```

## Library Development

Each library has:
- `public_api.ts` — public exports via barrel files tree
- `ng-package.json` — Angular package config
- `schematics/` — feature-specific installation schematics
- `assets/` — translations (if applicable)

Multi-entry point libraries (checkout, cart, product): each entry point has own `public_api.ts`. Import as `@spartacus/<lib>/<entry-point>`.

After creating/modifying libraries, run:
```bash
npm install                # Update package-lock.json
npm run config:update      # Update tsconfig paths
```

## Schematics

- **Installation schematics** (`ng add @spartacus/schematics`): delegates to feature-specific schematics in `<lib>/schematics/`
- **Migration schematics**: in `projects/schematics/src/migrations/<version>/`
- **Shared utilities**: in `projects/schematics/src/shared/`
- **Library configs**: in `projects/schematics/src/shared/lib-configs/`

When adding schematics config, add to `SCHEMATICS_CONFIGS` array in `projects/schematics/src/shared/lib-configs/schematics-config-mappings.ts`.

## When to Read Extended Docs

| Situation | Read this |
|-----------|-----------|
| Creating a new Spartacus library | `docs/libs/creating-lib.md` |
| Writing/debugging schematics, testing migrations | `projects/schematics/README.md` |

## Coding Best Practices
-

## Troubleshooting
-

## Common Mistakes to Avoid
-
