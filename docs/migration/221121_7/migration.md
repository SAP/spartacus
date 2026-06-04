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

After successfully updating the application to Angular 21, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@221121.7
```

> **Note:** if the migration failed (due to any reason), as a fallback please follow the instructions in the section [Manual Migration Steps (Fallback Only)](#manual-migration-steps-fallback-only)

### Manual changes

1. (Optional) In `angular.json`, remove redundant `outputPath` property if it matches the default value.

> **Note:** This is a manual change and is **not** handled by the Spartacus migration schematics.

In fresh apps generated with Angular 21, the `outputPath` option is skipped and implicitly defaults to `dist/<your-project-name>`. If your migrated app has `outputPath` set to `dist/<your-project-name>`, we recommend removing it from the `angular.json` as not necessary.

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


### Additional migration steps if using Server Side Rendering (SSR)

#### Enable Non-Destructive Hydration (Required for SSR)

If your application uses Server-Side Rendering (SSR), you should enable Angular's non-destructive hydration. This is now a requirement for Spartacus 221121_7. This aligns your app with current Angular best practices, making maintenance and upgrades easier.

##### What is non-destructive hydration?

Non-destructive hydration is an Angular feature that improves UX and performance by reusing the server-rendered DOM instead of destroying and recreating it on the client side. This reduces the time to interactive and provides a better user experience.

For more information, see the [Angular Hydration Guide](https://angular.dev/guide/hydration).

#### How to enable it

In your `app.module.ts` (or `app.config.ts` for standalone applications), add `provideClientHydration()` with `withEventReplay()` and `withNoHttpTransferCache()`:

**For module-based applications (app.module.ts):**

```diff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
+ import {
+   provideClientHydration,
+   withEventReplay,
+   withNoHttpTransferCache,
+ } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    // ...
  ],
  providers: [
+   provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
    // ...
  ],
  // ...
})
export class AppModule { }
```

**For standalone applications (app.config.ts):**

```typescript
import { ApplicationConfig } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
    // ...
  ]
};
```

##### Why are these options required?

- **`withEventReplay()`**: Ensures that user interactions that occur before the application is fully hydrated are captured and replayed. This provides a seamless user experience even during the hydration process.

- **`withNoHttpTransferCache()`**: Disables the HTTP transfer cache for hydration. This is required for Spartacus because Spartacus uses its own state transfer mechanism. Without this option, there could be conflicts between Angular's built-in HTTP transfer cache and Spartacus's custom implementation.

##### Important Notes

- Make sure to test your application thoroughly after enabling hydration to ensure all components hydrate correctly.
- For more details, refer to the official [Angular Hydration documentation](https://angular.dev/guide/hydration).

##### Known Warning: NG05001

After enabling hydration, you may see the following warning in your console:

```
NG05001: Configuration error: found both hydration and enabledBlocking initial navigation 
in the same application, which is a contradiction.
```

**We didn't encounter any issues with this setup in practice.**

This diagnostic was introduced by the Angular team in Angular 21 ([Angular issue #59624](https://github.com/angular/angular/issues/59624), [Angular PR #62963](https://github.com/angular/angular/pull/62963)). The warning appears because Spartacus uses `initialNavigation: 'enabledBlocking'` in its router configuration to ensure proper CMS page loading and lazy-loading of JS chunks before rendering the components.

**Current Status:**

We're not yet sure why this diagnostic was added by the Angular team. Since May 2025, we haven't observed any negative consequences with the current setup. We're still investigating the implications and will update our implementation if needed.

**Our Experience:**

In practice, we've found that:
- Since May 2025, no functional issues have been reported related to this warning
- Both hydration and `enabledBlocking` work correctly together in Spartacus
- During SSR, `enabledBlocking` ensures all route guards (including `CmsPageGuard`) complete before rendering
- During hydration in the browser, Angular's hydration system prevents UI flickering by reusing the server-rendered DOM

You can safely ignore this warning for now. We're actively monitoring this and will address it in a future Spartacus release if necessary as part of the ongoing modernization of the SSR implementation.

This command should handle all the necessary migrations automatically. In most cases, no further action is required.

#### Enable Incremental Hydration (Optional, SSR only)

If your application uses Server-Side Rendering (SSR), you can enable Angular's incremental hydration to defer the hydration of `@defer` blocks until a trigger fires (e.g. the component scrolls into the viewport). This loads the component's JavaScript chunk only when needed, improving initial page load performance.

##### What is incremental hydration?

Incremental hydration is an Angular feature (stable since Angular v20) that allows individual parts of your application to be hydrated on demand rather than all at once. Components wrapped in `@defer (hydrate on <trigger>)` blocks remain inert after SSR until the specified trigger fires, at which point their JavaScript chunk is downloaded and the component becomes interactive.

For more information, see the [Angular Incremental Hydration Guide](https://angular.dev/guide/incremental-hydration).

##### How to enable it

The Spartacus `add-ssr` schematic now adds `withIncrementalHydration()` automatically. If you are migrating an existing app, add it manually to your `app.config.ts`:

```diff
 import {
   provideClientHydration,
   withEventReplay,
+  withIncrementalHydration,
   withNoHttpTransferCache,
 } from '@angular/platform-browser';

 export const appConfig: ApplicationConfig = {
   providers: [
-    provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
+    provideClientHydration(withEventReplay(), withNoHttpTransferCache(), withIncrementalHydration()),
   ]
 };
```

##### How to use it in your custom components

Once enabled, you can wrap any fully standalone custom component in a `@defer` block with a `hydrate` trigger:

```html
@defer (hydrate on viewport) {
  <app-my-custom-widget />
} @placeholder {
  <div>Loading...</div>
}
```

When the page is server-rendered, the component's content appears immediately in the HTML. The JavaScript chunk for `MyCustomWidgetComponent` is only downloaded when the component scrolls into the viewport.

##### Important Limitations

- **`@developerPreview` before Angular v20**: `withIncrementalHydration()` existed in Angular 19 but was marked `@developerPreview` (experimental). It became a stable `@publicApi` in Angular v20. Use of the preview API in v19 is unsupported and behaviour may differ from the stable release.

- **Deprecated in Angular v22+**: Since Angular v22, incremental hydration is enabled by default in `provideClientHydration()` and calling `withIncrementalHydration()` is no longer necessary. The function is deprecated and planned for removal in Angular v24. If you upgrade to Angular v22 or later, you can safely remove the `withIncrementalHydration()` call. To opt out of incremental hydration on v22+, use `withNoIncrementalHydration()` instead.

- **Only standalone dependencies are deferred**: Angular's `@defer` documentation states: *"Non-standalone dependencies cannot be deferred and are still eagerly loaded, even if they are inside of `@defer` blocks."* ([source](https://angular.dev/guide/templates/defer)). This means if your component inside a `@defer` block is declared in an NgModule's `imports` array, it will be included in the eagerly loaded bundle regardless. For Spartacus apps, this applies to any component that uses Spartacus NgModule-based features: the NgModule code is already eagerly loaded by `SpartacusFeaturesModule`. Incremental hydration will still trigger correctly, but there is no JS chunk deferral benefit for that code.

- **Spartacus OOTB components**: Spartacus's own out-of-the-box components do not currently support incremental hydration. The feature is intended for your fully custom standalone components.

### Manual Migration Steps (Fallback Only)

Below is a list of changes that the Spartacus migration schematics perform automatically. We include them here as a fallback. You only need to perform these steps manually if the schematics failed to complete successfully. If the migration schematics mentioned in the section [Run Spartacus update](#run-spartacus-update) failed due to any reason, please follow the manual steps below

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
5. Thirdparty dependencies in `package.json` should be updated to the `Current Version`.

   | Library Name                    | Version Before | Current Version | Change Type |
   | ------------------------------- | -------------- | --------------- | ----------- |
   | `@fontsource/open-sans`         | `^5.1.0`       | `^5.2.7`        | Minor       |
   | `@fortawesome/fontawesome-free` | `6.7.2`        | `7.1.0`         | Major       |
   | `i18next`                       | `^24.2.1`      | `^25.7.4`       | Major       |
   | `i18next-http-backend`          | `^3.0.1`       | `^3.0.2`        | Patch       |
   | `parse5`                        | `^7.2.1`       | `^8.0.0`        | Major       |



#### Additional migration steps if using Server Side Rendering (SSR) with Express (Fallback Only)

1. Add `build:ssr` script to `package.json`

The Angular `use-application-builder` migration (available in Angular 20 and 21) removes the `build:ssr` script from `package.json`. This script is required for CCv2 build process.

In `package.json`, add the `build:ssr` script:

```diff
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
+   "build:ssr": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  }
}
```

1. Upgrade Express to Version 5

Spartacus 221121.7 requires Express 5.x. The Spartacus migration schematics automatically upgrade Express and update `server.ts` for Express 5 compatibility. The manual steps below are provided as a fallback in case the automatic migration does not complete successfully.

To manually upgrade Express:

```bash
ng update express@5.1.0
git add .
git commit -m "chore: upgrade Express to v5.1.0"
```

In `server.ts`, update wildcard strings with regular expressions for Express 5 compatibility:

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

3. In `app.config.ts` (standalone apps only), add `withIncrementalHydration()` to `provideClientHydration()`:

```diff
 import {
   provideClientHydration,
   withEventReplay,
+  withIncrementalHydration,
   withNoHttpTransferCache,
 } from '@angular/platform-browser';

 export const appConfig: ApplicationConfig = {
   providers: [
-    provideClientHydration(withEventReplay(), withNoHttpTransferCache()),
+    provideClientHydration(withEventReplay(), withNoHttpTransferCache(), withIncrementalHydration()),
   ]
 };
```

> **Note:** `withIncrementalHydration()` requires Angular 20 or later. See [Enable Incremental Hydration](#enable-incremental-hydration-optional-ssr-only) for details.
