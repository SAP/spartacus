# Customizing CMS Components

The Spartacus storefront is based on JavaScript, and accordingly, it is composed of a large number of fine-grained JavaScript components. However, there is a special kind of component to render CMS content. CMS components are dynamically added at runtime. The CMS component type, given by the back end, is mapped to an equivalent JS component. The mapping is provided in a configuration that can be customized. This allows you to configure a custom component to render a specific CMS component.

In addition, component-specific business logic can be customized. This requires an additional configuration where the custom service can be provided to the (default) component.

With this setup, CMS components can be customized in the following ways:

| Scenario          | Approach                                             | Example                                              |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Customize style   | Add custom CSS rules<br/>(Out of scope for this doc) | Customize component style for the `LanguageSelector` |
| Replace component | Configure a custom component                         | Provide a custom `BannerComponent`                   |
| Customize logic   | Configure a custom service                           | Provide a custom `SearchBoxComponentService`         |

## Configuring Custom Components

There are two types of components that can be configured: angular components, and web components.

### Custom CMS Components (Angular)

The configuration for a CMS component can be provided to the `ConfigModule` (or directly to the `StorefrontModule`). The following configuration shows how to configure a custom Angular component for the `BannerComponent`:

```typescript
ConfigModule.withConfig({
  cmsComponents: {
    BannerComponent: {
        selector: 'custom-banner';
    }
  }
});
```

It's important to note that with this setup, the components must be loaded up front (using so-called `entryComponents`), and it does not allow for lazy loading.

Both of these related downsides will be improved in a future release. With that in mind, a change in this API is expected.

### Web Components as CMS Components

Web components have a lot of benefits, and as soon as some of the fundamentals of Angular are ready for this, we'll most likely begin to use them. We are already preparing for loading web components, although the current recommendation is to stick with Angular components.

To configure a web component as a CMS component, the configuration must consist of the path to the JS file (web component implementation) and its tag name, separated by a hash symbol (`#`). The following is an example:

```typescript
ConfigModule.withConfig({
  cmsComponents: {
    BannerComponent: {
        selector: 'path/to/banner/component/file.js#custom-banner';
    }
  }
});
```

One JS file can contain more that one web component implementation, used as different CmsComponents. 

This requires a separate build process to generate the JS chunk that holds the web component(s), which is out of scope of this documentation. 


### Accessing CMS Data in Custom Components

The CMS data that is related to the component is provided as a service (`CmsComponentData`) to the component during instantiation. It contains the component `uid` and an observable (`data$`) to the component payload. Using Angular's DI system, components as well as component-specific services can use the `CmsComponentData`.

Web components will not have access to the application DI system, regardless of wether they're build in Angular or not: they are isolated from the core application and can only interact with inputs and outputs. Therefore, they cannot access `CmsComponentData`, and would also suffer from not being able to reuse any of the services provided by Spartacus.

A special effort was made to provide web components with both the component-related data, as well as a generic API to tje core services of Spartacus. The input needed for this is `cxApi`.

## Customizing Services

Spartacus CMS components that use (complex) business logic will delegate this to a service. This simplifies extensibility, and is also recommended for the following reasons:

- components only depend on a single service
- the service might have other dependencies
- a custom service can be provided for custom business logic

Component services are designed to be non-singleton services, scoped to the component, so that they have direct access to the `CmsComponentData` provided in the component scope. This design does not play well with the Angular DI system, as the DI system does not provide a mechanism to override component services without changing the component.

However, to configure a custom component service, we can provide a service in a similar fashion. The configuration is done in-line with the component configuration. In the following example, the `SearchComponent` is provided with a custom `SearchBoxComponentService`:

```typescript
ConfigModule.withConfig({
  cmsComponents: {
    SearchBoxComponent: {
        providers: [
        {
          provide: SearchBoxComponentService,
          useClass: CustomSearchBoxComponentService,
          deps: [CmsComponentData, ProductSearchService, RoutingService]
        }
      ];
    }
  }
});
```

## Controlling Server Side Rendering

Some of the CMS components might be intended not to render in the server for multiple reasons:

- a CMS component requires personalized input and should not, or cannot, be rendered without it
- a CMS component is not required for SSR output, and for performance reasons will be removed from the rendering process
- a CMS component interacts with external services (latency) and is not relevant for indexing and social sharing

While it is possible to add conditional logic in a component to render (parts of) the view in the SSR, we offer a configuration for components to make this more generic and to avoid any specific logic in components. The following is an example:

```typescript
ConfigModule.withConfig({
  cmsComponents: {
    SearchBoxComponent: {
        disableSSR: true
    }
  }
});
```

# Placeholder Components

For Angular (or web-) components that don't need any data from CMS (for example *login*) the CMS component of type `CMSFlexComponent` can be used as a placeholder. This CMS component contains the special attribute `flexType` that will be used in the Spartacus' CMS mapping instead of the original component type.

In the same vein, the `uid` attribute of `JspIncludeComponent` is used in the CMS mapping instead of the original component type.

**Note:** We recommend using `CMSFlexComponent` rather than `JspIncludeComponent`, because `uid` has to be unique, so you can't have two instances of the same `JspIncludeComponent`.