---
name: styling
description: Use this skill when adding SCSS or wiring up CSS for a brand-new component in a Spartacus app, or when restyling an existing Spartacus `cx-*` component. Distinguishes brand-new components (component-scoped styles OK) from `cx-*` overrides (global SCSS only, so `@spartacus/styles` overrides reach inside ViewEncapsulation).
---

<!-- spartacus-version: 221121.7.0 -->

# Styling / CSS Architecture

## Rule

There are two cases. They have different rules.

### Case A — Tweaking a Spartacus OOTB component

The component already exists in `@spartacus/storefront` or a feature lib, with a `cx-*` selector. You are restyling it without rewriting it. Here you must use **global SCSS** so your overrides sit at the same scope as Spartacus's own theming and `--cx-*` custom properties:

```scss
// src/styles/_overrides.scss
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count {
    font-weight: 700;
  }
}
```

Do NOT add `styleUrls`/`styles` to a subclass of a Spartacus component to override its styles — the component-scoped stylesheet sits below `@spartacus/styles` in cascade scope and is hidden behind ViewEncapsulation.

### Case B — Brand-new custom component

The component is yours, lives under your own selector (`app-*`), and renders content the CMS doesn't already own. Here either approach works — pick one and stay consistent across the app:

- **Component-scoped styles** (`styleUrls` / `styles`) are fine. They keep CSS local and avoid polluting the global cascade.
- **Global SCSS** scoped by the component's element selector is also fine, and is what Spartacus itself uses.

```typescript
@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.component.html',
  styleUrls: ['./recently-viewed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyViewedComponent {}
```

Do NOT use the `cx-` prefix for your custom components — that prefix is reserved for Spartacus.

## How to customize Spartacus theme

Override SCSS variables or CSS custom properties. Do NOT copy components just to change styles.

```scss
// Override SCSS variables before importing Spartacus styles
$primary: #1B2A4A;

// Or override CSS custom properties
:root {
  --cx-color-primary: #1B2A4A;
  --cx-color-accent: #00D4AA;
}
```

## Anti-pattern

```typescript
// ❌ Subclassing a Spartacus component and adding component-scoped styles
//    to override its CSS — the scoped stylesheet sits inside ViewEncapsulation,
//    so @spartacus/styles overrides and --cx-* custom properties don't reach it.
@Component({
  selector: 'cx-mini-cart',
  templateUrl: './my-mini-cart.component.html',
  styleUrls: ['./my-mini-cart.component.scss'],
})
export class MyMiniCartComponent extends MiniCartComponent {}
```

```scss
// ✅ src/styles/_overrides.scss — global, scoped via the cx-* selector,
//    sits at the same cascade level as @spartacus/styles.
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count { font-weight: 700; }
}
```

## Codebase reference

- Global styles ship from `@spartacus/styles` (e.g. `@spartacus/styles/index`, `@spartacus/styles/scss/theme/sparta`).
- Per-feature styles ship from each feature lib's `/styles` subpath, e.g. `@spartacus/cart/base/styles`, `@spartacus/checkout/base/styles`.
