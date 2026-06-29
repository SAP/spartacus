# Styling / CSS Architecture

## Rule

There are two cases. They have different rules.

### Case A — Tweaking a Spartacus OOTB component

The component already exists in `@spartacus/storefront` or a feature lib, with a `cx-*` selector. You are restyling it without rewriting it. Use **global SCSS** targeting the same `cx-*` selector:

```scss
// src/styles/cx-mini-cart.scss  (one file per component you override)
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count {
    font-weight: 700;
  }
}
```

Why global, not component-scoped? Spartacus's OOTB `@Component`s declare **no** `styles`/`styleUrls` — they are styled entirely by the global SCSS that ships in `@spartacus/styles` (keyed on `cx-*` selectors and `--cx-*` custom properties). So your overrides belong at that same global level, where they sit in the same cascade and can read the `--cx-*` variables. Don't try to override the styling by subclassing the component and adding component-scoped `styleUrls`: Angular's emulated encapsulation scopes those styles to your subclass's own view, so they don't reach the nested `cx-*` children that the component composes (and you'd need a CMS remap just to inject styling).

Keep one SCSS file per component you override (e.g. `cx-mini-cart.scss`, `cx-page-layout.scss`) rather than piling everything into a single `_overrides.scss`.

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
// ❌ Subclassing a Spartacus @Component just to add component-scoped styles.
//    Emulated encapsulation scopes them to this view, so they don't reach
//    the nested cx-* children, and you've added a CMS remap purely for CSS.
@Component({
  selector: 'cx-mini-cart',
  templateUrl: './my-mini-cart.component.html',
  styleUrls: ['./my-mini-cart.component.scss'],
})
export class MyMiniCartComponent extends MiniCartComponent {}
```

```scss
// ✅ src/styles/cx-mini-cart.scss — global, scoped via the cx-* selector,
//    at the same cascade level as @spartacus/styles.
cx-mini-cart {
  background: var(--cx-color-secondary);
  .count { font-weight: 700; }
}
```

## Source reference (in `node_modules/@spartacus/*`)

- Global styles ship from `@spartacus/styles` (e.g. `@spartacus/styles/index`, `@spartacus/styles/scss/theme/sparta`).
- Per-feature styles ship from each feature lib's `/styles` subpath, e.g. `@spartacus/cart/base/styles`, `@spartacus/checkout/base/styles`.
