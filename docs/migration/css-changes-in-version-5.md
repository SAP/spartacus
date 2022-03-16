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

## Changes in styles

## Changes in \_tab-paragraph-container.scss

- wrapped everything in `%pdpTabs`inside a `> div {...}` to restore styling after template changes
- wrapped everything in `%pdpFlat`inside a `> div {...}` to restore styling after template changes
- `span.accordion-icon` has been added for screen reader improvments.
- `$useAccordionOnly` var has been added allowing to switch between tabs and accordion view.

## Change in \_order-summary.scss

- `h2` has been changed to `.cx-summary-heading` to restore styling for corresponding markup changes

## Change in tables.scss

- `text-align: center` has been removed from `.table > thead > th` 

## Change in store-finder-list-item.scss

- obsolete style rules were removed for `.cx-store-name` class since the markup structure changed from `h2.cx-store-name > button` changed to `a.cx-store-name` for screen reader improvements.

### Mixins

- `padding-block-end` was deleted on `@mixin cx-configurator-template` to enable floating add to cart button styling.

### BreadcrumbComponent 

- Style structure changed from `span > a` to `ol > li > a` to account for the changes in template markup.

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