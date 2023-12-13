# Creating a new app using Spartacus v2211

## You must run `ng new` with a new flag `--standalone=false`

Since Angular v17, the command for creating a new app (`ng new`) must be run with the flag `--standalone=false`. Otherwise Spartacus installer won't work (`ng add @spartacus/schematics`).

**Why**: Since Angular 17, new applications are created by default using a new so-called "standalone" mode, which has a bit *different structure of files* in the app folder then before. However Spartacus schematics installer still expects the *old files structure* in a created Angular app. That's why the flag  `new new --standalone=false` is required before running Spartacus installation schematics.

## Disable SSR and Prerendering for `ng serve`

In `angular.json` of newly created app make the following 2 changes:
1. in the section `projects › (my app name) › architect › build › configurations` add a new subsection `"noSsr"` _as a sibling_ to other configurations `"production"` and `"development"`:
```diff
  {
    "projects": {
      ...
      "(my app name)": {
        ...
        "architect": {
          ...
          "build": {
            ...
            "configurations": {
              "production": {
                ...
              },
              "development": {
                ...
              },
+             "noSsr": {
+               "ssr": false,
+               "prerender": false
+             }
            },
```
2. In the section `projects › (my app name) › architect › serve › configurations` append a string `,noSsr` (including comma) to the value of the properties `"buildTarget"` - both for 2 sections `"production"` and `"development"`:
```diff
  {
    "projects": {
      ...
      "(my app name)": {
        ...
        "architect": {
          ...
          "serve": {
            ...
            "configurations": {
              "production": {
-               "buildTarget": "test-ng17:build:production"
+               "buildTarget": "test-ng17:build:production,noSsr"
              },
              "development": {
-               "buildTarget": "test-ng17:build:development"
+               "buildTarget": "test-ng17:build:development,noSsr"
              }
            },
```

**Why**: Since Angular 17, in freshly created new apps (not the migrated from old version ones!) Angular runs SSR and Prerendering by default a part of `ng serve` and `ng build` commands. Unfortunately Angular 17 also introduced a bug: `server.ts` file is _totally ignored_ during the `ng serve` command (see Angular issue https://github.com/angular/angular-cli/issues/26323). Spartacus to work correctly, requires `server.ts` file to be loaded. Therefore, for Spartacus to work, as a workaround, we have to disable SSR and Prerendering for `ng serve`.

## Disable Prerendering for `ng build`
In `angular.json` of newly created app make the following change:
In the section `projects › (my app name) › architect › build › options` remove the line `prerender: true`:

```diff
  {
    "projects": {
      ...
      "(my app name)": {
        ...
        "architect": {
          ...
          "build": {
            ...
            "options": {
              "production": {
                ...
-               "prerender": "true"
              }
            },
```

**Why**: Since Angular 17, in freshly created new apps (not the migrated from old version ones!) Angular runs Prerendering by default a part of `ng build` commands (and transitively also for `ng serve`). But Spartacus, for Prerendering to work correctly, requires a custom Node Environment Variable `SERVER_REQUEST_ORIGIN` to be defined. Otherwise Spartacus Prerendering would fail with errors about missing `SERVER_REQUEST_ORIGIN`. So as a workaround, we exclude Prerendering from the `ng build`, to be able to build app at least for CSR or SSR. 

## Bonus: How to run SSR dev server

Run in 2 parallel windows of terminal:
```bash
npm run watch  # builds the app in watch mode. It compiles `server.ts` file as well, so there are no problems later with Spartacus. It produces an output compiled file `dist/(my-app-name)/server/server.mjs`
```
and
```bash
# run the compiled server.mjs in watch mode
node --watch dist/(my-app-name)/server/server.mjs
```
Note: Please mind to replace `(my-app-name)` with the real name of your app.

We're actively observing the Angular issue https://github.com/angular/angular-cli/issues/26323, hoping to be able to get rid of above mentioned workarounds

## Bonus: How to run Prerendering

```bash
SERVER_REQUEST_ORIGIN="http://localhost:4200" ng build --prerender=true
```
Note: Please mind to replace `"http://localhost:4200"` with a real target domain where you want to deploy your your Prerendered. Otherwise, some of Spartacus SEO features might use wrong domain e.g. [Canonical URLs](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/e712f36722c543359ed699aed9873075.html#loio98befe9ef9ae4957a4ae34669c175fd5) might point to wrong domain or [Automatic Multi-Site Configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/9d2e339c2b094e4f99df1c2d7cc999a8.html) might not work correctly (e.g. if some regexes configured in CMS for base-site recognition depend on the domain name).
