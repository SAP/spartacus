# Sitemap Module for Spartacus

Server-side sitemap generation for Spartacus applications.

## How it works

Generates sitemap XML files on disk via a standalone CLI script.
Decoupled from the live SSR server — can run as a cron job.

```
┌────────────────────────────────────────────────────────────────────┐
│  CLI: node generate-sitemaps.mjs                                    │
│                                                                     │
│  1. renderApplication() ──▶ Angular bootstraps                      │
│  2. BEFORE_APP_SERIALIZED ──▶ SitemapFileOrchestrator               │
│     └─▶ StreamingSitemapGeneratorService                            │
│         └─▶ SiteContextAwareRoutesDiscoveryService                  │
│             └─▶ RoutesDiscoveryService                              │
│                 └─▶ ROUTE_PARAMS_ENUMERATOR[]                       │
│  3. Results serialized as JSON in <script id="cxSitemapData">       │
│  4. CLI extracts JSON from HTML → writes XML files to disk          │
└──────────────────────────┬─────────────────────────────────────────┘
                           │ writes to disk
                           ▼
┌────────────────────────────────────────────────────────────────────┐
│  ./dist/sitemaps/                                                   │
│  ├── sitemap.xml                              (master index)        │
│  ├── electronics-spa/sitemap-en.xml                                 │
│  ├── electronics-spa/sitemap-de.xml                                 │
│  └── apparel-uk-spa/sitemap-en-1.xml                               │
└────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Configure in `app.config.server.ts`

```typescript
import { provideSitemapFileGenerator } from '@spartacus/setup/sitemaps';
import { provideConfig } from '@spartacus/core';

const occBaseUrl = process.env['OCC_BACKEND_BASE_URL'] || '';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ...(occBaseUrl
      ? [provideConfig({ backend: { occ: { baseUrl: occBaseUrl } } })]
      : []),
    provideSitemapFileGenerator({
      baseUrls: {
        'electronics-spa': 'https://electronics.example.com',
        'apparel-uk-spa': 'https://apparel-uk.example.com',
      },
      occBaseUrl: occBaseUrl || undefined,
    }),
  ],
};
```

### 2. Build the application

```bash
nx build storefrontapp
```

### 3. Generate sitemaps (CLI)

The script **re-uses** the existing build — it never rebuilds.

```bash
node dist/storefrontapp/server/generate-sitemaps.mjs \
  --occ-url https://api.example.com \
  --output ./dist/sitemaps
```

---

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--output <dir>` | Output directory for XML files | `./dist/sitemaps` |
| `--base-site <uid>` | Generate only for this baseSite | All configured sites |
| `--bootstrap <path>` | Path to `main.server.mjs` (auto-detected) | Auto-detect |
| `--occ-url <url>` | OCC backend base URL | `OCC_BACKEND_BASE_URL` env var |
| `--insecure` | Disable SSL cert verification (dev) | `false` |
| `--help` | Show usage help | |

---

## Configuration

```typescript
provideConfig({
  sitemap: {
    maxUrlsPerSitemap: 50000,
    routes: {
      includeAuthFlowRoutes: false,
      includeProtectedRoutes: false,
      excludes: ['cart', 'checkout'],
      cmsContentPageLabels: ['/faq', '/about', '/terms'],
    },
  },
} as SitemapConfig)
```

---

## Custom Enumerators

```typescript
@Injectable()
export class MyCustomEnumerator extends RouteParamsEnumerator {
  readonly cxRoute = 'myRoute';
  override readonly languageDependent = true;

  async enumerate(ctx: RouteParamsEnumeratorContext): Promise<RouteParamsEnumeratorResult> {
    const items = await this.fetchItems(ctx);
    return { params: items.map(i => ({ code: i.code })) };
  }
}

// Register:
{ provide: ROUTE_PARAMS_ENUMERATOR, useClass: MyCustomEnumerator, multi: true }
```

### Built-in Enumerators

| Enumerator | cxRoute | Language Dep. | Description |
|---|---|---|---|
| `StaticRouteParamsEnumerator` | `*` (fallback) | No | Routes without parameters |
| `ProductRouteParamsEnumerator` | `product` | Yes | Products from OCC search |
| `CategoryRouteParamsEnumerator` | `category` | Yes | Categories from OCC catalogs |
| `BrandRouteParamsEnumerator` | `brand` | Yes | Brands from OCC catalogs |
| `CmsContentPageEnumerator` | config-driven | No | Explicitly listed CMS pages |

---

## Memory Management for Large Sites

### Per-BaseSite CLI Execution

```bash
for site in electronics-spa apparel-uk-spa; do
  node dist/server/generate-sitemaps.mjs \
    --base-site $site \
    --output /shared-volume/sitemaps
done
```

Each invocation is a separate Node.js process — no cumulative memory growth.

---

## Generated Structure

```
dist/sitemaps/
├── sitemap.xml                                    # Master index
├── electronics-spa/
│   ├── sitemap-en.xml
│   └── sitemap-de.xml
└── apparel-uk-spa/
    ├── sitemap-en-USD.xml
    └── sitemap-en-USD-1.xml                       # Split (if > 50K URLs)
```

---

## File Structure

```
sitemaps/
├── cli/
│   ├── generate-sitemaps.ts           # Standalone CLI script + runSitemapCli()
│   └── sitemap-file-orchestrator.ts   # Orchestrator + provideSitemapFileGenerator()
├── config/
│   └── sitemap-config.ts
├── model/
│   ├── sitemap.model.ts
│   ├── route-params-enumerator.ts
│   └── streaming.model.ts
├── enumerators/
│   ├── static-route-params-enumerator.ts
│   ├── product-route-params-enumerator.ts
│   ├── category-route-params-enumerator.ts
│   ├── brand-route-params-enumerator.ts
│   └── cms-content-page-enumerator.ts
├── services/
│   ├── routes-discovery.service.ts
│   ├── site-context-aware-routes-discovery.service.ts
│   ├── streaming-sitemap-generator.service.ts
│   └── catalogs-fetch.service.ts
├── express/
│   └── static-sitemap-middleware.ts
├── utils/
│   ├── xml-utils.ts
│   └── sitemap-xml-stream-writer.ts
└── public_api.ts
```
