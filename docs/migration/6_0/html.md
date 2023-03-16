<!--
  This file contains breaking changes in html markup.
-->


### AppliedCouponsComponent

- Removed invalid attribute (role) from div tags for accesibility improvements.

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

### CouponCardComponent

- Replaced anchor tag with button tag for `read more` link for accesibility tabbing improvements.


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

- Added `Cellphone` field to the `addressForm`

### AddressBookFormComponent

- Added `Cellphone` field to adress card

### Feature lib product-configurator 

#### ConfiguratorAttributeDropDownComponent

- Drop down options now can contain the technical attribute value key (if expert mode is active) and the value price if present

#### ConfiguratorAttributeReadOnlyComponent

- Component content now wrapped in `<fieldset>`
- Label now can contain the technical attribute value key (if expert mode is active)
- New class `cx-read-only-attribute-label` attached to the label has been introduced
- Label is wrapped in `<div class="cx-value-label-pair">` for accessibility improvements
- Value price is displayed in addition to label, wrapped in `<div class="cx-value-price">`

#### ConfiguratorGroupTitleComponent

- Contains <cx-hamburger-menu> for mobile resolutions

#### ConfiguratorOverviewMenuComponent

- Overview menu is wrapped in an unordered list`<ul>` for accessibility improvements

#### ConfiguratorOverviewFormComponent

- Overview group style class is now compiled by component `<div [ngClass]="getGroupLevelStyleClasses(level, group.subGroups)">`

#### ConfiguratorProductTitleComponent

- Now as well contains information about the knowledge base that was used to run the configuration. This information
  is only visible in case expert mode is active. The knowledge base related information is enclosed with `<div class="cx-kb-key-details">`

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
