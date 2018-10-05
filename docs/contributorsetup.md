# Contributor Setup.

This guide provides the steps to clone the Spartacus lib sources, build and then run the storefront from the lib development workspace.

# Prerequisites

- node.js >= 8.9.0
- yarn >= 1.9.4

## Backend prerequisites

[Add/Copy to backend requirements]

# Clone the sources

The first step is to clone this repo on your local system.

# Install the dependencies.

Simply use yarn install to accomplich that.

```
$ yarn install
```

# Build and run in dev mode

The simplest way to build and run from the source code is using

## Configure your backend url

Configure your backend url in this file: `projects/storefrontapp/environments/environment.ts`

You can add your backend base url in the occBaseUrl property:

```
export const environment = {
  production: false,
  occBaseUrl: 'https://my-dev-backend-url'
};
```

## Launch the storefront

```
$ yarn start
```

This is the most convenient way for a developer to run the storefront. It allows for hot reload of the library code as changed occur.

# Build and run in prod mode

Building in prod mode has more retrictive rules about what kind of code is allowed. Ultimately, the library code need to be built and run in prod mode because down the road, the code will be built in prod mode when it is used.

## Build the @spartacus/storefront library

Contrary do the dev mode used above, in prod mode you need to to package and build a standalone storefront library. For that, use:

```
$ yarn build:core:lib
```

## Configure your backend url

Configure your backend url in this file: `projects/storefrontapp/environments/environment.prod.ts`

You can add your backend base url in the occBaseUrl property:

```
export const environment = {
  production: false,
  occBaseUrl: 'https://my-dev-backend-url'
};
```

## Launch the storefront

To launch the server with ng serve, use:

```
$ yarn start:prod
```

# Additional Storefront Configuration

In both dev mode and prod mode, the Spartacus storefront has default values for all of its configurations. However, you may need to override these values. If the backend you are using needs.

To configure the storfront, use the `withConfig` method on the StorefrontModule. The following is an example:

```
@NgModule({
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl,
        occPrefix: '/rest/v2/'
      },
      authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret'
      }
    }),
    ...devImports
  ],
  bootstrap: [StorefrontComponent]
})
export class AppModule {}
```

The server `baseUrl` is pulled from the `environment.*.ts` file, but the rest of the preoperties in this example use the default values for the configs. You do not have to specify a config if you do not need to override the default value.

For example, if you only need to override the `clien_secret`, you can use this config:

```
@NgModule({
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl,
      },
      authentication: {
        client_secret: 'secret'
      }
    }),
    ...devImports
  ],
  bootstrap: [StorefrontComponent]
})
export class AppModule {}
```
