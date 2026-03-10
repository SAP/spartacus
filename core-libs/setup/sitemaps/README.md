# Sitemap Module for Spartacus SSR

Server-side sitemap generation for Spartacus applications using SSR.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Angular SSR (first render)                      │
│                                                                     │
│  APP_INITIALIZER ─▶ SitemapConfigExtractorService (orchestrator)    │
│                          │                                          │
│                          ├─▶ Resolves context from Angular DI       │
│                          │   (BaseSiteService, LanguageService,     │
│                          │    CurrencyService, OccConfig)           │
│                          │                                          │
│                          ├─▶ Runs SITEMAP_URL_PROVIDERS             │
│                          │   ├─ ProductSitemapProvider (default)     │
│                          │   ├─ CategorySitemapProvider (custom)     │
│                          │   └─ ... (extensible)                    │
│                          │                                          │
│                          └─▶ Stores XML in SITEMAP_SHARED_STATE     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Express Middleware                              │
│                                                                     │
│  /sitemap.xml ──────▶ serves sitemap index from shared state        │
│  /sitemaps/*.xml ───▶ serves individual sitemaps from shared state  │
│  /sitemap-status ───▶ JSON status endpoint                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Quick Start (zero-config)

### 1. Server config

```typescript
// app.config.server.ts
import { provideSitemapGenerator } from '@spartacus/setup/sitemaps';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideSitemapGenerator(),
    // ...
  ],
};
```

### 2. Express middleware

```typescript
// server.ts
import { setupSitemapServing } from '@spartacus/setup/sitemaps';

export function app(): express.Express {
  const server = express();
  setupSitemapServing(server);
  // ...
}
```

That's it. The sitemap generator:
- Reads `backend.occ.baseUrl` from `OccConfig` (no duplication)
- Discovers languages/currencies from Angular services
- Generates URLs using **real** `SemanticPathService` (respects customer's `RoutingConfig`)
- Uses `productSearch.sitemap` OCC endpoint scope

## Configuration

### Override baseUrl (recommended for production)

```typescript
provideSitemapGenerator({
  baseUrl: 'https://my-storefront.com',
})
```

### Override OCC URL

```typescript
provideSitemapGenerator({
  occBaseUrl: 'https://internal-occ.example.com',
})
```

If not set, `OccConfig.backend.occ.baseUrl` is used automatically.

## Extensibility

### Custom URL providers

Create a provider by extending `SitemapUrlProvider`:

```typescript
@Injectable()
export class CategorySitemapProvider extends SitemapUrlProvider {
  readonly name = 'categories';

  async getUrls(context: SitemapGenerationContext): Promise<SitemapProviderResult> {
    const sitemaps: Record<string, string> = {};
    const files: string[] = [];
    // ... fetch categories, build URLs ...
    return { providerName: this.name, sitemaps, files, totalUrls, urlsByLanguage };
  }
}
```

Register it:

```typescript
import { SITEMAP_URL_PROVIDERS } from '@spartacus/setup/sitemaps';

providers: [
  provideSitemapGenerator(),
  { provide: SITEMAP_URL_PROVIDERS, useClass: CategorySitemapProvider, multi: true },
]
```

### Override the default product provider

```typescript
@Injectable()
export class MyProductProvider extends ProductSitemapProvider {
  protected override maxPageSize = 200;

  protected override buildProductEntry(product, baseUrl, urlPrefix) {
    // Custom URL logic...
  }
}

// Replace the default:
providers: [
  provideSitemapGenerator(),  // registers default ProductSitemapProvider
  { provide: SITEMAP_URL_PROVIDERS, useClass: MyProductProvider, multi: true },
]
```

## Currency handling

### URL encoding with currency

When `urlEncodingAttributes` includes `currency` (e.g., `['baseSite', 'language', 'currency']`),
sitemaps are generated per language **and** per currency:

```
sitemap-products-en-USD.xml
sitemap-products-en-EUR.xml
sitemap-products-de-USD.xml
sitemap-products-de-EUR.xml
```

When currency is **not** in URL encoding, files are per language only:

```
sitemap-products-en.xml
sitemap-products-de.xml
```

> **Note:** OCC product search results are typically currency-independent.
> The currency only affects the URL prefix, not the API call.

## OCC Endpoint

Uses the `sitemap` scope from `productSearch` OCC endpoint config:

```typescript
// default-occ-product-config.ts
productSearch: {
  sitemap: 'products(code,name)',
}
```

Customers can override this in their OCC config to include additional fields.

## File structure

```
sitemaps/
├── model/
│   ├── sitemap.model.ts          # Core interfaces
│   └── sitemap-url-provider.ts   # Abstract base class + multi-token
├── providers/
│   └── product-sitemap-provider.ts  # Default product provider
├── ssr-bridge/
│   ├── sitemap-shared-state.ts      # In-memory shared state
│   ├── sitemap-config-extractor.service.ts  # Orchestrator service
│   └── sitemap-config-initializer.ts        # provideSitemapGenerator()
├── express/
│   └── sitemap-middleware.ts     # Express serving middleware
└── public_api.ts
```

