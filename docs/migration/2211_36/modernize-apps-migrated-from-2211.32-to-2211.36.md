# Modernize apps upgraded from Angular v2211.32 to v2211.36

New Angular 19 apps are configured a bit differently than the Angular 17 apps migrated to v19. This document is a migration guide for modernizing the migrated apps to look as much as possible like the new Angular 19 apps.

# Automatic migration

The Spartacus team provides special schematics that automatically modernize the app to look as much as possible like the new Angular 19 apps.

Please run the following command from your project root directory:

```bash
ng g @spartacus/schematics:modernize-app-migrated-from-2211_32-to-2211_36
```

In case of any issues during the automatic migration, you can always fall back to the manual migration steps below.

# Manual migration

Here are the migration steps in detail:

### `angular.json`

1. In the section `architect > build > options > assets`, please replace 2 string values in the array: `"src/favicon.ico"` and `"src/assets"` with a single object `{ "glob": "**/*", "input": "public" }`

```diff
             "assets": [
-              "src/favicon.ico",
-              "src/assets"
+              {
+                "glob": "**/*",
+                "input": "public"
+              },
```

2. Please do the same but now in the `test` section - `architect > test > options > assets`.


### `tsconfig.json`

In the `"compilerOptions"` section, please:

- add a new option `"isolatedModules": true`, 
- remove options `"sourceMap": true`, `"declaration": false`, `"useDefineForClassFields": false`, `"lib": ["ES2022", "dom"]`
- change the value of `"moduleResolution"` from `"node"` to `"bundler"`

```diff
  "compilerOptions": {
+    "isolatedModules": true,
-    "sourceMap": true,
-    "declaration": false,
-    "moduleResolution": "node",
+    "moduleResolution": "bundler",
-    "useDefineForClassFields": false,
-    "lib": [
-      "ES2022",
-      "dom"
-    ]
```


### `src/assets`

1. Please rename the folder to `/public`
2. Please move this folder up to the project's root folder.

Example command on Mac/Linux:

```bash
mv src/assets public
```

### `src/favicon.ico`

Please move the file to the folder `/public`.

Example command on Mac/Linux:

```bash
mv src/favicon.ico public
```

### `src/main.ts`

Please add an option `{ ngZoneEventCoalescing: true }` to the second argument of the`platformBrowserDynamic().bootstrapModule()` call.

```diff
- platformBrowserDynamic().bootstrapModule(AppModule)
+ platformBrowserDynamic().bootstrapModule(AppModule, {
+   ngZoneEventCoalescing: true,
+ })
```

## For SSR projects, additionally:

### `server.ts`

1. Please move the file from the root folder to the folder `/src`
   `server.ts` -> `src/server.ts`

Example command on Mac/Linux:

```bash
mv server.ts src/server.ts
```

2. In the contents of the file, please replace the import path of `AppServerModule` from `./src/main.server` to `./main.server`

```diff
-import AppServerModule from './src/main.server';
+import AppServerModule from './main.server';
```


### `angular.json`

In the section `architect > build > options > ssr > entry` please replace the value `"server.ts"` to `"src/server.ts"`

```diff
             "ssr": {
-              "entry": "server.ts"
+              "entry": "src/server.ts"
             }
```

### `tsconfig.app.json`

In the `"files"` array, please change the item `"server.ts"` to `"src/server.ts"`

```diff
   "files": [
     "src/main.ts",
     "src/main.server.ts",
-    "server.ts"
+    "src/server.ts"
   ],
```

## For projects using lazy loaded i18n

If your project uses [lazy loaded i18n](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/775e61ed219c4999852d43be5244e94a.html?q=i18n#lazy-loading) and if you stored your i18n files in the `src/assets/` folder, now you've just moved them to the `public/` folder.

So please update the Spartacus config for the lazy loading of i18n files (likely in your `spartacus-configuration.module.ts` file) to use the new path:

```diff
 providers: [
   provideConfig({
     i18n: {
       backend: {
         loader: (lng: string, ns: string) =>
-          import(`../../assets/i18n-assets/${lng}/${ns}.json`),
+          import(`../../../public/i18n-assets/${lng}/${ns}.json`),
```

## Congratulations!

Congratulations! You've modernized your app to look like a new Angular 19 app.
