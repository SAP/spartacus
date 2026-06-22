# Backend URL Configuration

Spartacus reads backend URLs at runtime from HTML `<meta>` tags in your `index.html`. The CCv2 platform replaces the placeholder values at release time — no rebuild or file mutation is needed.

The following URLs can be configured this way:

| Meta tag name | Placeholder value | Configures |
|---|---|---|
| `occ-base-url` | `OCC_BASE_URL_VALUE` | OCC API base URL (preferred, new deployments) |
| `occ-backend-base-url` | `OCC_BACKEND_BASE_URL_VALUE` | OCC API base URL (legacy, kept for backward compatibility) |
| `media-backend-base-url` | `MEDIA_BACKEND_BASE_URL_VALUE` | Media / CDN base URL |
| `bff-base-url` | `BFF_BASE_URL_VALUE` | Vivaldi BFF base URL |

## Setting up your `index.html`

Add the meta tags for the URLs you need inside the `<head>` of your `index.html`:

```html
<head>
  <!-- OCC backend — choose one: -->

  <!-- Preferred (new deployments): -->
  <meta name="occ-base-url" content="OCC_BASE_URL_VALUE" />

  <!-- Legacy (existing CCv2 deployments — still fully supported): -->
  <meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />

  <!-- Media / CDN (optional — omit if media is served from the same origin as OCC): -->
  <meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />

  <!-- Vivaldi BFF (optional — only needed when using BFF-backed features): -->
  <meta name="bff-base-url" content="BFF_BASE_URL_VALUE" />
</head>
```

> **Note:** If both `occ-backend-base-url` and `occ-base-url` are present, `occ-backend-base-url` takes precedence. For new deployments, use only `occ-base-url`.

The meta tag mechanism is enabled automatically by `BaseCoreModule` — no additional Angular module imports are required.

## Alternative: `provideConfig()`

You can also set backend URLs directly in your Angular providers. This is useful for local development or when meta tags are not available:

```ts
// app.config.ts (standalone) or app.module.ts
import { provideConfig } from '@spartacus/core';

provideConfig({
  backend: {
    occ:   { baseUrl: 'https://my-commerce.example.com' },
    media: { baseUrl: 'https://media.example.com' },        // optional
    bff:   { baseUrl: 'https://bff.example.com/bff/api' },  // optional
  },
})
```

Values set via `provideConfig()` are overridden by meta tag values when both are present.

## Local development

For local development, set the URLs via environment variables in `.env-cmdrc` and read them in your `environment.ts`:

```jsonc
// .env-cmdrc
{
  "dev": {
    "CX_BASE_URL": "https://localhost:9002",
    "CX_BFF_BASE_URL": "http://localhost:8483/bff/api"
  }
}
```

```ts
// environment.ts
export const environment: Environment = {
  occBaseUrl: buildProcess.env.CX_BASE_URL,
  bffBaseUrl: buildProcess.env.CX_BFF_BASE_URL ?? '/bff/api',
  // ...
};
```

When `CX_BFF_BASE_URL` is not set, the BFF base URL defaults to `/bff/api`, which the Angular dev server proxies to `https://localhost:8482` via `proxy.conf.json`.
