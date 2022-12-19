<!--
  Most typescript breaking changes should be detected and documented automatically by a script.  If a change is apparent when comparing the public API of the previous version vs the public API of the new major version, it should be detected automatically.

  This file should contain typescript changes not immediately apparent while comparting the public api between the older release and the current release (and therefore will not be detected by the breaking change detection script.

  Examples of typescript breaking changes that are not detectable by the script are:
    * High level changes or refactpring
    * Behaviour changes that are not backwards compatible and worth mentionning 
-->

# Technical Changes in Spartacus 6.0

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

- When using Spartacus's implementation for Scroll Position Restoration we need to disables automatic scroll restoration provided by the browser viewportScroller to work correctly. `viewportScroller.setHistoryScrollRestoration('manual')`

### UpdatePasswordComponentService

- Added `AuthRedirectService` to constructor.
- Added `AuthService` to constructor.

### ParagraphComponent

- The `handleClick()` method now uses the condition `documentHost === element.host` to recognise external links.
- The `handleClick()` method now uses `router.navigateByUrl()` to navigate internal links.

### CloseAccoutModalComponent

- The `onSuccess()` method now uses `authService.coreLogout()` to log user out before routing to homepage.
