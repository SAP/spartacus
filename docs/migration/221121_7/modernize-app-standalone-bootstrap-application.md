# Modernizing Angular App Bootstrap with `bootstrapApplication()`

Update your Spartacus app to use Angular’s modern `bootstrapApplication()` API (officially supported by Spartacus since v221121.7.0) instead of the legacy Angular's `bootstrapModule()` API. This aligns your app with current Angular best practices, making maintenance and upgrades easier.

## Run automated migration script
To automate the migration, run the following command in your Spartacus app's root directory:

```bash
ng g @spartacus/schematics:migrate-modernize-bootstrap-application
```

Note: the migration is available only since Spartacus version 221121.7.0.


## File Changes for both CSR and SSR apps

Apply these changes to both CSR and SSR Spartacus apps. For SSR, follow the additional steps at the end of this guide.

### `src/app/app.component.ts`

Convert your root `AppComponent` to a storefront component by removing the `standalone: false` and adding necessary imports of Spartacus `StorefrontComponent`.

```diff
+import { StorefrontComponent } from '@spartacus/storefront';

 @Component({
  selector: 'app-root',
+  imports: [StorefrontComponent],
-  standalone: false,
 })
 export class AppComponent {
```

Note: the root component must be standalone to work with the modern Angular `bootstrapApplication()` API.

### `src/app/app.module.ts`

Remove the following Angular configurations from your AppModule:

- remove `bootstrap: [AppComponent]` from `@NgModule`
- remove `declarations: [AppComponent]` from `@NgModule`
- remove the following `providers` from `@NgModule`:
  - `provideBrowserGlobalErrorListeners()`
  - `provideZoneChangeDetection({ eventCoalescing: true })`
  - `provideHttpClient(withFetch(), withInterceptorsFromDi())`
- remove `BrowserModule` from `imports` array of `@NgModule`

```diff
 @NgModule({
  declarations: [App],
  imports: [
-   BrowserModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    EffectsModule.forRoot([]),
    SpartacusModule
  ],
  providers: [
-   provideBrowserGlobalErrorListeners(),
-   provideZoneChangeDetection({ eventCoalescing: true }),
-   provideHttpClient(withFetch(), withInterceptorsFromDi()),
  ],
- bootstrap: [AppComponent]
 })
 export class AppModule { }
```

Note: The Angular configurations will be moved in the next step to a new file `app.config.ts`.

### `src/app/app.config.ts`

Create a new file with Angular configurations previously located in `AppModule`.
Moreover, import things remaining in `AppModule` using `importProvidersFrom(AppModule)`.

```typescript
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withNoHttpTransferCache,
} from '@angular/platform-browser';
import { AppModule } from './app.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    importProvidersFrom(AppModule),
  ],
};
```

### `src/main.ts`

Replace the old `platformBrowser().bootstrapModule(AppModule)` with modern API `bootstrapApplication(appConfig)`, which points to the new `app.config.ts` file.

```diff
- import { platformBrowser } from '@angular/platform-browser';
- import { AppModule } from './app/app.module';
+ import { bootstrapApplication } from '@angular/platform-browser';
+ import { appConfig } from './app/app.config';
+ import { AppComponent } from './app/app.component';

- platformBrowser().bootstrapModule(AppModule, {})
+ bootstrapApplication(AppComponent, appConfig)
   .catch((err) => console.error(err));
```

### `angular.json`

In the section `schematics`, remove `standalone: false` from component, directive, and pipe schematics (standalone is now the default).

```diff
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
-         "standalone": false,
          "type": "component",
          "addTypeToClassName": false
        },
        "@schematics/angular:directive": {
-         "standalone": false,
          "type": "directive",
          "addTypeToClassName": false
        },
-       "@schematics/angular:pipe": {
-         "standalone": false,
-         "typeSeparator": "."
-       },
        "@schematics/angular:service": {
          "type": "service",
```

Note: it allows you in the future to create new custom components with Angular CLI (`ng generate component ...`) as _standalone_ by default.

## Additional file changes only for SSR apps

### `src/app/app.config.server.ts`

Create a new file with Angular SSR configuration. Moreover, import things remaining in `AppServerModule` using `importProvidersFrom(AppServerModule)`.

```typescript
import { ApplicationConfig, importProvidersFrom, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';
import { AppServerModule } from './app.module.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), importProvidersFrom(AppServerModule)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### `src/app/app.module.server.ts`

Remove the following Angular configurations from your AppServerModule:

- remove `imports: [AppModule]` from `@NgModule`
- remove `bootstrap: [App]` from `@NgModule`

```diff
 import { NgModule } from '@angular/core';
 import { provideServer } from '@spartacus/setup/ssr';

 @NgModule({
-  imports: [AppModule],
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
  ],
-  bootstrap: [App],
  })
  export class AppServerModule {}
```

### `src/main.server.ts`

Replace the old default re-export `AppServerModule` to a function-based default `bootstrap` export that uses `bootstrapApplication()` with server configuration from `app.config.server.ts`.

```diff
- export { AppServerModule as default } from './app/app.module.server';
+ import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
+ import { AppComponent } from './app/app.component';
+ import { config } from './app/app.config.server';
+
+ const bootstrap = (context: BootstrapContext) =>
+   bootstrapApplication(App, config, context);
+
+ export default bootstrap;
```

### `src/server.ts`

Rename te default import from `AppServerModule` to `bootstrap` function and update the `ngExpressEngine` configuration accordingly.

```diff
- import AppServerModule from './main.server';
+ import bootstrap from './main.server';

 /* ... */

    ngExpressEngine({
-      bootstrap: AppServerModule,
+      bootstrap,
    })
```

### `src/app/app.module.ts`

Remove the configuration of non-destructive client hydration from `AppModule`.

```diff
 @NgModule({
   /* ... */
   providers: [
     /* ... */
-    provideClientHydration(withEventReplay(), withNoHttpTransferCache())
   ],
 })
 export class AppModule { }
};
```

Note: it will be moved to `app.config.ts` in the next step.

### `src/app/app.config.ts`

Add to `app.config.ts` the configuration of non-destructive client hydration:

```diff
 export const appConfig: ApplicationConfig = {
   providers: [
     /* ... */
+    provideClientHydration(withEventReplay(), withNoHttpTransferCache())
  ]
};
```
