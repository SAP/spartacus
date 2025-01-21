# (EARLY NOTES) Migrating a custom app to use Spartacus with Angular v18

Before upgrading Spartacus to the new version with Angular 18, you need to first:
- upgrade to the latest 2211.x of Spartacus
- upgrade Angular to version v18

## Update Angular to 17 and 18

### Update Angular to 17 and 3rd party deps to be compatible with Angular 18

Follow the [Angular guidelines for upgrading from v17 to v18](https://angular.dev/update-guide?v=17.0-18.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem  to versions compatible with Angular 18 (e.g. `@ng-select/ng-select@13`, `@ngrx/store@18`, `ngx-infinite-scroll@18`):

```bash
ng update @angular/core@18 @angular/cli@18 @ng-select/ng-select@13 @ngrx/store@18 ngx-infinite-scroll@18 --force
git add .
git commit -m "update angular 18 and 3rd party deps angular 18 compatible"
```
Note: Do not select `use-application-builder` migration when migrating to Angular 18. Applications created before SPA 2211.19 doesn't support this builder. Applications created starting from 2211.19 already supports it.

### Run Spartacus update

After successfully updating the application to Angular 18, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@latest
```

### Adjust Angular configuration

Due to changes in Angular's application builder, for applications created starting from SPA 2211.19, you need to adjust the `angular.json` file to generate the `index.html` file in the `dist` folder. This is required for CCv2 to map `OCC_BACKEND_BASE_URL_VALUE` and `MEDIA_BACKEND_BASE_URL_VALUE` meta tags to the correct values. Unfortunately, this will contribute to pre-rendering to not work properly (which is a known issue)

```diff
- "index": "src/index.html"
+ "index": {
+    "input": "src/index.html",
+    "output": "index.html"
+ }
```
