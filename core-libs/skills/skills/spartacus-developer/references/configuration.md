# Configuration System

## Rule

In your app, ALWAYS use `provideConfig()`. NEVER use `provideDefaultConfig()` — that is for Spartacus library internals only.

## How it works

Spartacus deep-merges every config chunk into a single runtime `Config`. `provideConfig` values always win over `provideDefaultConfig` values. Arrays are overwritten, not merged.

## Where to put `provideConfig`

Default to the **root injector** (an eagerly imported module). That is the only place where the config is guaranteed to be available before any consumer reads it.

A config chunk is fine to declare in a lazy-loaded wrapper module **if and only if everything that reads it lives inside that same lazy chunk**. Values placed in a lazy chunk are merged into the root `Config` only at the moment the chunk loads, so the root and other lazy modules can't read them until then. Facades cross module boundaries; config does not.

The two canonical examples are `cmsComponents` mappings and `backend.occ.endpoints` — both are consumed only by code inside the chunk that provides them (the CMS component the mapping points at, the adapter that calls the endpoint). The same principle covers anything else you add that's scoped to one lazy feature: a feature-specific subtree under `featureToggles`, a custom config namespace your feature owns, OCC URL parameters that only one feature's connector uses, and so on. If the consumer is in the same chunk, lazy placement is fine.

Everything that's read app-wide — `i18n`, `routing`, app-level `featureToggles`, `siteContext`, `auth`, `view`, etc. — must be eager. A lazy chunk means the value is absent during bootstrap and absent on the first render that needs it.

## OCC endpoint configuration

```typescript
provideConfig({
  backend: {
    occ: {
      endpoints: {
        product: 'products/${productCode}?fields=DEFAULT,customField',
      }
    }
  }
})
```

## CMS component mapping

```typescript
provideConfig({
  cmsComponents: {
    ProductReviewComponent: {
      component: MyCustomComponent,
    },
  },
})
```

## i18n configuration

```typescript
provideConfig({
  i18n: {
    resources: myTranslations,
    chunks: myTranslationChunks,
  },
})
```

## Anti-pattern

```typescript
// ❌ provideDefaultConfig is reserved for Spartacus library code.
// In an app you build, library defaults will sit at the SAME merge level
// as your override, so the merge result is undefined and depends on
// provider order.
@NgModule({
  providers: [
    provideDefaultConfig({
      backend: { occ: { endpoints: { product: 'products/${productCode}?fields=FULL' } } },
    }),
  ],
})
export class AppOccConfigModule {}
```

```typescript
// ✅ provideConfig — guaranteed to win over any provideDefaultConfig.
@NgModule({
  providers: [
    provideConfig({
      backend: { occ: { endpoints: { product: 'products/${productCode}?fields=FULL' } } },
    }),
  ],
})
export class AppOccConfigModule {}
```

## Troubleshooting — "my config isn't applied"

When a config value isn't taking effect at runtime, see [troubleshooting.md](troubleshooting.md) for the full debug flow (live-config logging plus the three common root causes).

## Source reference (in `node_modules/@spartacus/*`)

- `provideConfig`, `provideDefaultConfig`, `Config` from `@spartacus/core`.
- Example default config (OCC user endpoints) ships inside `@spartacus/core`.

## Supplemental Information

- [troubleshooting.md](troubleshooting.md) — step-by-step debug flow when an expected config value isn't taking effect at runtime.
