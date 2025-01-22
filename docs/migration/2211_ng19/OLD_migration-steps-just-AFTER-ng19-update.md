TODO: leave here only steps that are needed after the Angular v19 update (but were not covered in the modernizing ng17 apps):
 
1. In `tsconfig.json` remove the properties  `"sourceMap"`, `"declaration"`,`"useDefineForClassFields"`, `"lib"`

2. in `server.ts`:
- change the import path of AppServerModule from `src/main.server.ts` to `main.server.ts`
- change the const `const indexHtml = join(browserDistFolder, 'index.html');` to `const indexHtml = join(serverDistFolder, 'index.server.html');`

# Manual migration steps after Angular v19 update

## Silence Sass deprecation warnings

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
