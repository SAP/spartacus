---
name: cms-component-wiring
description: Use this skill when introducing a component the CMS should be able to place on Spartacus pages, replacing an existing CMS component, or registering `cmsComponents` mappings. Explains why Angular routes are not the right tool for CMS-managed pages.
---

<!-- spartacus-version: 221121.7.0 -->

# CMS Component Wiring

## Rule

Components are rendered because the **CMS backend** places a component type in a page slot — NOT because they appear in an Angular route definition. NEVER add components to Angular route configurations; otherwise their content won't be automatically CMS-driven (the CMS backoffice can't place, hide, or reorder them).

## How to register a component

Map your component to a CMS component type:

```typescript
provideConfig({
  cmsComponents: {
    MyCmsComponentType: {
      component: MyComponent,
    },
  },
})
```

## How to override an existing component

Map the same CMS type to your custom component. Prefer **extending** the original class over copying it (see the `extending-spartacus-classes` skill):

```typescript
provideConfig({
  cmsComponents: {
    ProductReviewComponent: {
      component: MyCustomProductReviewComponent,
    },
  },
})
```

## CMS Component Data

CMS components receive their CMS-managed data via `CmsComponentData<T>` injection:

```typescript
protected componentData = inject<CmsComponentData<MyCmsModel>>(CmsComponentData);

data$ = this.componentData.data$;
```

## Placing new components on pages

There are three mechanisms — see [references/placement-mechanisms.md](references/placement-mechanisms.md) for the detailed comparison and `cmsStructure` example. Quick summary:

1. **CMS-driven placement (preferred)** — the CMS backoffice places the component in a slot. Just add the `cmsComponents` mapping above; no further code.
2. **Outlets** — `provideOutlet` to insert content at specific points in existing layouts (see the `outlets` skill).
3. **Static `cmsStructure`** — for development/demo without CMS backend changes.

## Anti-pattern

```typescript
// ❌ Adding the component as an Angular route
// Spartacus uses a wildcard route + CmsPageGuard; this entry is shadowed
// by the CMS guard, so the page silently disappears as soon as the CMS
// backend resolves the URL.
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'recently-viewed', component: RecentlyViewedComponent },
    ]),
  ],
  declarations: [RecentlyViewedComponent],
})
export class RecentlyViewedModule {}
```

```typescript
// ✅ Map the component to a CMS component type. The CMS slot decides
// where it appears; no Angular route is required.
@NgModule({
  declarations: [RecentlyViewedComponent],
  providers: [
    provideConfig({
      cmsComponents: {
        RecentlyViewedComponent: {
          component: RecentlyViewedComponent,
        },
      },
    }),
  ],
})
export class RecentlyViewedModule {}
```

If the CMS backoffice cannot be changed during development, place the component via `cmsStructure` (mechanism 3) or an outlet — both keep the wildcard CMS route as the single source of truth for navigation.

## Codebase reference

- `CmsConfig`, `provideConfig`, `CmsComponentData` from `@spartacus/core`.
- `BannerModule`, `OutletDirective` from `@spartacus/storefront`.

## Supplemental Information

- [references/placement-mechanisms.md](references/placement-mechanisms.md) — the three placement mechanisms in detail, including the `cmsStructure` config for development/demo.
