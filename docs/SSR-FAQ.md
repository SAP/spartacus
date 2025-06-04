# SSR FAQ

SSR (Server-Side Rendering) is a technique that allows us to generate the full HTML for a given URL on the server side in NodeJS, before sending it to the client. Thanks to this, the browser can receive the HTML and paint it immediately, without waiting for the JavaScript to be downloaded and executed in the browser.

## How to run SSR for development purposes

During development, it's convenient to have automatic rebuilds after file changes. For this purpose, please run:

```
npm run dev:ssr
```

From now on, any changes to the source code files will trigger a re-build and re-start of the SSR server.

## Why SSR runs only on the first page visit (and full page reloads)

On the first page visit in the browser, a HTTP request is sent to the SSR server, which simulates the storefront SPA in NodeJS, generates the Server-Side Rendered HTML and returns in the HTTP response to the browser.
Then browser will paint this HTML and then the JavaScript of the SPA is downloaded to the browser and executed there (i.e. the SSR HTML is "hydrated" with JS) and from now Angular will control changes to the DOM and drive the subsequent navigations within the storefront app. In particular, any subsequent links' clicks or calls of  `RoutingService.go()` within the storefront app are just "virtual" navigations (without doing full HTTP roundtrips to the SSR server) within the browser. Only when full-reloading the page in the browser, the HTTP request is sent to the SSR server again to get the Server-Side Rendered HTML.

## How to build and run SSR without watch mode

### Prod mode

For a **prod** mode build please run:

- prerequisite: build libs - `npm run build:libs` (because the prod build of the app will require libs to be built in prod mode)
- build - `npm run build` (builds app in prod mode by default)
- serve - `npm run serve:ssr:dev` (again, `:dev` in this case tells to ignore insecure TLS cert of our dev OCC backend)

After making any changes to the contents of the libs, you should re-build the libs, then re-build the `storefrontapp` and then restart the SSR server.

**Note**: When running SSR built in prod mode, the JSON logs won't be pretty-printed in multiple lines like in dev mode. It's on purpose for being machine-readable. For more, see our official docs on [Standardized SSR Logging](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/a54ac5aff3f6434aa1ed08a68e25084b.html?q=pino%20logger#loio774a605686694c1b9a7cadff708d072c).

### Dev mode

It's possible to build the app in **dev** mode without watch mode. Although it's not practical, it's possible to do so.

For a **dev** mode build please run:

- build - `npm run build -- --configuration development` (builds app in **dev** mode; yes use "--" in the middle)
- serve - `npm run serve:ssr:dev` (`:dev` in this case tells to ignore insecure TLS cert of our dev OCC backend)

After making any changes to the contents of the libs or the `storefrontapp`, you should rerun the first command, and then restart the SSR server.

## What is a CSR fallback

CSR fallback is a performance heuristic technique implemented in Spartacus `OptimizedSsrEngine` to prioritize returning _something_ to the client rather than waiting too long the the Server-Side-Rendered HTML. CSR fallback returns a generic "empty" HTML of a regular SPA with no meaningful content, but just `<script>` tags, so when it arrives to the browser, it loads the JavaScript of the SPA and render the full content the regular way in the browser. 

In such case, even when the Server-Side Rendered HTML is eventually generated it's ignored, because the SSR server already responded to the HTTP request with a "CSR fallback" HTML.
That said, such an ignored Server-Side Rendered HTML is still stored in the SSR server's cache, so when the same URL request is made again, the SSR server will return the cached Server-Side Rendered HTML, without causing the new Server-Side Rendering to happen again, and then this cache entry is purged (unless the `cache` property of the `SsrOptimizationOptions` is set to `true` - then the cache entry is preserved longer).

## When a CSR fallback happens

1. Request waited too long for a Server-Side Rendered HTML response (e.g. because of too long responses from the upstream backend)
When the incoming HTTP request awaits for the Server-Side Rendered HTML for too long, the SSR server responds to the CSR fallback.

It's the `timeout` property of the `SsrOptimizationOptions` defined in `server.ts` that controls the max time the SSR server will wait for the Server-Side Rendered HTML. By default it's 3 seconds in customer's apps. It's an important performance optimization for customer's production apps. But for development purposes this timeout mechanism is not needed, therefore it has a generous value of 30 seconds in our repo in `package.json` scripts like `serve:ssr:watch`, `serve:ssr:dev` (and transitively `dev:ssr`) by passing `SSR_TIMEOUT=30000` environment variable.

2. SSR server is overloaded because of too many pending renderings
When there are too many requests and renderings in parallel for the SSR server, it will refuse to perform the full Server-Side Rendering, to prevent the server from being overwhelmed (and from slowing down the response time). In this case, the SSR server will fallback to CSR for new incoming requests.

It's the `concurrency` property of the `SsrOptimizationOptions` defined in `server.ts` (by default implicitly set to `10`) controls the max number of concurrent renderings in the SSR server

## Troubleshooting

### Resolving "JavaScript Heap Out of Memory" Error When Running SSR Server

When starting Spartacus SSR with npm `run dev:ssr`, you may encounter the following error in the terminal:

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

This issue occurs because the default memory limit for Node.js has been exceeded. To resolve this, you can increase the memory allocation by running the following shell command. For convenience, you can put this command to your `~/.bashrc` (or `~/.zshrc`) and reopen your terminal. Thanks to this, you'll never need to remember to run this command manually again, because it will run automatically on the startup of your terminal:

`export NODE_OPTIONS="$NODE_OPTIONS --max-old-space-size=8192"`

This command sets the maximum memory limit for Node.js to 8192 MB (8 GB), allowing the SSR server to run without memory-related issues.

### Display only HTML generated by SSR

To view only the HTML output from SSR (without client-side rendering), you can disable JavaScript in your browser. In Chrome, this can be done by navigating to:

Settings-> Preferences -> Debugger -> Disable JavaScript

This helps you distinguish between content rendered by SSR and content rendered by CSR.
