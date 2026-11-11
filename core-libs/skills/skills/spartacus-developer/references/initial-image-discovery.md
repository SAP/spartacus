# Initial image discovery in a customer storefront

Inspect the **original navigation response** and the final LCP element. Follow the customer's deployed document server, edge rule or Angular index through CMS rendering. SSR support in the build does not establish which HTML a particular visitor receives.

## Establish the placement before publishing a hint

Use one versioned publication record for the artwork **and its visible feature**. Key it by the exact allowed origin and canonical document path, including the deployment prefix, site, language and currency used by that storefront. Include both slash forms only when the app treats them identically. A CMS UID or a URL with the expected number of path segments cannot identify a publication. Keep the normal CMS content on other storefronts, even when they reuse that UID. In SmartEdit, use the actual preview content.

The [executable matcher](../scripts/published-image-placement.mjs) accepts a map of exact document URLs and an explicit published-mode decision. Each record declares `publicForAllVisitors: true`, its current crops, optional `acceptTrailingSlash` and an exact list of `inertTrackingParameters` verified for this app. Pass the full URL including its query string. Empty tracking lists are a safe default. Unknown parameters, query-based site/locale/currency overrides, preview tickets such as `cmsTicketId`, and preview modes must skip the hint. Never list a content selector as tracking. If cookies, headers, time, experiments, a member's identity or a private catalog can change eligibility, use the actual authorized data boundary. A static shell cannot infer a private audience. Keep shared HTML, `Link` headers and transfer state free of private asset URLs and customer data. A public decorative image on an account page still needs evidence that every recipient sees it.

## Choose the document entry

- **SSR or prerender.** Inspect the delivered native picture/image and its request initiator. When the parser already starts the correct request promptly, keep it. If discovery is late, emit a page-specific head preload. Check for an existing SSR `NgOptimizedImage` priority hint, particularly for a fallback image inside an art-directed picture.
- **Native server or edge serving a CSR index.** Apply the matcher to the actual GET document response before sending the shared index. Use the validated public origin from deployment configuration. Preserve origin validation, other headers, hydration and fallback paths. Bind HTML/CDN cache entries to publication context and invalidate them with the CMS update. Skip redirects, errors, assets and API responses.
- **Customer-owned static shell.** If the early shell can resolve the same public context synchronously, run a small CSP-compatible head entry before Angular bootstrap. Embed or build the small public manifest into that entry. An extra blocking fetch for the lookup postpones discovery. For example, after resolving the actual publication mode:

```js
const placement = selectPublishedPlacement(location.href, publications, isPublishedDocument);
for (const crop of placement?.crops ?? []) {
  const hint = document.createElement('link');
  hint.rel = 'preload';
  hint.as = 'image';
  hint.media = crop.media;
  hint.href = crop.url;
  hint.fetchPriority = 'high';
  document.head.append(hint);
}
```

- **CMS-only or private placement.** Render the native image promptly when the owning component receives the correct data. For account/loyalty views, inspect an anonymous navigation and an authorized test session. Reuse authenticated SSR only when the existing server demonstrably performs per-request authorization and keeps the result private. Otherwise send the normal neutral shell, reserve space, then resolve the feature in the authorized client context.

Use one hint publisher. Give art-directed crops complementary `media` conditions identical to the final picture. For resolution variants mirror `srcset`/`sizes` in `imagesrcset`/`imagesizes`. Match the resolved CDN URL, version, query and request credentials. HTML can select responsive artwork once the document viewport exists. A supported HTTP `Link` or 103 hint can announce a single already-known URL. [Responsive preloads](https://web.dev/articles/preload-responsive-images) · [Angular SSR image hints](https://angular.dev/guide/image-optimization)

## Check the boundary before timing

When changing a shared shell or document server, add a cheap automated matrix **against the actual emitter before bootstrap**. Delay the Angular entry or CMS response in a separate diagnostic so later component work cannot hide a mistake. The canonical URL, its supported trailing slash and each approved tracking parameter should emit the intended hint. A product URL, another actual base site/language/currency (change one dimension at a time), preview/ticket, unrecognized override and unsupported host must emit zero matching hints, headers or artwork requests. Check both narrow and wide widths. On each excluded storefront, resume bootstrap and assert that the scoped promotion is absent and the expected local CMS content is visible. Also exercise a new publication and verify that the old URL disappears.

Then perform ordinary fresh visits with passive network observation and normal caching. Match the native `currentSrc` to the first image request, its initiator and its start relative to document TTFB, the applicable CMS response and image insertion. SSR or transferred state may have no browser-side CMS request. Verify decode and count successful positive-byte transfers per selected URL across hydration. Keep attempts, cache hits, cancellations and unflagged zero-byte completions distinguishable. The [browser acceptance helper](browser-verification.md) checks visible content and request attempts.

Run the [image discovery gate](../scripts/verify-image-discovery.mjs) against a public loopback deployment with the same shell and entry scripts as production. Supply your own placement rules, supported widths, exact crop URLs and rendered readiness selectors. Add the preview, override and alternate storefront URLs from your matrix. For example:

```json
{
  "version": 1,
  "baseUrl": "http://127.0.0.1:4200",
  "bootstrapScripts": ["/main-*.js"],
  "viewports": [
    {"name":"phone","width":390,"height":844,"mobile":true,"crop":"/images/narrow.jpg"},
    {"name":"desktop","width":1280,"height":900,"crop":"/images/wide.jpg"}
  ],
  "pages": [
    {"name":"public home","url":"/","eligibility":"eligible","readySelector":"main .hero","imageSelector":"main .hero img"},
    {"name":"preview","url":"/?cmsTicketId=fixture","eligibility":"excluded","readySelector":"main .cms-content"}
  ]
}
```

```sh
node "$SKILL/scripts/verify-image-discovery.mjs" --plan placement.json --out evidence/discovery.json --tools /path/to/playwright-project
```

Use a fresh output filename. `--tools` selects an existing Playwright installation, `--browser` an optional Chromium executable, and `--base-url` a different loopback base. Allow public OCC/CDN origins with `allowResourceOrigins` (exact origins). Supply each crop’s optional `sha256` to check its bytes. `bootstrapScripts` lists same-origin entry pathname globs observed on **each** page. Only `*` is a wildcard. Identify every bundle that can bootstrap the app. The first visit holds these bundles and permits inline head scripts. With entirely inline bootstrap or an unobserved barrier, early discovery cannot be established by this probe.

The second visit uses a fresh context, normal HTTP caching and a passive network listener. It records confirmed image transfers, cache hits and uncertain attempts with their wire evidence. Set `imageSelector` on eligible pages to verify visible, decoded `currentSrc`. Exit 0 means all checks passed, 1 means an observed failure, and 2 means an inconclusive run or invalid configuration. A timeout, partial body or ambiguous cache event cannot establish a successful comparison.

Compare repeated FCP **and** LCP against the same baseline and report both directions. Early high-priority image bytes can contend with CSS, fonts and initial text. Check image request delay, transfer duration and final LCP element before attributing a paint change to discovery.
