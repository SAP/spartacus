# Robots.txt content example

The SSR entry point, `@spartacus/setup/ssr`, exports `EXAMPLE_ROBOTS_TXT`, a
general example for a Spartacus storefront. The framework supplies this content
only. It does not create or register an HTTP handler for `/robots.txt`; the
customer application owns the route and its response.

## Example crawler policy

The example uses one `User-agent: *` group. It disallows the cart, checkout, and
customer-account paths shown in the file while leaving other paths crawlable.
There are no named crawler groups, so the transactional restrictions are in the
wildcard group itself. Other paths are allowed for crawlers, including training
crawlers; customers can replace the example to choose a different policy.

Search, model training, and user-requested access are separate uses. For
example, `OAI-SearchBot` and `Claude-SearchBot` support search, while `GPTBot` and
`ClaudeBot` support model training. User-requested fetchers such as
`ChatGPT-User` behave differently; OpenAI states that robots.txt rules may not
apply to those requests. Allowing training crawlers is not a prerequisite for
search visibility. See the [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
and [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
for current crawler behavior.

Each transactional rule covers the exact page, its subpaths, and query
parameters. For example, `/cart$` covers the exact page, `/cart/` covers paths
below it, and `/cart?` covers query parameters. A rule for `/cart/` alone does
not cover the exact `/cart` page. The `*` in `/*/cart` and `/*/my-account` can
match multiple path segments; it is not limited to one base-site UID.

These paths are examples. Spartacus routes, aliases, and URL context are
configurable. Adapt the rules to the storefront's routing and base-site,
language, and currency prefixes; checkout paths and other prefixes may need
additional rules. CMS component guards control navigation and do not generate
robots.txt rules. A page's `robots` meta tag is a separate indexing mechanism.

## Register the domain-root route in `server.ts`

Crawlers discover `/robots.txt` at the origin root. Stores sharing an origin
share that file, so the response should cover the applicable store paths. A
`/:baseSite/robots.txt` endpoint is not the standard discovery location.

For the domain-root route, use the existing base-site-aware Express API. OCC
resolution must match the request URL against the site's URL patterns. Omit
`pathBaseSiteIds` or pass an empty array, and configure `occBaseUrl`. Local
path-ID resolution requires a base-site prefix and cannot resolve this
domain-root route.

This example serves the general content. The handler owns the status,
content-type, and body:

```typescript
import { EXAMPLE_ROBOTS_TXT } from '@spartacus/setup/ssr';
import {
  configureBaseSiteAwareRoutes,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr/express-base-site';

function robotsHandler({ res }: BaseSiteHandlerContext): void {
  res.status(200).type('text/plain').send(EXAMPLE_ROBOTS_TXT);
}

const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { value: 'https://commerce.example.com' },
});

// In the Express setup, after applicable protective middleware:
server.use(
  createBaseSiteAwareRoute({
    route: '/robots.txt',
    withBaseSiteInPath: false,
    handler: robotsHandler,
  })
);
// Register static handlers and the Angular SSR catch-all after this route.
```

The base-site callback receives `{ req, res, next, baseSite }` after the
existing resolver recognizes the site. Configure `configureBaseSiteAwareRoutes`
once per Express application and reuse its `createBaseSiteAwareRoute` function.
Keep this route after applicable protective middleware and before static
handlers and the Angular SSR catch-all. See [Base-Site-Aware Express Routes](../express-base-site/README.md)
for resolver options and route behavior.

## Choose content by base site

The application can keep custom text in a map keyed by the resolved base-site
UID. Use an `undefined` check or nullish coalescing so an explicitly empty
string stays empty; do not use `||` as the fallback check.

```typescript
const robotsContentByBaseSite: Partial<Record<string, string>> = {
  'electronics-spa': 'User-agent: *\nDisallow: /special-offer\n',
  'powertools-spa': '',
};

function robotsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  const customContent = robotsContentByBaseSite[baseSite];
  const content =
    customContent === undefined ? EXAMPLE_ROBOTS_TXT : customContent;

  res.status(200).type('text/plain').send(content);
}
```

Alternatively, map base-site UIDs to customer-owned `.txt` files and send the
selected file. Resolve each path to an absolute path, and ensure the application
deployment copies the files to those paths. Spartacus does not generate or copy
customer robots files.

```typescript
import { resolve } from 'node:path';

const robotsFileByBaseSite: Partial<Record<string, string>> = {
  'electronics-spa': resolve(
    process.cwd(),
    'robots/robots-electronics.txt'
  ),
  'powertools-spa': resolve(
    process.cwd(),
    'robots/robots-powertools.txt'
  ),
};

function robotsFileHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  const filePath = robotsFileByBaseSite[baseSite];

  if (filePath === undefined) {
    res.status(200).type('text/plain').send(EXAMPLE_ROBOTS_TXT);
    return;
  }

  res.status(200).type('text/plain').sendFile(filePath);
}
```

Add the files to the server application's deployment output or package them
alongside the server, then keep the absolute paths in the map aligned with their
deployed locations. A mapped zero-byte file is an explicit empty response. Only
an unmapped base site falls back to `EXAMPLE_ROBOTS_TXT`.

## Public references

- [Robots Exclusion Protocol (RFC 9309)](https://www.rfc-editor.org/rfc/rfc9309.html)
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Spartacus route configuration](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/routes/route-configuration.md)
- [Spartacus multi-site configuration](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/context/context-configuration.md)
- [Spartacus CMS component guards](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/components/customizing-cms-components.md)
- [Spartacus HTML tags and robots metadata](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/seo/html-tags.md)
