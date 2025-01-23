# Modernize apps upgraded from Spartacus 6.8 to 2211.19

Angular v17 introduced a new Angular CLI configuration format, which was not recommended yet by the Spartacus team, due to various issues.
Now it's time Spartacus team recommends to use the new configuration and provides the detailed migration guide for the apps upgraded from Spartacus 6.8 to 2211.19.

Please note that this migration is also a prerequisite, before starting the upgrade to Spartacus 2211.33 and Angular 19.

The benefit of using the new Angular configuration format are:
- faster builds: application builds are quicker, making life easier and saving time for developers
- being future-proof: any new Angular features might assume you're using the new configuration format as a prerequisite

The side-effect consequences of using the new configuration format are:
- SSR (server-side rendering) and prerendering will be run differently (for more, see the last section of this page)

# Modernize the Angular application to use the new configuration format


### `angular.json` - Angular project configuration file

1. In the section `architect > build` please change the value `"builder": "@angular-devkit/build-angular:browser",`
   to `"builder": "@angular-devkit/build-angular:application",`

```diff
        "architect": {
          "build": {
-           "builder": "@angular-devkit/build-angular:browser",
+           "builder": "@angular-devkit/build-angular:application",
```

Why: it's the new `application` builder for Angular v17 and later.

2. In the section `architect > build > options` please apply the all the following modifications, to adapt to the new configuration format of the new `application` builder

2.1 In the property `"outputPath"` please remove the ending `"/browser"` from the string value.

```diff
        "architect": {
          "build": {
           "options": {
-             "outputPath": "dist/YOUR-APP-NAME/browser",
+             "outputPath": "dist/YOUR-APP-NAME",
```

2.2 rename the property `"main"` to `"browser"`

```diff
        "architect": {
          "build": {
           "options": {
-             "main": "src/main.ts",
+             "browser": "src/main.ts",
```


2.3. In the section `architect > build > configurations > development` please remove 3 properties: `"buildOptimizer"`, `"vendorChunk"`, `"namedChunks"`

```diff
        "architect": {
          "build": {
           "configurations": {
             "development": {
-              "buildOptimizer": false,
-              "vendorChunk": true,
-              "namedChunks": true
```

2.4. Please remove the whole 3 sections `architect > server`, `architect > serve-ssr` and `architect > prerender` (because their responsibilities are now handled by the new `application` builder)

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

TODO: mention extra steps for SSR projects

### `tsconfig.json`

In the `"compilerOptions"` section, please:

- Remove the properties `"baseUrl"`, `"forceConsistentCasingInFileNames"`, `"downlevelIteration"`, 
- Add `"skipLibCheck": true`, `"esModuleInterop": true`

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

1. add 3 new options with values: `"server": "src/main.server.ts"`, `"prerender": false`, `"ssr": { "entry": "server.ts" }`

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

2. In the section `architect > build > configurations > development` please remove 3 properties: `"buildOptimizer"`, `"vendorChunk"`, `"namedChunks"`

```diff
        "architect": {
          "build": {
            "configurations": {
              "development": {
-               "buildOptimizer": false,
-               "vendorChunk": true,
-               "namedChunks": true
```

3. In the section `architect > build > configurations` please add a new property `"noSsr": { "ssr": false, "prerender": false }`

```diff
        "architect": {
          "build": {
            "configurations": {
+             "noSsr": {
+               "ssr": false,
+               "prerender": false
+             }
```

4. In the section `architect > serve > configurations` (please mind now the section is `serve` not `build`!) please add the ending `,noSsr` (with the preceding comma) at the end of the string values in subsections `... > production > buildTarget` and `... > development > buildTarget`:

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

### `package.json`

Please change the following "scripts" properties (because the new `application` builder handles the SSR and prerendering in a different way).

1. Please remove properties `"dev:ssr"` and `"prerender"`

```diff
   "scripts": {
-    "dev:ssr": "ng run YOUR-APP-NAME:serve-ssr",
-    "prerender": "ng run YOUR-APP-NAME:prerender"
```

1. Please change value of the property `"build:ssr"` to `"ng build"`

```diff
   "scripts": {
-     "build:ssr": "ng build && ng run YOUR-APP-NAME:server",
+     "build:ssr": "ng build"
```

3. Please change the value of the property `"serve:ssr"` to `node dist/YOUR-APP-NAME/server/server.mjs`

```diff
   "scripts": {
-    "serve:ssr": "node dist/YOUR-APP-NAME/server/main.js",
+    "serve:ssr": "node dist/YOUR-APP-NAME/server/server.mjs",
```

### `tsconfig.app.json`

1. Please add 1 new item to the array in the property `"types"`: `"node"`

```diff
   "types": [
+    "node"
   ]
```

2. Please add 2 new items to the array in the property `"files"`: `"src/main.server.ts"` and `"src/server.ts"`

```diff
   "files": [
     "src/main.ts",
+    "src/main.server.ts",
+    "src/server.ts"
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
mv src/app.server.module.ts src/app.module.server.ts
```

### `src/main.server.ts`

Change the the export path of the `AppServerModule` from `./app/app.server.module'` to `./app/app.module.server'`. And export this item as a `default`.

```diff
- export { AppServerModule } from './app/app.server.module';
+ export { AppServerModule as default } from './app/app.module.server';
```

### `server.ts`

1 .Change the imports in the top of the file according to the following diff:

```diff
- import 'zone.js/node';

- import { ngExpressEngine as engine } from - '@spartacus/setup/ssr';
- import { NgExpressEngineDecorator } from - '@spartacus/setup/ssr';
- import * as express from 'express';
- import { join } from 'path';

- import { AppServerModule } from './src/main.- server';
- import { existsSync } from 'fs';

+ import {
+   NgExpressEngineDecorator,
+   ngExpressEngine as engine,
+ } from '@spartacus/setup/ssr';
+ import express from 'express';
+ import { readFileSync } from 'node:fs';
+ import { dirname, join, resolve } from + 'node:path';
+ import { fileURLToPath } from 'node:url';
+ import AppServerModule from './main.server';
```

2. Replace the constants 2 `distFolder` and `indexHtml` with new 4 constants: `serverDistFolder`, `browserDistFolder`, `indexHtml` and `indexHtmlContent`, as in the diff below:

```diff
- const distFolder = join(process.cwd(), 'dist/YOUR-APP-NAME/browser');
- const indexHtml = existsSync(join(distFolder, 'index.original.html'))
-   ? 'index.original.html'
-   : 'index';

+  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
+  const browserDistFolder = resolve(serverDistFolder, '../browser');
+  const indexHtml = join(browserDistFolder, 'index.html');
```

3. Use the constant `browserDistFolder` instead of `distFolder` in the call `server.set('views', ...);`

```diff
-  server.set('views', distFolder);
+  server.set('views', browserDistFolder);
```

4. Use the constant `browserDistFolder` instead of `distFolder` in the call `express.static(...);`

```diff
   server.get(
     '*.*',
-    express.static(distFolder, {
+    express.static(browserDistFolder, {
```

2.5 Remove the block of code in the bottom of the file related to Webpack `require` handling, but leave only the call of the function `run()`

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

5. In the very bottom of the file, remove the re-export of the path `./src/main.server`

```diff
- export * from './src/main.server';
```

# Modernize the `app.module.ts` to use new, non-deprecated Angular APIs

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


TODO: add information needed for SSR projects:
that now you'll run the SSR and prerendering differently - links to existing docs (KBAs)