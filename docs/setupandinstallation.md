# Prerequisites:

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

# Add the Storefront's Peer Dependencies

In `{appname}/package.json`, add the following dependencies in the `dependencies` section. They are required by the Spartacus storefront.

```
"@angular/pwa": "^0.6.8",
"@angular/service-worker": "^6.0.0",
"@ng-bootstrap/ng-bootstrap": "^3.2.2",
"@ng-select/ng-select": "^2.9.1",
"@ngrx/effects": "^6.1.0",
"@ngrx/router-store": "^6.1.0",
"@ngrx/store": "^6.1.0",
"bootstrap": "^4.1.3",
"ngrx-store-localstorage": "^5.0.1”
```

Next, install the dependencies. With yarn, it's done with:

```
yarn install
```

# Add the storefront dependencies.

Add the storefront's dependencies to your app. There are two libraries to add. You can do so with these commands:

```
$ yarn add @spartacus/styles@next
$ yarn add @spartacus/storefront@next
```

The Storfront libraries are not yet released and the `@next` tag will install the latest pre-alpha version available.

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

# Build and Start

## Validate the backend

Validate your backend installation. Direct your browser (preferably Chrome) to your backend's cms occ endpoint, which by default is available at: `{server-base-url}/rest/v2/electronics/cms/pages`. For example, with a backend instace running from `https://localhost:9002` you would access: https://localhost:9002/rest/v2/electronics/cms/pages.

If you are running a development instance with a self signed https certificate, you need to accept the security exception in your browser.

When the request works, you see an xml response in your browser.

## Start the Storefront Application

Start the application with the storefront enabled like you would normally do:

```
$ ng serve
```

When the app server is properly started, point your browser to http://localhost:4200 as instructed from the terminal output of `ng serve`.
