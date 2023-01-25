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

### ParagraphComponent

- The `handleClick()` method now uses the condition `documentHost === element.host` to recognise external links.
- The `handleClick()` method now uses `router.navigateByUrl()` to navigate internal links.

### CloseAccoutModalComponent

- The `onSuccess()` method now uses `authService.coreLogout()` to log user out before routing to homepage.

### TranslationService

- Method 'translate' changed from
  
  ```ts
    translate(key: string, options?: any, whitespaceUntilLoaded?: boolean): Observable<string>;
  ```

  to
  
  ```ts
    translate(key: string | string[], options?: any, whitespaceUntilLoaded?: boolean): Observable<string>;
  ```

  Passing an array of keys to the method 'translate' allows you to pass the fallback keys that will be used if the first key is not found in the translation file.

### I18nextTranslationService

- Method 'translate' changed from
  
  ```ts
    translate(key: string, options?: any, whitespaceUntilLoaded?: boolean): Observable<string>;
  ```

  to
  
  ```ts
    translate(key: string | string[], options?: any, whitespaceUntilLoaded?: boolean): Observable<string>;
  ```

### TranslationPipe

- Method 'translate' changed from
  
  ```ts
    transform(input: Translatable | string, options: TranslatableParams = {}): string
  ```

  to
  
  ```ts
    transform(input: Translatable | string | string[], options: TranslatableParams = {}): string
  ```

### Translatable interface

- Type of the property 'key' is now `string | string[]`

### FormErrorsComponent

- `p` has been changed from 

  ```html
  <p *ngFor="let error of errorDetails">
    {{
      prefix + '.' + error[0] | cxTranslate: getTranslationParams(error[1])
    }}
  </p>
  ```

  to

  ```html
  <p *ngFor="let error of errorDetails">
    {{
      [prefix + '.' + error[0], fallbackPrefix + '.' + error[0]] | cxTranslate: getTranslationParams(error[1])
    }}
  </p>
  ```

### DatePickerComponent

- `cx-form-errors` has been changed from 

  ```html
  <cx-form-errors
    [control]="control"
    prefix="formErrors.date"
    [translationParams]="{
      max: getDate(max) | cxDate,
      min: getDate(min) | cxDate
    }"
  ></cx-form-errors>
  ```

  to

  ```html
  <cx-form-errors
    [control]="control"
    prefix="formErrors.labeled.date"
    [translationParams]="{
      label: label ?? '' | cxTranslate,
      max: getDate(max) | cxDate,
      min: getDate(min) | cxDate
    }"
  ></cx-form-errors>
  ```
