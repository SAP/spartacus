<!--
  This file contains styling breaking changes.
-->
### ActiveFacetsComponent

- Replaced `h4` style class with `h2` style class

### Feature lib product-configurator 

#### ConfiguratorAddToCartButtonComponent

- Added `z-index: 10;` to `%cx-configurator-add-to-cart-button`

#### ConfiguratorAttributeHeaderComponent

- Set `margin-block-end` to `0px` instead of `17px`
- Added `.cx-action-link { color: var(--cx-color-text);font-size: 14px; min-height: 0px;} `to `.cx-conflict-msg `
- Added `padding-block-end: 5px; padding-block-start: 5px; display: block;` to `img`

#### ConfiguratorAttributeReadOnlyComponent

- `%cx-configurator-attribute-read-only` now only contains `@include cx-configurator-attribute-type();`. This mixin already has all
  the needed styling settings

#### ConfiguratorConflictSuggestionComponent

- `margin-inline-start` changed to `-15px` instead of `-20px`
- `margin-inline-end` changed to `-15px` instead of `-20px`
- added `padding-inline-start: 0px;` to `.cx-title`

#### ConfiguratorGroupTitleComponent

- `margin-block-end` changed to `-15px` instead of `-20px`
- `cx-hamburger-menu` styling added to `.cx-group-title`

#### ConfiguratorOverviewAttributeComponent

- `line-break` changed to `normal` instead of `anywhere`
- `z-index: -6;` added to `.cx-attribute-value`, `.cx-attribute-label` and `.cx-attribute-price`

#### ConfiguratorOverviewFormComponent

- `padding-inline-start: 0px;` removed from `%cx-configurator-overview-form`
- `padding-inline-end: 0px;` removed from `%cx-configurator-overview-form` 
- `padding-inline-start: 0px;` removed from `.cx-group`
- `padding-inline-end: 0px;` removed from `.cx-group` 
- `$subgroupLevel2Top: 60px; $subgroupLevel3Top: 112px; $subgroupLevel4Top: 164px; $subgroupLevel5Top: 216px;` added to `%cx-configurator-overview-form`
- `padding-inline-start: 32px;padding-inline-end: 32px;padding-block-start: 16px;padding-block-end: 16px;`added to `&.topLevel { h2`
- `background-color: var(--cx-color-inverse);`added to `&.topLevel { h2`
- `margin-bottom` changed to `-20px` instead of `-60px` in `&.subgroupTopLevel`
- ` &.subgroup` styling added in `.cx-group`
- Styling added for subgroups on `sm` resolutions

#### ConfiguratorOverviewMenuComponent

- `ul` wraps the content of `cx-configurator-overview-menu`.

#### ConfiguratorVariantOverviewPage

- Handles a new slot `VariantConfigOverviewNavigation`; previously it only got one slot, so no specific styling was required besides
  including the page template `cx-configurator-template`. 
  Now, however, it needs to define the relative and absolute sizes of the two slots involved. The new slot `VariantConfigOverviewNavigation` gets
  `30%`, the other slot `VariantConfigOverviewContent` `70%` of the available space.
 
#### Forms styling

- `border-color: var(--cx-color-medium);` changed to `border-color: var(--cx-color-medium);`

#### ReplenishmentOrderHistoryComponent

- removed `text-decoration: underline; text-transform: uppercase; color: var(--cx-color-primary);padding-inline-start: 0;  color: var(--cx-color-text);` from `.cx-order-cancel`.
- removed `tfm 5.1 wrapper ` on line 87. It was giving the wrong color.
- removed `tfm 5.1 wrapper ` on `.cx-order-cancel`

#### OrderHistoryComponent

- `.cx-order-history-code` added `color: var(--cx-color-primary);`

#### UnitLevelOrderHistoryComponent

-  Added  `(--cx-color-primary)` to `.cx-unit-level-order-history-code .cx-unit-level-order-history-value`