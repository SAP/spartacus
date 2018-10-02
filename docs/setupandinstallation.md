# Pre-Requisites:

## Frontend Requirements

- [link to Spartacus requirmeents: (yarn, node)]
- Angular cli v6 >= 6.2.4 and < 7.0.0

## Backend requirements [needs work]

SAP CX 1808 backend with the electronics store sample data

- Use a new SAP CX instance with the b2c recipe.
- Have an occ client configured [link to occ oauth client config]
- Import additional sample data [link to the impex]

# Create a new Angular application

Generate a new angular application via the Angular CLI :

```
ng new {appname} --style=scss
```

# Add the storefront dependencies

In `{appname}/package.json`, add the two Spartacus libraries and their peer dependencies

```
“@spartacus/storefront”: “0.x”,
“@spartacus/styles”: “0.x”,
"@angular/pwa": "^0.6.8",
"@angular/service-worker": "^6.0.0",
"@ng-bootstrap/ng-bootstrap": "^3.2.2",
"@ng-select/ng-select": "2.9.1",
"@ngrx/effects": "^6.1.0",
"@ngrx/router-store": "^6.1.0",
"@ngrx/store": "^6.1.0",
"bootstrap": "^4.1.3",
"ngrx-store-localstorage": "^5.0.1”
```

Then install the dependencies. With yarn, it's done with:

```
yarn install
```

# Import the storefront module int your app.

To do so, go to `{appname}/src/app/app.modult.ts` and add

```
import { StorefrontModule } from '@spartacus/storefront’;
```

Then add the StorefrontModule to the import section of the NgModule decorator:

```
imports: [BrowserModule, StorefrontModule],
```

Your file should look like this:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StorefrontModule } from '@spartacus/storefront';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StorefrontModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Configure the Storefront

All the storefront has default values for all it's configurations, but each setup is unique, so you will likely need to override these defaults so the storefront can, for example, communicate with your SPA CS backend instance.

To configure the storfront, use the ‘withConfig’ method on the StorefrontModule.

```
  imports: [
    BrowserModule, StorefrontModule.withConfig({
      server: {
        baseUrl: 'https://electronics.local:9002',
        occPrefix: '/rest/v2/'
      },
      authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret'
      }
    })
  ],
```

The values in the example are the default values for the configs. You may omit to specify a config if you do not need to override its value.
For example, if you only need to override the backend base url, you can use this config:

```
imports: [BrowserModule, StorefrontModule.withConfig({
  server: {
    baseUrl: 'https://my-custom-backend-url:8080',
  }
})]
```

# Add the Storefron Component

Add the storefront component in the UI. Go to `{approot}/src/app.app.component.ts` and replace the whole content of the file by this line:

```
<cx-storefront>Loading...</cx-storefront>
```

Import the styles from the @spartacus/styles library.
Go in `{approot}/src/styles.scss and add:`

```
@import "~@spartacus/styles/index";
```
