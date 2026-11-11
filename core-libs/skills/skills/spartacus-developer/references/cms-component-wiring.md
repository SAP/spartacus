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

Map the same CMS type to your custom component. Prefer **extending** the original class over copying it (see [extending-spartacus-classes.md](./extending-spartacus-classes.md)):

```typescript
provideConfig({
  cmsComponents: {
    ProductReviewComponent: {
      component: MyCustomProductReviewComponent,
    },
  },
})
```

If an override targets one banner in a shared CMS type, render other placements with the installed stock component and its actual host (for example, `<cx-banner>` where the installed mapping uses it). Stock styles can scope the clickable image area to that host. Copying its inner HTML into a different host can leave the same image and link URL with an unreachable pointer target.

## CMS Component Data

CMS components receive their CMS-managed data via `CmsComponentData<T>` injection:

```typescript
protected componentData = inject<CmsComponentData<MyCmsModel>>(CmsComponentData);

data$ = this.componentData.data$;
```

## Placing new components on pages

There are three mechanisms — see [placement-mechanisms.md](placement-mechanisms.md) for the detailed comparison and `cmsStructure` example. Quick summary:

1. **CMS-driven placement (preferred)** — the CMS backoffice places the component in a slot. Just add the `cmsComponents` mapping above; no further code.
2. **Outlets** — `provideOutlet` to insert content at specific points in existing layouts (see [outlets.md](./outlets.md)).
3. **Static `cmsStructure`** — for development/demo without CMS backend changes.

## Anti-pattern

```typescript
// ❌ Adding the component as an Angular route.
// Custom Angular routes are registered before Spartacus's wildcard CMS
// route (the wildcard `**` is appended last, at APP_INITIALIZER time via
// router.config.push). So this route actually *wins* for /recently-viewed
// and bypasses the CMS entirely: the component is no longer CMS-placed,
// the backoffice can't place/hide/reorder it, and you lose the CMS
// page/slot model.
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'recently-viewed', component: RecentlyViewedComponent },
    ]),
  ],
})
export class RecentlyViewedModule {}
```

```typescript
// ✅ Map the component to a CMS component type. The CMS slot decides
// where it appears; no Angular route is required.
@NgModule({
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

If the CMS backoffice cannot be changed during development, place the component via `cmsStructure` (mechanism 3) or an outlet. Both keep the page resolving through Spartacus's CMS routing — the `**` wildcard route plus `CmsPageGuard` — so the CMS still decides what renders, instead of adding a parallel Angular route that would bypass it.

## Debugging CMS page structure

If a component isn't appearing, log the CMS structure for the current page — it shows the slots and which component types the CMS placed in each:

```typescript
inject(CmsService).getCurrentPage().subscribe((page) => console.log(page));
```

If your component type isn't listed in any slot, the CMS backoffice hasn't placed it (or the `cmsComponents` mapping name doesn't match the CMS component type).

## Source reference (in `node_modules/@spartacus/*`)

- `CmsConfig`, `provideConfig`, `CmsService` from `@spartacus/core`; `CmsComponentData` from `@spartacus/storefront` in the installed public API (verify the package export for your version).
- `BannerModule`, `OutletDirective` from `@spartacus/storefront`.

## Supplemental Information

- [placement-mechanisms.md](placement-mechanisms.md) — the three placement mechanisms in detail, including the `cmsStructure` config for development/demo.
- Before implementing media or responsive CMS content, read [performance.md](performance.md): choose its initial visible/closed/inactive state, wire selective LCP context by the real CMS UID, and fit/reserve the generated image. For substantial interaction work, read [performance-interactions.md](performance-interactions.md). CMS registration alone does not establish correct loading or responsiveness.
