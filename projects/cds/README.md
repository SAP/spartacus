# Spartacus CDS configuration

## CDS Module

To enable the cds module in spartacus, add it to the list of imports in your root module, and create a CDSConfig using the Spartacus ConfigModule. The following is an example: 
```
@NgModule({
  imports: [
    CdsModule,
    ConfigModule.withConfig(<CdsConfig>{
      cds: {
        tenant: 'example',
        profileTag: {
          javascriptUrl: 'http://tag.static.us.context.cloud.sap/js/profile-tag.js',
          configUrl:
            'https://tag.static.us.context.cloud.sap/config/example-123',
        },
      },
    }),
    ...
```

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
  javascriptUrl: string;
  configUrl: string;
  allowInsecureCookies?: boolean;
  gtmId?: string;
}
```
The `javascriptUrl` is the url of the profiletag version you would like to use. `http://tag.static.us.context.cloud.sap/js/profile-tag.js` will use the latest version.

The `configUrl` is the url from the Profiletag-UI of the configuration you created.

`allowInsecureCookies` is optional and specifies whether profiletag should set insecure cookies. The default value is false. For example, if running on http, setting this to true is requried. In production this should always be set to false.

The `gtmId` is optional and is used for profiletag integration with google-tag-manager. For more information, please refer to the profiletag documentation.