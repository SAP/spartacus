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

