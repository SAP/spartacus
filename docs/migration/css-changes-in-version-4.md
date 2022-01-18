---
title: Changes to Styles in 4.0
---

## Changes in Checkout Components

- `cx-product-variants` selector has been moved to corresponding feature-lib `@spartacus/product`.

## Change in Configurator Attribute Type Components

- `cx-quantity` selector has been added to achieve a consistent styling.

## Changes in Configurator Product Title Component

- `width` set to 80% on `%cx-configurator-product-title` to use only 80% of the configuration product title width.

- `button` instead of the anchor link on `%cx-configurator-product-title`.

- `padding` set to 16px/ 32px on `%cx-configurator-product-title` for `cx-details` selector to align spacing depending on the screen size.

- `cx-configurator-image` mixin has been defined on `%cx-configurator-product-title` for `cx-details-image` selector to achieve a consistent styling.

- `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-product-title` for `cx-detail-title`, `cx-code` and `cx-description` selectors to enable the truncation for the small widgets.

## Changes in Configurator Group Menu Component

- `cx-group-menu` class replaces `ul` element on `%cx-configurator-group-menu`.
  
- `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-group-menu` for `span` selector to enable the configuration group title truncation for the small widgets.

## Changes in Configurator Form Component

- `width` set to 100% on `%cx-configurator-form` to use the whole width of the configuration form.

- `padding` set to 16px on `%cx-configurator-form` for `cx-group-attribute` to align the spacing between the configuration group attributes.

## Changes in Configurator Attribute Header Component

- `margin` set to 17px on `%cx-configurator-attribute-header` to align the spacing to the attribute header to the attribute type.

- `padding` set to 0px and `margin` to 17px on `%cx-configurator-attribute-type` to align the spacing between the configuration attribute types.

## Changes in Configurator Attribute Drop-Down Component

- `flex-direction` set to `column` on `%cx-configurator-attribute-drop-down`.

- `cx-configurator-attribute-level-quantity-price` mixin has been defined on `%cx-configurator-attribute-drop-down` for `.cx-attribute-level-quantity-price` class to achieve a consistent styling.

- `margin-block-start` set to 32px on `%cx-configurator-attribute-drop-down` for `.cx-value-price` class to align the spacing for mobile widget.

- `margin-block-start` set to 32px on `%cx-configurator-attribute-drop-down` for `.cx-attribute-level-quantity-price` class to align the spacing.

## Changes in Configurator Attribute Checkbox List Component

- `padding` set to 1rem on `%cx-configurator-attribute-checkbox-list` to define the spacing between the checkbox-list attribute type and the quantity counter.

- `cx-configurator-attribute-level-quantity-price` mixin has been defined on `%cx-configurator-attribute-checkbox-list` for `cx-attribute-level-quantity-price` selector to achieve a consistent styling.

- `cx-configurator-attribute-visible-focus` mixin has been defined on `%cx-configurator-attribute-checkbox-list` to enable visual focus.

## Changes in Configurator Attribute Radio Button Component

- `padding` set to 1rem on `%cx-configurator-attribute-radio-button` to define the spacing between the radio-button attribute type and the quantity counter.

- `cx-configurator-attribute-level-quantity-price` mixin has been defined on `%cx-configurator-attribute-radio-button` for `.cx-attribute-level-quantity-price` class to achieve a consistent styling.

- `cx-configurator-attribute-visible-focus` mixin has been defined on `%cx-configurator-attribute-radio-button` to enable visual focus.

## Change in Configurator Previous Next Button Component

- `padding` set to 16px on `%cx-configurator-previous-next-buttons` to align the spacing between the configuration form and the bottom of the configuration.

## Change in Configurator Price Summary Component

- `padding` set to 16px on `%cx-configurator-price-summary` for cx-total-summary selector to align the spacing.

## Change in Configurator Footer Container Mixin

- `padding` set to 16px on `%cx-configurator-footer-container` mixin to align the spacing between the price summary and add-to-cart button.

## Change in Configurator Required Error Message Mixin

- `padding` set to 5px on `%cx-configurator-required-error-msg` mixin to add the spacing at the end of the cx-icon selector.

## Change in Configurator Attribute Single-Selection Bundle Component

- `cx-configurator-attribute-level-quantity-price` mixin has been replaced on `%cx-configurator-attribute-single-selection-bundle` to `cx-configurator-bundle-attribute-level-quantity-price`.

## Change in Configurator Attribute Multi-Selection Bundle Component

- `cx-configurator-attribute-level-quantity-price` mixin has been replaced on `%cx-configurator-attribute-multi-selection-bundle` to `cx-configurator-bundle-attribute-level-quantity-price`.

## Changes in Configurator Attribute Type Mixin

- `width` set to 100% on `%cx-configurator-attribute-type` for `fieldset` selector to use only 100% of the width.

- `display` set to `flex` on `%cx-configurator-attribute-type` for `form-check` selector.

- `flex-direction` set to `row` on `%cx-configurator-attribute-type` for `form-check` selector.

- `justify-content` set to `space-between` on `%cx-configurator-attribute-type` for `form-check` selector.

- `width` set to 80% on `%cx-configurator-attribute-type` for `cx-value-label-pair` selector to use only 80% of the width.

- `padding-inline-end` set to 10px on `%cx-configurator-attribute-type` for `cx-value-label-pair` selector.

- `line-break` has been set to `anywhere` on `%cx-configurator-attribute-type` for `cx-value-label-pair` selector to enable line break if the value pair label gets longer.

- `width` set to 20% on `%cx-configurator-attribute-type` for `cx-value-price` selector to use only 20% of the width.

## Changes in Configurator Form Group Mixin

- `width` set to 100% on `%cx-configurator-form-group` for `form-group` selector to use only 100% of the width.

- `display` set to `flex` on `%cx-configurator-form-group` for `form-group` selector.

- `flex-direction` set to `row` on `%cx-configurator-form-group` for `form-group` selector.

- `align-items` set to `center` on `%cx-configurator-form-group` for `form-group` selector.

- `justify-content` set to `space-between` on `%cx-configurator-form-group` for `form-group` selector.

- `width` set to 80% on `%cx-configurator-form-group` for `select` selector to use only 80% of the width.

- `width` set to 20% on `%cx-configurator-form-group` for `cx-value-price` selector to use only 20% of the width.

## Changes in Configurator Attribute Level Quantity Price Mixin

- `margin-block-start` has been removed on `%cx-configurator-attribute-level-quantity-price`.

- `margin-block-end` has been removed on `%cx-configurator-attribute-level-quantity-price`.

- `margin-inline-start` has been removed on `%cx-configurator-attribute-level-quantity-price`.

- `margin-inline-end` has been removed on `%cx-configurator-attribute-level-quantity-price`.

## Changes in Configurator Overview Form Component

- `padding` set to 0px on `%cx-configurator-overview-form` to fix inconsistent spacings in the configuration overview form.

- `padding` set to 20px and `margin` to 0px on `%cx-configurator-overview-form` for `cx-group` selector to align spacing between the configuration overview groups.

- `padding` set to 32px/16px on `%cx-configurator-overview-form` for `h2` selector to align spacing around the configuration overview group titles.

- `cx-configurator-truncate-content` mixin has been added on `%cx-configurator-overview-form` for `span` selector to enable the overview group title truncation for the small widgets.

- `padding` set to 32px on `%cx-configurator-overview-form` for `cx-attribute-value-pair` selector to align spacing between the configuration overview attribute value pairs.

- `display` set to `none / inline` and `visibility` to `hidden` on `%cx-configurator-overview-form` for `cx-attribute-value-pair` selector to define the visibility for the configuration overview attribute value label.

- `padding` set to 20px on `%cx-configurator-overview-form` for `cx-no-attribute-value-pairs` selector to align spacing between the configuration overview form and the container which is shown when there are no results including a link for removing filter(s).

- `font-size` set to 1.25rem on `%cx-configurator-overview-form` for `topLevel` selector to adjust the attribute header according to the new styling requirement

- `font-weight` set to 700 on `%cx-configurator-overview-form` for `topLevel` selector to adjust the attribute header according to the new styling requirement

- `border-bottom` set to solid 1px var(--cx-color-light) on `%cx-configurator-overview-form` for `topLevel` selector to create the bottom border of the attribute header

- `border-top` set to solid 1px var(--cx-color-light) on `%cx-configurator-overview-form` for `topLevel` selector to create the top border of the attribute header

- `border-left-style` set to none on `%cx-configurator-overview-form` for `topLevel` selector to achieve top-bottom border

- `border-right-style` set to none on `%cx-configurator-overview-form` for `topLevel` selector to achieve top-bottom border

- `background` set to none on `%cx-configurator-overview-form` for `topLevel` to make the header background transparent

- `text-transform` set to none on `%cx-configurator-overview-form` for `topLevel` to prevent the header form transforming to uppercase

- `margin-bottom` set to -60px on `%cx-configurator-overview-form` for `subgroupTopLevel` to eliminate the space between the top-level attribute header and its subgroups

- `background-color` set to var(--cx-color-background) on `%cx-configurator-overview-form` for `cx-group h2` to set the background color of the subgroup headers

- `font-size` set to 1rem on `%cx-configurator-overview-form` for `cx-group h2` to specify the font size of the subgroup headers

- `text-transform` set to uppercase on `%cx-configurator-overview-form` for `cx-group h2` to transform the subgroup header into uppercase

## Changes in Configurator Overview Attribute Component

- `justify-content` set to `space-between` on `%cx-configurator-overview-attribute`.

- `width` set to 50% on `%cx-configurator-overview-attribute` for `cx-attribute-value` selector to use only 50% of the width for the small widgets.

- `font-weight` set to 600 on `%cx-configurator-overview-attribute` for `cx-attribute-value` selector to make the attribute values bold.

- `line-break` has been set to `anywhere` on `%cx-configurator-overview-attribute` for `cx-attribute-value` selector to enable line break if the attribute value label gets longer.

- `padding-inline-end` set to 10px on `%cx-configurator-overview-attribute` for `cx-attribute-value` selector to align spacing between `cx-attribute-value` selector and next element.

- `width` set to 100% on `%cx-configurator-overview-attribute` for `cx-attribute-label` selector to use only 100% of the width for the small widgets.

- `padding-inline-end` set to 10px on `%cx-configurator-overview-attribute` for `cx-attribute-label` selector to align spacing between `cx-attribute-label` selector and next element.

- `line-break` has been set to `anywhere` on `%cx-configurator-overview-attribute` for `cx-attribute-label` selector to enable line break if the attribute value label gets longer.

- `width` set to 50% on `%cx-configurator-overview-attribute` for `cx-attribute-price` selector to use only 50% of the width for the small widgets.

## Changes in Product Configurator Card Component

- `.cx-card-title` class added (a11y)
- `.deselection-error-message` class added
- `display` set to inline-block on `%cx-configurator-attribute-product-card`for `&.deselection-error-message` to prevent line break in the deselection error message 
- `width` set to 80% on `%cx-configurator-attribute-product-card`for `&.deselection-error-message` to set the element's box size and prevent line break
- `flex-wrap` set to wrap on `%cx-configurator-attribute-product-card` for `.cx-product-card-selected` to align the deselection error to the desired position
- `padding-top` set to 5px  on `%cx-configurator-attribute-product-card` for `.deselection-error-message` to create space between value description and the error message 
- `color` set to var(--cx-color-danger) on `%cx-configurator-attribute-product-card` for `.deselection-error-message` to signal the message as error message
- `padding-right` set to 5px on `%cx-configurator-attribute-product-card` for `.deselection-error-message-symbol` to create space between the message and the 'error' icon

## Change in Cart Item Component

- `h2` added under `.cx-name` to account for the change in markup template for improved screen reader support (a11y)

## Changes in Order Summary Component 

- `h4` changed to `h3` to account for the change in markup template for improved screen reader support (a11y)

## Changes in Review Submit Component

- `type(3)` added `.cx-review-title` class to retain previous style after changes in the markup template

## Changes in `_index.scss` 

- new component `cx-page-header` added to allow list (a11y)
## Changed in Category Navigation Component 

- `h5` changed to `span` to account for the change in markup template for improved screen reader support (a11y) 
- `nav.is-open > h5` changed to `li.is-open > span` to remove headings from category navigation for improved categorization in screen reader elements dialog (a11y)

## Changes in Footer Navigation Component 

- `h5` changed to `span` under `.flyout`, `@include media-breakpoint-down(md)`, `nav` and `nav >` to account for the change in markup template for improved screen reader support (a11y)


## Changes in Carousel Component

- `h3` changed to `h2` to account for the change in markup template for improved screen reader support (a11y)

## Changes in Product Carousel Component

- `h4` changed to `h3` to account for the change in markup template for improved screen reader support (a11y)

## Changes in Product List Item Component 

- `h2` added to account for the change in markup template for improved screen reader support (a11y)

## Changes in Wish List Item Component 

- `h2` added to account for the change in markup template for improved screen reader support (a11y)

## Changes in Checkout Media Style Component 

- `type(3)` and `font-weight` added to retain existing styling after change in markup template for improved screen reader support (a11y)

## Changes in `_index.scss` 

- `_screen-reader.scss` added which will contain screen reader specific styles (a11y)

## Changes in `_screen-reader.scss` 

- `.cx-visually-hidden` class added. This class can be utilized to hide elements specific for Screen Reader announcement and narration (a11y)

## Changes in `_list.scss` 

- `.cx-table td .text` and `.cx-table td a` padding-inline-start removed to align cx-org table items with head labels.

## Changes in `buttons.scss` 

- `text-transform: var(--cx-button-text-transform)` is changed to `text-transform: var(--cx-text-transform)` to accommodate for theme changes. 

## Changes in `_searchbox.scss` 

- `cx-icon.reset` is changed to `button.reset`
- `.dirty cx-icon.search` is changed to `.dirty div.search` 
- `:not(.dirty) cx-icon.reset` is changed to `:not(.dirty) button.reset` 
- `cx-icon` is changed to `button, div.search` and `cursor: pointer`  is removed.
- `.reset` is changed to `.reset cx-icon`
- `h4.name` is changed to `div.name`

## Changes in `_payment-form.scss`

- added `legend` with `font-size: 1rem` in `.cx-payment-form-exp-date`

## Changes in `_list.scss`

- `.sort` has been wrapped in to `label` in `.header.actions`. Added `min-width: 170px;` for `.sort` and few other styling for `label`.

## Changes in `_my-coupons.scss`

- added styling for `.cx-my-coupons-form-group`: `align-items: center;  display: flex;` and few other styling for `span` and `cx-sorting`.

## Changes in `_my-interests.scss`

- added styling for `.cx-product-interests-form-group`: `align-items: center;  display: flex;` and few other styling for `span` and `cx-sorting`.

## Changes in `_order-history.scss` and `_order-return-request-list.scss`

- added styling for `cx-order-history-form-group`: `align-items: center;  display: flex;` and few other styling for `span` and `cx-sorting`.

## Changes in `_replenishment-order-history.scss`

- added styling for `.cx-replenishment-order-history-form-group`: `align-items: center;  display: flex;` and few other styling for `span` and `cx-sorting`.

## Changes in `_product-list.scss`

- added styling for `.cx-sort-dropdown`: `align-items: center;  display: flex;` and few other styling for `span` and `cx-sorting`.


- `text-transform: var(--cx-button-text-transform)` is changed to `text-transform: var(--cx-text-transform)` to accomedate for theme changes. 

## Changes in `_popover.scss`

- `popover-body > .close` has been moved to `popover-body > .cx-close-row > .close`.

## Changes in `_navigation-ui_.scss` Changes

- `popover-body > .close` has been moved to `popover-body > .cx-close-row > .close`.

- `padding-bottom: 25px` is changed to `padding-bottom: 22px` to accomedate for the header navigation links line-heights.

## Changes in `_versioning.scss` Changes

- Themes for minors versioning is changed from `$_fullVersion: 3.3;` and `$_majorVersion: 3;` to `$_fullVersion: 4;` and `$_majorVersion: 4;` for 4.0 release.
