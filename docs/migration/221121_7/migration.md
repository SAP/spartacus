# Migrating a custom app to use Spartacus 221121.7.0 with Angular 21

Before upgrading Spartacus to the new version with Angular 21, you need to first:

- upgrade Spartacus to version 221121.5.0 (with Angular 19)
- ensure you have Node 22 version installed
- upgrade Angular to version v20 and then to v21

## Update Angular to 20 and 21

### Update Angular to 20 and 3rd party deps to be compatible with Angular 20

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


You might also face the following migrations when updating to Angular 20:
```bash
Select the migrations that you'd like to run  
❯◯ [control-flow-migration] Converts the entire application to block control flow syntax.  
 ◯ [router-current-navigation] Replaces usages of the deprecated Router getCurrentNavigation method with the Router.currentNavigation signal.
```
From Spartacus perspective these migrations are not required, however you may decide to opt-in to them.

### Update Angular to 21 and 3rd party deps to be compatible with Angular 21

Follow the [Angular guidelines for upgrading from v20 to v21](https://angular.dev/update-guide?v=20.0-21.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem to versions compatible with Angular 21 (e.g. `@ng-select/ng-select@latest`, `@ngrx/store@21`, `angular-oauth2-oidc@21`, `ngx-infinite-scroll@latest`):

```bash
ng update @angular/core@21 @angular/cli@21 @ngrx/store@21 angular-oauth2-oidc@20 @ng-select/ng-select@21 ngx-infinite-scroll@21 --force
git add .
git commit -m "update angular 21 and 3rd party deps angular 21 compatible"
```
While migrating to Angular 21, you'll be asked whether to run the `use-application-builder` migration:

`❯◯ [use-application-builder] Migrate application projects to the new build system.`

If you didn't run it during Angular 20 migration, let's select this migration to replace old builders located under `@angular-devkit/build-angular` with new ones under `@angular/build`. The result of migration should be similar to the one shown in the previous step. If you already ran it during Angular 20 migration, the migration won't make any changes.

## Run Spartacus update

After successfully updating the application to Angular 20 and Express 5, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@221121.7
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

Note: In fresh apps generated with Angular 21, the `outputPath` option is skipped and implicitly defaults to `dist/<your-project-name>`. If your migrated app has `outputPath` set to `dist/<your-project-name>`, we recommend removing it from the `angular.json` as not necessary.

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
-            "outputPath": "dist/<your-project-name>",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            ...
        }
      }
    }
```

For more, see: https://github.com/angular/angular-cli/pull/29905


2. In `tsconfig.json`, update the config in the following way:

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

Note: In fresh apps generated with Angular 21 CLI, the flag `typeCheckHostBindings` is enabled by default, so we suggest adding it also in migrated apps from Angular 19 to 21. However in apps migrated from Angular 19 to 21 beware it might cause issues. Due to its strict type checking, it causes a [known Angular issue](https://github.com/angular/angular/issues/63170) if specific `keydown` bindings are used in `@HostListener` decorators. To solve the problem in Spartacus repo, we introduced [type augmentation](https://github.com/SAP/spartacus/blob/ac651f413f44345bf8519391789c4f47c8ed02b0/types.d.ts#L1) for `global` interface. If you encounter similar issues in your application, we recommend you to apply analogical type augmentation solution in your project like we did in Spartacus repo.

While it's not recommended, you can still disable the flag by adding the following configuration to your `tsconfig.json`:

```diff
{
  "angularCompilerOptions": {
+    "typeCheckHostBindings": false
  },
}
```


3. In `app.module.ts`, add the `provideBrowserGlobalErrorListeners` and `provideZoneChangeDetection({ eventCoalescing: true }),` to the `providers` array. 
For more about `provideBrowserGlobalErrorListeners`, see: https://angular.dev/best-practices/error-handling#client-side-rendering
For more about `provideZoneChangeDetection`, see: https://angular.dev/api/core/provideZoneChangeDetection

```diff
-import { NgModule } from '@angular/core';
+import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
+    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
```

4. In `main.ts`, remove the `applicationProviders` with`provideZoneChangeDetection({ eventCoalescing: true })` from the `platformBrowser().bootstrapModule` call.


```diff
- import { provideZoneChangeDetection } from '@angular/core';

platformBrowser().bootstrapModule(AppModule, {
-  applicationProviders: [
-    provideZoneChangeDetection({ eventCoalescing: true }),
-  ],
})
  .catch(err => console.error(err));
```

## Additional migration steps if using Server Side Rendering (SSR)

### Upgrade Express to Version 5

Spartacus 221121.7 requires Express 5.x. Upgrade Express:

```bash
ng update express@5.1.0
git add .
git commit -m "chore: upgrade Express to v5.1.0"
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

```

2. Thirdparty dependencies in `package.json` should be updated to the `Current Version`.

   | Library Name | Version Before | Current Version | Change Type |
   |-------------|----------------|-----------------|-------------|
   | `@fontsource/open-sans` | `^5.1.0` | `^5.2.7` | Minor |
   | `@fortawesome/fontawesome-free` | `6.7.2` | `7.1.0` | Major |
   | `i18next` | `^24.2.1` | `^25.7.4` | Major |
   | `i18next-http-backend` | `^3.0.1` | `^3.0.2` | Patch |
   | `parse5` | `^7.2.1` | `^8.0.0` | Major |
