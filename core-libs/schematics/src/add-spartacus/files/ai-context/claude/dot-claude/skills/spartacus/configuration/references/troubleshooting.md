# Troubleshooting — "My Spartacus Config Isn't Applied"

When a `provideConfig` value isn't taking effect, it's almost always one of three things. Inspect the live config first, then walk the checklist.

## 1. Inspect the merged runtime config

```typescript
import { inject } from '@angular/core';
import { ConfigurationService } from '@spartacus/core';

inject(ConfigurationService).unifiedConfig$.subscribe((cfg) => console.log(cfg));
```

`unifiedConfig$` emits the deep-merged result of every `provideConfig` and `provideDefaultConfig` call that has been resolved so far. Lazy-loaded modules contribute only after they are loaded, so log the value at the moment the broken consumer runs (component constructor, ngOnInit, service usage), not just at app startup.

## 2. Walk the three common causes

### a. The key isn't in the merged config at all

Your `provideConfig` is not running — the providing module is not imported, or it's tree-shaken because nothing references it. Make sure the wrapper module is imported by `AppModule` (or by the lazy module the app actually loads). If you grep for the providing module name and find no `imports: [...YourConfigModule...]` site, that's the answer.

### b. A different chunk overrides yours under the same deep key

Two `provideConfig` calls with the same deep key — the one whose multi-provider runs last wins. Search the workspace for the key (e.g. `endpoints: {...product`) and decide which copy is canonical.

Common culprits:
- A schematics-generated config module (e.g. `spartacus-features.module.ts`) that you forgot was setting the same key.
- An older copy of the config left over after a refactor.
- A library you depend on that ships its own `provideConfig` for the same key.

### c. The value lives behind a lazy boundary

If you put it in a lazy wrapper module, it appears in the unified config only after that chunk loads. Force-load every lazy feature (navigate to a CMS page that triggers it, or trigger lazy loading from devtools) and re-log; if the value now appears, it was inside that lazy module. Decide whether that's actually the right placement:

- Lazy placement is legitimate when **every consumer of the value lives in the same lazy chunk** — the canonical cases are `cmsComponents` mappings and `backend.occ.endpoints`, but the rule applies to any feature-scoped section a customer adds (feature-specific `featureToggles` subtree, custom config namespace owned by that feature, etc.).
- Move it to an eager module if it's read app-wide — e.g. `i18n`, `routing`, app-level `featureToggles`, `siteContext`, `auth`, `view` — so the value is present from bootstrap and not just after a particular chunk happens to load.

## 3. Which exact module ran last?

If two chunks have the same key and you can't tell which is winning, set a temporary breakpoint on `provideConfig`'s factory or add a `console.log('[OCC config from feature X]')` next to each provider. The merge order is provider-list order at runtime, which usually mirrors `imports: [...]` order in the parent module.
