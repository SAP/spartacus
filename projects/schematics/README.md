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
