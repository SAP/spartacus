# Creating a new app using Spartacus v2211

## You must run `ng new` with a new flag `--standalone=false`

Since Angular v17, the command for creating a new app (`ng new`) must be run with the flag `--standalone=false`. Otherwise Spartacus installer won't work (`ng add @spartacus/schematics`).

**Why**: Since Angular 17, new applications are created by default using a new so-called "standalone" mode, which has a bit *different structure of files* in the app folder then before. However Spartacus schematics installer still expects the *old files structure* in a created Angular app. That's why the flag  `new new --standalone=false` is required before running Spartacus installation schematics.

## Workaround other issues after creating a new app

After creating successfully a new Angular 17+ app, you must make additional manual changes in the app's configuration files to workaround other issues introduced by Angular 17.

### Disable SSR and Prerendering for `ng serve`

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

**Why**: Since Angular 17, in freshly created new apps (not migrated ones from Angular 16!) Angular runs SSR and Prerendering by default a part of `ng serve` and `ng build` commands. Unfortunately Angular 17 also introduced a new bug: *`server.ts` file is _totally ignored_ during the `ng serve` command (see Angular issue https://github.com/angular/angular-cli/issues/26323)*. Spartacus to work correctly, requires `server.ts` file to be included in the compilation and execution. Therefore, for Spartacus to work, as a workaround, you have to disable SSR and Prerendering for `ng serve` in your `angular.json`.

### Disable Prerendering for `ng build`
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

**Why**: Since Angular 17, in freshly created new apps (not migrated ones from Angular 16!) Angular runs Prerendering by default a part of `ng build` commands (and transitively also for `ng serve`). But Spartacus, for Prerendering to work correctly, requires a custom Node Environment Variable `SERVER_REQUEST_ORIGIN` to be defined. Otherwise Spartacus Prerendering would fail with an error about missing `SERVER_REQUEST_ORIGIN`. So as a workaround, you have to disable Prerendering for the `ng build`, to be able to build app at least for CSR or SSR. 

### Appendix A: How to run SSR dev server

Run in _2 separate windows_ of terminal:
```bash
# Terminal 1:
npm run watch  # builds the app in watch mode. It compiles `server.ts` file as well and produces an output compiled file `dist/(my-app-name)/server/server.mjs`
```
and
```bash
# Terminal 2:
node --watch dist/(my-app-name)/server/server.mjs # run the compiled server.mjs in watch mode
```
Note: Please mind to replace `(my-app-name)` with the real name of your app.

### Appendix B: How to run Prerendering

Run in terminal `ng build` with the explicit flag `--prerender=true` and passing a custom Node Env Variable `SERVER_REQUEST_ORIGIN` which is required by Spartacus Prerendering.

```bash
SERVER_REQUEST_ORIGIN="http://localhost:4200" ng build --prerender=true
```
Note: Please mind to replace `"http://localhost:4200"` with a real target domain where you want to deploy your your Prerendered pages, especially if you deploy for production. Otherwise, some of SEO features of Spartacus might be not work properly, e.g. [Canonical URLs](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/e712f36722c543359ed699aed9873075.html#loio98befe9ef9ae4957a4ae34669c175fd5) might point to a wrong domain or [Automatic Multi-Site Configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/9d2e339c2b094e4f99df1c2d7cc999a8.html) might not recognize base-side correctly (e.g. if some regexes configured in CMS for base-site recognition depend on the domain name).
