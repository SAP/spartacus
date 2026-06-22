# Backend URL Configuration

Spartacus reads backend URLs at runtime from HTML `<meta>` tags in your `index.html`.
On CCv2, the platform replaces the placeholder values at deploy time — no rebuild or
file mutation is required. This avoids PWA Service Worker integrity failures and CDN
cache invalidation caused by mutating built files.

The mechanism is activated automatically by `BaseCoreModule` (included in every
Spartacus application via `SpartacusModule`). No additional imports are needed.

## Supported meta tags

| Meta tag name | Placeholder value | Configures |
|---|---|---|
| `occ-base-url` | `OCC_BASE_URL_VALUE` | OCC API base URL (preferred for new deployments) |
| `occ-backend-base-url` | `OCC_BACKEND_BASE_URL_VALUE` | OCC API base URL (legacy — still supported for backward compatibility) |
| `media-backend-base-url` | `MEDIA_BACKEND_BASE_URL_VALUE` | Media / CDN base URL |
| `bff-base-url` | `BFF_BASE_URL_VALUE` | Vivaldi BFF base URL (only needed when using BFF-backed features) |

## Setting up `index.html`

Add the meta tags you need inside `<head>`:

```html
<head>
  <!-- OCC backend (choose one): -->

  <!-- Preferred for new deployments: -->
  <meta name="occ-base-url" content="OCC_BASE_URL_VALUE" />

  <!-- Legacy — use only if your CCv2 pipeline already substitutes this placeholder: -->
  <!-- <meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" /> -->

  <!-- Media / CDN (omit if media is served from the same origin as OCC): -->
  <meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />

  <!-- Vivaldi BFF (omit if not using BFF-backed features): -->
  <meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
</head>
```

> **Note on OCC tag precedence:** if both `occ-base-url` and `occ-backend-base-url` are
> present, `occ-base-url` takes precedence. Use only one.

The placeholder strings (`OCC_BASE_URL_VALUE`, `BFF_BASE_URL_VALUE`, etc.) are replaced
by the CCv2 deployment platform with the real URLs at release time.

## Accessing the BFF base URL in code

Once the `bff-base-url` meta tag is set, the URL is available via the standard Spartacus
config injection:

```ts
import { OccConfig, inject } from '@spartacus/core';

const config = inject(OccConfig);
const bffBaseUrl = config.backend?.bff?.baseUrl; // e.g. 'https://my-store.example.com/bff/api'
```

## Alternative: `provideConfig()`

You can also provide backend URLs directly in your Angular providers. This is the
recommended approach for **local development** or environments where meta tag
substitution is not available:

```ts
import { provideConfig } from '@spartacus/core';

provideConfig({
  backend: {
    occ:   { baseUrl: 'https://my-commerce.example.com' },
    media: { baseUrl: 'https://media.example.com' },       // optional
    bff:   { baseUrl: 'https://bff.example.com/bff/api' }, // optional, BFF only
  },
})
```

> **Important:** `provideConfig()` and the meta tag factories both contribute to the
> same Spartacus config layer (`ConfigChunk`). The last one registered wins. In a
> standard Spartacus setup, `SpartacusModule` (which registers the meta tag factories)
> is imported before your application providers, so **your `provideConfig()` call takes
> precedence over the meta tag**. If you want the meta tag to win at runtime (e.g. for
> CCv2 deployments), do not provide the same URL via `provideConfig()` in your
> production build.
