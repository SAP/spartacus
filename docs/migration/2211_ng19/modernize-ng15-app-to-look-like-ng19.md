# Modernize your app to look like a new Angular 19 app

# For projects created with Angular CLI <17 (e.g. Angular CLI 15)

## For apps with SSR

### `angular.json`

1. In the section `architect > build` please change the value `"builder": "@angular-devkit/build-angular:browser",`
   to `"builder": "@angular-devkit/build-angular:application",`

```diff
        "architect": {
          "build": {
-           "builder": "@angular-devkit/build-angular:browser",
+           "builder": "@angular-devkit/build-angular:application",
```

2. In the section `architect > build > options` please apply the following modifications (to adapt to the new builder):

2.1 in `"outputPath"` remove the ending `"/browser"` from the string value.

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

2.3 add 3 new options with values: `"server": "src/server.ts"`, `"prerender": false`, `"ssr": { "entry": "src/server.ts" }`

```diff
        "architect": {
          "build": {
           "options": {
+             "server": "src/main.server.ts",
+             "prerender": false,
+             "ssr": {
+               "entry": "src/server.ts"
+             }
```

1. In the section `architect > build > configurations > development` please remove 3 properties: `"buildOptimizer"`, `"vendorChunk"`, `"namedChunks"`

```diff
        "architect": {
          "build": {
           "configurations": {
             "development": {
-              "buildOptimizer": false,
-              "vendorChunk": true,
-              "namedChunks": true
```

4. In the section `architect > build > configurations` please add a new property `"noSsr": { "ssr": false, "prerender": false }`

```diff
        "architect": {
          "build": {
            "configurations": {
+             "noSsr": {
+               "ssr": false,
+               "prerender": false
+             }
```

5. In the section `architect > serve > configurations` (please mind now the section is `serve` not `build`!) please add the ending `,noSsr` (with the preceding comma) at the end of the string values in subsections `... > production > buildTarget` and `... > development > buildTarget`:

```diff
        "architect": {
          "serve": {
            "builder": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "production": {
-               "buildTarget": "YOUR-APP-NAME:build:production"
+               "buildTarget": "YOUR-APP-NAME:build:production,noSsr"

              },
              "development": {
-               "buildTarget": "YOUR-APP-NAME:build:development"
+               "buildTarget": "YOUR-APP-NAME:build:development,noSsr"
              }
            },
```

6. Please remove the whole 3 sections `architect > server`, `architect > serve-ssr` and `architect > prerender`.

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

In the "scripts" section:

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

3. Please change the value of the property `"serve:ssr"` to `node dist/YOUR-APP-NAME/server/server.mjs`

```diff
   "scripts": {
-    "serve:ssr": "node dist/YOUR-APP-NAME/server/main.js",
+    "serve:ssr": "node dist/YOUR-APP-NAME/server/server.mjs",
```

TODO: explain here that since now you need to run 2 different terminals to run SSR app in dev mode with reloads on file save.
`npm run watch`
and
`npm run

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

### `tsconfig.json`

In the `"compilerOptions"` section, please:

- Remove the properties `"baseUrl"`, `"forceConsistentCasingInFileNames"`, `"sourceMap"`, `"declaration"`, `"downlevelIteration"`, `"useDefineForClassFields"`, `"lib"`
- Add `"skipLibCheck": true`, `"isolatedModules": true`, `"esModuleInterop": true`
- Change `"moduleResolution"` from `"node"` to `"bundler"`

```diff
   "compilerOptions": {
-    "baseUrl": "./",
-    "forceConsistentCasingInFileNames": true,
-    "sourceMap": true,
-    "declaration": false,
-    "downlevelIteration": true,
+    "skipLibCheck": true,
+    "isolatedModules": true,
+    "esModuleInterop": true,
-    "moduleResolution": "node",
+    "moduleResolution": "bundler",
-    "useDefineForClassFields": false,
-    "lib": [
-      "ES2022",
-      "dom"
-    ]
   },
```

### `tsconfig.server.json`

Remove the file `tsconfig.server.json`

Example command on Mac/Linux:

```bash
rm tsconfig.server.json
```

### `src/app.server.module.ts`

Rename file from `app.server.module.ts` to `app.module.server.ts` (swapped words `server` and `module`).

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

### `src/main.ts`

Please add an option `{ ngZoneEventCoalescing: true }` to the second argument of the`platformBrowserDynamic().bootstrapModule()` call.

```diff
-platformBrowserDynamic().bootstrapModule(AppModule)
+platformBrowserDynamic().bootstrapModule(AppModule, {
+  ngZoneEventCoalescing: true,
+})
```

### `server.ts`

1. Please move the file to the project root folder to `/src`

Example command on Mac/Linux:

```bash
mv server.ts src/server.ts
```

2. Please adjust the contents of the file `src/server.ts`

2.1 Change the imports in the top of the file according to the following diff:

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

2.2 Replace the constants 2 `distFolder` and `indexHtml` with new 4 constants: `serverDistFolder`, `browserDistFolder`, `indexHtml` and `indexHtmlContent`, as in the diff below:

```diff
-  const distFolder = join(process.cwd(), 'dist/test-ng15-spa68-ssr/browser');
-  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
-    ? 'index.original.html'
-    : 'index';
+  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
+  const browserDistFolder = resolve(serverDistFolder, '../browser');
+  const indexHtml = join(serverDistFolder, 'index.server.html');
```

2.3 Use the constant `browserDistFolder` instead of `distFolder` in the call `server.set('views', ...);`

```diff
-  server.set('views', distFolder);
+  server.set('views', browserDistFolder);
```

2.4 Use the constant `browserDistFolder` instead of `distFolder` in the call `express.static(...);`

```diff
   server.get(
     '*.*',
-    express.static(distFolder, {
+    express.static(browserDistFolder, {
```

2.4 Remove the block of code in the bottom of the file related to Webpack `require` and leave instead just the call of the function `run()`

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

2.5 In the very bottom of the file, remove the re-export of the path `./src/main.server`

```diff
- export * from './src/main.server';
```

## TODOS:

recommended changes in the server.ts file (only after upgraded to ng19):

- in server.ts we recommend adding a feature toggle:

```
ssrFeatureToggles: {
  avoidCachingErrors: true,
},
```

- use Spartacus default error handlers:
  - after the line `const indexHtml = join(serverDistFolder, 'index.server.html');` add the line `const indexHtmlContent = readFileSync(indexHtml, 'utf-8');`
  - after the block of code `server.get('*', (req, res) => {...}`, add the line `server.use(defaultExpressErrorHandlers(indexHtmlContent));`

mention moving stuff to /public folder

- src/favicon.ico -> public/favicon.ico
- src/assets folder -> public

in angular.json
TODO: mention the changes in assets config? in both architect "build" and "test"
TODO: mention the changes in silence deprecations

```

```

### Let's postpone those steps and check them later:

1. Moving assets and favicon to /public folder. And changing assets config in `angular.json`:

```diff
-              "src/favicon.ico",
-              "src/assets",
+              {
+                "glob": "**/*",
+                "input": "public"
+              },
```

because in n17 the error happens:

```
Error: Schema validation failed with the following errors:
  Data path "/assets/0" must have required property 'output'.
  Data path "/assets/0" must be string.
  Data path "/assets/0" must match exactly one schema in oneOf.
```

2. Suppressing Sass deprecations

```diff
 "stylePreprocessorOptions": {
   "includePaths": ["node_modules/"],
+  "sass": {
+    "silenceDeprecations": ["import"]
+  }
}
```

Because in n17 the error happens:

```
Error: Schema validation failed with the following errors:
  Data path "/stylePreprocessorOptions" must NOT have additional properties(sass).
```
