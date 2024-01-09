# Creating a new app using Spartacus v2211

### Appendix A: How to run SSR dev server

Run in _2 separate windows_ of terminal:
```bash
# Terminal 1:
npm run watch  # builds the app in watch mode. It compiles `server.ts` file as well and produces an output compiled file `dist/my-app-name/server/server.mjs`
```
and
```bash
# Terminal 2:
node --watch dist/my-app-name/server/server.mjs # run the compiled server.mjs in watch mode
```

Note: Please mind to replace `my-app-name` with the real name of your app.

### Appendix B: How to run Prerendering

Run in terminal `ng build` with the explicit flag `--prerender=true` and passing a custom Node Env Variable `SERVER_REQUEST_ORIGIN` which is required by Spartacus Prerendering.

```bash
SERVER_REQUEST_ORIGIN="http://localhost:4200" ng build --prerender=true
```
Note: Please mind to replace `"http://localhost:4200"` with a real target domain where you want to deploy your your Prerendered pages, especially if you deploy for production. Otherwise, some of SEO features of Spartacus might be not work properly, e.g. [Canonical URLs](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/e712f36722c543359ed699aed9873075.html#loio98befe9ef9ae4957a4ae34669c175fd5) might point to a wrong domain or [Automatic Multi-Site Configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/9d2e339c2b094e4f99df1c2d7cc999a8.html) might not recognize base-side correctly (e.g. if some regexes configured in CMS for base-site recognition depend on the domain name).
