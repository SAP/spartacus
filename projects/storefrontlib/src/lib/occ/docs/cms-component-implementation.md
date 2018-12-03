# Customize CMS Component
While the JS storefront is naturally composed out of a large number of fine-grained JS components, there's a special kind of components to render CMS content. CMS components are dynamically added at runtime. The CMS component type, given by the backend, is mapped to an equilavent JS component. The mapping is provided in a configuration, which can be customised. This allows to configure a custom component to render a specific CMS component. 

In addition, component specific business logic can be customized. This requires an additional configuration where the custom service can be provided to the (out of the box) component. 

With this setup, CMS components can be customized in multiple ways:

| Scenario  | Approach | Example | 
| ------------- | ------------- | ------------- | 
| Customize style  | Add custom css rules<br/>(Out of scope for this doc) | Customize component style for the `LanguageSelector` | 
| Replace component | Configure a custom component  | Provide a custom `BannerComponent` | 
| Customize logic  | Configure a custom service | Provide a custom `SearchBoxComponentService` |

## Configure custom components
There are two types of components that can be configured:
- angular components
- web components

### Custom CMS Components (Angular)

The configuration for a CMS components can be provided to the `ConfigModule` (or directly to the `StorefrontModule`). The configuration belows shows how to configure a custom angular component for the BannerComponent

```
ConfigModule.withConfig({
  cmsComponentMapping: {
    BannerComponent: {
        selector: 'custom-banner';
    }
  }
});
```

It's important to note that with this setup, there are 2 important pieces that need optimization going forward:
- the components must be loaded upfront (using so-called `entryComponents`)
- this doesn't allow for lazyloading

Both of these related downsides will be improved going forward. With that in mind, a change in this API is expected.

### Web components as CMS components

Web components have a lot of benefits, and as soon as some of the fundamentals of angular are ready for this, we'll most likely move into this direction. We've already got our selfs prepared for loading web components, although the current recommendation is to stick with angular components. 

In order to configure a web component as a CMS component, the configuration must consist of the path to JS file (web component implementation) and its tag name separated by hash symbol:

```
ConfigModule.withConfig({
  cmsComponentMapping: {
    BannerComponent: {
        selector: 'path/to/banner/component/file.js#custom-banner';
    }
  }
});
```

One JS file can contain more that one web component implementation, used as different CmsComponents. 

This requires a separate build process to generate the JS chunk that holds the web component(s), which is out of scope of this documentation. 


## CmsComponentData

`CmsComponentData` service is way to access related CmsComponent data using dependency injection. 

It contains both `uid` for a component, and an observable `data$` with component payload received from the backend cms. 
 

### Access to storefront API (facade services)

CmsComponent implemented as web component can access storefront API by its cxApi input.
 
cxApi input will receive cxApi service instance with all the facade services and CmsComponentData related to this component. 

_Each component works as an standalone micro app: even if they are implemented in Angular under the hood, they can't access storefront services by dependency injection._ 

