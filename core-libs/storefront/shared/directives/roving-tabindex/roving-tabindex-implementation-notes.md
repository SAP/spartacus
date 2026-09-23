# CxRovingTabindexDirective — APG Keyboard Navigation Implementation Notes

## Problem solved

Spartacus table and pagination components lacked keyboard navigation compliant with the [ARIA APG composite widget pattern](https://www.w3.org/WAI/ARIA/apg/patterns/). Users could only Tab through every interactive element individually; there was no arrow-key navigation within composite widgets. This violates WCAG 2.1 SC 2.1.1 and SAP accessibility standards.

The roving tabindex pattern (one `tabindex="0"` item at a time, all others `-1`, arrow keys move the roving focus) is the ARIA-recommended solution for grids, toolbars, and lists of interactive items.

---

## Directive API

```
selector: [cxRovingTabindex]
standalone: true
```

| Input | Type | Default | Purpose |
|---|---|---|---|
| `cxRovingTabindex` (alias: `itemSelector`) | `string` | `[cxRovingTabindexItem]` | CSS selector for focusable items inside the host |
| `cxRovingTabindexAxis` | `'vertical' \| 'horizontal'` | `'vertical'` | Which arrow keys to respond to |
| `cxRovingTabindexActivate` | `boolean` | `true` | Emit `itemActivated` on Enter/Space; set `false` for native `<a>` links that handle activation themselves |

| Output | Payload | Purpose |
|---|---|---|
| `itemActivated` | `number` (zero-based index) | Fired on Enter/Space when `activate=true` |

**Key behaviour:**
- `ngAfterViewInit` calls `initTabindexes()` and starts a `MutationObserver` (`childList: true, subtree: true`)
- Observer re-calls `initTabindexes()` on child additions/removals (e.g. `*ngFor` re-renders), clamping `focusedIndex` so it never goes past the last item
- `attributes` is intentionally excluded from the observer to prevent a feedback loop when the directive itself sets `tabindex`
- `getCurrentFocusedIndex()` resolves the active item via `document.activeElement`, falling back to stored `focusedIndex`
- SSR guard: `typeof document !== 'undefined'` around `document.activeElement`
- Boundary behaviour: `preventDefault()` is always called on the triggered arrow key to prevent page scroll, but focus does not move past first/last item (APG-compliant)

---

## Files created / modified

| File | Status | Notes |
|---|---|---|
| `shared/directives/roving-tabindex/roving-tabindex.directive.ts` | **new** | The directive |
| `shared/directives/roving-tabindex/roving-tabindex.directive.module.ts` | **new** | Companion NgModule for non-standalone consumers |
| `shared/directives/roving-tabindex/roving-tabindex.directive.spec.ts` | **new** | 18 unit tests |
| `shared/directives/roving-tabindex/index.ts` | **new** | Barrel export |
| `shared/directives/index.ts` | **modified** | Added `export * from './roving-tabindex/index'` |
| `shared/components/table/table.component.ts` | **modified** | Removed manual keyboard logic; imports directive |
| `shared/components/table/table.component.html` | **modified** | Feature-gated; rows carry `data-cx-roving-item`; directive on `<table>` |
| `shared/components/table/table.component.spec.ts` | **modified** | Replaced all old keydown tests; 5 new integration tests |
| `pagination/pagination.component.ts` | **modified** | `hostDirectives`; directive configured in `ngOnInit` |
| `pagination/pagination.component.html` | **modified** | Feature-gated; no `[tabindex]` binding in toggle-on block |
| `pagination/pagination.component.spec.ts` | **modified** | tabIndex tests updated; 3 new arrow-key integration tests |
| `core-libs/core/.../feature-toggles.ts` | **modified** | Added `a11yPaginationKeyboardNavigation: false` |

Feature toggles: `a11yTableKeyboardNavigation` and `a11yPaginationKeyboardNavigation` — both enabled in the demo app (`spartacus-features.module.ts`), both default `false` in the library.

---

## Table component migration

`cxRovingTabindex` is placed directly on the `<table>` element. Rows are marked with `data-cx-roving-item` and the selector override is passed via the input alias:

```html
<table cxRovingTabindex="[data-cx-roving-item]" (itemActivated)="launchItem(data[$event])">
  <tr data-cx-roving-item *ngFor="let item of data" ...>...</tr>
</table>
```

`(itemActivated)` emits the row index; the template bridges it to the data item via `data[$event]`. The feature-off block is unchanged (tab-only navigation).

---

## Pagination component migration

### Why `hostDirectives`, not a template wrapper

The first attempt wrapped `<a>` links in `<div cxRovingTabindex>` inside the template. This broke the visual layout: `cx-pagination` is `display: flex`, so the `<div>` became the only direct flex child — the `<a>` links inside it no longer participated in the flex row and rendered as a stacked column.

The fix is Angular `hostDirectives` (available since Angular 15) — the directive runs on the `<cx-pagination>` element itself, preserving the flex context with no extra DOM node.

```ts
@Component({
  hostDirectives: [{ directive: CxRovingTabindexDirective, outputs: ['itemActivated'] }],
})
export class PaginationComponent implements OnInit {
  private readonly rovingTabindex = inject(CxRovingTabindexDirective);

  ngOnInit(): void {
    if (this.featureToggles.a11yPaginationKeyboardNavigation) {
      this.rovingTabindex.itemSelector = 'a:not(.disabled)';
      this.rovingTabindex.cxRovingTabindexAxis = 'horizontal';
      this.rovingTabindex.cxRovingTabindexActivate = false;
    } else {
      // Inert sentinel — directive finds no items, does nothing.
      this.rovingTabindex.itemSelector = '[__cx-roving-disabled__]';
    }
  }
}
```

Lifecycle order: `PaginationComponent.ngOnInit` runs before `CxRovingTabindexDirective.ngAfterViewInit`, so the selector is set before the directive queries the DOM.

Template: the feature-on block renders `<a>` links with no `[tabindex]` binding (directive owns tabindex). The feature-off block keeps the original `[tabindex]="isInactive(item) ? -1 : 0"`.

---

## Issues encountered and resolutions

### 1. `querySelectorAll` invalid selector on `<table>` in jsdom

**Problem:** Angular template attributes without a `data-` prefix (e.g. `[cxRovingTabindexItem]`) caused `"Invalid selector"` when called via `querySelectorAll` on a `<table>` element in jsdom (vitest's DOM implementation). The failure came from `asamuzakjp/dom-selector`, jsdom's CSS selector engine.

**Fix:** Use a `data-` prefixed attribute for table row markers (`data-cx-roving-item`) and pass it as an explicit selector override: `cxRovingTabindex="[data-cx-roving-item]"`. The directive's default selector `[cxRovingTabindexItem]` works fine on non-table elements (used in the directive's own spec with `<div>` items).

---

### 2. `NG0100 ExpressionChangedAfterItHasBeenCheckedError` in directive spec

**Problem:** Mutating `component.activate` or `component.items` then calling `fixture.detectChanges()` in `OnPush` contexts triggered the error.

**Fix:** Use `fixture.changeDetectorRef.detectChanges()` instead of `fixture.detectChanges()` when mutating component properties in test `beforeEach` blocks.

---

### 3. `<div>` wrapper breaking pagination flex layout

See "Why `hostDirectives`" above. Root cause: wrapper div as the sole flex child of `cx-pagination`. Fix: `hostDirectives`.

---

### 4. Both `FeatureDirective` and `MockFeatureDirective` active in spec

**Problem:** After adding `FeatureDirective` to the component's `imports`, the spec's `overrideComponent` only removed `FocusDirective` and added `MockFeatureDirective`. Both ran on `[cxFeature]` elements, rendering both template blocks — doubling all pagination links.

**Fix:** Also remove `FeatureDirective` in `overrideComponent.remove.imports`.

---

### 5. `MockFeatureDirective` always renders the feature-on block

**Behaviour (by design):** `MockFeatureDirective` renders when the feature string does **not** start with `!`. `*cxFeature="'a11yPaginationKeyboardNavigation'"` is always rendered; `*cxFeature="'!a11yPaginationKeyboardNavigation'"` is never rendered in tests.

**Implication:** Tests always exercise the feature-on code path. `provideMockFeatureToggles({ a11yPaginationKeyboardNavigation: true })` must be present in providers so `ngOnInit` configures the directive with the real selector — otherwise the directive receives the inert sentinel and tabindex tests fail.

---

## Unresolved — pagination arrow keys not working in the real browser

**Status: unresolved.** All 75 unit tests pass (including 3 arrow-key integration tests for pagination). The `hostDirectives` approach is structurally correct. However, arrow keys do not respond when tested in the actual browser.

**Remaining hypotheses to investigate:**

1. **`cxFocus` / `TabFocusDirective` swallowing ArrowLeft/ArrowRight.** `TabFocusDirective` has `@HostListener('keydown.arrowRight')` and calls `event.stopPropagation()` inside `TabFocusService.moveTab()` — but *only* when `config.tab` is truthy. Pagination links use `[cxFocus]="{ key: paginationID + i.toString() }"` which has no `tab` property, so this guard should be `false`. Needs runtime confirmation with a breakpoint or log.

2. **A parent element with `cxTrapFocus` or `cxLockFocus`** consuming keydown events before they bubble to `<cx-pagination>`. Less likely for ArrowLeft/Right but worth checking: inspect DOM ancestors of `<cx-pagination>` in browser DevTools for `[cxTrapFocus]` / `[cxLockFocus]` attributes.

3. **`MutationObserver` timing with `a:not(.disabled)`** — when `*ngFor` re-renders on page change, the observer fires as a microtask. At that moment Angular's `[class.disabled]` bindings may not yet be applied. `initTabindexes()` could query a stale DOM. Debug by logging `getItems().length` inside `initTabindexes` in the real browser.

**Suggested first debug step:** Add a temporary `console.log` as the first line of `onKeydown` in the directive and press ArrowRight while focused on a pagination link. If the log does not appear, the event is consumed upstream before reaching the host element. If it appears but items are empty, the selector or timing is the issue.

---

## Unresolved — focus lands on wrong pagination link after page navigation

**Problem:** User is on page 1, tabs to page 2 link, presses Enter → page reloads → focus lands on link 3 (next link) instead of staying on page 2.

**Root cause:** `[cxFocus]="{ key: paginationID + i.toString() }"` uses `PersistFocusDirective` to restore focus by key (e.g. `pagination2`). After navigation Angular destroys and recreates the `*ngFor` items. The persisted key resolves to a DOM element by `*ngFor` index, but after the page change the `currentPage` shifts — so the previously-focused link is at a different index in the new render, and the key resolves to the wrong element.

**This is pre-existing behaviour** not introduced by this PR. A fix would require either (a) using stable keys tied to the page number value rather than `*ngFor` index, or (b) explicitly moving focus via `viewPageEvent`. Out of scope for this PR.

---

## Test coverage

| Spec file | Tests |
|---|---|
| `roving-tabindex.directive.spec.ts` | 18 |
| `table.component.spec.ts` | 30 |
| `pagination.component.spec.ts` | 27 |
| **Total** | **75** |
