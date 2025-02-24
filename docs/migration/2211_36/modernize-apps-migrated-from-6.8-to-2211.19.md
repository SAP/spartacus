# Modernize apps upgraded from Spartacus 6.8 to 2211.19

Angular v17 introduced a new Angular CLI configuration format, which was not recommended initially by the Spartacus team with v2211.19 due to initial compatibility issues.

Now Spartacus team recommends to use the new Angular CLI configuration format and provides the detailed migration guide. **This guide is applicable only for the apps migrated previously from Spartacus 6.8 to 2211.19** (i.e. from Angular v15 to v17). In other words, the apps created initially with Spartacus 2211.19+ should skip this guide.

The benefits of using the new Angular configuration format are:
- faster builds: application builds are quicker, making life easier and saving time for developers
- being future-proof: any new Angular and Spartacus features might require you to use the new configuration format as a prerequisite

The side-effect consequences of using the new configuration format are:
- For SSR apps: the server-side rendering and prerendering scripts will be executed differently (it will be explained in the last section of this page "[New commands for SSR projects](#new-commands-for-ssr-projects)")


# Automatic migration

The Spartacus team provides special schematics that automatically modernize the app to look as much as possible like the new Angular 17 apps.

Note: the tool was released only in `@spartacus/schematics` v2211.36.0, but you need to run it before fully upgrading your app to this version.
To do this, you'll need to install `@spartacus/schematics@2211.36.0` in a temporary directory and execute the migration schematic from there.

Please run those commands from your project root directory:

```bash
# 1. Create a temporary sibling directory for the isolated Schematics v2211.36 installation
node -e "require('fs').mkdirSync('../temp-schematics-36')"

# 2. Install schematics in the temporary directory
npm install @spartacus/schematics@2211.36.0 --prefix ../temp-schematics-36

# 3. Execute in your project the schematics from the temporary directory
ng g ../temp-schematics-36/node_modules/@spartacus/schematics:modernize-app-migrated-from-6_8-to-2211_19

# 4. Clean up the temporary directory
node -e "require('fs').rmSync('../temp-schematics-36', { recursive: true, force: true })"
```

In case of any issues during the automatic migration, you can always fall back to the manual migration steps below.

> ⚠️ Warning:
>
> Reminder for SSR apps: from now on the server-side rendering and prerendering scripts will be executed differently (see the last section of this page "[New commands for SSR projects](#new-commands-for-ssr-projects)")

In case of any issues during the automatic migration, you can always fall back to the manual migration steps below.

# Manual migration

Here are the migration steps in detail:

## Migration to the new Angular `application` builder

### `angular.json`

1. In the section `architect > build` please change the value `"builder": "@angular-devkit/build-angular:browser",`
   to `"builder": "@angular-devkit/build-angular:application",`

```diff
        "architect": {
          "build": {
-           "builder": "@angular-devkit/build-angular:browser",
+           "builder": "@angular-devkit/build-angular:application",
```

Why: we're configuring here the new `application` builder for Angular v17 and later, which is the recommended fast and future-proof builder for Angular v17 and later.

1. In the section `architect > build > options` please apply the all the following modifications, to adapt to the new configuration format for the new builder:

2.1 rename the property `"main"` to `"browser"`

```diff
        "architect": {
          "build": {
           "options": {
-             "main": "src/main.ts",
+             "browser": "src/main.ts",
```


2.2. In the section `architect > build > configurations > development` please remove 3 properties: `"buildOptimizer"`, `"vendorChunk"`, `"namedChunks"`

```diff
        "architect": {
          "build": {
           "configurations": {
             "development": {
-              "buildOptimizer": false,
-              "vendorChunk": true,
-              "namedChunks": true
```

### `tsconfig.json`

In the `"compilerOptions"` section, please:

1. Remove the properties `"baseUrl"`, `"forceConsistentCasingInFileNames"`, `"downlevelIteration"`, 
2. Add `"skipLibCheck": true`, `"esModuleInterop": true`

```diff
   "compilerOptions": {
-    "baseUrl": "./",
-    "forceConsistentCasingInFileNames": true,
-    "downlevelIteration": true,
+    "skipLibCheck": true,
+    "esModuleInterop": true,
},
```

## For SSR projects, additionally:

### `angular.json`

1. In the section `architect > build > options` please apply all the following modifications:

1.1 In the property `"outputPath"` please remove the ending `"/browser"` from the string value.

```diff
        "architect": {
          "build": {
            "options": {
-             "outputPath": "dist/YOUR-APP-NAME/browser",
+             "outputPath": "dist/YOUR-APP-NAME",
```

1.2 Please add 3 new options with values: `"server": "src/main.server.ts"`, `"prerender": false`, `"ssr": { "entry": "server.ts" }`

```diff
        "architect": {
          "build": {
           "options": {
+             "server": "src/main.server.ts",
+             "prerender": false,
+             "ssr": {
+               "entry": "server.ts"
+             }
```

2. In the section `architect > build > configurations` please add a new property with object value `"noSsr": { "ssr": false, "prerender": false }`

```diff
        "architect": {
          "build": {
            "configurations": {
+             "noSsr": {
+               "ssr": false,
+               "prerender": false
+             }
```

3. In the section `architect > serve > configurations` (please mind now the section is `serve` not `build`!) please add the ending `,noSsr` (with the preceding comma) at the end of the string values in subsections `... > production > buildTarget` and `... > development > buildTarget`:

```diff
        "architect": {
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
              "configurations": {
                "production": {
-                 "buildTarget": "YOUR-APP-NAME:build:production"
+                 "buildTarget": "YOUR-APP-NAME:build:production,noSsr"
                },
                "development": {
-                 "buildTarget": "YOUR-APP-NAME:build:development"
+                 "buildTarget": "YOUR-APP-NAME:build:development,noSsr"
                }
```


4. Please remove the whole 3 sections `architect > server`, `architect > serve-ssr` and `architect > prerender` (because their responsibilities are now handled just by the single new Angular `application` builder)

```diff
       "architect": {
-        "server": {
-          "builder": "@angular-devkit/build-angular:server",
-          "options": {
-            "outputPath": "dist/YOUR-APP-NAME/server",
-            "main": "server.ts",
-            "tsConfig": "tsconfig.server.json",
-            "stylePreprocessorOptions": {
-              "includePaths": [
-                "node_modules/"
-              ]
-            },
-            "inlineStyleLanguage": "scss"
-          },
-          "configurations": {
-            "production": {
-              "outputHashing": "media"
-            },
-            "development": {
-              "optimization": false,
-              "sourceMap": true,
-              "extractLicenses": false,
-              "vendorChunk": true,
-              "buildOptimizer": false
-            }
-          },
-          "defaultConfiguration": "production"
-        },
-        "serve-ssr": {
-          "builder": "@angular-devkit/build-angular:ssr-dev-server",
-          "configurations": {
-            "development": {
-              "browserTarget": "YOUR-APP-NAME:build:development",
-              "serverTarget": "YOUR-APP-NAME:server:development"
-            },
-            "production": {
-              "browserTarget": "YOUR-APP-NAME:build:production",
-              "serverTarget": "YOUR-APP-NAME:server:production"
-            }
-          },
-          "defaultConfiguration": "development"
-        },
-        "prerender": {
-          "builder": "@angular-devkit/build-angular:prerender",
-          "options": {
-            "routes": [
-              "/"
-            ]
-          },
-          "configurations": {
-            "production": {
-              "browserTarget": "YOUR-APP-NAME:build:production",
-              "serverTarget": "YOUR-APP-NAME:server:production"
-            },
-            "development": {
-              "browserTarget": "YOUR-APP-NAME:build:development",
-              "serverTarget": "YOUR-APP-NAME:server:development"
-            }
-          },
-          "defaultConfiguration": "production"
-        }
```

### `package.json`

Please change the following `"scripts"` properties (because the new `application` builder handles the SSR and prerendering with different commands):

1. Please remove properties `"dev:ssr"` and `"prerender"`

```diff
   "scripts": {
-    "dev:ssr": "ng run YOUR-APP-NAME:serve-ssr",
-    "prerender": "ng run YOUR-APP-NAME:prerender"
```

2. Please change value of the property `"build:ssr"` to `"ng build"`

```diff
   "scripts": {
-     "build:ssr": "ng build && ng run YOUR-APP-NAME:server",
+     "build:ssr": "ng build"
```

3. Please rename the property `"serve:ssr"` to `"serve:ssr:YOUR-APP-NAME"` and change its value to `"node dist/YOUR-APP-NAME/server/server.mjs"`

```diff
   "scripts": {
-    "serve:ssr": "node dist/YOUR-APP-NAME/server/main.js",
+    "serve:ssr:YOUR-APP-NAME": "node dist/YOUR-APP-NAME/server/server.mjs",
```

### `tsconfig.app.json`

1. Please add 1 new item to the array in the property `"types"`: `"node"`

```diff
   "types": [
+    "node"
   ]
```

2. Please add 2 new items to the in the `"files"` array: `"src/main.server.ts"` , `"server.ts"`

```diff
   "files": [
     "src/main.ts",
+    "src/main.server.ts",
+    "server.ts"
   ]
```

### `tsconfig.server.json`

Remove the file `tsconfig.server.json`

Example command on Mac/Linux:

```bash
rm tsconfig.server.json
```

### `src/app.server.module.ts`

Rename file from `app.server.module.ts` to `app.module.server.ts` (i.e. swap the words `server` and `module`).

Example command on Mac/Linux:

```bash
mv src/app/app.server.module.ts src/app/app.module.server.ts
```

### `src/main.server.ts`

1. Change the the export path of the `AppServerModule` from `./app/app.server.module'` to `./app/app.module.server'`. 
2. And export `AppServerModule` using `as default`.

```diff
- export { AppServerModule } from './app/app.server.module';
+ export { AppServerModule as default } from './app/app.module.server';
```

### `server.ts`

1. Change the imports in the top of the file according to the following diff:

```diff
- import 'zone.js/node';

- import { ngExpressEngine as engine } from - '@spartacus/setup/ssr';
- import { NgExpressEngineDecorator } from - '@spartacus/setup/ssr';
- import * as express from 'express';
- import { join } from 'path';

- import { AppServerModule } from './src/main.- server';
- import { APP_BASE_HREF } from '@angular/common';
- import { existsSync } from 'fs';

+ import { APP_BASE_HREF } from '@angular/common';
+ import {
+   NgExpressEngineDecorator,
+   ngExpressEngine as engine,
+ } from '@spartacus/setup/ssr';
+ import express from 'express';
+ import { dirname, join, resolve } from 'node:path';
+ import { fileURLToPath } from 'node:url';
+ import AppServerModule from './src/main.server';
```

2. Replace two old constants: `distFolder` and `indexHtml` with new three constants: `serverDistFolder`, `browserDistFolder`, `indexHtml`, according to the diff below:

```diff
- const distFolder = join(process.cwd(), 'dist/YOUR-APP-NAME/browser');
- const indexHtml = existsSync(join(distFolder, 'index.original.html'))
-   ? 'index.original.html'
-   : 'index';

+  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
+  const browserDistFolder = resolve(serverDistFolder, '../browser');
+  const indexHtml = join(browserDistFolder, 'index.html');
```

3. In the call `server.set('views, `... please use the constant `browserDistFolder` instead of `distFolder`  as a second argument.

```diff
-  server.set('views', distFolder);
+  server.set('views', browserDistFolder);
```

4. In the call `express.static( `... please use the constant `browserDistFolder` instead of `distFolder` as an argument.

```diff
   server.get(
     '*.*',
-    express.static(distFolder, {
+    express.static(browserDistFolder, {
```

5. Remove the block of code in the bottom of the file related handling Webpack's `require`, but leave only the call of the function `run()`

```diff
- // Webpack will replace 'require' with - '__webpack_require__'
- // '__non_webpack_require__' is a proxy to Node 'require'
- // The below code is to ensure that the server is run - only when not requiring the bundle.
- declare const __non_webpack_require__: NodeRequire;
- const mainModule = __non_webpack_require__.main;
- const moduleFilename = (mainModule && mainModule.- filename) || '';
- if (moduleFilename === __filename || moduleFilename.- includes('iisnode')) {
-   run();
- }

+ run();
```

6. In the very bottom of the file, remove the re-export of the path `./src/main.server`

```diff
- export * from './src/main.server';
```

This is the end of the migration guide for the Angular `application` builder.

## In `app.module.ts`, use new, non-deprecated Angular APIs

Unrelated to the migration to the new Angular `application` builder, please also update the `app.module.ts` file to use new, non-deprecated Angular APIs:

### `src/app/app.module.ts`

1. Remove the `HttpClientModule` from the `imports` array. 

```diff
  imports: [
-    HttpClientModule,
```

2. Add `provideHttpClient(withFetch(), withInterceptorsFromDi()),` to the `providers` array.

```diff
  providers: [
+   provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
```

## For SSR projects, additionally:

### `src/app/app.module.ts`

Replace the item in the `imports` array `BrowserModule.withServerTransition({ appId: 'serverApp' }),` with just `BrowserModule`

```diff
  imports: [
-    BrowserModule.withServerTransition({ appId: 'serverApp' }),
+    BrowserModule,
  ],
```

## New commands for SSR projects

### How to run SSR dev server (watching for changed files and rebuilding)

Previously the SSR dev server could be run with a command `npm run dev:ssr`. But now this command is removed (because its builder was replaced by the new Angular `application` builder). To workaround this, please:

1. add to your `package.json` the new custom command `"serve:ssr:watch"`:
```diff
  "serve:ssr": "node dist/YOUR-APP-NAME/server/server.mjs",
+ "serve:ssr:watch": "node --watch dist/YOUR-APP-NAME/server/server.mjs",
```

1. Then please **run in 2 separate terminal window**s:

- `npm run watch` - to build the app in the watch mode (watching for changed files source files and rebuilding)
- `npm run serve:ssr:watch` - to run the SSR dev server in the watch mode (watching for compiled files and rerunning the server)

Note: the same workaround has been documented also for new Angular 17 apps in the [KBA 3460263](https://me.sap.com/notes/3460263).

### How to run server prerendering

Previously the server prerendering could be run with a command `npm run prerender`. But now this command is removed  (because its builder was replaced by the new Angular `application` builder). To workaround this, please:

1. in `package.json` create the new custom command `"prerender"`:

```diff
+  "prerender": "ng build --prerender=true",
```

2. Then run the command in a terminal, while passing the Node env variable `SERVER_REQUEST_ORIGIN`, for example:

```bash
SERVER_REQUEST_ORIGIN="http://localhost:4200" npm run prerender
```

Note: Remember to replace "http://localhost:4200" with the real target domain where you want to deploy your prerendered pages, especially if you are deploying for production. Otherwise, some composable storefront SEO features might not work properly. For eample, [Canonical URLs](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/e712f36722c543359ed699aed9873075.html?version=2211#loio98befe9ef9ae4957a4ae34669c175fd5) might point to a wrong domain, or [Automatic Multi-Site Configuration](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/9d2e339c2b094e4f99df1c2d7cc999a8.html?version=2211) might not recognize the base-site correctly (for example, if some regexes configured in the CMS for base-site recognition depend on the domain name).

Note: the same workaround has been documented also for new Angular 17 apps in the [KBA 3460211](https://me.sap.com/notes/3460211).


# Next
Once you modernized your app that was migrated from Spartacus 6.8 to 2211.19, you're ready for the next migration guide: [migrating to Angular 19 and Spartacus 2211.36](./migration.md).
