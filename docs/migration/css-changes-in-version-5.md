---
title: Changes to Styles in 5.0
---

## Changes in Configurator Tab Bar Component

- `justify-content` set to flex-end instead of flex-start

## Changes in Configurator Add To Cart Button Component

- `.cx-display-only-btn-container` and `button.cx-display-only-btn` were added to `_configurator-add-to-cart-button.scss`.
  Both classes use the same styling as the `add-to-cart-button`

## Changes in Configurator Attribute Numeric Input Field Component

- `flex-direction` set to `column` on `%cx-configurator-attribute-numeric-input-field`.

- `configurator-validation-msg` mixin has been defined on `%cx-configurator-attribute-numeric-input-field` to achieve a consistent styling for rendering a validation message underneath the numeric input field.

## Change in Configurator Required Error Message Mixin

- `cx-configurator-error-msg` mixin has been defined on `%cx-configurator-required-error-msg` mixin to achieve a consistent styling for rendering an error and validation messages.

## Change in _order-summary.scss

- `h2` has been changed to `.cx-summary-heading` to restore styling for corresponding markup changes 
