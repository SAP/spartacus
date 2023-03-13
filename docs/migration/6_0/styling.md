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

#### AsmMainUiComponent

- Added property `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='black' d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'/%3E%3C/svg%3E");` to `.close`
- Added property `background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%230064D9' d='M11,2.7c1.2,0.6,2.2,1.5,2.9,2.6c1.3,1.9,1.5,4.4,0.6,6.5c-0.3,0.8-0.8,1.6-1.5,2.2c-0.6,0.6-1.4,1.1-2.2,1.5 C9.9,15.8,9,16,8,16c-0.9,0-1.9-0.2-2.7-0.5c-0.8-0.4-1.6-0.9-2.2-1.5c-0.6-0.6-1.1-1.4-1.5-2.2C0.7,9.6,0.9,7.2,2.1,5.3 c0.7-1.1,1.7-2,2.9-2.6v1.1C4.1,4.3,3.3,5.1,2.8,6C2.3,6.9,2,7.9,2,9c0,1.6,0.6,3.2,1.8,4.3c0.5,0.5,1.2,1,1.9,1.3 c1.5,0.6,3.2,0.6,4.7,0c0.7-0.3,1.4-0.7,1.9-1.3C13.4,12.1,14,10.6,14,9c0-1.1-0.3-2.1-0.8-3c-0.5-0.9-1.3-1.7-2.2-2.2 C11,3.8,11,2.7,11,2.7z M8,9C7.7,9,7.5,8.9,7.3,8.7C7.1,8.5,7,8.3,7,8V1c0-0.3,0.1-0.5,0.3-0.7c0.4-0.4,1-0.4,1.4,0 C8.9,0.5,9,0.7,9,1v7c0,0.3-0.1,0.5-0.3,0.7C8.5,8.9,8.2,9,8,9z'/%3E%3C/svg%3E%0A");` to `.logout`
- Added property `color: inherit; background-color: #ffffff; box-shadow: 2px 2px rgba(85, 107, 130, 0.1), inset 0px -1px 0px rgba(85, 107, 130, 0.2);` to `.asm-bar`

#### AsmSessionTimerComponent

- Added property `background: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%230064D9' d='M14.9,7.5l-1,0.2c0.2,0.9,0.1,1.7-0.1,2.5c-0.3,1-0.8,2-1.5,2.7c-1.1,1.1-2.7,1.8-4.2,1.8 c-0.8,0-1.5-0.1-2.3-0.4c-1.5-0.6-2.7-1.8-3.3-3.3C2.1,10.2,2,9.5,2,8.7c0-1.6,0.7-3.1,1.8-4.3c0.7-0.8,1.7-1.3,2.7-1.5 c1-0.3,2-0.2,3,0l0,0v-1c-1-0.2-2.1-0.2-3.1,0C4.2,2.4,2.4,4,1.5,6.1C1.2,6.9,1,7.8,1,8.7c0,0.9,0.2,1.8,0.5,2.6 c0.4,0.9,0.9,1.7,1.5,2.3c0.7,0.7,1.4,1.2,2.3,1.5c0.8,0.3,1.7,0.5,2.6,0.5c0.9,0,1.8-0.2,2.6-0.5c2.1-0.9,3.7-2.7,4.2-5 C15,9.3,15,8.4,14.9,7.5z'/%3E%3Cpolygon fill='%23d1e3ff' points='11.5,2.8 9.2,4.5 9.7,0.5 '/%3E%3C/svg%3E%0A") no-repeat center center;` to `.reset`

#### AsmToggleUiComponent

- Added property `color: #d50101;` to `.label`
- Added property `background: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-circle-up' class='svg-inline--fa fa-chevron-circle-up fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%230064D9' d='M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm231-113.9L103.5 277.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L256 226.9l101.6 101.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L273 142.1c-9.4-9.4-24.6-9.4-34 0z'%3E%3C/path%3E%3C/svg%3E") center center no-repeat;` to `.collapseIcon`
- Added property `background: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-circle-down' class='svg-inline--fa fa-chevron-circle-down fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%230064D9' d='M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM273 369.9l135.5-135.5c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L256 285.1 154.4 183.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L239 369.9c9.4 9.4 24.6 9.4 34 0z'%3E%3C/path%3E%3C/svg%3E") center center no-repeat;` to `.expandIcon`

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

The Font Awesome css library, used for icons, is not downloaded at runtime anymore.  The default icon configuration is still based on the same Font Awesome icons.  However, the Font Awesome css is now bundled with the Spartacus styles.  This change is done to comply with security best practices.