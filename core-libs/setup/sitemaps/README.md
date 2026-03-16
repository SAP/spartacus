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

### Sitemap file limits (Spartacus Config pattern)

Per sitemaps.org protocol, each sitemap file can contain max 50,000 URLs.
Configure this limit using the standard Spartacus config pattern:

```typescript
import { provideConfig } from '@spartacus/core';
import { SitemapConfig } from '@spartacus/setup/sitemaps';

// app.config.ts
providers: [
  provideSitemapGenerator(),
  provideConfig({
    sitemap: {
      maxUrlsPerSitemap: 50,  // for testing; default is 50000
    },
  } as SitemapConfig),
]
```

When the limit is exceeded, files are automatically split with numeric suffixes:
- `sitemap-products-en-1.xml`
- `sitemap-products-en-2.xml`

### Filter baseSites

By default, sitemaps are generated for all baseSites. Filter them:

```typescript
// By UID array
provideSitemapGenerator({
  baseSiteFilter: ['electronics-spa', 'powertools-spa'],
})

// Or with a filter function
provideSitemapGenerator({
  baseSiteFilter: (baseSite) => !baseSite.requiresAuthentication,
})
```

## Multi-site support

The generator iterates over all baseSites from OCC and creates separate sitemaps for each:

```
/sitemaps/electronics-spa/sitemap-products-en.xml
/sitemaps/electronics-spa/sitemap-products-de.xml
/sitemaps/powertools-spa/sitemap-products-en-USD.xml
/sitemaps/powertools-spa/sitemap-products-de-USD.xml
```

The main `/sitemap.xml` index references all of them.

### URL encoding attributes

Each baseSite has its own `urlEncodingAttributes` which determines what appears in URLs:

| `urlEncodingAttributes` | Example URL |
|-------------------------|-------------|
| `['storefront', 'language', 'currency']` | `/powertools-spa/en/USD/product/123` |
| `['storefront', 'language']` | `/electronics-spa/en/product/123` |
| `['language']` | `/en/product/123` |

**Note about `storefront`:** This is used when hosting multiple storefronts on the same domain.
If 1 domain = 1 storefront, you may not need `storefront` in your `urlEncodingAttributes`.
The generator respects whatever is configured in your baseSite.

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

## Language and Currency handling

### URL encoding based on urlEncodingAttributes

The generator reads `urlEncodingAttributes` from each baseSite and only includes
language/currency in URLs when they are configured:

**When `currency` IS in `urlEncodingAttributes`:**
- Sitemaps generated per language **and** per currency
- URL prefix includes currency: `/powertools-spa/en/USD/product/123`
- Files: `sitemap-products-en-USD.xml`, `sitemap-products-de-EUR.xml`

**When `currency` is NOT in `urlEncodingAttributes`:**
- Sitemaps generated per language only
- URL prefix omits currency: `/electronics-spa/en/product/123`
- Files: `sitemap-products-en.xml`, `sitemap-products-de.xml`

**When `language` is NOT in `urlEncodingAttributes`:**
- Only default language is used
- Single file per provider: `sitemap-products.xml`

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

## Generated sitemap structure

For a deployment with multiple baseSites:

```
/sitemap.xml                                          # Master index
/sitemaps/electronics-spa/sitemap-products-en.xml     # Electronics, English
/sitemaps/electronics-spa/sitemap-products-de.xml     # Electronics, German
/sitemaps/powertools-spa/sitemap-products-en-USD.xml  # Powertools, English, USD
/sitemaps/powertools-spa/sitemap-products-en-USD-1.xml # (if > 50000 URLs)
/sitemaps/powertools-spa/sitemap-products-en-USD-2.xml # (continued)
```

## File structure

```
sitemaps/
├── model/
│   ├── sitemap.model.ts          # Core interfaces + SitemapConfig
│   └── sitemap-url-provider.ts   # Abstract base class + multi-token
├── providers/
│   └── product-sitemap-provider.ts  # Default product provider
├── ssr-bridge/
│   ├── sitemap-shared-state.ts      # In-memory shared state
│   ├── sitemap-config-extractor.service.ts  # Orchestrator (multi-site)
│   └── sitemap-config-initializer.ts        # provideSitemapGenerator()
├── express/
│   └── sitemap-middleware.ts     # Express serving middleware
└── public_api.ts
```

