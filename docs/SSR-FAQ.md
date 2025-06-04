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

Then browser will paint this HTML and then the JavaScript of the SPA is downloaded to the browser and executed there (i.e. the SSR HTML is "hydrated" with JS) and from now Angular will control changes to the DOM and drive the subsequent navigations within the storefront app. In particular, any subsequent links' clicks or calls of `RoutingService.go()` within the storefront app are just "virtual" navigations (without doing full HTTP roundtrips to the SSR server) within the browser. Only when full-reloading the page in the browser, the HTTP request is sent to the SSR server again to get the Server-Side Rendered HTML.

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

## Troubleshooting

### Resolving "JavaScript Heap Out of Memory" Error When Running SSR Server

When starting Spartacus SSR with npm `run dev:ssr`, you may encounter the following error in the terminal:

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

This issue occurs because the default memory limit for Node.js has been exceeded. To resolve this, you can increase the memory allocation by running the following shell command. For convenience, you can put this command to your `~/.bashrc` (or `~/.zshrc`) and reopen your terminal. Thanks to this, you'll never need to remember to run this command manually again, because it will run automatically on the startup of your terminal:

`export NODE_OPTIONS="$NODE_OPTIONS --max-old-space-size=8192"`

This command sets the maximum memory limit for Node.js to 8192 MB (8 GB), allowing the SSR server to run without memory-related issues.
