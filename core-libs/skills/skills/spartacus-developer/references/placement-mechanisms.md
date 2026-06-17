# CMS Component Placement — Three Mechanisms

There are three ways to make a component appear on a Spartacus page. Pick whichever suits the situation.

## 1. CMS-driven placement (preferred)

The CMS backoffice places the component in a slot on a page template. No code is needed beyond the `cmsComponents` mapping that connects the CMS component type to your Angular component class:

```typescript
provideConfig({
  cmsComponents: {
    MyCmsComponentType: {
      component: MyComponent,
    },
  },
})
```

This is the canonical mechanism: the CMS backoffice decides where, when, and on which pages the component is rendered, and the Angular code never has to be modified to move it. Use this whenever the CMS team can configure the slot.

## 2. Outlets

Use `provideOutlet` to insert content at specific points in existing Spartacus page layouts (e.g. add a trust badge under the add-to-cart button on every PDP):

```typescript
import { provideOutlet, OutletPosition } from '@spartacus/storefront';

provideOutlet({
  id: 'AddToCart',
  position: OutletPosition.AFTER,
  component: TrustBadgesComponent,
})
```

See the `outlets` skill for the full surface (positions, `cxOutletRef`, finding outlet IDs, and when CMS mapping is the right tool instead).

## 3. Static `cmsStructure` (for development/demo without CMS backend changes)

When you need a CMS slot but can't change the CMS backoffice (local development, a demo branch, or a fixture in tests), use `cmsStructure` in config to declare a page layout and slot in code:

```typescript
provideConfig({
  cmsStructure: {
    pages: [{
      pageId: 'my-custom-page',
      template: 'ContentPage1Template',
      slots: {
        Section1: { componentTypes: ['MyCmsComponentType'] }
      }
    }]
  }
})
```

This synthesizes a CMS page locally so the wildcard route + `CmsPageGuard` can resolve `/my-custom-page` and render `MyCmsComponentType` in the `Section1` slot. The synthesized structure overrides anything the CMS backend would return for the same `pageId`, so revert to mechanism 1 once the CMS team has configured the real page.
