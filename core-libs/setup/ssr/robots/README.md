# Robots.txt response utility

The SSR entry point, `@spartacus/setup/ssr`, exports
`EXAMPLE_ROBOTS_TXT` and `sendRobotsTxtResponse`. The example is a
starting point for a storefront policy. Spartacus does not register a route for
`/robots.txt` automatically; add the route in the application's Express
`server.ts`.

## Example policy

The example has one `User-agent: *` group. It disallows cart and customer-account
pages, along with checkout pages, while leaving other paths available to
crawlers. It includes unprefixed cart and account paths and examples under a
base-site prefix. The checkout paths are unprefixed in the example.

Each transactional rule covers three URL forms: the exact page (such as
`/cart$`), paths below it (such as `/cart/`), and query parameters (such as
`/cart?`). A rule for `/cart/` by itself does not cover the exact `/cart`
page. The `*` in `/*/cart` and `/*/my-account` can match multiple path
segments; it is not limited to one base-site UID.

The wildcard group applies to crawlers that do not have a more specific matching
group. The example restricts the listed transactional paths and leaves other
paths crawlable. That also permits training crawlers on other paths. Customers
can replace the example to choose a different policy.

Search, model training, and user-requested access are separate uses. For example,
`OAI-SearchBot` and `Claude-SearchBot` support search, while `GPTBot` and
`ClaudeBot` support training. User-requested fetchers such as
`ChatGPT-User` have different behavior; OpenAI states that robots.txt rules may
not apply to those requests. Allowing training crawlers is not a prerequisite
for search visibility. See the [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
and [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
for their current bot behavior.

These transactional paths are examples. Spartacus routes, aliases, and URL
context are configurable, so adapt the rules to the storefront's route
configuration and base-site, language, and currency prefixes. Checkout paths and
any additional prefixes may need different rules. CMS component guards control
navigation and do not generate robots.txt rules. A page's `robots` meta tag is a
separate indexing mechanism.

## Register the domain-root route

Crawlers discover `/robots.txt` at the origin root. Stores sharing an origin
share that file, so its content needs to cover the applicable store paths. A
`/:baseSite/robots.txt` endpoint is not the standard discovery location.

For an unprefixed `/robots.txt` route, configure OCC base-site resolution once,
then register the route with `withBaseSiteInPath: false`. OCC resolution needs
the backend URL and URL patterns that match the requested storefront URL; omit
`pathBaseSiteIds` or pass an empty array. Local path-ID resolution needs a
base-site prefix and cannot resolve this domain-root route.

The following example maps resolved base-site UIDs to customer-provided files.
Adjust the paths to where the server process can read them:

```typescript
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  EXAMPLE_ROBOTS_TXT,
  sendRobotsTxtResponse,
} from '@spartacus/setup/ssr';
import {
  configureBaseSiteAwareRoutes,
  type BaseSiteHandlerContext,
} from '@spartacus/setup/ssr/express-base-site';

const robotsFilesByBaseSite: Partial<Record<string, string>> = {
  'electronics-spa': resolve(process.cwd(), 'robots-electronics.txt'),
  'powertools-spa': resolve(process.cwd(), 'robots-powertools.txt'),
};

function robotsHandler({ res, baseSite }: BaseSiteHandlerContext): void {
  const filePath = robotsFilesByBaseSite[baseSite];
  const content =
    filePath === undefined
      ? EXAMPLE_ROBOTS_TXT
      : readFileSync(filePath, 'utf8');

  sendRobotsTxtResponse(res, content);
}

const { createBaseSiteAwareRoute } = configureBaseSiteAwareRoutes({
  occBaseUrl: { value: 'https://commerce.example.com' },
});

// In the application's Express setup, after applicable protective middleware:
server.use(
  createBaseSiteAwareRoute({
    route: '/robots.txt',
    withBaseSiteInPath: false,
    handler: robotsHandler,
  })
);
// Register static handlers and the Angular SSR catch-all after this route.
```

The callback receives `{ req, res, next, baseSite }` after the existing resolver
recognizes the site. The file mapping is optional; if there is no file for the
resolved base site, the callback uses the general example. A mapped empty file
is read as an empty string and remains an explicit empty override. The utility
sends HTTP 200 with `Content-Type: text/plain; charset=utf-8` for both the
example and custom content.

Register `configureBaseSiteAwareRoutes` once for the Express application and
reuse its `createBaseSiteAwareRoute` function. Keep the custom route after
applicable protective middleware and before static handlers and the Angular SSR
catch-all. For details about OCC URL patterns, resolver failures, and the route
factory, see [Base-Site-Aware Express Routes](../express-base-site/README.md).

## Use the response utility

Call `sendRobotsTxtResponse(res)` to send the general example. Pass complete
content as the second argument to replace it:

```typescript
sendRobotsTxtResponse(res, customRobotsTxt);
sendRobotsTxtResponse(res, ''); // Sends an empty body; it does not use the example.
```

The override is sent verbatim; the utility does not merge directives or add
paths. Review the final file for each site's routing and crawler policy before
deploying it.

## Public references

- [Robots Exclusion Protocol (RFC 9309)](https://www.rfc-editor.org/rfc/rfc9309.html)
- [Spartacus route configuration](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/routes/route-configuration.md)
- [Spartacus multi-site configuration](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/context/context-configuration.md)
- [Spartacus CMS component guards](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/components/customizing-cms-components.md)
- [Spartacus HTML tags and robots metadata](https://github.com/SAP/spartacus-docs/blob/27ec186b04da294fc283bc97ce425a321e5f5823/_pages/dev/seo/html-tags.md)
