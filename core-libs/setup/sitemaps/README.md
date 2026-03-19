# Sitemap Module for Spartacus SSR

Server-side sitemap generation for Spartacus applications using SSR.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Angular SSR (first render)                      │
│                                                                     │
│  APP_INITIALIZER ─▶ SitemapConfigExtractorService                   │
│                      │ (per baseSite)                               │
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
│  /sitemap.xml ──────▶ sitemap index                                 │
│  /sitemaps/*.xml ───▶ individual sitemaps                           │
│  /sitemap-status ───▶ JSON status                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Language / Currency handling

- **Enumeration** happens once per language (OCC data is currency-independent).
- **URL duplication** happens per currency when `currency` is in `urlEncodingParams`.
  The same paths get different URL prefixes (`/en/USD/...` vs `/en/EUR/...`).

## Quick Start

```typescript
// app.config.server.ts
provideSitemapGenerator()

// server.ts
setupSitemapServing(server)
```

## Configuration

```typescript
// Override base URL
provideSitemapGenerator({ baseUrl: 'https://my-storefront.com' })

// Filter baseSites
provideSitemapGenerator({ baseSiteFilter: ['electronics-spa'] })

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
})
```

## Custom Enumerators

```typescript
@Injectable()
export class CategoryRouteParamsEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'category';
  override readonly languageDependent = true;

  async enumerate(ctx: RouteParamsEnumeratorContext) {
    return { params: categories.map(c => ({ categoryCode: c.code })) };
  }
}

// Register:
{ provide: ROUTE_PARAMS_ENUMERATOR, useClass: CategoryRouteParamsEnumerator, multi: true }
```

## Generated Structure

```
/sitemap.xml                                   # Index
/sitemaps/electronics-spa/sitemap-en.xml       # English
/sitemaps/electronics-spa/sitemap-de.xml       # German
/sitemaps/powertools-spa/sitemap-en-USD.xml    # English + USD
/sitemaps/powertools-spa/sitemap-en-EUR.xml    # English + EUR
/sitemaps/powertools-spa/sitemap-en-USD-1.xml  # Split (if > limit)
```

## File Structure

```
sitemaps/
├── config/
│   └── sitemap-config.ts             # SitemapConfig
├── model/
│   ├── sitemap.model.ts              # All interfaces
│   └── route-params-enumerator.ts    # Abstract class + token
├── enumerators/
│   ├── static-route-params-enumerator.ts
│   └── product-route-params-enumerator.ts
├── services/
│   ├── routes-discovery.service.ts
│   ├── site-context-aware-routes-discovery.service.ts
│   └── sitemap-generator.service.ts
├── ssr-bridge/
│   ├── sitemap-shared-state.ts
│   ├── sitemap-config-extractor.service.ts
│   └── sitemap-config-initializer.ts
├── express/
│   └── sitemap-middleware.ts
├── utils/
│   └── xml-utils.ts
└── public_api.ts
```
