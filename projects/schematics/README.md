# Getting Started With Spartacus Schematics

## 1. To add Spartacus to your Angular project simply just do:

`ng add @spartacus/schematics`


### Available options:

- `baseUrl`: provide baseUrl of your OCC backend
- `baseSite`: provide baseSite
- `useMetaTags`: configure baseUrl via meta tags in `index.html`

### What will this schematics do to my project? 

1. Add required dependencies
2. Add PWA/ServiceWorker support for your project
3. Import Spartacus modules in app.module and setup default configuration
4. Import Spartacus styles to main.scss
5. Add `cx-storefront` component to your app.component
6. (Optionally) update index.html with Spartacus meta tags
