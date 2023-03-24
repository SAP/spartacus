<!--
  This file contains styling breaking changes.
-->
### ActiveFacetsComponent

- Replaced `h4` style class with `h2` style class
- Removed styling for `h4` tag

### Feature lib product-configurator 

#### ConfiguratorAddToCartButtonComponent

- Added `z-index: 10;` to `%cx-configurator-add-to-cart-button`

#### ConfiguratorAttributeHeaderComponent

- Set `margin-block-end` to `0px` instead of `17px`
- Added `.cx-action-link { font-size: 14px; min-height: 0px;} `to `.cx-conflict-msg `
- Added `padding-block-end: 5px; padding-block-start: 5px; display: block;` to `img`

#### ConfiguratorAttributeReadOnlyComponent

- `%cx-configurator-attribute-read-only` now only contains `@include cx-configurator-attribute-type();`. This mixin already has all
  the needed styling settings

#### ConfigureCartEntryComponent

- Styling file was obsolete and has been removed because `link cx-action-link` classes are used

#### ConfiguratorConflictSolverDialogComponent

- `z-index: 2000` added to `%cx-configurator-conflict-solver-dialog` to control which dialog is rendered on top if multiple open. The new ConfiguratorRestartDialogComponent uses z-index 3000.

#### ConfiguratorConflictSuggestionComponent

- `margin-inline-start` changed to `-15px` instead of `-20px`
- `margin-inline-end` changed to `-15px` instead of `-20px`
- Added `padding-inline-start: 0px;` to `.cx-title`

#### ConfiguratorExitButtonComponent

- Styling file was obsolete and has been removed 
- Added `btn btn-tertiary` classes to `button`

#### ConfiguratorGroupTitleComponent

- `margin-block-end` changed to `-15px` instead of `-20px`
- `cx-hamburger-menu` styling added to `.cx-group-title`

#### ConfiguratorIssuesNotificationComponent

- Added property `font-weight: var(--cx-font-weight-semi)`

#### ConfiguratorOverviewAttributeComponent

- `line-break` changed to `normal` instead of `anywhere`
- `z-index: -6;` added to `.cx-attribute-value`, `.cx-attribute-label` and `.cx-attribute-price`

#### ConfiguratorOverviewFilterDialogComponent

- `z-index: 1000` added to `%cx-configurator-overview-filter-dialog` to control which dialog is rendered on top if multiple open

#### ConfiguratorOverviewFilterButtonComponent

- `btn btn-secondary` classes are added to `button`

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

#### ConfiguratorOverviewNotificationBannerComponent

- Removed obsolet styling for `button.link` except `font-size: inherit`

#### ConfiguratorProductTitleComponent

- Added property `box-shadow: inset 0px 10px 7px -12px var(--cx-color-dark)` to `.cx-general-product-info` class

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

#### QuickOrderComponent

- added `input {height: 47px;}` to fix the input height on focus.

#### AnonymousConsentManagementBannerComponent 

- Added `button {margin-bottom: 10px;}` to line 29.

#### AddedToCartDialogComponent

- Added `.cx-modal-content {height: 100%;}` on line 4.

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

### CartItemListRowComponent

- Replaced line 21 and 22 `text-align: end; width: 100%;` to `margin-inline-start: auto;`

### MiniCartComponent 

- Replaced line 12 `min-width: 70px;` with `min-width: 90px;`
- Removed line 21 `color: currentColor;`

### QuickOrderFormComponent

- Added `input { height: 47px;}` to line 16
- Changed line 20 from `color: var(--cx-color-light);` to `color: var(--cx-color-medium);`

### AddToSavedCartComponent

- Added on line 28 `a.disabled {color: gray; cursor: not-allowed; text-decoration: underline;}`

### SavedCartListComponent

- Removed line 129 to 135 `.cx-saved-cart-list-make-cart-active {.cx-saved-cart-make-active {text-decoration: underline;text-transform: capitalize;}} `

### PaymentMethodsComponent

- Changed class `.btn-action` to `.btn-secondary` and `@include media-breakpoint-down(sm)` to `@include media-breakpoint-down(md)`

### checkout-media-style.scss

- Changed class `.btn-action` to `.btn-secondary` and `@include media-breakpoint-down(sm)` to `@include media-breakpoint-down(md)`

### OrderDetailActionsComponent

- Changed class `.btn-action` to `.btn-secondary` and `@include media-breakpoint-down(sm)` to `@include media-breakpoint-down(md)`

### OrderHistoryComponent

- Added `color: var(--cx-color-primary);` to line 82

### ReplenishmentOrderHistoryComponent

- Removed from line 88 ` @include forVersion(5.1) {color: var(--cx-color-text);}`
- Removed 

### ReplenishmentOrderHistoryService

- Replaced  .cx-order-cancel `{text-decoration: underline;text-transform: uppercase;color: var(--cx-color-primary);padding-inline-start: 0;@include forVersion(5.1) {@include type('7');text-transform: var(--cx-button-text-transform);color: var(--cx-color-text); }` with `font-size: var(--cx-font-size, 0.875rem);`

### ReturnRequestOverviewComponent

- Changed line 10 `.btn-action` to `.btn-secondary`

### ReplenishmentOrderCancellationDialogComponent

- Changed line 6 `.btn-action` to `.btn-secondary`

### buttons.scss

- Changed line 78 `background-color: var(--cx-color-primary);border-color: var(--cx-color-primary);` to `background-color: var(--cx-color-primary-accent);border-color: var(--cx-color-primary-accent);`

### company-page-template.scss

- Changed line 18 from `--cx-img-filter: invert(71%) sepia(50%) saturate(7474%) hue-rotate(329deg)brightness(110%) contrast(99%);` to `--cx-img-filter: invert(34%) sepia(61%) saturate(1353%) hue-rotate(178deg)brightness(90%) contrast(90%);`

### UnitLevelOrderHistoryComponent

- Added line 146 `color: var(--cx-color-primary);`

### ConfiguratorPreviousNextButtonsComponent

- Removed `.btn-action` from line 21 and 30. 
- Removed `.cx-btn` from line 4 and 12
- Added `.btn-block` to line 4 and 12
- Removed styling for disabled `.btn-secondary`

### _login.scss

- Added to line 2 `color: var(--cx-color-text);`
- Changed `color: var(--cx-color-inverse);` to `color: var(--cx-color-text);`

### _theme.scss

- Added `@import 'theme/santorini/variables';` and commented out `@import 'theme/sparta/variables';`. This makes Santorini theme the main theme.

### BreadcrumbComponent

- Added `box-shadow: inset 0px 10px 7px -12px var(--cx-color-dark); @include media-breakpoint-up(lg) {box-shadow: none;}`

### FooterNavigationComponent 

- Added to line 2 `background-color: var(--cx-color-background-dark);`

### _link.scss

- Added to link 8 `text-decoration: underline;` 

### NavigationUIComponent

- Line 27 replaced hex color with color variable `color: var(--cx-color-text);`
- Line 37 replaced hex color with color variable `color: var(--cx-color-inverse);`
- Line 258 - 261 added `@include media-breakpoint-up(lg) {background-color: var(--cx-color-text);}`
- Added `&.accNavComponent { background-color: transparent;}` to Line 383

### ScrollToTopComponent 

- Changed line 21 to `background-color: var(--cx-color-primary);` and added `border-radius: 12px`

### TabParagraphContainerComponent

- Changed line 24 to `color: var(--cx-color-secondary);`
- Changed line 89 `color: var(--cx-color-primary-accent);`
- Changed line 109 to `height: 3px;` from `height: 5px;`
- Changed line 110 to `color: var(--cx-color-primary-accent);`

### Header.scss

- Cahnged line 4 to `background-color: var(--cx-color-light);`
- Added `@include media-breakpoint-up(lg) {background: linear-gradient(to top,var(--cx-color-background-dark) $header-height,va(--cx-color-light) 0);` to line 7.
- Added  line 31 `.SiteLinks {font-weight: var(--cx-font-weight-semi);`
- Changed `background-color: var(--cx-color-dark);` to `background-color: var(--cx-background-dark);` on line 56
- Changed line 71 to `color: var(--cx-color-medium);`
- Added line 162 `background-color: var(--cx-color-primary);`
- Added `color: var(--cx-color-primary);` to line 188
- Added `.cx-hamburger` and `.hamburger-inner` styling
