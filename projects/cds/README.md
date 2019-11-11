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

By using the b2c_acc_plus recipe in your EC storefront, and configuring Merchandising according to [Context-Driven Merchandising Module](https://help.sap.com/viewer/50c996852b32456c96d3161a95544cdb/1905/en-US/5c53aa7a578e48f186817211b4c87e72.html), then Merchandising is ready to work with Spartacus out of the box.

To add a SAP Context-Driven Merchandising Carousel to a page following the steps: -

* Launch Smartedit.
* Edit the page you wish to add a merchandising carousel to.
* Click on the '+ Component' button in Smartedit.
* You should see the 'SAP Context-Driven Merchandising Carousel' component, If you do not see if, please use the search box.
* Drag and drop the component onto a content slot on the page.
  * If the component doesn't drop when using 'Basic Edit' mode, then please switch to 'Advanced Edit' mode using the drop down in Smartedit.
* Fill in the fields of the configuration window that will be displayed, including selecting a configured strategy from the 'Strategy' drop down box.
* Click the 'Save' button.
* The rendered merchandising carousel should now be visible in the page you're editing.
