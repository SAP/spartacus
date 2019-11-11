# Spartacus CDS

Spartacus Storefront is a package that you can include in your application, which allows you to add storefront features that support [Context Driven Serices (CDS)](https://help.sap.com/viewer/product/CONTEXT-DRIVEN_SERVICES/SHIP/en-US).

## Using Spartacus CDS

  * Include the `CdsModule` in your `app.module.ts`
  * Configure your `environment.ts`
    * Provide your storefront url in `occBaseUrl` e.g. `https://<YOUR_STOREFRONT_ORIGIN>`
    * Provide the cds specific configuration. The `default-cds-config.ts` provides a good example. You will need to provide your CDS tenant in `tenant` and update the environemnt (stage, eu or us) in the `baseUrl` to the CDS environment your tenant is provisioned in.
  * Configure `data-smartedit-allow-origin` in your storefrontapp `index.html` e.g. `<YOUR_STOREFRONT_ORIGIN>`

## Merchandising

### CMS Component

By using the b2c_acc_plus recipt in your EC storefront, and configuring Merchandising according to [Context-Driven Merchandising Module](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1905/en-US/5c53aa7a578e48f186817211b4c87e72.html), then Merchandising is ready to work with Spartacus out of the box.

The add a merchandising carousel to your page, simply add a MerchandisingCarouselComponent, and select your merchandising strategy to use for the carousel contents, you will now see a merchandising
enabled carousel displayed on your page.
