# Migrating a custom app to use Spartacus v2211

Before upgrading Spartacus to the new major version v2211, you need to first:
- upgrade to the latest minor 6.x of Spartacus
- upgrade Angular to version v16 and then to v17

## Update Angular to 16 and 17

You cannot jump 2 Angular major versions, but need to upgrade one by one, first to v16 and then to v17.

### Update Angular to 16 and 3rd party deps to be compatible with Angular 16

Follow the [Angular guidelines for upgrading from v15 to v16](https://update.angular.io/?l=3&v=15.0-16.0) and bump the Angular version locally, and update other 3rd party dependencies from Angular ecosystem  to versions compatible with Angular 16 (e.g. `@ng-select/ng-select@11`, `@ngrx/store@16`, `ngx-infinite-scroll@16`):

```bash
ng update @angular/core@16 @angular/cli@16 @ng-select/ng-select@11 @ngrx/store@16 ngx-infinite-scroll@16  --force
git add .
git commit -m "update angular 16 and 3rd party deps angular 16 compatible"
```

Note: the flag `--force` might be needed, e.g. if you get an `npm` installation error: `Package "@nguniversal/builders" has an incompatible peer dependency to "@angular-devkit/build-angular" (requires "^15.0.0", would install "16.2.10").`

### Update Angular to 17 and 3rd party deps to be compatible with Angular 17

Follow the [Angular guidelines for upgrading from v16 to v17](https://update.angular.io/?l=3&v=16.0-17.0) and bump the Angular version locally. 

Please also update other 3rd part dependencies from Angular ecosystem to versions compatible with Angular 17, e.g. `@ng-select/ng-select@12`, `@ngrx/store@17`, `ngx-infinite-scroll@17`:

```bash
ng update @angular/core@17 @angular/cli@17 @ng-select/ng-select@12 @ngrx/store@17 ngx-infinite-scroll@17 --force
git add .
git commit -m "update angular 17 and 3rd party deps angular 17 compatible"
```

Note: the flag `--force` might be needed, e.g. if you get an `npm` installation error: 
```error
Package "@nguniversal/express-engine" has an incompatible peer dependency to "@angular/common" (requires "^15.0.0" (extended), would install "17.0.5")
Package "@nguniversal/express-engine" has an incompatible peer dependency to "@angular/core" (requires "^15.0.0" (extended), would install "17.0.5").
Package "@nguniversal/express-engine" has an incompatible peer dependency to "@angular/platform-server" (requires "^15.0.0" (extended), would install "17.0.5").
```

If `@angular-devkit/schematics` is not listed under the `devDependencies` in the `package.json` file, please execute the following commands:
```bash
npm i @angular-devkit/schematics@17 --save-dev --force
git add .
git commit -m "add @angular-devkit/schematics@17 to dev dependencies"
```

### Run Spartacus update

After successfully updating the application to Angular 17, execute this command to initiate the Spartacus update process.

```bash
ng update @spartacus/schematics@2211.19
```