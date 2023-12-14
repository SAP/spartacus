# Migrating a custom app to use Spartacus v2211

Before upgrading Spartacus to the new major version v2211, you need to first:
- upgrade to the latest minor 6.x of Spartacus
- upgrade Angular to version v16 and then to v17

## Update Angular to 16 and 17

You cannot jump 2 Angular major versions, but need to upgrade one by one, first to v16 and then to v17.

### Update Angular to 16

Follow the [Angular guidelines for upgrading from v15 to v16](https://update.angular.io/?l=3&v=15.0-16.0) and bump the Angular version locally:

```bash
ng update @angular/core@16 @angular/cli@16 --force
git add .
git commit -m "update Angular 16"
```

Note: the flag `--force` might be needed, e.g. if you get an `npm` installation error: `Package "@nguniversal/builders" has an incompatible peer dependency to "@angular-devkit/build-angular" (requires "^15.0.0", would install "16.2.10").`

### Update 3rd party deps to be compatible with Angular 16

Update other 3rd party dependencies from Angular ecosystem to versions compatible with Angular 16, e.g. `@ng-select/ng-select@11`, `@ngrx/store@16`, `ngx-infinite-scroll@16`.

```bash
ng update @ng-select/ng-select@11 @ngrx/store@16 ngx-infinite-scroll@16 
```

### Update Angular to 17 and 3rd party deps to be compatible with Angular 17

Follow the [Angular guidelines for upgrading from v16 to v17](https://update.angular.io/?l=3&v=15.0-16.0) and bump the Angular version locally. 

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

### Update rxjs and i18next libraries

Because Spartacus v2211 uses rxjs v7 and i18next v23.7.6, update these libraries in your project:

```bash
npm i rxjs@^7.8.0 i18next@^23.7.6 i18next-http-backend@^2.4.2 i18next-resources-to-backend@^1.2.0
git add .
git commit -m "update rxjs 7 and i18next libraries"
```

## If you used SSR, fix it

### Bring back `server.ts` which got replaced by the Angular migration schematics

Angular migration schematics renamed your `server.ts` file to `server.ts.bak` and created a brand new `server.ts` file. Please revert this change

- remove `server.ts` created by the Angular migration schematics
- rename back your file `server.ts.bak` to `server.ts` (which Angular migration schematics renamed previously to `server.ts.bak`)

### Fix import paths in `server.ts` file:
Change the import path for `zone.js`:
```diff
- import 'zone.js/dist/zone-node';
+ import 'zone.js/node';
```

The `ngExpressEngine` got removed from the Public API of Angular and was incorporated to Spartacus, so please change the import path:
```diff
- import { ngExpressEngine as engine } from '@nguniversal/express-engine';
+ import { ngExpressEngine as engine } from '@spartacus/setup/ssr';
```

### Fix import paths if you were using tokens `REQUEST` and `RESPONSE` 

The tokens `REQUEST` and `RESPONSE` got removed from the Public API of Angular and were incorporated to Spartacus

If you were using `REQUEST` and `RESPONSE` tokens in your app, Angular migration schematics already created for you *local* tokens `REQUEST` and `RESPONSE` defined and provided in your app. This is not what Spartacus expects, so please remove them from your local app. And instead use the tokens from exported from Spartacus Public API:

- remove the definitions and providers of `REQUEST` and `RESPONSE` tokens from your app
- for any usages of tokens `REQUEST` and `RESPONSE` in your app, change the import path to be from Spartacus Public API `"@spartacus/setup/ssr"`:
```ts
import { REQUEST, RESPONSE } from "@spartacus/setup/ssr"`
```
