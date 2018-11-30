# CmsComponent implementation

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
