# Migrating a custom app to use Spartacus with Angular 20

Before upgrading Spartacus to the new version with Angular 20, you need to first:

- upgrade Spartacus to version 221121.5.0 (with Angular 19)
- install Node 22 version
- if your project uses SSR (Server-Side Rendering), please upgrade `@types/node` to version 22

  ```bash
  npm i @types/node@22 -D
  ```
- upgrade Angular to version v20

## Update Angular to 20 and 3rd party deps to be compatible with Angular 20

Follow the [Angular guidelines for upgrading from v19 to v20](https://angular.dev/update-guide?v=19.0-20.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem to versions compatible with Angular 20 (e.g. `@ng-select/ng-select@latest`, `@ngrx/store@20`, `angular-oauth2-oidc@20`, `ngx-infinite-scroll@latest`):

```bash
ng update @angular/core@20 @angular/cli@20 @ngrx/store@20 angular-oauth2-oidc@20 @ng-select/ng-select@20 ngx-infinite-scroll@20 --force
git add .
git commit -m "update angular 20 and 3rd party deps angular 20 compatible"
```

While migrating to Angular 20, you'll be asked whether to run the `use-application-builder` migration:

`❯◯ [use-application-builder] Migrate application projects to the new build system.`

Let's select this migration to replace old builders located under `@angular-devkit/build-angular` with new ones under `@angular/build`.

The result of migration should be following:

```diff
 "projects": {
    <your-project-name>: {
      "projectType": "application",
+      "root": "",
+      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
-          "builder": "@angular-devkit/build-angular:application",
+          "builder": "@angular/build:application",
            ...
        },
        "serve": {
-          "builder": "@angular-devkit/build-angular:dev-server",
+          "builder": "@angular/build:dev-server",
          ...
        },
        "extract-i18n": {
-          "builder": "@angular-devkit/build-angular:extract-i18n"
+          "builder": "@angular/build:extract-i18n"
        },
        "test": {
-          "builder": "@angular-devkit/build-angular:karma",
+          "builder": "@angular/build:karma",
        }
      }
    },
+   "schematics": {
+    "@schematics/angular:component": {
+      "type": "component"
+    },
+    "@schematics/angular:directive": {
+      "type": "directive"
+    },
+    "@schematics/angular:service": {
+      "type": "service"
+    },
+    "@schematics/angular:guard": {
+      "typeSeparator": "."
+    },
+    "@schematics/angular:interceptor": {
+      "typeSeparator": "."
+    },
+    "@schematics/angular:module": {
+      "typeSeparator": "."
+    },
+    "@schematics/angular:pipe": {
+      "typeSeparator": "."
+    },
+    "@schematics/angular:resolver": {
+      "typeSeparator": "."    }
+  }
```

Angular migration also takes care of adding `"typeSeparator": "."` to and proper type (suffix) to relevant schematics.

## Run Spartacus update

After successfully updating the application to Angular 20 and Express 5, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@2211.21
```

### Manual changes

Let's make following manual changes to modernize so it's similar to a new Angular 20 application.

1. In `angular.json`, remove redundant `index` property. For more, see: https://github.com/angular/angular-cli/commit/901ab60d9f63fcff17213dbf7fe17e4a46835974

```diff
 "projects": {
    <your-project-name>: {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/<your-project-name>",
-            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            ...
        }
      }
    }
```

2. In `tsconfig.json`, update the `types` array to include `"node20"` instead of `"node"`:

```diff
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
-    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
-    "esModuleInterop": true,
    "experimentalDecorators": true,
-    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
-    "module": "ES2022"
+    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
+    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
+  "files": [],
+  "references": [
+    {
+      "path": "./tsconfig.app.json"
+    },
+    {
+      "path": "./tsconfig.spec.json"
+    }
+  ]
+}
```

1. In `app.module.ts`, add the `provideBrowserGlobalErrorListeners` to the `providers` array. For more, see: https://angular.dev/best-practices/error-handling#client-side-rendering

```diff
-import { NgModule } from '@angular/core';
+import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "@spartacus/storefront";
import { App } from './app.component';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule
  ],
  providers: [
+    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
```

## If using Server Side Rendering (SSR)

### Upgrade Express to Version 5

Spartacus 221121.<latest> requires Express 5.x. Upgrade Express:

```bash
npm install express@^5.1.0
git add .
git commit -m "chore: upgrade Express to v5"
```

### Manual changes
1. In `server.ts`, update wildcard strings with regular expressions for Express 5 compatibility:

```diff
  // Serve static files from /browser
  server.get(
-    '*.*',
+    /.*\..*/,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
-  server.get('*', (req, res) => {
+  server.get(/.*/, (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });
