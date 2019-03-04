# Page Layout
Although Spartacus is based on a Single Page Application (SPA) UX pattern, there are actually pages being rendered in the storefront. A "page" is a key concept on the web and cannot be avoided. A page can be opened by a url, indexed in Google, shared through social media, stored in the browsers history, etc. The start of a user journey often starts with a page. Not only are pages fundamental for end-users, it is also fundamental in the CMS. Content Creation process are all centered around pages. 

## Page structure
The pages in the CMS are structured with *slots* and *components*. A page contains slots, and slots contain components. In order to organize some common slots and components, Spartacus supports *page templates*. A page template contains some of the global layout and components, such as headers and footer. 

While the page structure is provied by the CMS, there's no clear layout definition provided by the CMS. The page structure details the grouping of components by slots, but there's no specific order available nor any information of what belongs to the header or footer of the page. To that reason Spartacus uses a `LayoutConfig` that can be used to provide the missing information. 

Additionally, CSS rules can be applied in order to provide a specific layout.

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
During the rendering of the slots of the page or section layout, the page template name is added as a css class. Additionally, each and every slot can be selected by using the `cx-dynamic-slot` or `position` name of the slot. This allows for decoupled and customisable CSS rules. 

Since the page layout is driven by page template codes and the position names, the layout is tightly coupled to the installation data of the backend. Customers might add or replace page templates and slot positions and will need to take care of the CSS rules in this case. 

**Note:** the page templates and positions of the accelerator will be refactored to simplify the structure.

## Adaptive vs Resposive layout
Spartacus is build using responsive design and does not use adaptive design for the storefront implementation. Responsive design is a widely accepted pattern for commerce storefronts and is recommended from a time and cost savings perspective, both during storefront software development and content production.
This is the standard approach for Spartacus, but customers can can leverage the multi-site features of the Commerce backend and configure an adaptive storefront alternatively regardless.

There are 2 areas of a pure-responsive design approach that has an impact on the experience for some end-users:
- accessibility
- performance

For both these aspects, Spartacus allows for adaptive configuration per breadpoint. A specific slot-configuration can be provided per breakpoint. The sample configuration belows shows an alternative slot configuration for xs screens, with a different order (accessibilty) and limited number of slots (performance).

```typescript
const defaultLayoutConfig: LayoutConfig = {
    header: {
        slots: ['FirstSlot', 'SecondSlot', 'LastSlot'],
        xs: ['LastSlot', '`FirstSlot`']
    }
}
```

### Accessibility
A responsive-only approach doesn't cope with accessibility in case of re-ordering of components. Some ares of the storefront might require some re-ordering for specific devices. The header in Spartacus is a good example here. For large screens all elements are visible, while on small devices thesome of the components are hidden behind a hamburger menu. Moreover, some components are rearragned. 

While CSS supports re-ordering of DOM elements both with `flex-box` and `grid`, the re-ordered DOM elements are not synchornized with the HTML tabsystem. This is a problem for an optimal experience for people who use the tab system to navigate through the storefront. The slot configuration per breakdpoint solves this problem. The layout is (re)build for each breakpoint.

### Performance 
Another potential bottleneck with responsive design might be the amoutn of content being rendered on a mobile device. Especially on slower networks (ie. 2G), there's a performance concern for storefronts that render all content emmediately. While this could (and should) be solved at the backend, the layout configuration can be used to remove some of the content of page. 

### SSR
Special attention is required when pages are rendered on the server, using Server Side Rendering (SSR). Whenever the SSR process or the edge cache layers are not able to address the client device, the process should decide on the preferred breakpoint. At the one hand, the mode where all content is rendered is preferred for search engines (typically the desktop version). But for an optimzed mobile experience, the performance can be boosted by exposing the mobile optimised version. 

TODO: evalute the usage of device headers in SSR and edge caching (varnish and CDN).

In Spartacus, all content is always rendered. To that reason, the mobile version is rendered at SSR.

## Personalisation

TODO: evalutate if Spartacus is doing the below correctly.

Special care is required when personalisation is added into the mix. While Single Page Applications can leverage the advantage of caching the page structure after first load and use it during the session or even in subsequential visits, content isn't necesarily static and could change based on the user interaction. The storefront should reload content while the user re-visits a page, however if content hasn't chnaged, there's no reason to refresh the content. 

An optimzed interacion from front-end to backend could be implemented to avoid duplicated calls for content. One idea that comes to mind is to provide a hash (in backend) of the page structure and pass this in subsequential calls. The backend could evaluate the hash and return a 304 in case of equal page structure. This would save thenetwork bandwith and client-site processing of the data. 
