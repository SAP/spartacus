# Modernize your app to look like a new Angular 19 app

## For projects created with Angular CLI 17

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

- Add a new option: `"isolatedModules": true`
- Remove `"sourceMap": true`
- Remove `"declaration": false`
- Change `"moduleResolution"` from `"node"` to `"bundler"`
- Remove `"useDefineForClassFields": false`
- Remove the `"lib"` array that contained `"ES2022"` and `"dom"`

```diff
 {
   "compilerOptions": {
 +    "isolatedModules": true,
-    "sourceMap": true,
-    "declaration": false,
-    "moduleResolution": "node",
+    "moduleResolution": "bundler",
-    "module": "ES2022",
-    "useDefineForClassFields": false,
-    "lib": [
-      "ES2022",
-      "dom"
-    ]
+    "module": "ES2022"
   },
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
-platformBrowserDynamic().bootstrapModule(AppModule)
+platformBrowserDynamic().bootstrapModule(AppModule, {
+  ngZoneEventCoalescing: true,
+})
```

## ...when your project is using SSR

Moreover, if your app is using SSR, please do the following:

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

2. Please replace the value of the constant `indexHtml` from `join(browserDistFolder, 'index.html');` to `join(serverDistFolder, 'index.server.html');`

```diff
-const indexHtml = join(serverDistFolder, 'index.html');
+const indexHtml = join(serverDistFolder, 'index.server.html');
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

In the `"files"` section, please replace the value `"server.ts"` to `"src/server.ts"`

```diff
   "files": [
     "src/main.ts",
     "src/main.server.ts",
-    "server.ts"
+    "src/server.ts"
   ],
```

## For every app: Silence Sass deprecation warnings

### `angular.json`

In the section `architect > build > options > stylePreprocessorOptions` please add the property with object `"sass": { "silenceDeprecations": true }`

```diff
              "stylePreprocessorOptions": {
                "includePaths": ["node_modules/"],
+               "sass": {
+                 "silenceDeprecations": true
+               }
              }
```

**Why it's needed:**
We need to silence the deprecation warnings for the Sass `@import` because `@import` is used in the Spartacus styles and in the Bootstrap 4 styles (which are imported by the Spartacus styles).

Otherwise, since Angular v19, all apps would have a wall of deprecation warnings in the console when running `ng serve`.

In the future, we plan to remove all the Sass `@import` usages from the Spartacus styles and drop the usage of Bootstrap 4, and only then we will be able to remove the `silenceDeprecations` option.

For more, see:

- https://sass-lang.com/blog/import-is-deprecated
- https://angular.dev/reference/configs/workspace-config#style-preprocessor-options
