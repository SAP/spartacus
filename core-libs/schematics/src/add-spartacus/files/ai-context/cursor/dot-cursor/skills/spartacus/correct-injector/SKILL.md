---
name: correct-injector
description: Use this skill when a Spartacus customization (service override, normalizer, component mapping, config) compiles but doesn't take effect at runtime, or when deciding where to register an override. Covers wrapper-module placement for lazy-loaded features and how to discover them.
---

<!-- spartacus-version: 221121.7.0 -->

# Correct Injector Placement

## Rule

Where you provide a customization (service override, component mapping, config) determines whether it works.

## For lazy-loaded features

Your override MUST go in the **wrapper module** for that feature. If you put it in `AppModule` or `SpartacusFeaturesModule`, the feature's child injector won't see it — the original provider in the child injector takes precedence.

```typescript
@NgModule({
  imports: [CheckoutModule, MyCustomCheckoutExtensionsModule],
})
export class CheckoutWrapperModule {}
```

If a wrapper module doesn't exist in the app for a lazy-loaded feature, create one.

Check existing wrapper modules in `src/app/spartacus/features/` — they follow the pattern `*-wrapper.module.ts`.

## For eager-loaded features

Override goes in the **root injector** (e.g., `AppModule` providers).

## Service override pattern

```typescript
providers: [
  { provide: OriginalSpartacusService, useClass: MyCustomService },
]
```

This provider MUST be in the wrapper module if the feature is lazy-loaded.

## Discovering which features are lazy-loaded

To find every lazy-loaded feature wired up in this app, search the workspace for `provideConfig` calls whose `featureModules.<NAME>.module` is a dynamic `import()`:

```typescript
provideConfig({
  featureModules: {
    checkout: { module: () => import('./checkout-wrapper.module').then((m) => m.CheckoutWrapperModule) },
  },
});
```

Or, at runtime, log the resolved feature map:

```typescript
inject(ConfigurationService).unifiedConfig$
  .subscribe((c) => console.log(Object.keys(c.featureModules ?? {})));
```

Each key is the feature name; the value's `module` is its lazy entry point. The wrapper module those imports point at is where overrides for that feature must go.

## Codebase reference

- Wrapper modules in this app live under `src/app/spartacus/features/`, one per lazy-loaded feature, named `*-wrapper.module.ts` (or `*-feature.module.ts`).
