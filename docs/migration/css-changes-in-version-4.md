---
title: Changes to Styles in 4.0
---

## Changes in Checkout Components

* `cx-product-variants` selector has been moved to corresponding feature-lib `@spartacus/product`.

## Changes in Configurator Overview Form Component

* `font-size` set to 1.25rem on `%cx-configurator-overview-form` for `topLevel` selector to adjust the attribute header according to the new styling requirement 

* `font-weight` set to 700 on `%cx-configurator-overview-form` for `topLevel` selector to adjust the attribute header according to the new styling requirement 

* `border-bottom` set to solid 1px var(--cx-color-light) on `%cx-configurator-overview-form` for `topLevel` selector to create the bottom border of the attribute header

* `border-top` set to solid 1px var(--cx-color-light) on `%cx-configurator-overview-form` for `topLevel`  selector to create the top border of the attribute header

* `border-left-style` set to none on `%cx-configurator-overview-form` for `topLevel` selector to achieve top-bottom border

* `border-right-style` set to none on `%cx-configurator-overview-form` for `topLevel` selector to achieve top-bottom border

* `background` set to none on `%cx-configurator-overview-form` for `topLevel` to make the header background transparent

* `text-transform` set to none on `%cx-configurator-overview-form` for `topLevel` to prevent the header form transforming to uppercase 

* `margin-bottom` set to -60px on `%cx-configurator-overview-form` for `subgroupTopLevel` to eliminate the space between the  top-level attribute header and its subgroups 

* `background-color` set to var(--cx-color-background) on `%cx-configurator-overview-form` for `cx-group h2` to set the background color of the subgroup headers 

* `font-size` set to 1rem on `%cx-configurator-overview-form` for `cx-group h2` to specify the font size of the subgroup headers 

* `text-transform` set to uppercase on `%cx-configurator-overview-form` for `cx-group h2` to transform the subgroup header into uppercase

## Changes in Configurator Overview Attribute Component

* `font-weight` set to 600 on `%cx-configurator-overview-attribute` for `cx-attribute-value` to make the attribute values bold
