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

## TODOS:

mention moving stuff to /public folder

- src/favicon.ico -> public/favicon.ico
- src/assets folder -> public

in angular.json
TODO: mention the changes in assets config? in both architect "build" and "test"
TODO: mention the changes in silence deprecations
