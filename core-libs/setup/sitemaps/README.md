# Sitemap Module for Spartacus SSR

This module provides server-side sitemap generation capability for Spartacus applications running with SSR (Server-Side Rendering).

## Features

- **Angular-based generation**: Uses `SemanticPathService` for correct URL generation
- **SSR-Bridge**: Automatically extracts routing config from Angular to Express
- **Multi-language support**: Auto-discovers languages from basesites API
- **Plug-in architecture**: Easy to extend with custom URL providers
- **XML standard**: Fully compliant with sitemap.org protocol
- **Express middleware**: Serves sitemaps directly from Express server

---

## 🚀 Recommended Approach: SSR-Bridge

The **SSR-Bridge approach** automatically extracts routing configuration from Angular SSR context and makes it available to Express middleware. This ensures generated URLs match your application's routing configuration, including any customer customizations.

### How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     Angular SSR Bootstrap                       │
│  ┌──────────────────┐      ┌────────────────────────────┐      │
│  │   RoutingConfig  │ ───▶ │ SitemapConfigExtractor     │      │
│  │   (customer cfg) │      │ (APP_INITIALIZER)          │      │
│  └──────────────────┘      └──────────────┬─────────────┘      │
└───────────────────────────────────────────┼─────────────────────┘
                                            │
                         ┌──────────────────▼──────────────────┐
                         │      SITEMAP_SHARED_STATE           │
                         │  (Node.js process memory)           │
                         │  • routingConfig                    │
                         │  • urlEncodingParams                │
                         └──────────────────┬──────────────────┘
                                            │
┌───────────────────────────────────────────▼─────────────────────┐
│                      Express Middleware                         │
│  ┌──────────────────┐      ┌────────────────────────────┐      │
│  │  UrlPathService  │ ◀─── │ waitForSitemapState()      │      │
│  │  (real config!)  │      │                            │      │
│  └──────────────────┘      └────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Step 1: Add Provider to Server Config

```typescript
// app.config.server.ts
import { provideSitemapConfigExtractor } from '@spartacus/setup/sitemaps';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideSitemapConfigExtractor(),
    // ... other providers
  ],
};
```

### Step 2: Setup Middleware in server.ts

```typescript
// server.ts
import { setupSsrBridgeSitemaps } from '@spartacus/setup/sitemaps';

export function app(): express.Express {
  const server = express();
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  
  // Setup SSR-Bridge sitemaps (uses Angular config!)
  setupSsrBridgeSitemaps(server, {
    baseUrl: 'https://your-store.com',
    occBaseUrl: 'https://your-occ-backend.com',
    baseSiteId: 'electronics-spa',
    outputDir: join(browserDistFolder, 'sitemaps'),
  });
  
  // ... rest of server setup
  return server;
}
```

### Step 3: Verify It Works

After server starts and first SSR request completes:

```bash
# Check status
curl http://localhost:4000/sitemap-status

# Response:
{
  "ready": true,
  "routes": ["home", "product", "category", "search", ...],
  "urlEncodingParams": ["baseSite", "language", "currency"]
}

# Trigger generation test
curl -X POST http://localhost:4000/sitemap-generate

# Response:
{
  "status": "Config available",
  "routesCount": 15,
  "testProductUrl": "/electronics-spa/en/USD/product/300938/Photosmart-E702-Digital-Camera"
}
```

### Why SSR-Bridge?

| Feature | SSR-Bridge | Legacy Node.js | Pure Angular |
|---------|------------|----------------|--------------|
| Uses real routing config | ✅ | ❌ | ✅ |
| Customer customizations | ✅ Automatic | ❌ Manual sync | ✅ Automatic |
| No code duplication | ✅ | ❌ | ✅ |
| Available at startup | After 1st SSR | ✅ | After SSR |
| Express integration | ✅ | ✅ | Requires trigger |

---

## 🔄 Alternative: Angular-based Generation

The recommended approach uses Angular services that have access to `SemanticPathService`, ensuring generated URLs match your application's routing configuration.

### Angular Services

| Service | Description |
|---------|-------------|
| `SitemapUrlService` | Wrapper around `SemanticPathService` for URL generation |
| `SitemapGeneratorService` | Orchestrates sitemap generation with multi-language support |
| `generateSitemapFromInjector()` | Function to generate sitemaps from Angular DI context |

### Usage in SSR Context

```typescript
// In an Angular service or component rendered via SSR
import { Injector } from '@angular/core';
import { generateSitemapFromInjector } from '@spartacus/setup/sitemaps';

@Injectable()
export class MySitemapTriggerService {
  constructor(private injector: Injector) {}

  async generateSitemaps(): Promise<void> {
    await generateSitemapFromInjector(this.injector, {
      baseUrl: 'https://your-store.com',
      occBaseUrl: 'https://your-occ-backend.com',
      outputDir: '/path/to/sitemaps',
    });
  }
}
```

### Using SitemapUrlService Directly

```typescript
import { SitemapUrlService } from '@spartacus/setup/sitemaps';

@Injectable()
export class MyService {
  constructor(private sitemapUrlService: SitemapUrlService) {}

  getProductUrl(productCode: string, name?: string): string {
    // Uses SemanticPathService internally - respects your routing config!
    const segments = this.sitemapUrlService.getProductUrl(productCode, name);
    return this.sitemapUrlService.segmentsToPath(segments);
  }
}
```

---

## ⚠️ Legacy Approach (Node.js-only)

The legacy approach generates URLs without Angular DI access. **This may generate incorrect URLs if you customize routing.**

```typescript
// server.ts - Legacy approach (not recommended for custom routing)
import { setupSitemaps, createProductUrlProvider } from '@spartacus/setup/sitemaps';

setupSitemaps(server, {
  config: {
    baseUrl: 'https://your-store.com',
    occBaseUrl: 'https://your-occ-backend.com',
    baseSiteId: 'electronics-spa',
  },
  providers: [createProductUrlProvider()],
  outputDir: join(browserDistFolder, 'sitemaps'),
  generateOnStartup: true,
});
```

**When to use legacy approach:**
- Simple projects with default Spartacus routing
- Quick prototyping

**When to use Angular approach:**
- Custom routing configuration
- Pretty URLs
- Any production deployment

---

## Multi-Language Support

### Language Auto-Discovery

By default, the sitemap module automatically discovers available languages from the OCC basesites API:

```
GET /occ/v2/basesites?fields=FULL
```

This returns all configured languages for your base site, and sitemaps are generated for each active language.

### Language URL Strategies

Choose the strategy that matches your site's URL structure:

#### 1. Separate Files (Default) - `'separate-files'`

Generates URLs for all languages. **Recommended for most sites.**

URLs include language prefix based on site configuration:
- `https://store.com/en/product/123`
- `https://store.com/de/product/123`

#### 2. URL Prefix Strategy - `'url-prefix'`

Language is encoded in the URL path. Common for international sites.

```typescript
setupSitemaps(server, {
  config: {
    baseUrl: 'https://your-store.com',
    languageStrategy: 'url-prefix',
    languages: [
      { isocode: 'en', isDefault: true },  // No prefix for default
      { isocode: 'de', urlPrefix: '/de' },
      { isocode: 'ja', urlPrefix: '/ja' },
    ],
  },
  // ...
});
```

Generated URLs:
- `https://store.com/product/123` (English - default, no prefix)
- `https://store.com/de/product/123` (German)
- `https://store.com/ja/product/123` (Japanese)

#### 3. hreflang Strategy - `'hreflang'`

Single sitemap with hreflang annotations linking language alternates.
**Best for SEO when same content exists in multiple languages.**

```xml
<url>
  <loc>https://store.com/en/product/123</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://store.com/en/product/123"/>
  <xhtml:link rel="alternate" hreflang="de" href="https://store.com/de/product/123"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://store.com/en/product/123"/>
</url>
```

### Explicit Language Configuration

Override auto-discovery with explicit language list:

```typescript
setupSitemaps(server, {
  config: {
    baseUrl: 'https://your-store.com',
    autoDiscoverLanguages: false,  // Disable auto-discovery
    languages: [
      { isocode: 'en', isDefault: true },
      { isocode: 'de' },
      { isocode: 'fr' },
    ],
  },
  // ...
});
```

---

## Best Practices for Multi-Language Sitemaps

### 🔍 SEO Recommendations

| Practice | Recommendation |
|----------|----------------|
| **File organization** | Use separate sitemap files per content type (products, categories) |
| **Language handling** | Use `hreflang` annotations when same content exists in multiple languages |
| **URL structure** | Prefer language in path (`/de/product/123`) over subdomains or query params |
| **Default language** | Mark one language as `x-default` for hreflang |
| **Consistency** | Ensure all language versions are accessible and return 200 status |

### 📁 Recommended Sitemap Structure

```
/sitemaps/
├── sitemap.xml                      # Main index
├── sitemap-products.xml             # Product URLs (all languages)
├── sitemap-categories.xml           # Category URLs
└── sitemap-content.xml              # CMS content pages
```

### 🌐 URL Structure Best Practices

**✅ Recommended:**
```
https://example.com/de/product/camera-123
https://example.com/ja/product/camera-123
```

**❌ Avoid:**
```
https://example.com/product/camera-123?lang=de  # Query params
https://de.example.com/product/camera-123       # Subdomains (harder to manage)
```

### 📊 Sitemap Size Limits

| Limit | Value |
|-------|-------|
| URLs per sitemap | 50,000 max |
| File size | 50MB uncompressed |
| Sitemap index entries | 50,000 max |

---

## Configuration Reference

### SitemapConfig

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `baseUrl` | string | Yes | - | Base URL for storefront |
| `occBaseUrl` | string | Yes | - | OCC backend URL |
| `baseSiteId` | string | Yes | - | SAP Commerce base site ID |
| `languages` | SitemapLanguageConfig[] | No | auto | Language configurations |
| `languageStrategy` | 'separate-files' \| 'hreflang' \| 'url-prefix' | No | 'separate-files' | Strategy |
| `autoDiscoverLanguages` | boolean | No | true | Auto-discover from basesites API |
| `routes` | RoutesConfig | No | defaults | Custom route configurations |

### SitemapLanguageConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isocode` | string | Yes | Language ISO code (e.g., 'en', 'de') |
| `urlPrefix` | string | No | URL prefix (e.g., '/de') |
| `isDefault` | boolean | No | Whether this is the default language |

---

## Custom URL Providers

### Using UrlPathService

The `UrlPathService` generates URLs compatible with Spartacus routing:

```typescript
import {
  UrlProvider,
  SitemapUrlEntry,
  SitemapConfig,
  UrlPathService,
} from '@spartacus/setup/sitemaps';

export class CategoryUrlProvider implements UrlProvider {
  readonly name = 'categories';
  
  protected urlPathService = new UrlPathService();

  async getUrls(config: SitemapConfig): Promise<SitemapUrlEntry[]> {
    const categories = await this.fetchCategories(config);
    
    return categories.map(cat => {
      const path = this.urlPathService.transform('category', {
        categoryCode: cat.code,
        code: cat.code,
      });
      
      return {
        loc: `${config.baseUrl}${path}`,
        changefreq: 'weekly',
        priority: 0.7,
      };
    });
  }
}
```

### Custom Routes Configuration

Override default Spartacus routes:

```typescript
import { UrlPathService } from '@spartacus/setup/sitemaps';

const urlService = new UrlPathService({
  product: {
    paths: ['produkt/:productCode/:name'],  // German-style
    paramsMapping: { productCode: 'code' },
  },
});

const productProvider = createProductUrlProvider(urlService);
```

---

## Environment Variables

```bash
SITEMAP_ENABLED=true          # Enable/disable sitemap (default: true)
SITEMAP_BASE_URL=https://...  # Storefront base URL
SITEMAP_OCC_URL=https://...   # OCC backend URL
SITEMAP_BASE_SITE=electronics-spa
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        server.ts                                │
│  setupSitemaps(server, options)                                 │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  SitemapMiddleware                        │  │
│  │  ┌───────────────────┐    ┌─────────────────────────┐    │  │
│  │  │  SitemapGenerator │    │ Express Static Server   │    │  │
│  │  │  ┌─────────────┐  │    │ GET /sitemap.xml        │    │  │
│  │  │  │UrlPathServ. │  │    │ GET /sitemaps/*.xml     │    │  │
│  │  │  └─────────────┘  │    └─────────────────────────┘    │  │
│  │  │  ┌─────────────┐  │    ┌─────────────────────────┐    │  │
│  │  │  │BaseSiteServ.│──┼───▶│ OCC /basesites API      │    │  │
│  │  │  └─────────────┘  │    └─────────────────────────┘    │  │
│  │  │  URL Providers:   │    ┌─────────────────────────┐    │  │
│  │  │  ┌─────────────┐  │    │ OCC /products/search    │    │  │
│  │  │  │ProductUrlPr.│──┼───▶│                         │    │  │
│  │  │  └─────────────┘  │    └─────────────────────────┘    │  │
│  │  └───────────────────┘                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```
