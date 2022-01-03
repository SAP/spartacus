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

## Changes in styles

### Mixins
- `padding-block-end` was deleted on `@mixin cx-configurator-template` to enable floating add to cart button styling. 

### Breadcrumb component 

- Style structure changed from `span > a` to `ol > li > a` to account for the changes in template markup. 
