---
name: i18n
description: Use this skill when adding user-facing strings, translation chunks, or wiring up `cxTranslate` in a Spartacus app. Covers eager `provideConfig({ i18n: ... })` registration and lazy-loaded translation chunks via `i18n.backend.loader`.
---

# Internationalization (i18n)

## Rule

NEVER hardcode user-facing strings in templates. Use the `cxTranslate` pipe with a translation key:

```html
{{ 'myFeature.myLabel' | cxTranslate }}
{{ 'myFeature.greeting' | cxTranslate: { name: user.name } }}
```

Hardcoded strings can't be translated and break the moment a second language is enabled. There is no compile-time error — the regression is silent.

## Registering translations (eager)

Feature modules register translations via `provideConfig`. The simplest form ships everything eagerly with the root bundle:

```typescript
export const myTranslations = {
  myFeature: {
    myLabel: 'My Label',
    greeting: 'Hello, {{name}}!',
  },
};

export const myTranslationChunks = {
  myFeature: ['myFeature'],
};

provideConfig({
  i18n: {
    resources: { en: { myFeature: myTranslations.myFeature } },
    chunks: myTranslationChunks,
  },
})
```

`chunks` maps a namespace key (`myFeature.myLabel` → `myFeature`) to the chunk name that holds it. With eager registration the resources are bundled into the root JS, which is fine for a few small dictionaries.

## Lazy-loaded translations

For larger dictionaries or per-feature translations, configure a backend `loader` so chunks load on demand. The `loader` returns a Promise of the chunk's resources, and a dynamic `import()` lets the bundler code-split each translation file:

```typescript
provideConfig({
  i18n: {
    backend: {
      loader: (lng, chunk) =>
        import(`../assets/i18n-assets/${lng}/${chunk}.json`),
    },
    chunks: myTranslationChunks,
    fallbackLang: 'en',
  },
})
```

Spartacus's `TranslationService` invokes the loader on demand, so a chunk is imported only when a key from that namespace is first rendered. Prefer `backend.loader` over `backend.loadPath` for translations bundled with your app — it's more performant, especially under SSR. `loadPath` (an HTTP path with `{{lng}}`/`{{ns}}` placeholders) is recommended only for loading translations from an external server.

## Anti-pattern

```html
<!-- ❌ Hardcoded user-facing strings — cannot be translated, no chunk loading -->
<button>Add to wishlist</button>
<h2>Recently viewed products</h2>
```

```html
<!-- ✅ cxTranslate pipe + translation chunk -->
<button>{{ 'wishlist.addAction' | cxTranslate }}</button>
<h2>{{ 'recentlyViewed.title' | cxTranslate }}</h2>
```

## Debugging translations

If a key shows up untranslated (renders the raw key, or the fallback), turn on i18n debug logging — it logs every lookup, which chunks load, and missing keys to the console:

```typescript
provideConfig({ i18n: { debug: true } }) // never enable in production
```

To test a single key resolves at runtime:

```typescript
inject(TranslationService).translate('myFeature.myLabel').subscribe(console.log);
```

## Source reference (in `node_modules/@spartacus/*`)

- `TranslatePipe` (`cxTranslate`), `TranslationService`, `I18nConfig` from `@spartacus/core`.
- Default translation chunks ship from `@spartacus/assets` and `@spartacus/*/assets`.
