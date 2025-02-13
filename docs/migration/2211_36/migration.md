# Migrating a custom app to use Spartacus 2211.36 with Angular 19

Before upgrading Spartacus to the new version with Angular 18, you need to first:

- **If you've upgraded in the past from Spartacus 6.8 to 2211.19, please first follow the guide**: [Modernize Spartacus apps migrated from 6.8 to 2211.19](./modernize-apps-migrated-from-6.8-to-2211.19.md) and only then please get back here. But apps created initially with Spartacus 2211.19+ should skip this step.
- upgrade Spartacus to version 2211.32.1
- install Node 22 version
- if your project uses SSR (Server-Side Rendering), please upgrade `@types/node` to version 22

  ```bash
  npm i @types/node@22 -D
  ```
- upgrade Angular to version v18 and then to v19

## Update Angular to 18 and 19

### Update Angular to 18 and 3rd party deps to be compatible with Angular 18

> **Warning**
>
> While migrating to Angular 18, you'll be asked whether to run the `use-application-builder` migration:
>
> `❯◯ [use-application-builder] Migrate application projects to the new build system.`
>
> Please do not select this migration, i.e. make sure the circle checkbox is empty `◯ [use-application-builder]` and only then hit ENTER.

Follow the [Angular guidelines for upgrading from v17 to v18](https://angular.dev/update-guide?v=17.0-18.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem  to versions compatible with Angular 18 (e.g. `@ng-select/ng-select@13`, `@ngrx/store@18`, `ngx-infinite-scroll@18`):

```bash
ng update @angular/core@18 @angular/cli@18 @ng-select/ng-select@13 @ngrx/store@18 ngx-infinite-scroll@18 --force
git add .
git commit -m "update angular 18 and 3rd party deps angular 18 compatible"
```


### Update Angular to 19 and 3rd party deps to be compatible with Angular 19

> **Warning**
>
> While migrating to Angular 19, you'll be asked again whether to run the `use-application-builder` migration, but this time it will be preselected:
> 
> `❯◉ [use-application-builder] Migrate application projects to the new build system.`
> 
> Please unselect select this migration, i.e. first hit SPACE to make the circle checkbox empty `◯ [use-application-builder]` and only then hit ENTER.


Follow the [Angular guidelines for upgrading from v18 to v19](https://angular.dev/update-guide?v=18.0-19.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem  to versions compatible with Angular 19 (e.g. `@ng-select/ng-select@14`, `@ngrx/store@19`, `ngx-infinite-scroll@19`):

```bash
ng update @angular/cli@19 @angular/core@19 ngx-infinite-scroll@19 @ng-select/ng-select@14 @ngrx/store@19 angular-oauth2-oidc@19 --force
git add .
git commit -m "update angular 19 and 3rd party deps angular 19 compatible"
```



## Run Spartacus update

After successfully updating the application to Angular 19, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@2211.36
```

### If using Server Side Rendering (SSR) and `application` builder

For applications with SSR support you need to adjust the `server.ts`:

```diff
/* ... */
- const indexHtml = join(browserDistFolder, 'index.html');
+ const indexHtml = join(serverDistFolder, 'index.server.html');
```

## Adjust the Bootstrap usage

Spartacus internalized the Bootstrap 4 styles, so you don't need the Bootstrap being installed in your project anymore.

Please follow the guide: [Spartacus migration - Bootstrap](./bootstrap.md)

## Silence Sass deprecation warnings

In  `angular.json` in the section `architect > build > options > stylePreprocessorOptions` please add the property with object `"sass": { "silenceDeprecations":  ["import"] }`

```diff
              "stylePreprocessorOptions": {
                "includePaths": ["node_modules/"],
+               "sass": {
+                 "silenceDeprecations": ["import"]
+               }
              }
```

**Why it's needed:**
We need to silence the deprecation warnings for the Sass `@import` because `@import` is used in the Spartacus styles and in the Bootstrap 4 styles (which are imported by the Spartacus styles).

Otherwise, Angular CLI v19 would pollute the terminal with a wall of deprecation warnings when running `ng serve`, making the developer experience less pleasant.

In the future, we plan to remove all the Sass `@import` usages from the Spartacus styles and drop the usage of Bootstrap 4, and only then we will be able to remove the `silenceDeprecations` option.

For more, see:

- https://sass-lang.com/blog/import-is-deprecated
- https://angular.dev/reference/configs/workspace-config#style-preprocessor-options

## Modernize your app migrated to Angular 19, so it looks like a new Angular 19 app

Now you've migrated your app to Angular 19 and Spartacus 2211.36, but it's not the end of the migration process.

Apps migrated to Angular 19 are not configured exactly the same as the new Angular 19 apps. 
It is good to modernize your app to look like a new Angular 19 app, because it will help with migrations to future next versions of Angular and Spartacus. So now please follow the last guide: [Modernize Spartacus app migrated from 2211.32 to 2211.36](./modernize-apps-migrated-from-2211.32-to-2211.36.md)





