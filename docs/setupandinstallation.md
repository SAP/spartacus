# Setup and Installation

The following instructions describe how to build a storefront application from ready-made libraries.

# Prerequisites

Before carrying out the procedures below, please ensure the following frontend and backend requirements are in place.

## Frontend Requirements

Your Angular development environment should include the following:

- Angular cli v6.2.4
- node.js >= 8.9.0
- yarn >= 1.6.0

## Backend Requirements

The Spartacus JavaScript Storefront uses SAP Commerce for its backend, and makes use of the sample data from the B2C Accelerator electronics storefront in particular. 

Perform the following steps to set up your backend:

- Install a new instance of SAP Commerce 1808 using the `b2c_acc` recipe.
- Import `spartacus_sample_data.impex`, which you can download here: https://help.hybris.com/1808/api/spartacus/spartacus_sample_data.impex
- Configure your OCC client, as described here: https://help.hybris.com/1808/hcd/627c92db29ce4fce8b01ffbe478a8b3b.html#loio4079b4327ac243b6b3bd507cda6d74ff

# Creating a New Angular Application

In the following procedure, we create a new Angular application with the name `mystore`.

1. Generate a new Angular application using the Angular CLI, as follows:
   ```
   $ ng new {mystore} --style=scss
   ```
2. Access the newly created directory:
   ```
   $ cd {mystore}
   ```
# Adding Peer Dependencies to the Storefront

The dependencies in this procedure are required by the Spartacus storefront.

1. Add the following dependencies to the `dependencies` section of `{mystore}/package.json`:

   ```
   "@angular/pwa": "^0.6.8",
   "@angular/service-worker": "^6.0.0",
   "@ng-bootstrap/ng-bootstrap": "^3.2.2",
   "@ng-select/ng-select": "^2.9.1",
   "@ngrx/effects": "^6.1.0",
   "@ngrx/router-store": "^6.1.0",
   "@ngrx/store": "^6.1.0",
   "bootstrap": "^4.1.3",
   "ngrx-store-localstorage": "^5.0.1"
   ```

2. Install the dependencies. The following is an example using yarn:

   ```
   yarn install
   ```

# Adding the Storefront Dependencies

There are two libraries you must add to your storefront application. You can do so with yarn, as follows:

```
$ yarn add @spartacus/styles
$ yarn add @spartacus/storefront
```

The storefront libraries are not yet released and the `@next` tag will install the latest pre-alpha version available.

# Importing the Storefront Module into Your Application

1. Open `{mystore}/src/app/app.modult.ts` and add the following lines:

   ```
   import { StorefrontModule } from '@spartacus/storefront';
   ```

2. Add the `StorefrontModule` to the import section of the `NgModule` decorator:

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

# Configuring the Storefront

The Spartacus storefront has default values for all of its configurations. However, you may need to override these values. An example use case would be so that your storefront can communicate with your SAP Commerce backend.

To configure the storfront, use the `withConfig` method on the StorefrontModule. The following is an example:

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

This example uses the default values for the configs. You do not have to specify a config if you do not need to override its value. For example, if you only need to override the backend base URL, you can use this config:

```
imports: [BrowserModule, StorefrontModule.withConfig({
  server: {
    baseUrl: 'https://my-custom-backend-url:8080',
  }
})]
```

# Adding the Storefront Component

This procedure adds the storefront component in the UI. 

1. Open `{approot}/src/app.app.component.html` and replace the entire contents of the file with the following line:

   ```
   <cx-storefront>Loading...</cx-storefront>
   ```

2. Import the styles from the `@spartacus/styles` library by opening `{approot}/src/styles.scss` and adding the following line:

   ```
   @import "~@spartacus/styles/index";
   ```

# Building and Starting

This section describes how to validate your backend installation, and then start the application with the storefront enabled.

## Validating the Backend

1. Use a web browser (Chrome is highly recommended) to access the CMS OCC endpoint of your backend.

   The default is available at: `{server-base-url}/rest/v2/electronics/cms/pages`. 
   
   For example, with a backend instace running from `https://localhost:9002`, you would access: https://localhost:9002/rest/v2/electronics/cms/pages.

2. Accept the security exception in your browser if you are running a development instance with a self-signed HTTPS certificate.

   When the request works, you see an XML response in your browser.

## Starting the Storefront Application

1. Start the application with the storefront enabled, as follows:

   ```
   $ ng serve
   ```

2. When the app server is properly started, point your browser to http://localhost:4200, as instructed from the terminal output of `ng serve`.

# Known Issues

The following are known issues with the current release of Spartacus JavaScript Storefront:

- When using SAP Commerce 1808 for your backend, you are currently not able to add payment details or address details in the Spartacus storefront, which prevents successful checkout. However, if you add payment and address details through the Accelerator electronics storefront, they will then appear in the Spartacus storefront, and you will be able to check out.

-	The Spartacus storefront is currently missing all categories.

-	The Spartacus storefront is currently missing the footer.

- Certain AddOns may cause the Spartacus storefront to not work properly.

- You may notice that the logo is very small. This can be fixed as follows:

   1.	Log in to Backoffice.
   
   2. Select `WCMS` in the left-hand navigation pane, then select the `Component` child node that appears below.

   3. Search for the term `SiteLogoComponent` in the Search box in the top-center panel.
   
        You can modify the component directly in the Online Catalog, or you can modify it in the Staged Catalog and then perform a sync.

   4. Open the `Administration` tab of the SiteLogoComponent, and remove the `Media` value.

   5. Click the button labelled `...` next to the `Media` field.
   
   6. In the pop-up search box that appears, search for the desired media file in your system and select it.

   7. Save your changes


