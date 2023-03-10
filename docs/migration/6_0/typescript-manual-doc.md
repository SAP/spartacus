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

## Feature lib product-configurator

### ConfiguratorFormComponent

 The view that display the current group has been carved out into a new component ConfiguratorGroupComponent. Reason: We need to display a group also as part of the new conflict solver dialog that is introduced for the AVC configurator. This means that `configurator-form.component.html` is much smaller and includes `configurator-group.component.html`, moreover many methods previously residing in `configurator-form.component.ts` have been moved to `configurator-group.component.ts`

### Handling of attribute types
Instead of listing all possible attribute type components on `configurator-group.component.html` (SPA 5.2) or `configurator-form.component.html` (SPA 5.1 or lower), the assignment of attribute type components to the attribute UI type is now part of a configuration `ConfiguratorAttributeCompositionConfig`. Each module representing an attribute type, like for example `configurator-attribute-drop-down.module.ts`, provides this configuration and assigns its component to its UI type. This improves extensibility, as it's now possible to replace attribute type components (as well as the attribute header and footer component) by just adding a custom component and registering it for the desired attribute UI type.

#### Consequences for all attribute type components
This has a couple of consequences for the components representing attribute types.
- The context for them is no longer provided via specific `@Input()` class members but by an instance of `ConfiguratorAttributeCompositionContext`. The directive `configurator-attribute-composition.directive.ts`is responsible for providing this instance. That means all `@Input()` class members are turned into standard class members, and their initialization happens in the component constructor.
- The configuration update no longer happens using `ConfigFormUpdateEvent`, but all components that are capable of sending updates got a new dependency to `ConfiguratorCommonsService`, calling its facade method for performing an update. This also means that `@Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>()` has been removed.

#### Working with UI types not known to SPA
It is now possible to register custom attribute type components for UI types not known to SPA (not part of enumeration `Configurator.UiType`). Those UI types must be based on standard UI types (because business logic is attached to these types both on UI and commerce backend level) and their identifier must follow a convention described in the documentation of `Configurator.Attribute#uiTypeVariation` 

### Handling of attribute types
Instead of listing all possible attribute type components on `configurator-group.component.html` (SPA 5.2) or 
`configurator-form.component.html` (SPA 5.1 or lower), the assignment of attribute type components to the attribute
UI type is now part of a configuration `ConfiguratorAttributeCompositionConfig`. Each module representing an attribute
type, like for example `configurator-attribute-drop-down.module.ts`, provides this configuration and assigns its component
to its UI type. This improves extensibility, as it's now possible to replace attribute type components (as well as the 
attribute header and footer component) by just adding a custom component and registering it for the desired attribute UI 
type.

#### Consequences for all attribute type components
This has a couple of consequences for the components representing attribute types.
- The context for them is no longer provided via specific `@Input()` class members but by an instance of `ConfiguratorAttributeCompositionContext`. The directive `configurator-attribute-composition.directive.ts`is responsible for providing this instance. That means all `@Input()` class members are turned into standard class members, and their initialization happens in the component constructor.
- The configuration update no longer happens using `ConfigFormUpdateEvent`, but all components that are capable of sending updates got a new dependency to `ConfiguratorCommonsService`, calling its facade method for performing an update. This also means that `@Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>()` has been removed.

### ConfiguratorOverviewMenuComponent

- By navigation to a certain overview group via overview menu the browser does not scroll anymore to the container of the group  `'#' + ovGroupId`, but to the title of the corresponding group `'#' + ovGroupId+ ' h2'`.

### ConfiguratorStorefrontUtilsService

- For readability purposes `--` separate is added between `prefix` and `groupId` in `createOvGroupId(prefix: string, groupId: string)` method.

### ConfiguratorAction
- The type alias changed. Following new actions are included: `UpdateConfigurationOverview | UpdateConfigurationOverviewFail | UpdateConfigurationOverviewSuccess |RemoveProductBoundConfigurations | CheckConflictDialoge | DissmissConflictDialoge`

### Action create configuration
- Contructor payload gets new additional optional parameter configIdTemplate (ID of a template configuration)

## BadRequestHandler

- `handleBadPassword()` method now calls `getErrorTranslationKey()` to get more detailed information about type of an error and translate them.

## OrderHistoryService

- The method `getOrderDetailsLoading()` has been added and returning order details loading state.

## OrderDetailsService

- Added `isOrderDetailsLoading()` which uses `getOrderDetailsLoading()` method to display valid state in a template.

## Spartacus PWA schematics

- `ng g @spartacus/schematics:add-pwa` and `ng add @spartacus/schematics --pwa` has been removed and is not longer supported.
- If you would like to add the angular pwa to your application, you can run the command `ng add @angular/pwa --project <project-name>` and remove the service worker references in your app.module.ts to have the same output as what our custom pwa schematics did.
