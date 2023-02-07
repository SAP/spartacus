<!--
  Most typescript breaking changes should be detected and documented automatically by a script if a change is apparent when comparing the public API of the previous version vs the public API of the new major version.

  This file should contain typescript change documentation for changes not immediately apparent while comparing the public api between the older release and the current release and therefore will not be detected by the breaking change detection script.

  Examples of typescript breaking changes that are not detectable by the script are:
    * High level changes or refactoring
    * Behaviour changes that are not backwards compatible and worth mentioning 
-->

## SSR and Prerendering

If you are using prerendering, you will need to provide the following function to your `AppServerModule`:

```ts
import { provideServer } from '@spartacus/setup/ssr';
@NgModule({
  ...
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
    ...
  ],
})
export class AppServerModule {}
```

It is _mandatory_ to set the `serverRequestOrigin` option for the prerendering, as it can not be automatically resolved.

In SSR mode, it will be automatically resolved from the express server, therefore it doesn't have to be set via this option.
If explicitly set, this option will take precedence over the express server.


### OnNavigateService

- When using Spartacus's implementation for Scroll Position Restoration we need to disable automatic scroll restoration provided by the browser viewportScroller to work correctly. `viewportScroller.setHistoryScrollRestoration('manual')`

### UpdatePasswordComponentService

- Added `AuthRedirectService` to constructor.
- Added `AuthService` to constructor.

### ParagraphComponent

- The `handleClick()` method now uses the condition `documentHost === element.host` to recognize external links.
- The `handleClick()` method now uses `router.navigateByUrl()` to navigate internal links.

### CloseAccountModalComponent

- The `onSuccess()` method now uses `authService.coreLogout()` to log user out before routing to homepage.

### QuickOrderOrderEntriesContext

- `addEntries` method now passes `productsData` to the `canAdd()` method to assist the `īsLimit()` method in recognizing limit breaches.

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

- Method 'getFallbackValue' changed from
  
  ```ts
    getFallbackValue(key: string): string;
  ```

  to
  
  ```ts
    getFallbackValue(keys: string[]): string;
  ```

### TranslationPipe

- Method 'transform' changed from
  
  ```ts
    transform(input: Translatable | string, options: TranslatableParams = {}): string
  ```

  to
  
  ```ts
    transform(input: Translatable | string | string[], options: TranslatableParams = {}): string
  ```

### Translatable interface

- Type of the property 'key' is now `string | string[]`

### CheckoutDeliveryAddressComponent

- `getCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### CheckoutPaymentFormComponent

- `getAddressCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### CheckoutReviewSubmitComponent

- `getDeliveryAddressCard()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### AddressBookComponent

- `getCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.
