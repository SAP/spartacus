# Troubleshooting — "My Spartacus Config Isn't Applied"

When a `provideConfig` value isn't taking effect, it's almost always one of three things. Inspect the live config first, then walk the checklist.

## 1. Inspect the merged runtime config

```typescript
import { inject } from '@angular/core';
import { ConfigurationService } from '@spartacus/core';

inject(ConfigurationService).unifiedConfig$.subscribe((cfg) => console.log(cfg));
```

`unifiedConfig$` emits the deep-merged result of every `provideConfig` and `provideDefaultConfig` call resolved so far. Lazy-loaded modules contribute config chunks only after they are loaded, and `unifiedConfig$` emits again every time a lazy module loads. So log at the moment the broken consumer runs (component constructor, `ngOnInit`, service usage), not just at app startup.

> Lazy loading is what makes config timing tricky here — see the `lazy-loading` skill for how Spartacus loads feature modules on demand.

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

If you put it in a lazy wrapper module, it appears in the unified config only after that chunk loads. Force-load every lazy feature and re-log; if the value now appears, it was inside that lazy module. The simplest trigger is to navigate to a CMS page that uses the feature, but from devtools you can also force every feature module to load (verify this in your app before relying on it):

```typescript
import { firstValueFrom } from 'rxjs';
import { CmsConfig, FeatureModulesService } from '@spartacus/core';

async function forceLoadAllFeatureModules(
  cmsConfig: CmsConfig,
  featureModulesService: FeatureModulesService
): Promise<void> {
  const featureModules = cmsConfig.featureModules ?? {};
  const promises: Promise<unknown>[] = [];
  for (const [name, config] of Object.entries(featureModules)) {
    if (typeof config === 'string' || !(config as any)?.module) continue;
    promises.push(
      firstValueFrom(featureModulesService.resolveFeature(name)).catch((err) =>
        console.warn(`Failed to load ${name}:`, err)
      )
    );
  }
  await Promise.all(promises);
}

// In an injection context (e.g. a devtools breakpoint or a throwaway component):
await forceLoadAllFeatureModules(inject(CmsConfig), inject(FeatureModulesService));
```

Once everything is loaded, decide whether lazy placement is actually right:

- Lazy placement is legitimate when **every consumer of the value lives in the same lazy chunk** — the canonical cases are `cmsComponents` mappings and `backend.occ.endpoints`, but the rule applies to any feature-scoped section you add (a feature-specific `featureToggles` subtree, a custom config namespace owned by that feature, etc.).
- Move it to an eager module if it's read app-wide — e.g. `i18n`, `routing`, app-level `featureToggles`, `siteContext`, `auth`, `view` — so the value is present from bootstrap and not just after a particular chunk happens to load.

## 3. Which exact module ran last?

If two chunks have the same key and you can't tell which is winning, make each provider observable. The merge order is provider-list order at runtime, which usually mirrors `imports: [...]` order in the parent module.

The easiest approach is to swap `provideConfig(value)` for `provideConfigFactory(factory)` temporarily, so you can log (or breakpoint) as each chunk contributes:

```typescript
import { provideConfigFactory } from '@spartacus/core';

provideConfigFactory(() => {
  console.log('[OCC config from feature X]');
  return { backend: { occ: { endpoints: { product: '...' } } } };
});
```

The chunk that logs **last** is the one that wins for the shared key.
