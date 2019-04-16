# Page Layout
Although Spartacus is based on a Single Page Application design pattern, there are still pages being rendered in the storefront. The concept of a "page" is key to the web and cannot be avoided; pages are identified by URLs, indexed in Google, shared through social media, stored in the browser’s history, etc. 
Pages are fundamental for end-users as well as for the content creation process.

The relation between the CMS page structure and the view logic is explained in this document. You will learn how to configure the page layout. 

In order to simplify the intial setup for projects, if the page layout configuration is lacking, all page slots are being rendered on the page. In addition, a warning is print to the console together with the available page slots that could be configured. 

## Page structure
Pages in CMS are constructed with *slots* and *components*. A page contains slots and slots contain components. In order to organize common slots and components, Spartacus supports *page templates*. A page template contains some of the global layout and components, such as headers and footer. 

While the page structure is provided by the CMS, there's no clear *layout definition* provided by the CMS. The page structure only provides an ordered list of components per slot, but the slots itself are lacking meta info on how they should be rendered in the layout. This is mainly intentionally, so that the layout can change over time while the structure remains. 

In order provide layout information to the view logic, Spartacus uses a `LayoutConfig` configuration object that is used to render the page slots in a given order. Additionally, CSS rules can be applied in order to provide a specific layout.

## Layout Configuration
The `LayoutConfig` supports both the configuration of *page templates* and page *sections*; there's no difference for Spartacus. The LayoutConfig can be provided to the `ConfigModule`, like any Spartacus configuration. 

For each template of section, the slots can be configured in a certain order. 

```typescript
const defaultLayoutConfig: LayoutConfig = {
    header: {
        slots: ['TopHeaderSlot', 'NavigationSlot']
    },
    footer: {
        slots: ['FooterSlot']
    },
    LandingPageTemplate: {
        slots: []
    }
}
```

## CSS layout rules
During the rendering of the slots of the page or section layout, the page template name is added as a CSS class. Additionally, each and every slot can be selected by using the `cx-page-slot` or `position` name of the slot. 
These css classes can be used to map specific style rules to the layout in a loosly coupled way. The CSS provided by spartacus is optional, so that you can add new or adjust existing styles.

Since the page layout is driven by page template codes and the position names, the layout is tightly coupled to the installation data of the backend. Customers might add or replace page templates and slot positions and will need to take care of the CSS rules in this case. 

## Adaptive vs Responsive layout
Spartacus is build using responsive design and does not use adaptive design for the storefront implementation. Responsive design is a widely accepted pattern for commerce storefronts and is recommended from a time and cost savings perspective, both during storefront software development and content production.

While this is the standard approach for Spartacus, nothing stops you from using an adaptive setup. The Commerce backend supports multi-site and can be configured to have different content (catalogs) for alternative sites.

The experience of the end-user can benefit from adaptive design in the UI layer for two reasons (see more details below):
- accessibility 
- performance

For both these aspects, Spartacus allows for adaptive configuration per breakpoint. A specific slot configuration can be provided per breakpoint. The sample configuration below shows an alternative slot configuration for xs screens, with a different order (accessibility) and limited number of slots (performance).

```typescript
const defaultLayoutConfig: LayoutConfig = {
    header: {
        slots: ['FirstSlot', 'SecondSlot', 'LastSlot'],
        xs: ['LastSlot', '`FirstSlot`']
    }
}
```

### Accessibility
A responsive-only approach doesn't cope with accessibility in case of re-ordering of components. Some areas of the storefront might require some re-ordering for specific devices. The header in Spartacus is a good example here. For large screens all elements are visible, while on small devices some of the components are hidden behind a hamburger menu. Moreover, some components are rearranged. 

While CSS supports re-ordering of DOM elements both with `flex-box` and `grid`, the re-ordered DOM elements are not synchronized with the HTML tab system. This is a problem for an optimal experience for people who use the tab system to navigate through the storefront. The slot configuration per breakpoint solves this problem. The layout is (re)build for each breakpoint.

### Performance 
Another potential bottleneck with responsive design might be the amount of content being rendered on a mobile device. Especially on slower networks (i.e. 2G), there's a performance concern for storefronts that render all content immediately. While this could (and should) be solved at the backend, the layout configuration can be used to remove some of the content of page. 

### SSR
Special attention is required when pages are rendered on the server, using Server Side Rendering (SSR). Whenever the SSR process or the edge cache layers are not able to address the client device, the process should decide on the preferred breakpoint. At the one hand, the mode where all content is rendered is preferred for search engines (typically the desktop version). But for an optimized mobile experience, the performance can be boosted by exposing the mobile optimized version. 

In Spartacus, all content is always rendered. There's an open ticket that will improve the rendering on SSR based on device detection if possible or a standard viewport (mobile first).
