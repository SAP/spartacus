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
1. angular components
2. web components

**1. Custom CMS Components (Angular)**

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

**2. Web components as CMS components**

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


**Access CMS Data in custom components**

The CMS data that is related to the component is provided as a service (`CmsComponentData`) to the component during instantiation. It contains the component `uid` and an observable (`data$`) to the component payload. Using Angular's DI system, components as well as component specific services can use the `CmsComponentData`. 

Web components will not have access to the application DI system, regardless of wether they're build in angular or not; they're isolated from the core application and can only interact with inputs and outputs. Therefore, they cannot access `CmsComponentData` and would also suffer from not being able to reuse any of the services provided by Spartacus. 
A special effort was made to provide web components with both the component related data as well as a generic API to core services of Spartacus. The input needed for this is `cxApi`. 


# Custom Services
Spartacus CMS Components that use (complex) business logic will delegate this to a component specific service. This allows to only provide custom logic without changing the component itself. 

The component services are designed to be non-singleton services, scoped to the component, so that they have direct access to the `CmsComponentData` provided in the component scope. This design does not play well with Angular DI system, as the DI system doesn't provide a mechanism to override component services without changing the component. 

In order to configure a custom component service, we can provide a service in a similar fashion though. The configuration is done in line with the component configuration. In the example below, the SearchComponent is provided with a custom `SearchBoxComponentService`:

```
ConfigModule.withConfig({
  cmsComponentMapping: {
    SearchBoxComponent: {
        providers: [SearchBoxComponentService];
    }
  }
});
```
