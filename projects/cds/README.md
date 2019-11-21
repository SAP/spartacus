# Spartacus CDS 
Spartacus Storefront is a package that you can include in your application, which allows you to add storefront features that support [Context Driven Serices (CDS)](https://help.sap.com/viewer/product/CONTEXT-DRIVEN_SERVICES/SHIP/en-US).

## Using Spartacus CDS

* Include the `CdsModule` in your `app.module.ts`
* Configure your `environment.ts`
  * Provide your storefront url in `occBaseUrl` e.g. `https://<YOUR_STOREFRONT_ORIGIN>`
  * Provide the cds specific configuration. The `default-cds-config.ts` provides a good example. You will need to provide your CDS tenant in `tenant` and update the environemnt (stage, eu or us) in the `baseUrl` to the CDS environment your tenant is provisioned in.
* Configure `data-smartedit-allow-origin` in your storefrontapp `index.html` e.g. `<YOUR_STOREFRONT_ORIGIN>`

## CDS Module

To enable the cds module in spartacus, add it to the list of imports in your root module, and create a CDSConfig by calling the 'withConfig' method. The following is an example: 
```
@NgModule({
  imports: [
    CdsModule.forRoot({
      cds: {
        tenant: 'my-tenant',
        baseUrl: 'https://api.us.context.cloud.sap)',
        endpoints: {
          strategyProducts: 'example',
        },
        profileTag: {
          javascriptUrl: 'https://tag.static.us.context.cloud.sap/js/profile-tag.js/profile-tag.js',
          configUrl:
            'https://tag.static.stage.context.cloud.sap/config/my-config123',
        },
      },
    }),
    ...
```
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

## Profiletag

### CMS Component

To enable profiletag, a CMSFlexComponent named 'ProfileTagComponent' will need to be created in the catalog. This component will then need to be placed into the footer. The following impex accomplishes this:
```
$contentCatalog=electronics-spaContentCatalog
$contentCV=catalogVersion(CatalogVersion.catalog(Catalog.id[default=$contentCatalog]),CatalogVersion.version[default=Staged])[default=$contentCatalog:Staged]
INSERT_UPDATE CMSFlexComponent;$contentCV[unique=true];uid[unique=true];name;flexType;&componentRef;
;;ProfileTagComponent;ProfileTag Spartacus Component;ProfileTagComponent;ProfileTagComponent;

INSERT_UPDATE ContentSlot;$contentCV[unique=true];uid[unique=true];cmsComponents(uid, $contentCV)[mode=append]
;;FooterSlot;ProfileTagComponent
```

This will create the component in the 'Staged' catalog. To publish, run a sync, or replace 'staged' with 'Online'

### Configuration

Profiletag has the following configuration interface:
```
interface ProfileTagConfig {
  javascriptUrl?: string;
  configUrl?: string;
  allowInsecureCookies?: boolean;
  gtmId?: string;
}
```
The `javascriptUrl` is the url of the profiletag version you would like to use. `http://tag.static.us.context.cloud.sap/js/profile-tag.js` will use the latest version.

The `configUrl` is the url from the Profiletag-UI of the configuration you created.

`allowInsecureCookies` is optional and specifies whether profiletag should set insecure cookies. The default value is false. For example, if running on http, setting this to true is requried. In production this should always be set to false.

The `gtmId` is optional and is used for profiletag integration with google-tag-manager. For more information, please refer to the profiletag documentation.


### Consent

In order for CDS events do be sent, a consent with the ID Profile must be defined in the backend. Here is an example impex which accomplishes this:

```
INSERT_UPDATE ConsentTemplate;id[unique=true];name[lang=en];description[lang=$lang];version[unique=true];baseSite(uid)[unique=true,default=exampleUid];exposed
;PROFILE;"Allow SAP Commerce Cloud, Context-Driven Services tracking";"We would like to store your browsing behaviour so that our website can dynamically present you with a personalised browsing experience and our customer support agents can provide you with contextual customer support.";1;;true
```
