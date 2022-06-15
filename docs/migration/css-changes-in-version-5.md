---
title: Changes to Styles in 5.0
---

## Changes in Configurator Tab Bar Component

- `justify-content` set to flex-end instead of flex-start

## Changes in Configurator Add To Cart Button Component

- `.cx-display-only-btn-container` and `button.cx-display-only-btn` were added to `_configurator-add-to-cart-button.scss`.
  Both classes use the same styling as the `add-to-cart-button`
- `position` was added and set to `fixed` on `%cx-configurator-add-to-cart-button` to make the button float. `position` will be set to `sticky` once the intersection of `.cx-price-summary-container` occurs
- `bottom` was added and set to `0` on `%cx-configurator-add-to-cart-button`
- `width` was added and set to `100%` on `%cx-configurator-add-to-cart-button`
- `background-color` was added and set to `var(--cx-color-background)` on `%cx-configurator-add-to-cart-button`
- `border-top` was added and set to `solid 1px var(--cx-color-light)` on `%cx-configurator-add-to-cart-button`
- `box-shadow` was added and set to ` 0 0 5px var(--cx-color-light)` on `%cx-configurator-add-to-cart-button`
- `margin-top` was added and set to `0px` on `@include cx-configurator-footer-container()`

## Changes in Configurator Overview Notification Banner Component
- error banner was converted to a div, so that `cx-error-notification-banner` style could be added.
- new conflict banner div with with style `cx-conflict-notification-banner` was added.

## Changes in Configurator Tab Bar Component

- Styling is now applied only if content is not empty. Therefore, the styling is wrapped with an `&:not(:empty) {` expression.

## Changes in Configurator Attribute Numeric Input Field Component

- `flex-direction` set to `column` on `%cx-configurator-attribute-numeric-input-field`.

- `configurator-validation-msg` mixin has been defined on `%cx-configurator-attribute-numeric-input-field` to achieve a consistent styling for rendering a validation message underneath the numeric input field.

## Change in Configurator Required Error Message Mixin

- `cx-configurator-error-msg` mixin has been defined on `%cx-configurator-required-error-msg` mixin to achieve a consistent styling for rendering an error and validation messages.

## Changes in \_configurator-attribute-header.scss

- `padding-inline-start: 5px;` was removed from `cx-icon`section
- A new section `a.cx-conflict-msg` has been introduced to style the link that allows for navigating from conflicting attributes to their original group. Its content is `cursor: pointer;`

## Changes in \_configurator-overview-notification-banner.scss
- flex box on root level was changed to column direction to support multiple banners placed underneath
- `.cx-error-notification-banner` and `.cx-conflict-notification-banner` were added with flex direction row for styling the individual banners.
- `.cx-error-notification-banner` replicates the error banner style implemented before on root level.
- `.cx-conflict-notification-banner` implements the new conflict banner styling.

## Changes in styles

## Changes in \_tab-paragraph-container.scss

- wrapped everything in `%pdpTabs`inside a `> div {...}` to restore styling after template changes
- wrapped everything in `%pdpFlat`inside a `> div {...}` to restore styling after template changes
- `span.accordion-icon` has been added for screen reader improvments.
- `$useAccordionOnly` var has been added allowing to switch between tabs and accordion view.
- Class `div.cx-tab-paragraph-content` has been added to change the background color of active open tab.

## Change in \_order-summary.scss

- `h2` has been changed to `.cx-summary-heading` to restore styling for corresponding markup changes

## Change in tables.scss

- `text-align: center` has been removed from `.table > thead > th` 

## Change in store-finder-list-item.scss

- obsolete style rules were removed for `.cx-store-name` class since the markup structure changed from `h2.cx-store-name > button` changed to `a.cx-store-name` for screen reader improvements.

### Mixins

- `padding-block-end` was deleted on `@mixin cx-configurator-template` to enable floating add to cart button styling.

### BreadcrumbComponent (_breadcrumb.scss)

- Style structure changed from `span > a` to `ol > li > a` to account for the changes in template markup.
- Added `text-transform` and set to `capitalize` for `h1`

### AddressFormComponent

- Changed `justify-content` to `center` for `.cx-address-form-btns` in `%cx-address-form`

### NavigationUIComponent, NavigationComponent, FooterNavigationComponent, CategoryNavigationComponent

- Styles has been aligned to the new structure of navigation, see more in template changes of [NavigationUIComponent](./5_0.md#NavigationUIComponent)

### CartItemComponent

- Width for `cx-label` in `cx-price` set to `100px` in mobile view
- Width for `cx-label` in `cx-total` set to `100px` in mobile view
- Width for `cx-label` in `cx-quantity` set to `100px` in mobile view
- Set `display` to `block` for `cx-actions > link` in mobile view

### FormErrorsComponent

- `display: none` has been removed from `cx-form-errors`
- Style structure `&.control-invalid > &.control-dirty, &.control-touched` has ben removed `cx-form-errors`

### AddToCartComponent (_add-to-cart.scss)

- Added `position` and set to `absolute` of `quantity.info`
- Added `transform` and set to `translate(0, -50%)` of `quantity.info`
- Added `top` and set to `50%` of `quantity.info`

### CartDetails (_cart-details.scss)

- Removed styling for classes `cx-total, cx-remove-btn, cx-sfl-btn`.

### CartItemList (_cart-item-list.scss)

- Now it extends styles of `.cx-agnostic-table`
- Most of the styles responsible for table structure has been moved to `.cx-agnostic-table`.
- Previous styles have been removed and added custom styling for cells and used classes. Please see the source code for more details.

### CartItemValidationWarning (_cart-item-validation-warning.scss)

- Changed `text-align` to `var(--cx-text-align, start)` for `.alert` in `%cx-cart-item-validation-warning`.

### SaveForLater (_save-for-later.scss)

- Removed styling for classes `cx-total, cx-remove-btn, cx-sfl-btn`.

### QuickOrderForm (_quick-order-form.scss)

- Selector `cx-quick-order-form` has been replaced by placeholder selector: `%cx-quick-order-form`.

### CartQuickOrderForm (_cart-quick-order-form.scss)

- Selector `cx-cart-quick-order-form` has been replaced by placeholder selector: `%cx-cart-quick-order-form`.

### QuickOrder (_quick-order.scss)

- Selector `cx-quick-order` has been replaced by placeholder selector: `%cx-quick-order`.

### QuickOrderTable (_quick-order-table.scss)

- Selector `cx-quick-order-table` has been replaced by placeholder selector: `%cx-quick-order-table`.
- Now it extends styles of `%cx-cart-item-list`.
- All other styles has been removed.

### WishList (_wish-list.scss)

- Added styling for `td.cx-actions > cx-add-to-cart`.
- Removed styling for `.cx-item-list-price`.
- Removed `--cx-max-width: 75%` and `margin: auto` from `%cx-wish-list`.
- Changed order of `@include media-breakpoint-down(sm)` and `@include media-breakpoint-down(md)`.
- Styling for `.cx-item-list-row:last-of-type` has been moved from `@include media-breakpoint-down(sm)` to `@include media-breakpoint-down(md)`.
- `--cx-max-width` from `@include media-breakpoint-down(md)` has been changed to `75%`.

### WishListItem (_wish-list-item.scss)

- File has been removed.

### AmendOrderItems (_amend-order-items.scss)

- Now it extends styles of `%cx-cart-item-list`.
- All other styles has been removed.

### ReturnRequestItems (_return-request-items.scsss)

- Now it extends styles of `%_return-request-items.scss`.
- All other styles has been removed.

### LoginComponent (_login.scss)

- Added `padding-top` and set to `4px` for `nav > ul > li > button` part of the `cx-page-slot`
- Added `padding-bottom` and set to `0` for ``nav > ul > li > button` part of the `cx-page-slot`

### ConfigureCartEntry (_configure-cart-entry.scss)

- Changed `font-size` to `var(--cx-font-size, 1.188rem)` for `label.disabled-link` in `%cx-configure-cart-entry`.
- Changed `font-weight` to `var(--cx-font-weight-bold)` for `label.disabled-link` in `%cx-configure-cart-entry`.

## Change in _variables.scss
- `$primary-accent: #ff8b8b !default;` has been added to Sparta theme colors

## Change in santorini.scss
- `--cx-color-primary-accent: #50b0f4;` and `--cx-color-secondary-accent: #c3cbde;` were added to santorini theme.
