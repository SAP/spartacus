# Contributor Setup

To contribute to the Spartacus project, the first steps are to clone the Spartacus library sources, build, and then run the storefront from the library development workspace.

This guide shows how to build and run both in development mode and in production mode.

# Prerequisites

Before carrying out the procedures below, please ensure the following front end and back end requirements are in place.

## Front end Requirements

Your Angular development environment should include the following:

- node.js >= 10 and < 12
- yarn >= 1.15

## Back end Requirements

The Spartacus JavaScript Storefront uses SAP Commerce Cloud for its back end, and makes use of the sample data from the B2C Accelerator electronics storefront in particular.

To install SAP Commerce Cloud, refer to the 1808 [installation instructions](../../back_end_installation).

Note: The latest release of SAP Commerce Cloud is recommended.


# Cloning the Sources

The first step is to clone the Spartacus GitHub repository on your local system.

# Installing the Dependencies.

Install the dependencies by running the following yarn command:

```
$ yarn install
```

# Building and Running in Development Mode

The simplest way to build and run from the source code is to work in development mode.

## Configuring Your Back end URL

Carry out the following steps before you build and launch.

1. Configure your back end URL in the `projects/storefrontapp/environments/environment.ts` file.

   The `environment.ts` file contains properties that are applied when the app is run in development mode.

2. Add your back end base URL to the `occBaseUrl` property, as follows:

   ```
   export const environment = {
      occBaseUrl: 'https://custom-backend-url'
   };
   ```

## Launching the Storefront

Lauch the storefront with the following command:

```
$ yarn start
```

This is the most convenient way for a developer to run the storefront. It allows for hot-reloading of the library code as the code changes.

# Building and Running in Production Mode

Building in production mode has more retrictive rules about what kind of code is allowed, but it also allows you to generate a build that is optimized for production. Use this mode as your development cycle nears completion.

## Building the @spartacus/storefront Library

Contrary to development mode, in production mode you need to package and build a standalone storefront library. This is done with the following command:

```bash
yarn build:libs
```

## Configuring Your Back end URL

1. Configure your back end URL in the `projects/storefrontapp/environments/environment.prod.ts` file.

2. Add your back end base URL to the `occBaseUrl` property, as follows:

   ```
   export const environment = {
      occBaseUrl: 'https://custom-backend-url'
   };
   ```

## Launching the Storefront

Launch the server with ng serve, as follows:

```
$ yarn start:prod
```

# Additional Storefront Configuration

In both development mode and production mode, the Spartacus storefront has default values for all of its configurations. However, you may need to override these values.

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

Note: *SAP Commerce cloud 2005 and above* needs to use the occ prefix `/occ/v2/`. Anything below will be be using the default value of `/rest/v2/`.

The server `baseUrl` is pulled from the `environment.*.ts` file, but the rest of the properties in this example use the default values for the configs. You do not have to specify a config if you do not need to override the default value.

For example, if you only need to override the `baseUrl` and the `client_secret`, and want to use the default values for other properties, you can use the following config:

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
