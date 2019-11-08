# Spartacus CDS

Spartacus Storefront is a package that you can include in your application, which allows you to add storefront features that support [Context Driven Serices (CDS)}(https://help.sap.com/viewer/product/CONTEXT-DRIVEN_SERVICES/SHIP/en-US).

## Using Spartacus CDS

  * Include the `CdsModule` in your `app.module.ts`
  * Configure your `environment.ts`
    * Provide your storefront url in `occBaseUrl` e.g. `https://<YOUR_STOREFRONT_ORIGIN>`
    * Provide the cds specific configuration. The `default-cds-config.ts` provides a good example. You will need to provide your CDS tenant in `tenant` and update the environemnt (stage, eu or us) in the `baseUrl` to the CDS environment your tenant is provisioned in.
  * Configure `data-smartedit-allow-origin` in your storefrontapp `index.html` e.g. `<YOUR_STOREFRONT_ORIGIN>`