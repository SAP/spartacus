# Browser acceptance for changed storefront UI

Use after implementing a UI feature, before claiming it works. Compilation cannot establish the selected image, actual layout, request behavior or responsive interaction. When a local preview and browser tools are available, exercise the changed states and repair observed failures before finishing. Keep the checks proportional to the feature; do not audit unrelated pages. If the environment prevents execution, report that limitation and the exact unverified behavior.

## Choose acceptance checks from the request

State what must remain true before looking at the result: requested content, links, order, dimensions, selections and exact computed answers. A faster page that loses content or changes business results fails. Include a fresh navigation at representative narrow and wide widths and the changed interactions/revisits. Use the project's existing browser test command or connected browser tools. If the project supplies `npm run browser`, read its interface and use it rather than installing another runner.

For the changed feature, inspect:

- **Media:** native `img`/`picture`, `currentSrc`, decoded dimensions, loading/priority and actual network requests. Check first render through hydration. The intended crop must load; an unintended crop must not. Keep every request attempt, including repeated URLs and cancellations. For a duplicate-download claim, capture the same interaction in a fresh browser context with normal HTTP caching and no request interception. Check each matching URL, response status, cache flags, bytes and decoded image. A cached reuse, canceled request, redirect, range response or header-only completion can add an event without delivering the image twice. Count initial-load/hydration separately from later selections, viewport changes and revisits, which may legitimately fetch again.
- **Layout:** reserved slot and loaded image fitting, mobile/desktop columns, text/link order and overflow. Check the generated child image as well as the `cx-media` host. A clipped oversized image is not evidence that the requested geometry is correct.
- **Banner navigation.** On phone and desktop, tap or click the center of a retained banner or logo’s visible image using a real pointer. Verify its expected destination, go back, then exercise the changed CTA and back navigation. A matching image URL and `href` do not establish that the visible pixels receive the click.
- **Hidden states:** closed/inactive media stays unrequested when that is required; opening produces the full requested content; closing and reopening preserve intended state.
- **Interaction work:** verify exact outputs, pending/error/cancel states and a second control while work runs. Capture the browser trace or Event Timing when responsiveness is at issue. A yielding function in source, a completed calculation or one click duration alone does not prove responsive feedback.

If a check fails, use the observed DOM, request initiator and computed styles to fix the cause, then rerun the same acceptance conditions. Preserve the failed evidence and record the new attempt. Avoid weakening checks to match an implementation.

## Optional local verifier

The packaged [verify-browser.mjs](../scripts/verify-browser.mjs) records network attempts by phase, native image selection/geometry, functional assertions and viewport screenshots. It is a reusable acceptance helper, not an independent performance evaluator. It uses existing `playwright` or `playwright-core` and an installed Chromium browser; it does not install dependencies, start a server, build the project or modify application source.

Run against an authorized local development preview:

```sh
node path/to/skill/scripts/verify-browser.mjs --plan browser-plan.json --out browser-evidence/attempt-01.json --browser /path/to/chrome
```

`--tools /path/to/node_modules` selects existing Playwright dependencies. `--base-url http://127.0.0.1:4200/` overrides `url` when a trusted project wrapper starts an ephemeral preview. The exported API is `verifyBrowser(plan, { baseUrl, output, tools, executablePath, browser, waitUntilReady })`; a supplied Playwright browser remains owned by the caller. A trusted wrapper may supply `waitUntilReady(page)` to await actual application readiness, throwing on failure. It runs after navigation and before observations. Use a new output path for every attempt. Exit codes: 0 = declared checks pass; 1 = acceptance failure; 2 = invalid plan or infrastructure error. Inspect the JSON, not only the exit code.

This example checks an existing banner with two artwork crops and an initially closed details panel. Replace selectors, URLs, content and viewport dimensions with the actual feature contract; do not copy its values unchanged:

```json
{
  "version": 1,
  "url": "http://127.0.0.1:4200/",
  "root": "app-seasonal-banner",
  "readySelector": "app-seasonal-banner button",
  "viewports": [
    { "name": "narrow", "width": 390, "height": 844 },
    { "name": "wide", "width": 1280, "height": 900 }
  ],
  "steps": [
    {
      "name": "initial",
      "checks": {
        "text": [{ "selector": "h1", "value": "Find your next trip" }],
        "images": [{
          "selector": ".artwork-frame img",
          "within": ".artwork-frame",
          "fill": true,
          "currentSrc": { "narrow": "/media/portrait.jpg", "wide": "/media/landscape.jpg" }
        }],
        "network": [
          {
            "name": "one-selected-crop-through-hydration",
            "urls": ["/media/portrait.jpg", "/media/landscape.jpg"],
            "selected": { "narrow": "/media/portrait.jpg", "wide": "/media/landscape.jpg" },
            "minRequests": 1,
            "maxRequests": 1
          },
          { "name": "closed-details", "urls": ["/media/details.jpg"], "maxRequests": 0 }
        ]
      }
    },
    {
      "name": "open-details",
      "action": { "kind": "click", "selector": "#details-toggle" },
      "checks": {
        "text": [{ "selector": "#details h2", "value": "Trip details" }],
        "images": [{ "selector": "#details img", "currentSrc": "/media/details.jpg", "within": "#details" }],
        "network": [{ "urls": ["/media/details.jpg"], "minRequests": 1, "maxRequests": 1 }]
      }
    }
  ]
}
```

The first step has no action and includes navigation/hydration requests. Every later step begins a new phase. Supported actions are `click`, `fill`, `select`, `check`, `uncheck`, `press` and `scroll`; each needs one matching `selector`, with `value` for fill/select/press. Prefer existing meaningful selectors and explicit expected text/count/attribute/property/image checks. Text checks are exact by default (`exact: false` permits containment). `count` uses `{ "selector": "...", "value": 3 }`; `attribute` uses `attribute`, and `property` uses `property` alongside selector/value. Expected values may map viewport names to values. A network group matches full resolved URLs, preserving query strings, and constrains the number of attempts and optional selected URL; failed or unfinished matching attempts fail it. The helper disables HTTP caching and records attempts without transfer byte counts. A zero maximum asserts no request. Revisit phases should reflect the application's caching contract rather than blindly require a new download.

Each phase waits for its `readySelector` (or the plan's/root), network idle and 250 ms settling. An SSR root existing does not prove hydration: use the application's readiness marker or trusted wrapper and exercise working interactions. The report distinguishes selector-only readiness from a wrapper-confirmed state. Set `timeoutMs` and `settleMs` only when the feature needs other bounded conditions. Continuous polling may need existing browser tooling instead. The helper checks visible viewport images and document horizontal overflow automatically; `allowDocumentOverflow: true` is only for an explicitly required document-level scrolling layout. Image `within` compares the native image box with the named slot; `fill` additionally requires equal dimensions. These checks do not inspect pre-load reservation or certify every aspect of layout/accessibility. Review screenshots and add the relevant checks.

Entry navigation is restricted to loopback. External resource origins must be explicitly listed in `allowResourceOrigins`; use ordinary existing browser tools for authenticated or remote storefronts. Exercise only authorized development/test actions; do not point an action plan at checkout or other real transactions.

## Report what was actually verified

Record route, widths, actions, assertions, screenshot/network evidence and unresolved failures. Separate functional browser acceptance from measured performance. For a speed claim, use repeated comparable before/after measurements with the same data and environment; keep missing observations and regressions. A passing helper report is not an LCP/CLS/INP improvement. See [media verification](performance.md#verify-behavior-before-claiming-improvement) and [interaction verification](performance-interactions.md).
