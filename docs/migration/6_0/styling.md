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

#### ConfiguratorConflictSolverDialogComponent

- `z-index: 2000` added to `%cx-configurator-conflict-solver-dialog` to control which dialog is rendered on top if multiple open. The new ConfiguratorRestartDialogComponent uses z-index 3000.

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

#### ConfiguratorOverviewFilterDialogComponent

- `z-index: 1000` added to `%cx-configurator-overview-filter-dialog` to control which dialog is rendered on top if multiple open

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
 
#### CustomerSelectionComponent

- `.spinner` styling removed from `%cx-customer-selection`
- `cx-dot-spinner` styling added in `.asm-results`

#### CSAgentLoginFormComponent

- `cx-dot-spinner` styling added in `%cx-csagent-login-form`

#### AsmMainUiComponent

- `.spinner` styling removed from `%cx-asm-main-ui`

### Feature lib asm 

#### AsmMainUiComponent

- Added property `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'/%3E%3C/svg%3E");` to `.close`
- Added property `background-image: url("[...IMAGE_URI...]");` to `.logout`
- Added property `color: inherit; background-color: #ffffff; box-shadow: 2px 2px rgba(85, 107, 130, 0.1), inset 0px -1px 0px rgba(85, 107, 130, 0.2);` to `.asm-bar`

#### AsmSessionTimerComponent

- Added property `background: url("[...IMAGE_URI...]") no-repeat center center;` to `.reset`

#### AsmToggleUiComponent

- Added property `color: #d50101;` to `.label`
- Added property `background: url("[...IMAGE_URI...]") center center no-repeat;` to `.collapseIcon`
- Added property `background: url("[...IMAGE_URI...]") center center no-repeat;` to `.expandIcon`

#### CustomerEmulationComponent

- Added property `justify-content: flex-start; align-items: baseline; @media (max-width: 940px) { flex-direction: column; > * { margin-bottom: 12px; } }` to `%cx-customer-emulation`
- Added selector `button`
- Added property `color: #aa0808; font-weight: 700; background-color: #ffd6ea; border: 1px solid #ffd6ea; border-radius: 8px; padding: 6px 10px; @media (max-width: 940px) { width: 100%; }` to `button`
- Added selector `label`
- Added property `margin-inline-end: 10px; margin-inline-start: 0; margin-top: 0; margin-bottom: 0; color: #556b82;` to `label`
- Added selector `.cx-asm-customerInfo`
- Added property `display: flex; flex-direction: column; margin-inline-end: 15px;  .cx-asm-name { color: #1d2d3e; } .cx-asm-uid { color: #556b82; }` to `.cx-asm-customerInfo`

#### CustomerSelectionComponent

- Added property `.input-contaier { display: flex; .icon-wrapper { display: flex; outline: 0; border: 1px solid #89919a; color: #ffffff; background-color: #1672b7; padding: 0 12px; height: 36px; border-top-left-radius: 4px; border-bottom-left-radius: 4px; border-right-width: 0px; cursor: pointer; } input { border: none; border-radius: 4px; background-color: #eff1f2; box-shadow: 0px 4px 4px rgb(0 0 0 / 25%); } } .searchTermLabel { display: flex; align-items: center; color: #556b82; min-width: auto; margin: 0 15px 0 0; }` to `label`
- Changed property `@media (min-width: 575px)` from `{ margin-inline-end: 15px; min-width: 20rem; }` to `{ margin-inline-end: 15px; min-width: 20rem; margin-bottom: 0; min-width: 25rem; }` in `label`
- Added selector `button[type='submit']`
- Added property `background-color: #ebf5cb; opacity: 0.4; border: 1px solid #ebf5cb; border-radius: 8px; color: #256f3a; font-weight: 700; transition: opacity 0.3s; &.active { opacity: 1; }` to `button[type='submit]'`

### Font Awesome Icons

- The Font Awesome css library, used for icons, is not downloaded at runtime anymore.  The default icon configuration is still based on the same Font Awesome icons.  However, the Font Awesome css is now bundled with the Spartacus styles.  This change is done to comply with security best practices.

### Fonts library

- CSS fonts were downloaded in runtime from third party servers using Google Fonts. It is now replaced by Fontsource library, a self-hosted solution. The css fonts asset is now bundled with the Spartacus styles. This change is done to comply with security best practices.

### PaymentMethodsComponent

- Removed styling for class `.cx-checkout-title`

### OrderDetailsItemsComponent

- Removed `margin-top: 30px` from `%cx-order-details-items`

### OrderDetailsShippingComponent

- Renamed `%cx-order-details-shipping` to `%cx-order-overview`

### OrderOverviewComponent

- Modifed and added elements to follow the redesign of order overview

### AgnosticTable

- Replaced `border-bottom: 1px solid var(--cx-color-light)` with `border-top: 1px solid var(--cx-color-light)` in the `tr` style class

### OrderConfirmationThankYouMessage

- Replaced `font-weight: $font-weight-normal` with `font-weight: var(--cx-font-weight-bold)` and `font-size: var(--cx-font-size, 1.5rem);` in the `h2` style class
