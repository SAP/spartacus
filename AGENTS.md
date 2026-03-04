# Spartacus

Spartacus is Angular meta-framework for SAP Commerce Cloud e-commerce storefronts. Monorepo us using npm workspaces + Nx.

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

## Library structure
Described in `docs/libs/library-structure.md`

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

## Critical Rules

- **AVOID** `private` access modifiers in classes. Everything should be extendable by customers, except when explicitly marked as "internal API"
