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

## Angular-Only Route Enumerators

Use `AngularRouteEnumerator` for custom Angular routes that exist **outside Spartacus routing config** — routes with no `cxRoute` key that can have dynamic segments (`:params`).

```typescript
import { Injectable } from '@angular/core';
import {
  AngularRouteEnumerator,
  AngularRouteEnumeratorResult,
  AngularRouteEnumeratorContext,
} from '@spartacus/setup/sitemaps';

@Injectable()
export class HelpTopicEnumerator extends AngularRouteEnumerator {
  // Must exactly match the Angular route's `path` string
  readonly routePath = 'help/:topicId';

  async enumerate(
    _context: AngularRouteEnumeratorContext
  ): Promise<AngularRouteEnumeratorResult> {
    const topics = await fetchTopics();
    return {
      // Return fully-resolved paths — no :params remaining
      paths: topics.map((t) => `help/${t.id}`),
    };
  }
}
```

Register with `ANGULAR_ROUTE_ENUMERATOR` (typically in `app.config.server.ts`):

```typescript
import { ANGULAR_ROUTE_ENUMERATOR } from '@spartacus/setup/sitemaps';

providers: [
  { provide: ANGULAR_ROUTE_ENUMERATOR, useClass: HelpTopicEnumerator, multi: true },
]
```

### Key constraints

- `routePath` must be the **exact `path` string** from the Angular `Route` object (e.g. `'help/:topicId'`, not `'/help/:topicId'`).
- `paths` in the result must be **fully resolved** — any path still containing `:` is filtered out.
- Parameterized routes **without** a matching enumerator are skipped entirely, including all their children.
- Parameterized routes **with** children also require an enumerator — it provides the parent path segments and children are appended to each.

### Contrast with `RouteParamsEnumerator`

| | `RouteParamsEnumerator` | `AngularRouteEnumerator` |
|---|---|---|
| Token | `ROUTE_PARAMS_ENUMERATOR` | `ANGULAR_ROUTE_ENUMERATOR` |
| Targets | Spartacus semantic routes (have `cxRoute`) | Pure Angular routes (no `cxRoute`) |
| Matched by | `cxRoute` name | `routePath` string |
| Returns | `{ params: Record<string, unknown>[] }` | `{ paths: string[] }` (concrete paths) |
| URL building | Via `SemanticPathService` | Paths returned directly |

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

## 🔮 Planned: Per-Type File Generation for Cron Jobs

> **Status:** Planned for Phase 3. Not yet implemented.

### Motivation

In large-scale deployments, different entity types have very different change frequencies:
- **Products** change frequently (prices, availability) → regenerate daily or even hourly
- **Categories / Brands** change rarely → regenerate weekly
- **Static / CMS pages** almost never change → regenerate monthly

Currently, the CLI regenerates **all types at once** in a single run. For sites with millions
of products, this means a long-running process that has to re-fetch categories and CMS pages
even if only products have changed.

### Planned Architecture

The CLI will accept a `--type` argument that filters which `RouteParamsEnumerator` types
are invoked during generation. Each type produces its own set of sitemap files:

```
┌────────────────────────────────────────────────────────────────────────────┐
│  Cron Schedule                                                             │
│                                                                            │
│  ┌──────────────────────────────────────────────────────┐                  │
│  │ */30 * * * *  (every 30 min)                         │                  │
│  │   node generate-sitemaps.mjs --type product          │──▶ products      │
│  └──────────────────────────────────────────────────────┘                  │
│  ┌──────────────────────────────────────────────────────┐                  │
│  │ 0 3 * * 0     (weekly, Sunday 3 AM)                  │                  │
│  │   node generate-sitemaps.mjs --type category,brand   │──▶ categories,   │
│  └──────────────────────────────────────────────────────┘    brands        │
│  ┌──────────────────────────────────────────────────────┐                  │
│  │ 0 4 1 * *     (monthly, 1st at 4 AM)                │                  │
│  │   node generate-sitemaps.mjs --type static,cms       │──▶ static pages  │
│  └──────────────────────────────────────────────────────┘                  │
│  ┌──────────────────────────────────────────────────────┐                  │
│  │ After any --type run:                                │                  │
│  │   node generate-sitemaps.mjs --rebuild-index         │──▶ sitemap.xml   │
│  └──────────────────────────────────────────────────────┘    (index only)  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Planned CLI Arguments

| Argument | Description |
|----------|-------------|
| `--type <types>` | Comma-separated list of route types to generate (e.g., `product`, `category`, `brand`, `static`, `cms`). Corresponds to `cxRoute` values of `RouteParamsEnumerator`. |
| `--rebuild-index` | Only regenerate the master `sitemap.xml` index from existing files on disk, without running any enumerator. |

### Planned File Structure (Per-Type)

```
dist/sitemaps/
├── sitemap.xml                                    # Master index (all types)
├── electronics-spa/
│   ├── sitemap-product-en-1.xml                   # Products chunk 1
│   ├── sitemap-product-en-2.xml                   # Products chunk 2
│   ├── sitemap-category-en.xml                    # Categories
│   ├── sitemap-brand-en.xml                       # Brands
│   ├── sitemap-static-en.xml                      # Static pages (home, etc.)
│   └── sitemap-cms-en.xml                         # CMS content pages
└── apparel-uk-spa/
    ├── sitemap-product-en-USD-1.xml
    ├── sitemap-category-en-USD.xml
    └── sitemap-static-en-USD.xml
```

### Planned Behavior

1. **`--type product`** → only invokes `ProductRouteParamsEnumerator`,
   writes `sitemap-product-*.xml` files.
2. **`--type category,brand`** → invokes `CategoryRouteParamsEnumerator`
   and `BrandRouteParamsEnumerator`.
3. **Without `--type`** → current behavior (all enumerators run, all files regenerated).
4. **`--rebuild-index`** → scans the output directory for all existing
   `sitemap-*.xml` files, rebuilds only the master `sitemap.xml` index.
   This allows per-type runs to update individual file sets
   and then a final index rebuild combines them.

### CCV2 / Kubernetes CronJob Example

```yaml
# cron-sitemap-products.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: sitemap-products
spec:
  schedule: "*/30 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: sitemap-gen
              image: my-storefront:latest
              command:
                - node
                - dist/storefrontapp/server/generate-sitemaps.mjs
                - --type
                - product
                - --output
                - /shared-volume/sitemaps
                - --occ-url
                - https://api.example.com
              volumeMounts:
                - name: sitemaps
                  mountPath: /shared-volume/sitemaps
          restartPolicy: OnFailure
          volumes:
            - name: sitemaps
              persistentVolumeClaim:
                claimName: sitemaps-pvc
---
# cron-sitemap-index.yaml — runs after type-specific jobs
apiVersion: batch/v1
kind: CronJob
metadata:
  name: sitemap-index-rebuild
spec:
  schedule: "5,35 * * * *"   # 5 min after product cron
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: sitemap-index
              image: my-storefront:latest
              command:
                - node
                - dist/storefrontapp/server/generate-sitemaps.mjs
                - --rebuild-index
                - --output
                - /shared-volume/sitemaps
          restartPolicy: OnFailure
          volumes:
            - name: sitemaps
              persistentVolumeClaim:
                claimName: sitemaps-pvc
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
│   ├── angular-route-enumerator.ts
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
