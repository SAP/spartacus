<!--
  This file contains breaking changes in html markup.
-->


### AppliedCouponsComponent

- Removed invalid attribute (`role="filter"`) from div tags for accesibility improvements.
- `<div class="coupon-summary">` element has been removed.

### OrderHistoryComponent

- Added `PONumber` and `costCenter` columns to the `table`
- Attribute `role="table"` has been added to `table` for accessibility improvements.
- Added hidden `caption` in the `table` for accessibility improvements.
- Attribute `role="row"` has been added to `tr` for accessibility improvements.
- Attribute `role="cell"` has been added to `td` for accessibility improvements.
- Wrapped `th` tags with `tr` for accessibility improvements.

### OrderApprovalListComponent

- Wrapped `cx-sorting` with `label` and added hidden `span` for accessibility improvements.
- Attribute `role="table"` has been added to `table` for accessibility improvements.
- Added hidden `caption` in the `table` for accessibility improvements.
- Attribute `role="row"` has been added to `tr` for accessibility improvements.
- Attribute `role="cell"` has been added to `td` for accessibility improvements.

### ReplenishmentOrderHistoryComponent

- Added column header text for actions column.
- Added hidden `caption` in the `table` for accessibility improvements.

### SavedCartListComponent

- Replaced h3 tag with h2 tag `header` for accessibility improvements.

### PaymentMethodsComponent

- Replaced h3 tag with h2 tag `header` for accessibility improvements.

### MyCouponsComponent

- Replaced h3 tag with h2 tag `header` for accessibility improvements.

### MyInterestsComponent

- Replaced h3 tag with h2 tag `header` for accessibility improvements.

### AddressBookComponent

- Replaced p tag with h2 tag for `header` for accessibility improvements.
- Changed `btn btn-block btn-action` to `btn btn-block btn-secondary`

### CouponCardComponent

- Replaced anchor tag with button tag for `read more` link for accesibility tabbing improvements.
- Changed line 60 `btn btn-block btn-action` to `btn btn-block btn-secondary`


### QuickOrderFormComponent
- Renamed `div` tag `id` value and `input` tag `aria-controls` value to remove duplicate ids occurred in the screen.

### FacetListComponent

- Separated button tag from header tag for accessibility improvements


### QuickOrderComponent

- Replaced h3 tag with h2 tag `header` for accessibility improvements.

### defaultCouponLayoutConfig

- Changed `inline: true` to `inlineRoot: true` for keyboard tabbing and VO to work correctly.

### defaultAnonymousConsentLayoutConfig

- Changed `inline: true` to `inlineRoot: true` for keyboard tabbing and VO to work correctly.

### StoreFinderSearchComponent

- Added `tabindex"` to control tab stop for accessibility improvements.

### UpdateProfileComponent

- Removed empty option(`ng-option`) from the title code selector(`ng-select`).

### UserRegistrationFormComponent

- Added `id` attribute to `ng-select` to generate `aria-controls` for accessibility improvements.

### CardComponent

- Replaced `a` tag with `button` for accessibility improvements.

### ActiveFacetsComponent

- Replaced `h4` tag with `h2` tag header for accessibility improvements.

### UnitLevelOrderOverviewComponent

- Removed a condition to hide 2nd order summary column

### AddressBookFormComponent

- Added `cellphone` field to the `addressForm`
- Added `Cellphone` field to adress card with corresponding form group element

### ConfiguratorAttributeDropDownComponent

- Drop down options now can contain the technical attribute value key (if expert mode is active) and the value price if present

### ConfiguratorAttributeReadOnlyComponent

- Component content now wrapped in `<fieldset>`
- Label now can contain the technical attribute value key (if expert mode is active)
- New class `cx-read-only-attribute-label` attached to the label has been introduced
- Label is wrapped in `<div class="cx-value-label-pair">` for accessibility improvements
- Value price is displayed in addition to label, wrapped in `<div class="cx-value-price">`

### ConfiguratorGroupTitleComponent

- Contains <cx-hamburger-menu> for mobile resolutions

### ConfiguratorOverviewMenuComponent

- Overview menu is wrapped in an unordered list`<ul>` for accessibility improvements

### ConfiguratorOverviewFormComponent

- Overview group style class is now compiled by component `<div [ngClass]="getGroupLevelStyleClasses(level, group.subGroups)">`

### ConfiguratorProductTitleComponent

- Now as well contains information about the knowledge base that was used to run the configuration. This information
  is only visible in case expert mode is active. The knowledge base related information is enclosed with `<div class="cx-kb-key-details">`

#### CustomerTicketingCreateDialogComponent

- Create ticket dailog cancel button class has been changed to `class="btn btn-secondary"` from `class="btn btn-action"`

#### CustomerTicketingReopenDialogComponent

- Reopen ticket dailog cancel button class has been changed to `class="btn btn-secondary"` from `class="btn btn-action"`

#### CustomerTicketingCloseDialogComponent

- Close ticket dailog cancel button class has been changed to `class="btn btn-secondary"` from `class="btn btn-action"`

#### CustomerTicketingCloseComponent 

- Customer ticketing cancel button class has been changed to `class="btn btn-secondary"` from `class="btn btn-action"`

#### ReplenishmentOrderHistoryComponent

- Replenish order history cancel button class has changed from `class="cx-order-cancel btn btn-link"` to `class="cx-order-cancel btn btn-secondary"`

#### AnonymousConsentManagementBannerComponent

- Changed bootstrap class on buttons from `col-lg-8` to `col-lg-7` and `col-lg-4` to `col-lg-5`. 
- Changed bootstrap class `col-lg-4 col-xs-12 cx-banner-buttons` to `col-lg-5 col-xs-12 cx-banner-buttons`
- Changed `btn btn-action` to `btn btn-secondary`

### CheckoutReviewSubmitComponent

- Removed `col-md-12` from `div` tag used to display entries

### CheckoutDeliveryAddressComponent

- Replaced translation text from `checkoutAddress.deliveryAddress` to `checkoutAddress.shippingAddress` in the element `<h2 class="cx-checkout-title d-none d-lg-block d-xl-block">`

#### CSAgentLoginFormComponent

- Replaced `div.spinner` tag with `cx-dot-spinner`. And changing assertions to `expect(el.query(By.css('cx-dot-spinner'))).toBeTruthy();` in unit tests.

#### CustomerSelectionComponent

- Replaced `div.spinner` tag with `cx-dot-spinner`. And changing assertions to `expect(el.query(By.css('cx-dot-spinner'))).toBeTruthy();` in unit tests.

### CheckoutTranslations

- Changed default English translation for key `checkoutProgress.paymentDetails` from `Payment Details` to `Payment`
- Changed default English translation for key `checkoutProgress.reviewOrder` from `Review Order` to `Review`
- Changed default English translation for key `checkoutProgress.deliveryAddress` from `Delivery Address` to `Shipping Address`
- Removed English translation key for `checkoutAddress.deliveryAddress`. In default templates it is replaced with `checkoutAddress.shippingAddress`

### CheckoutDeliveryModeComponent

- Changed design and structure of how delivery modes are displayed

### AsmMainUiComponent

- Custom customer list has been added as first child of `<div class="asm-bar-actions">` tag

### CustomerEmulationComponent

- Removed the disabled `<input>` element and replaced it with the corresponding information in the `<div class="cx-asm-customerInfo"> element.

### ExportOrderEntriesComponent

- Changed translation key from `exportEntries.exportToCsv` to `exportEntries.exportProductToCsv`

### ReplenishmentOrderCancellationDialogComponent 

- Icon button has been added with closing dialog functionality inside `<div class="cx-cancel-replenishment-dialog-header">`

### AddToCartComponent

- Changed line 33 classes from `'link cx-action-link'` to `'btn btn-tertiary'`
- Changed line 37 to have `button` content wrapped in a `span` tag on line 46. The `AddToCart` string can be interchanged with `BuyItAgain`
- Added Icon wrapped in a `span` tag which appears when `AddToCart` string is changed to `BuyItAgain`.
- Added class `cx-dialog-pickup-store` to line 39.
- Added `span class="cx-dialog-pickup-store-name"` to line 41

### CartCouponComponent

- Changed line 18 class `btn-action` to `btn-secondary` to update to UX specifications.

### CartItemListRowComponent

- Changed class on line 155 `link cx-action-link` to `btn btn-tertiary` 

### ClearCartComponent

- Changed line 161 classes from `'link cx-action-link'` to `'btn btn-tertiary'`

### ClearCartDialogComponent

- Changed line 42 classes from `'btn btn-action'` to `'btn btn-secondary'`

### SaveForLaterComponent

- Changed line 34 classes from `'link cx-action-link'` to `'btn btn-tertiary'`

### ExportOrderEntriesComponent

- Changed line 5 classes from `'link cx-action-link'` to `'btn btn-tertiary cx-export-btn'`
- Changed line 14 classes from `'link cx-action-link'` to `'btn btn-tertiary cx-export-btn'`

### ImportEntriesFormComponent

- Changed line 20 classes from `'btn btn-action'` to `'btn btn-secondary'`

### ImportEntriesSummaryComponent

- Changed line 33 classes from `'link cx-action-link'` to `'btn btn-tertiary'`
- Changed line 61 classes from `'link cx-action-link'` to `'btn btn-tertiary'`
- Changed line 83 classes from `'btn btn-action'` to `'btn btn-secondary'`

### ImportToNewSavedCartFormComponent

- Changed line 64 classes from `'btn btn-action'` to `'btn btn-secondary'`

### ImportOrderEntriesComponent

- Changed line 3 classes from `'link cx-action-link'` to `'btn btn-tertiary cx-import-btn'`

### CartQuickOrderFormComponent

- Changed line 44 classes from `'btn btn-block btn-action apply-quick-order-button'` to `'btn btn-block btn-secondary apply-quick-order-button'`

### QuickOrderComponent

- Changed line 195 classes from `col-xs-12 col-md-5 col-lg-4` to `col-xs-12 col-md-5 col-lg-3` 
- Changed line 201 classes from `btn btn-block btn-action clear-button` to `btn btn-block btn-secondary clear-button` 
- Changed line 208 classes from `col-xs-12 col-md-5 col-lg-4` to `col-xs-12 col-md-5 col-lg-3` 

### QuickOrderItemComponent

- Changed line 61 classes from `'link cx-action-link'` to `'btn btn-tertiary'`

### AddToSavedCartComponent

- Changed line 3 `<button>` to `<a>` 
- Changed line 14 `<button>` to `<a>` 

### SavedCartDetailsActionComponent 

- Changed line 6 classes from `'btn btn-action'` to `'btn btn-secondary'`

### SavedCartListComponent 

- Changed line 123 classes from `'link cx-action-link cx-saved-cart-make-active'` to `'btn btn-tertiary cx-saved-cart-make-active'`

### SavedCartFormDialogOptions

- Changed line 146 classes from `'mr-2 btn btn-action'` to `'mr-2 btn btn-secondary'`
- Changed line 244 classes from `'btn btn-action'` to `'btn btn-secondary'`

### B2BCheckoutDeliveryAddressComponent

- Changed line 24 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 54 classes from `'cx-btn btn btn-block btn-action'` to `'cx-btn btn btn-block btn-secondary'`

### CheckoutPaymentTypeComponent

- Changed line 66 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`


### CheckoutDeliveryAddressComponent 

- Changed line 24 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 54 classes from `'cx-btn btn btn-block btn-action'` to `'cx-btn btn btn-block btn-secondary'`

### CheckoutPaymentFormComponent

- Changed line 410 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 417 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### CheckoutPaymentMethodComponent

- Changed line 23 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 51 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### AmendOrderActionsComponent 

- Changed line 9 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### OrderDetailActionsComponent

- Changed line 6 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 21 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 34 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### ConsignmentTrackingComponent

- Changed line 5 classes from `'btn btn-action btn-track'` to `'btn btn-secondary btn-track'`

### ReplenishmentOrderCancellationDialogComponent

- Changed line 32 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### ReplenishmentOrderCancellationComponent

- Changed line 4 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 18 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### ReturnRequestOverviewComponent

- Changed line 4 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### ConfiguratorAttributeProductCardComponent

- Changed line 72 classes from `'btn btn-action'` to `'btn btn-secondary'`
- Changed line 133 classes from `'btn btn-action'` to `'btn btn-secondary'`

### ConfiguratorPreviousNextButtonsComponent 

- Changed line 4 classes from `'cx-btn btn btn-action'` to `'cx-btn btn btn-secondary cx-previous'`
- Changed line 12 classes from `'cx-btn btn btn-secondary'` to `'cx-btn btn btn-secondary cx-next'`

### StoreFinderListItemComponent

- Changed line 45 classes from `'btn btn-sm btn-action btn-block cx-button'` to `'btn btn-sm btn-secondary btn-block cx-button'`

### StoreFinderStoreComponent 

- Changed line 14 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### DpPaymentMethodComponent

- Changed line 24 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`
- Changed line 50 classes from `'btn btn-block btn-action'` to `'btn btn-block btn-secondary'`

### SiteContextSelectorComponent

- Added `:` 

### ProductScrollComponent

- Changed line 29 `btn btn-block btn-action` to `btn btn-block btn-secondary`
- Changed line 36 `btn btn-block btn-action align-btn` to `btn btn-block btn-secondary align-btn`
- Changed line 73 `btn btn-block btn-action` to `btn btn-block btn-secondary`
- Changed line 80 `btn btn-block btn-action align-btn` to `btn btn-block btn-secondary align-btn`

### ProductFacetNavigationComponent 

- Changed line 3 `btn btn-action btn-block dialog-trigger` to `btn btn-secondary btn-block dialog-trigger`

### FileUploadComponent

- Changed line 12 classes from `'btn btn-action'` to `'btn btn-secondary'`

### StoreComponent 

- Changed line 63 btn class to `btn-secondary`.

### StoreListComponent

- Removed `container` class on line 20.

### PickupOptionDialogComponent

- Added class `cx-modal-container` to line 2.

#### CustomerTicketingReopenComponent

- Changed `btn-action` to `btn-secondary` to fix the styling.