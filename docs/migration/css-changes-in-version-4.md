---
title: Changes to Styles in 4.0
---

## Changes in Checkout Components

* `cx-product-variants` selector has been moved to corresponding feature-lib `@spartacus/product`.

## Change in Configurator Attribute Type Components

* `cx-quantity` selector has been added to achieve a consistent styling.

## Changes in Configurator Product Title Component

* `width` set to 80% on `%cx-configurator-product-title` to use only 80% of the configuration product title width.

* `button` instead of the anchor link on `%cx-configurator-product-title`.

* `padding` set to 16px/ 32px on `%cx-configurator-product-title` for `cx-details` selector to align spacing depending on the screen size.

* `cx-configurator-image` mixin has been defined on `%cx-configurator-product-title` for `cx-details-image` selector to achieve a consistent styling.

* `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-product-title` for `cx-detail-title`, `cx-code` and `cx-description` selectors to enable the truncation for the small widgets.

## Changes in Configurator Group Menu Component

* `cx-group-menu` class replace `ul` element on `%cx-configurator-group-menu`.
  
* `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-group-menu` for `span` selector to enable the configuration group title truncation for the small widgets.

## Changes in Configurator Form Component

* `width` set to 100% on `%cx-configurator-form` to use the whole width of the configuration form.

* `padding` set to 16px on `%cx-configurator-form` for `cx-group-attribute` to align the spacing between the configuration group attributes.

## Changes in Configurator Attribute Header Component

* `margin` set to 17px on `%cx-configurator-attribute-header` to align the spacing to the attribute header to the attribute type.

* `padding` set to 0px and `margin` to 17px on `%cx-configurator-attribute-type` to align the spacing between the configuration attribute types.

## Change in Configurator Attribute Drop-Down Component

* `padding` set to 1rem on `%cx-configurator-attribute-drop-down` for `cx-configurator-attribute-quantity` selector to define the spacing between the drop-down attribute type and the quantity counter.

## Change in Configurator Attribute Checkbox List Component

* `padding` set to 1rem on `%cx-configurator-attribute-checkbox-list` to define the spacing between the checkbox-list attribute type and the quantity counter.

## Change in Configurator Attribute Radio Button Component

* `padding` set to 1rem on `%cx-configurator-attribute-radio-button` to define the spacing between the radio-button attribute type and the quantity counter.

## Change in Configurator Previous Next Button Component

* `padding` set to 16px on `%cx-configurator-previous-next-buttons` to align the spacing between the configuration form and the bottom of the configuration.

## Change in Configurator Price Summary Component

* `padding` set to 16px on `%cx-configurator-price-summary` for cx-total-summary selector to align the spacing.

## Change in Configurator Footer Container Mixin

* `padding` set to 16px on `%cx-configurator-footer-container` mixin to align the spacing between the price summary and add-to-cart button.

## Change in Configurator Required Error Message Mixin

* `padding` set to 5px on `%cx-configurator-required-error-msg` mixin to add the spacing at the end of the cx-icon selector.

## Changes in Configurator Overview Form Component

* `padding` set to 0px on `%cx-configurator-overview-form` to fix inconsistent spacings in the configuration overview form.

* `padding` set to 20px and `margin` to 0px on `%cx-configurator-overview-form` for `cx-group` selector to align spacing between the configuration overview groups.

* `padding` set to 32px/16px on `%cx-configurator-overview-form` for `h2` selector to align spacing around the configuration overview group titles.

* `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-overview-form` for `span` selector to enable the overview group title truncation for the small widgets.

* `padding` set to 32px on `%cx-configurator-overview-form` for `cx-attribute-value-pair` selector to align spacing between the configuration overview attribute value pairs.

* `display` set to `none / inline` and `visibility` to `hidden` on `%cx-configurator-overview-form` for `cx-attribute-value-pair` selector to define the visibility for the configuration overview attribute value label.

* `padding` set to 20px on `%cx-configurator-overview-form` for `cx-no-attribute-value-pairs` selector to align spacing between the configuration overview form and the container which is shown when there are no results including a link for removing filter(s).

## Changes in Configurator Overview Attribute Component

* `width` set to 40% on `%cx-configurator-overview-attribute` for `cx-attribute-value` selector to use only 40% of the width for the small widgets.

* `width` set to 60% on `%cx-configurator-overview-attribute` for `cx-attribute-label` selector to use only 60% of the width for the small widgets.
