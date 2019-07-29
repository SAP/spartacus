# Getting Started

Spartacus schematics allows you to install Spartacus libraries in your project

## Adding Spartacus libraries to your Angular project

Run the following command from your project root:

`ng add @spartacus/schematics`

### Available options

- `baseUrl`: Base url of your CX OCC backend
- `baseSite`: Name of your base site
- `useMetaTags`: Whether or not to configure baseUrl and mediaUrl in the meta tags from `index.html`

## Steps performed by Spartacus schematics

1. Add required dependencies
2. Add PWA/ServiceWorker support for your project
3. Import Spartacus modules in app.module and setup default configuration
4. Import Spartacus styles to main.scss
5. Add `cx-storefront` component to your app.component
6. (Optionally) update index.html with Spartacus URL endpoints in meta tags

## Spartacus developers

This section is for Spartacus developers and anybody else who develops Spartacus libraries.

### Prerequisits

Install angular schematics globally: `npm install -g @angular-devkit/schematics-cli`

### Running schematics

To run schematics you first need to build them with `yarn build`. After that run the following commands:

```shell
cd projects/schematics
npm pack
```

Next:

- Copy the path to the created `spartacus-schematics-*.tgz` file.
- Generate a new angular app (using `ng new`)
- paste `"@spartacus/schematics": "/Users/i864078/workspaces/spa-gh-work/schematics-spartacus/projects/schematics/spartacus-schematics-0.1.0.tgz",` to the `devDependencies` section of the `package.json`.

Navigate to the newly generated in your temrinal, and run:

```shell
yarn
ng add @spartacus/schematics
```
