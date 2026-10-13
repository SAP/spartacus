# Spartacus
Spartacus is an Angular meta-framework for building e-commerce storefronts with SAP Commerce Cloud `OCC` backend.

## Tech stack
Monorepo: `npm workspaces` and `Nx`

## Directory Quick Reference

### Libraries
- `core-libs/core/` - Core non-UI lib
- `core-libs/storefront/` - Core UI lib and CMS engine and some components
- `core-libs/styles/` - Core styles lib and some components' styles
- `core-libs/setup/` - Core setup utilities lib
- `core-libs/setup/ssr` - Core SSR lib
- `feature-libs/` - Optional features for standard SAP Commerce backend (cart, checkout, order, etc.)
- `integration-libs/` - Features requiring special backend addons (cdc, cds, digital-payments, opf)


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

## Vitest Tests
### Running tests
```bash
nx test-vitest <library-name>                                                                          # Single library (e.g., nx test-vitest user)
npx vitest run --config <library-root>/vitest.config.ts <path-to-spec-file>                           # Single file
```

### Before committing
- Run with `--detect-async-leaks` once to catch unresolved async operations
- Run with `--sequence.shuffle` a few times to catch order-dependent failures

### Authoring rules
- Tests within the same file must not share mutable state; if shared state is unavoidable, reset it in `afterEach`
- Prefer `firstValueFrom` (rxjs) over subscriptions in tests — subscriptions can leak and make async assertions harder to reason about

## Accessibility standards
When implementing accessibility-related changes, follow the SAP accessibility
standards documented https://pages.github.tools.sap/product-standards/portal/docs/requirements/Accessibility/.
This page contains links for the different accessiblity standards. Navigate to those when working on one.