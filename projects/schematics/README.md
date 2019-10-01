# Getting Started

Spartacus schematics allows you to install Spartacus libraries in your project

## Adding Spartacus libraries to your Angular project

Run the following command from your project root:

`ng add @spartacus/schematics`

### Available options

- `baseUrl`: Base url of your CX OCC backend
- `baseSite`: Name of your base site
- `useMetaTags`: Whether or not to configure baseUrl and mediaUrl in the meta tags from `index.html`
- `featureLevel`: Application feature level. (default: '1.2')
- `overwriteAppComponent`: Overwrite content of app.component.html file. (default: false)
- `pwa`: Include PWA features while constructing application.
- `ssr`: Include Server-side Rendering configuration.

### Other commands:
By defaut `ng add @spartacus/schematics` will add only basic spartacus configuration. You are able extend application with features like *PWA* or *SSR* with commands listed below:
- `ng g @spartacus/schematics:add-pwa` - adds Spartacus-specific PWA module
- `ng g @spartacus/schematics:add-ssr` - adds server-side rendering configuration

## Steps performed by Spartacus schematics

1. Add required dependencies
2. Import Spartacus modules in app.module and setup default configuration
3. Import Spartacus styles to main.scss
4. Add `cx-storefront` component to your app.component
5. (Optionally) update index.html with Spartacus URL endpoints in meta tags
6. If `--pwa` flag included:
    - Add PWA/ServiceWorker support for your project
7. If `--ssr` flag included:
    - Add ssr dependencies
    - Provide additional files required for SSR


## Building and using Spartacus Schematics from source

This section is for Spartacus developers and anybody else who works with Spartacus source code.

### Prerequisites

Install angular schematics globally: `npm install -g @angular-devkit/schematics-cli`

### Building and testing schematics

1. To build schematics use `yarn build`
2. To run tests use `yarn test`

### Running schematics on separate / new project

1. Run `npm pack` in schematics directory. It will generate the `spartacus-schematics-x.x.x.tgz` file.
2. Generate a new Angular app (using `ng new` command) or choose an existing one
3. Install and run schematics in your app using either:
 - `ng add path-to-file/spartacus-schematics-x.x.x.tgz` (it will execute default schematics)
 - `yarn add path-to-file/spartacus-schematics-x.x.x.tgz` and `ng g @spartacus/schematics:add-spartacus`
