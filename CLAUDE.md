# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SAP Spartacus (Composable Storefront) — an Angular-based e-commerce storefront framework for SAP Commerce Cloud. It's a monorepo managed with **Nx** and **npm workspaces**, containing 3 core projects, 21 feature libraries, and 14 integration libraries.

## Build Commands

```bash
# Build entire project (CSR)
npm run build

# Build all libraries
npm run build:libs

# Build a specific library
nx build cart --configuration production

# SSR build
npm run build:ssr

# Build Angular schematics
npm run build:schematics
```

## Development

```bash
# Serve B2C storefront (dev)
npm start

# Serve B2B storefront
npm start:b2b

# SSR development
npm run dev:ssr
```

## Testing

```bash
# Run all unit tests
npm test

# Run a single library's tests
nx test cart --code-coverage

# Run a single test file
nx test cart --testFile="base/core/connectors/cart.connector.spec.ts"

# Watch mode for a library
nx test cart --watch

# Test all libraries in parallel with coverage
npm run test:libs

# Schematics tests for a specific library
npm --prefix feature-libs/cart run test:schematics

# E2E tests
npm run e2e:run
```

Coverage threshold for schematics tests is 90% (statements, branches, functions, lines).

## Lint & Format

```bash
npm run lint          # Lint all TypeScript
npm run lint:styles   # Lint SCSS
npm run prettier      # Check formatting
npm run prettier:fix  # Fix formatting
npm run i18n-lint     # Lint i18n templates
```

## Monorepo Structure

```
projects/           # Core projects
  core/             # @spartacus/core — framework services, models, OCC
  storefrontlib/    # @spartacus/storefront — UI components
  storefrontapp/    # Demo application
  schematics/       # Angular CLI schematics for installation
  storefrontstyles/ # Global SCSS

feature-libs/       # 21 modular feature libraries (cart, checkout, user, order, etc.)
integration-libs/   # 14 third-party integrations (cdc, cdp, cds, opf, etc.)
core-libs/setup/    # @spartacus/setup — SSR setup
```

All `@spartacus/*` package paths are aliased in `tsconfig.base.json` pointing to each library's `public_api.ts`.

## Feature Library Internal Structure

Each feature library follows a layered architecture:

```
feature-libs/<name>/
  <subfeature>/
    root/           # Lazy-load root module, config, context tokens, models
    core/           # Business logic: connectors/, facade/, services/, store/ (NgRx)
    components/     # Angular components (one folder per component)
    occ/            # OCC API adapters (implements adapters from core/)
    assets/         # Static assets
    styles/         # SCSS
  public_api.ts     # Library entry point — exports from root/ and core/
  project.json      # Nx project config
```

Key sub-directories within `core/`:
- `connectors/` — abstract adapters (interface only)
- `facade/` — abstract `@Injectable` services using `facadeFactory`
- `store/` — NgRx: `actions/`, `effects/`, `reducers/`, `selectors/`

## Key Architectural Patterns

### Module Layering
Every feature has 3 module layers:
1. **Root module** — imported eagerly; registers lazy-loaded feature routes and CMS component mappings via `provideDefaultConfig()`
2. **Core module** — lazy-loaded; provides NgRx store, effects, connectors
3. **Components module** — lazy-loaded; declares Angular components

### Facade Pattern
Facades are abstract classes with `providedIn: 'root'` using `facadeFactory`. This enables lazy loading of feature implementations while keeping a stable public API:

```typescript
@Injectable({
  providedIn: 'root',
  useFactory: () => facadeFactory({ facade: MyFacade, feature: MY_FEATURE, methods: [...] }),
})
export abstract class MyFacade { ... }
```

### CMS-Driven Components
Components are mapped to CMS component types via `featureModules` config in the root module. The lazy-loading system resolves the Angular module to load based on which CMS component is rendered on the page.

### OCC Layer
`core/` defines adapter interfaces; `occ/` provides OCC-specific implementations. This separation allows swapping backends without touching business logic.

## Naming Conventions

- **Public API entry point**: `public_api.ts` (underscore — NOT `public-api.ts`)
- **Component selector prefix**: `cx-` (e.g., `cx-cart-details`)
- **Feature constants**: defined in `<feature>/root/feature-name.ts` (e.g., `CART_BASE_FEATURE`)
- **Script names in package.json**: no kebab-case (e.g., `build:myfeature`, not `build:my-feature`)
- **Library folder names**: kebab-case

## Adding a New Feature Library

1. Generate with `nx g @schematics/angular:library my-feature --prefix=cx` then move to `feature-libs/`
2. Rename `public-api.ts` → `public_api.ts` and update `ng-package.json` `entryFile`
3. Add to root `package.json` workspaces array and run `npm install`
4. Add `build:myfeature` and `test:myfeature` scripts to root `package.json`
5. Create schematics in `feature-libs/<lib>/schematics/` for Angular CLI installation support

## Environment Configuration

Multiple backend environments are defined in `.env-cmdrc`. Key environments:
- `dev` / `ci` — SAP-hosted development/CI servers
- `local` / `local-http` — local HTTPS/HTTP development
- `ccv2` — Commerce Cloud v2
- Feature-specific: `cdc`, `opf`, `cpq`, `punchout`, `segment-refs`

## Branch & Commit Conventions

This project uses date-based versioning (e.g., `221121.9.0`). Branch names follow `feature/CXSPA-<ticket>` format. The `commit` skill derives the ticket number from the branch name automatically.
