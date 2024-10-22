# (EARLY NOTES) Migrating a custom app to use Spartacus with Angular v18

Before upgrading Spartacus to the new major version v2211, you need to first:
- upgrade to the latest minor 2211.x of Spartacus
- upgrade Angular to version v18

## Update Angular to 17 and 18

### Update Angular to 17 and 3rd party deps to be compatible with Angular 18

Follow the [Angular guidelines for upgrading from v17 to v18](https://angular.dev/update-guide?v=17.0-18.0&l=3) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem  to versions compatible with Angular 18 (e.g. `@ng-select/ng-select@13`, `@ngrx/store@18`, `ngx-infinite-scroll@18`):

```bash
ng update @angular/core@18 @angular/cli@18 @ng-select/ng-select@13 @ngrx/store@18 ngx-infinite-scroll@18 --force
git add .
git commit -m "update angular 18 and 3rd party deps angular 16 compatible"
```
Note: Do not select `use-application-builder` migration when migrating to Angular 18. Applications created before SPA 2211.19 doesn't support this builder. Applications created starting from 2211.19 already supports it.

### Run Spartacus update

After successfully updating the application to Angular 18, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@2212.19 (draft version)
```