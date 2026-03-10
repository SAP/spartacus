# Spartacus
Spartacus is an Angular meta-framework for building e-commerce storefronts with SAP Commerce Cloud `OCC` backend.

## Tech stack
Monorepo: `npm workspaces` and `Nx`

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

## Jasmine Test Angular libs
### All library tests
See `ci-scripts/unit-tests.sh`

### Specific tests
```bash
## Add `--no-watch --source-map --code-coverage --browsers ChromeHeadless`
nx run <library-name>:test         # Single library (e.g., nx run storefrontlib:test)
nx run <library-name>:test --include="**/<spec-filename>" # Specific test file
```