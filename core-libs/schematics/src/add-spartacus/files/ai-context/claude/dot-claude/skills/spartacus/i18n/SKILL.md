---
name: i18n
description: Use this skill when adding user-facing strings, translation chunks, or wiring up `cxTranslate` in a Spartacus app. Covers eager `provideConfig({ i18n: ... })` registration and lazy-loaded translation chunks via `i18n.backend.loadPath`.
---

<!-- spartacus-version: 221121.7.0 -->

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

For larger dictionaries or per-feature translations, configure a backend loader so chunks load on demand:

```typescript
provideConfig({
  i18n: {
    backend: {
      loadPath: 'assets/i18n-assets/{{lng}}/{{ns}}.json',
    },
    chunks: myTranslationChunks,
    fallbackLang: 'en',
  },
})
```

Spartacus's `TranslationService` calls `i18next.loadNamespaces` on demand, so the chunk JSON is fetched only when a key from that namespace is rendered. Combine with the schematics-generated translation assets, or write your own loader.

📖 [Internationalization](https://github.tools.sap/I839916/spartacus-docs-from-portal/blob/main/docs/storefront-development-guide/internationalization-i18n-775e61e.md?plain=1#L192) (covers lazy loading in detail — plain markdown for tooling/agents).

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

## Codebase reference

- `TranslatePipe` (`cxTranslate`), `TranslationService`, `I18nConfig` from `@spartacus/core`.
- Default translation chunks ship from `@spartacus/assets`.
