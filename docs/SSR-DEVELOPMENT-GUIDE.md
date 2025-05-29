# SSR DEVELOPMENT GUIDE

SSR (Server-Side Rendering) is a technique that allows us to generate the full HTML for a given URL on the server side in NodeJS, before sending it to the client. Thanks to this, the browser can receive the HTML and paint it immediately, without waiting for the JavaScript to be downloaded and executed in the browser.

## How to run SSR for development purposes

During development, it's convenient to have automatic rebuilds after file changes. For this purpose we'll use 2 terminal windows side by side - one for build in watch mode, and second for serving the app in watch mode.

Please open 2 terminal windows side by side and run there:
- `npm run watch` in the first terminal window
- (wait after the first terminal window output shows "Application bundle generation complete") and then run `npm run serve:ssr:watch` in the second terminal window

From now on, any changes to the source code files will trigger a re-build in the first window. And the changed contents of the /dist folder for the app will trigger re-start of the server in the second window.

## How to build and run SSR without watch mode

### Prod mode

For a **prod** mode build please run:
- prerequisite:  build libs - `npm run build:libs` (because the prod build of the app will require libs to be built in prod mode)
- build - `npm run build` (builds app in prod mode by default)
- serve - `npm run serve:ssr:dev` (again, `:dev` in this case tells to ignore insecure TLS cert of our dev OCC backend)

After making any changes to the contents of the libs, you should re-build the libs, then re-build the `storefrontapp` and then restart the SSR server.


**Note**: When running SSR built in prod mode, the JSON logs won't be pretty-printed in multiple lines like in dev mode. It's on purpose for being machine-readable. For more, see our official docs on [Standardized SSR Logging](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/a54ac5aff3f6434aa1ed08a68e25084b.html?q=pino%20logger#loio774a605686694c1b9a7cadff708d072c).

### Dev mode

It's possible to build the app in **dev** mode without watch mode. Although it's not practical, it's possible to do so.

For a **dev** mode build please run:
- build - `npm run build -- --configuration development` (builds app in **dev** mode; yes use "--" in the middle)
- serve -  `npm run serve:ssr:dev` (`:dev` in this case tells to ignore insecure TLS cert of our dev OCC backend)

After making any changes to the contents of the libs or the `storefrontapp`, you should rerun the first command, and then restart the SSR server.
