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

- The `handleClick()` method now uses the condition `documentHost === element.host` to recognise external links.
- The `handleClick()` method now uses `router.navigateByUrl()` to navigate internal links.

### CloseAccoutModalComponent

- The `onSuccess()` method now uses `authService.coreLogout()` to log user out before routing to homepage.

### QuickOrderOrderEntriesContext

- `addEntries` method now passes `productsData` to the `canAdd()` method to assist the `īsLimit()` method in recognizing limit breaches.

### CheckoutDeliveryAddressComponent

- `getCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### CheckoutPaymentFormComponent

- `getAddressCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### CheckoutReviewSubmitComponent

- `getDeliveryAddressCard()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

### AddressBookComponent

- `getCardContent()` method now uses `getAddressNumbers()` util to get the correct phone numbers to display.

## BadRequestHandler

- `handleBadPassword()` method now calls `getErrorTranslationKey()` to get more detailed information about type of an error and translate them.

## OrderHistoryService

- The method `getOrderDetailsLoading()` has been added and returning order details loading state.

## OrderDetailsService

- Added `isOrderDetailsLoading()` which uses `getOrderDetailsLoading()` method to display valid state in a template.
