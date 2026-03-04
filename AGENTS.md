# Spartacus

Spartacus is an Angular meta-framework for SAP Commerce Cloud e-commerce storefronts. It's a monorepo using npm workspaces + Nx.

## Directory Quick Reference

### Libraries
- `feature-libs/` - Optional features for standard SAP Commerce backend (cart, checkout, order, etc.)
- `integration-libs/` - Features requiring special backend addons (cdc, cds, digital-payments, opf)
- `projects/core/` - Core non-UI lib
- `projects/storefrontlib/` - Core UI lib and CMS engine and some components
- `projects/storefrontstyles/` - Core styles lib and some components' styles
- `core-libs/setup/` - Core setup utilities lib
- `core-libs/setup/ssr` - Core SSR lib

### Demo App
- `projects/storefrontapp/`

### E2E Tests
- `projects/storefrontapp-e2e-cypress/` - E2E Browser tests (Cypress)
- `projects/ssr-tests/` - E2E SSR tests (Node)

### Other
- `tools/eslint-rules/`
- `ci-scripts/`
- `.github/workflows/`

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

- **AVOID** `private` access modifiers and non-exported members. Everything should be extendable by customers, except when explicitly marked as "internal API"
