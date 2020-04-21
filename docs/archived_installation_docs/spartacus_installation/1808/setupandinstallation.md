# Setup and Installation

The following instructions describe how to build a storefront application from published Spartacus libraries.

To build the Spartacus project from source, see [Contributor Setup](contributorsetup.md).

# Prerequisites

Before carrying out the procedures below, please ensure the following front end and back end requirements are in place.

## Front end Requirements

Your Angular development environment should include the following:

- Angular cli v8
- node.js >= 10 and < 12
- yarn >= 1.15

## Back end Requirements

The Spartacus JavaScript Storefront uses SAP Commerce Cloud for its back end, and makes use of the sample data from the B2C Accelerator electronics storefront in particular.

To install SAP Commerce Cloud, refer to the 1808 [installation instructions](../../back_end_installation).

Note: The latest release of SAP Commerce Cloud is recommended.

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

   ```json
   "@angular/pwa": "^0.6.8",
   "@angular/service-worker": "^6.0.0",
   "@ng-bootstrap/ng-bootstrap": "^3.2.2",
   "@ng-select/ng-select": "^2.9.1",
   "@ngrx/effects": "^8.0.0",
   "@ngrx/router-store": "^8.0.0",
   "@ngrx/store": "^8.0.0",
   "bootstrap": "^4.1.3",
   ```

2. Install the dependencies. The following is an example using yarn:

   ```shell
   yarn install
   ```

# Adding the Storefront Dependencies

There are several libraries you must add to your storefront application. You can do so with yarn, as follows:

```
$ yarn add @spartacus/core@next
$ yarn add @spartacus/storefront@next
$ yarn add @spartacus/styles@next
```

The storefront libraries are not yet released, so we suggest using the `@next` tag to install the latest pre-alpha version that is available.

# Importing the Storefront Module into Your Application

1. Open `{mystore}/src/app/app.module.ts` and add the following lines:

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

The Spartacus storefront has default values for all of its configurations. However, you may need to override these values. An example use case would be so that your storefront can communicate with your SAP Commerce back end.

To configure the storefront, use the `withConfig` method on the StorefrontModule. The following is an example:

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

Note: *SAP Commerce cloud 2005 and above* needs to use the occ prefix `/occ/v2/`. Anything below will be be using the default value of `/rest/v2/`.

This example uses the default values for the configs. You do not have to specify a config if you do not need to override its value. For example, if you only need to override the back end base URL, you can use this config:

```
imports: [BrowserModule, StorefrontModule.withConfig({
  server: {
    baseUrl: 'https://my-custom-backend-url:8080',
  }
})]
```

# Adding the Storefront Component

This procedure adds the storefront component in the UI.

1. Open `{approot}/src/app/app.component.html` and replace the entire contents of the file with the following line:

   ```
   <cx-storefront>Loading...</cx-storefront>
   ```

2. Import the styles from the `@spartacus/styles` library by opening `{approot}/src/styles.scss` and adding the following line:

   ```
   @import "~@spartacus/styles/index";
   ```

# Building and Starting

This section describes how to validate your back end installation, and then start the application with the storefront enabled.

## Validating the Back end

1. Use a web browser (Chrome is highly recommended) to access the CMS OCC endpoint of your back end.

   The default is available at: `{server-base-url}/rest/v2/electronics/cms/pages`.

   For example, with a back end instance running from `https://localhost:9002`, you would access: https://localhost:9002/rest/v2/electronics/cms/pages.

   Note: *SAP Commerce cloud 2005 and above* needs to use the occ prefix `/occ/v2/`. Anything below will be be using the default value of `/rest/v2/`.

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

- When using SAP Commerce 1808 for your back end, you are currently not able to add payment details or address details in the Spartacus storefront, which prevents successful checkout. However, if you add payment and address details through the Accelerator electronics storefront, they will then appear in the Spartacus storefront, and you will be able to check out.

- The Spartacus storefront is currently missing all categories.

- The Spartacus storefront is currently missing the footer.

- Certain AddOns may cause the Spartacus storefront to not work properly.

- Spartacus relies on the `cmsoccaddon` for CMS information. However, this extension is currently not fully compatible with SmartEdit. As a result, the categories may not appear in Spartacus. To avoid this problem, remove the SmartEdit CMS web services and personalization extensions.

- You may notice that the logo is very small. This can be fixed as follows:

  1.  Log in to SAP Commerce Backoffice.

  2.  Select `WCMS` in the left-hand navigation pane, then select the `Component` child node that appears below.

  3.  Search for the term `SiteLogoComponent` in the Search box in the top-center panel.

      You can modify the component directly in the Online Catalog, or you can modify it in the Staged Catalog and then perform a sync.

  4.  Open the `Administration` tab of the SiteLogoComponent, and remove the `Media` value.

  5.  Click the button labelled `...` next to the `Media` field.

  6.  In the pop-up search box that appears, search for the desired media file in your system and select it.

  7.  Save your changes
