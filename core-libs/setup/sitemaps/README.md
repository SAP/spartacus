# Sitemap Module for Spartacus SSR

Server-side sitemap generation for Spartacus applications using SSR.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Angular SSR (first render)                      │
│                                                                     │
│  APP_INITIALIZER ─▶ SitemapConfigExtractorService                   │
│                      │ (per baseSite from baseUrls config)          │
│                      ├─▶ BaseSiteService (resolves site context)    │
│                      └─▶ SitemapGeneratorService                    │
│                           │                                         │
│                           └─▶ SiteContextAwareRoutesDiscoveryService│
│                                │ (per language × per currency)      │
│                                └─▶ RoutesDiscoveryService           │
│                                     │ (per language, once)          │
│                                     ├─▶ RoutingConfig               │
│                                     ├─▶ SemanticPathService         │
│                                     └─▶ ROUTE_PARAMS_ENUMERATOR[]   │
│                                          ├─ StaticRouteParams...    │
│                                          ├─ ProductRouteParams...   │
│                                          └─ (extensible)            │
│                                                                     │
│  SITEMAP_SHARED_STATE ◄── XML files stored in process memory        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Express Middleware                                                  │
│  /sitemap.xml ──────▶ sitemap index (references per-baseSite files) │
│  /sitemaps/:baseSite/*.xml ──▶ individual sitemaps                  │
│  /sitemap-status ───▶ JSON status                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Language / Currency handling

- **Enumeration** happens once per language (OCC data is currency-independent).
- **URL duplication** happens per currency when `currency` is in `urlEncodingParams`.
  The same paths get different URL prefixes (`/en/USD/...` vs `/en/EUR/...`).

### Multi-site handling

- Only baseSites listed in `SitemapSsrConfig.baseUrls` are processed.
- Each baseSite gets its own subdirectory in sitemaps (`electronics-spa/sitemap-en.xml`).
- The sitemap index (`/sitemap.xml`) references all per-baseSite files using
  the storefront URL configured for each baseSite.
- Site context data (languages, currencies, urlEncodingAttributes) is resolved
  from the OCC baseSites response.

## Quick Start

```typescript
// app.config.server.ts
import { provideSitemapGenerator } from '@spartacus/setup/sitemaps';

providers: [
  provideSitemapGenerator({
    baseUrls: {
      'electronics-spa': 'https://electronics.example.com',
    },
  }),
]

// server.ts
import { setupSitemapServing } from '@spartacus/setup/sitemaps';

const server = express();
setupSitemapServing(server);
```

## Configuration

```typescript
// Multi-site with different storefront URLs
provideSitemapGenerator({
  baseUrls: {
    'electronics-spa': 'https://electronics.example.com',
    'apparel-uk-spa': 'https://apparel-uk.example.com',
  },
  occBaseUrl: 'https://internal-api.example.com', // optional OCC override
})

// Sitemap config (Spartacus Config pattern)
provideConfig({
  sitemap: {
    maxUrlsPerSitemap: 50,          // default: 50000
    routes: {
      includeAuthFlowRoutes: false, // default
      includeProtectedRoutes: false,// default
      excludes: ['cart', 'checkout'],
    },
  },
} as SitemapConfig)
```

### Express Middleware Options

```typescript
setupSitemapServing(server, {
  servePath: '/sitemaps',       // default: '/sitemaps'
  timeout: 60000,               // default: 60000ms
  enableSelfWarmup: true,       // default: true — triggers SSR bootstrap if needed
})
```

## Custom Enumerators

Route parameter enumerators provide parameter combinations for dynamic routes.
Each enumerator handles a specific `cxRoute` and returns parameter objects
that are passed to `SemanticPathService` for URL generation.

```typescript
@Injectable()
export class CategoryRouteParamsEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'category';
  override readonly languageDependent = true;

  async enumerate(ctx: RouteParamsEnumeratorContext): Promise<RouteParamsEnumeratorResult> {
    const categories = await this.fetchCategories(ctx);
    return {
      params: categories.map(c => ({ categoryCode: c.code })),
    };
  }
}

// Register:
{ provide: ROUTE_PARAMS_ENUMERATOR, useClass: CategoryRouteParamsEnumerator, multi: true }
```

### Built-in Enumerators

| Enumerator | cxRoute | Language Dependent | Description |
|---|---|---|---|
| `StaticRouteParamsEnumerator` | `*` (fallback) | No | Handles routes without parameters (home, termsAndConditions, etc.) |
| `ProductRouteParamsEnumerator` | `product` | Yes | Fetches all products from OCC `productSearch` endpoint |

## Generated Structure

```
/sitemap.xml                                         # Master index
/sitemaps/electronics-spa/sitemap-en.xml             # English
/sitemaps/electronics-spa/sitemap-de.xml             # German
/sitemaps/apparel-uk-spa/sitemap-en-USD.xml          # English + USD
/sitemaps/apparel-uk-spa/sitemap-en-EUR.xml          # English + EUR
/sitemaps/apparel-uk-spa/sitemap-en-USD-1.xml        # Split (if > limit)
```

## File Structure

```
sitemaps/
├── config/
│   └── sitemap-config.ts                            # SitemapConfig, defaultSitemapConfig
├── model/
│   ├── sitemap.model.ts                             # All interfaces (SitemapUrlEntry,
│   │                                                #   SitemapGenerationContext,
│   │                                                #   DiscoveredRoute, SiteContextAwareUrl,
│   │                                                #   RoutesDiscoveryOptions, etc.)
│   └── route-params-enumerator.ts                   # RouteParamsEnumerator abstract class
│                                                    #   + ROUTE_PARAMS_ENUMERATOR token
├── enumerators/
│   ├── static-route-params-enumerator.ts            # Fallback for static routes (cxRoute: '*')
│   └── product-route-params-enumerator.ts           # Products from OCC (cxRoute: 'product')
├── services/
│   ├── routes-discovery.service.ts                  # Matches routes with enumerators,
│   │                                                #   builds URLs via SemanticPathService
│   ├── site-context-aware-routes-discovery.service.ts  # Iterates language/currency combos,
│   │                                                   #   prepends URL prefix
│   └── sitemap-generator.service.ts                 # Splits URLs into files, generates XML
├── ssr-bridge/
│   ├── sitemap-shared-state.ts                      # SITEMAP_SHARED_STATE singleton,
│   │                                                #   waitForSitemapReady(), update/reset
│   ├── sitemap-config-extractor.service.ts          # Main orchestrator, SitemapSsrConfig,
│   │                                                #   SITEMAP_SSR_CONFIG token
│   └── sitemap-config-initializer.ts                # provideSitemapGenerator(),
│                                                    #   APP_INITIALIZER factory
├── express/
│   └── sitemap-middleware.ts                         # setupSitemapServing(),
│                                                    #   SitemapServingOptions
├── utils/
│   └── xml-utils.ts                                 # escapeXml()
└── public_api.ts
```

## Service Layer Overview

| Service | Responsibility |
|---|---|
| `SitemapConfigExtractorService` | **Orchestrator.** Reads `baseUrls` config, fetches baseSites from OCC, builds generation context per site, delegates to `SitemapGeneratorService`, generates sitemap index, stores results in `SITEMAP_SHARED_STATE`. |
| `SitemapGeneratorService` | Calls discovery service, splits URLs by `maxUrlsPerSitemap`, generates XML for each file. |
| `SiteContextAwareRoutesDiscoveryService` | Iterates language/currency combinations. Calls `RoutesDiscoveryService` once per language, duplicates results per currency when currency is in URL. Prepends site context URL prefix. |
| `RoutesDiscoveryService` | Iterates `RoutingConfig.routing.routes`, filters by route flags (`authFlow`, `protected`, `disabled`, `excludes`), finds matching `ROUTE_PARAMS_ENUMERATOR` for each route, calls `SemanticPathService` to build concrete paths. |

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /sitemap.xml` | Master sitemap index referencing all per-baseSite files |
| `GET /sitemaps/:baseSite/:filename` | Individual sitemap file (e.g., `/sitemaps/electronics-spa/sitemap-en.xml`) |
| `GET /sitemaps/:filename` | Legacy fallback — searches across all baseSites |
| `GET /sitemap-status` | JSON status: `isReady`, `isGenerating`, `files`, `totalUrls`, `error`, etc. |

