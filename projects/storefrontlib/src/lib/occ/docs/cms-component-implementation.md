# Customize CMS Component
While the JS storefront is naturally composed out of a large number of fine-grained JS components, there's a special kind of components to render CMS content. CMS components are dynamically added at runtime. The CMS component type, given by the backend, is mapped to an equilavent JS component. The mapping is provided in a configuration, which can be customised. This allows to configure a custom component to render a specific CMS component. 

In addition, component specific business logic can be customized. This requires an additional configuration where the custom service can be provided to the (out of the box) component. 

With this setup, CMS components can be customized in multiple ways:

| Scenario  | Approach | Example | 
| ------------- | ------------- | ------------- | 
| Customize style  | Add custom css rules<br/>(Out of scope for this doc) | Customize component style for the `LanguageSelector` | 
| Replace component | Configure a custom component  | Provide a custom `BannerComponent` | 
| Customize logic  | Configure a custom service | Provide a custom `SearchBoxComponentService` |



## CmsComponent configuration:

```
{
  cmsComponents: {
    [CmsComponentId: string] : {
      {
        selector?: string;
        providers?: StaticProvider[];
      }
    }
  }
}
```

- selector: defines component's selector that is used for CmsComponent implementation
- providers: defines configurable providers for cms components 

## CmsComponentData

`CmsComponentData` service is way to access related CmsComponent data using dependency injection. 

It contains both `uid` for a component, and an observable `data$` with component payload received from the backend cms. 
 

## WebComponents as CmsComponents

Spartacus storefront supports lazy loaded web components that can be directly used as an implementation of CmsComponents. 

### Mapping configuration

Example mapping configuration for this components consist of path to JS file (web component implementation) and its tag name separated by hash symbol.

Example: ```{ selector: "path/to/component/file.js#component-tag" }```

One JS file can contain more that one web component implementation, used as different CmsComponents. 

### Access to storefront API (facade services)

CmsComponent implemented as web component can access storefront API by its cxApi input.
 
cxApi input will receive cxApi service instance with all the facade services and CmsComponentData related to this component. 

_Each component works as an standalone micro app: even if they are implemented in Angular under the hood, they can't access storefront services by dependency injection._ 




----
