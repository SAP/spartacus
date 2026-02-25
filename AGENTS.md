# Spartacus

Angular meta-framework for SAP Commerce Cloud e-commerce storefronts. Monorepo using npm workspaces + Nx.

## Critical Rules

- **AVOID** add/change `peerDependencies` in library `package.json` files — causes breaking changes for customers. Add `devDependencies` to root `package.json` only if truly needed for development.
- **AVOID** introducing breaking changes. If you must change behavior, styling, or public API, wrap it with a feature toggle (`cxFeature` in HTML,  `inject(FeatureToggles)` in TS)
- **ALWAYS** export public APIs through `public_api.ts` files via barrel files
- **AVOID** `private` access modifiers in classes. We want classes to be extendable by customers
- **AVOID** exporting APIs explicitly marked as internal

## Directory Quick Reference

| Path | What belongs there |
|------|--------------------|
| `feature-libs/` | Optional features for standard SAP Commerce backend (cart, checkout, order, etc.) |
| `integration-libs/` | Features requiring special backend addons (cdc, cds, digital-payments, opf) |
| `core-libs/setup/` | Core setup utilities |
| `projects/core/` | Core non-UI library |
| `projects/storefrontlib/` | UI-related core, CMS engine and some components |
| `projects/storefrontstyles/` | Styles-related core and some  components' styles |
| `projects/storefrontapp/` | Demo application |
| `projects/storefrontapp-e2e-cypress/` | E2E Browser tests (Cypress) |
| `tools/eslint-rules/` | Custom ESLint rules |
| `ci-scripts/` | Scripts used by CI to check peer deps, feature toggles, unit tests, E2E |
| `.github/workflows/` | GitHub Actions CI/CD pipelines |

## Common Commands

```bash
# Dev
npm run start             # B2C dev server
npm run start:b2b      # B2B dev server

# Build (always build libs before app)
npm run build:libs     # All libraries
npm run build          # Demo app (requires libs built first)

# Jasmine Test Angular libs
npm run test:libs              # All library tests
nx run <library-name>:test         # Single library (e.g., nx run storefrontlib:test)
nx run <library-name>:test --include="**/<spec-filename>" # Specific test file

# Lint & Format
npm run lint
npm run prettier:fix

# E2E
npm run e2e:run
npm run e2e:run:b2b
```


## When to Read Extended Docs

| Situation | Read this |
|-----------|-----------|
| Creating a new Spartacus library | `docs/libs/creating-lib.md` |
| Library structure | `docs/libs/library-structure.md` |

## Coding Best Practices
-

## Troubleshooting
-

## Common Mistakes to Avoid
-
