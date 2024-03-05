# Changes in feature lib checkout

## CheckoutPaymentTypeComponent

- `GlobalMessageService` is now a required constructor dependency.

# Changes in feature lib product-configurator 

## Changes related to the CPQ configurator

The provisioning of the CPQ normalizers and serializers has been moved from `CpqConfiguratorRestModule` to `CpqConfiguratorCommonModule`.

## Changes related to configurator components

### ConfiguratorAddToCartButtonComponent

Constructor has been extended with a new dependency to `ConfiguratorQuantityService`.

### ConfiguratorFormComponent

Constructor has been extended with a new dependency to `GlobalMessageService`.

### ConfiguratorAttributeProductCardComponent

Method  `get attributeName` has been removed. Instead directly use `productCardOptions.attributeName`, which has been turned to a mandatory instead of an optional attribute.

### ConfiguratorAttributeFooterComponent

This component now shows error messages also for drop-down attribute types.
Method `needsUserInputMessage` has been removed since it is no longer used. Instead use new method `needsUserInputMsg`.

### ConfiguratorAttributeHeaderComponent

This component no longer shows error messages for drop-down attribute types. As a consequence, method `isRequiredAttributeWithDomain` has been removed since it was not used since 6.2. Instead use new method `isRequiredAttributeWithoutErrorMsg`.

Method `isAttributeWithDomain` has been removed since it was not used since 6.2. A replacement is not available and not
needed, since its caller was deleted method `isRequiredAttributeWithDomain`.

### ConfiguratorAttributeSingleSelectionBaseComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorAttributeDropDownComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorAttributeInputFieldComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorAttributeNumericInputFieldComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorAttributeRadioButtonComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorAttributeSingleSelectionBundleDropdownComponent

Constructor has been extended with a new dependency to `ConfiguratorStorefrontUtilsService`.

### ConfiguratorGroupMenuComponent

Method `isConflictGroupTypeAllowingUndefined` has been removed. Instead directly use `isConflictGroupType`, which now also accepts its argument as 
undefined.

### ConfiguratorOverviewFilterButtonComponent

Member `config$` has been removed. It was no longer used, the view takes its data from `configurationWithOv$`.

### ConfiguratorOverviewSidebarComponent

Member `config$` has been removed. It was no longer used, the view takes its data from `configurationWithOv$`.

## Changes related to configurator services

### RulebasedConfiguratorConnector

Constructor has been extended with a new dependency to `ConfiguratorCoreConfig`.

### ConfiguratorRouterListener

Constructor has been extended with a new dependency to `ConfiguratorQuantityService`.

# Changes in feature lib asm

## CsAgentAuthService

- `UserProfileFacade` has been removed a required constructor dependency.

## AsmBindCartComponent

- `AsmComponentService` and `RoutingService` are now required constructor dependencies.

## CustomerEmulationComponent

- `LaunchDialogService` and `FeatureModulesService` are now required constructor dependencies.

## CustomerListComponent

- `OccConfig` is now a required constructor dependency.

## AsmComponentService

- `AsmEnablerService` and `AsmDeepLinkService` are now required constructor dependencies.

## CustomerSelectionComponent

- `launchDialogService` is now a required constructor dependency.

# Changes in feature lib cart

## ActiveCartService

- `WindowRef` is now a required constructor dependency.

# Changes in the core library

## Changes related to the Optimized SSR Engine

- `defaultSsrOptimizationOptions` represents the default configuration for the Optimized SSR Engine. This configuration includes various parameters, among which is the `cacheSize` property. The `cacheSize` property has been set to 3000 by default. This parameter determines the maximum number of entries allowed in the cache, serving to regulate memory usage effectively.

- The Standardized SSR logging is enabled by default and the default value of the `logger` property of `SsrOptimizationOptions` has been set to `DefaultExpressServerLogger()`. The default logger takes care of proper formatting and recognizes whether the output should be human-readable, or read by monitoring tools. The logger not only logs the messages, it also provides information about the related request that initiated the rendering process.

    The following example shows how the logger creates logs in development mode by producing a multiline JSON output:

    ```json
    {
        "message": "Rendering completed (/electronics-spa/en/USD/)",
        "context": {
            "timestamp": "2023-09-13T12:14:21.377Z",
            "request": {
                "url": "/electronics-spa/en/USD/",
                "uuid": "a076a5ba-7889-4c19-840e-395e89fde4b5",
                "timeReceived": "2023-09-13T12:14:13.450Z",
                "traceContext": {
                    "version": "00",
                    "traceId": "0af7651916cd43dd8448eb211c80319c",
                    "parentId": "b7ad6b7169203331",
                    "traceFlags": "01"
                }
            }
        }
    }
    ```
    The following is an example of a log created for production purposes. It is a single line of JSON that can be read by monitoring tools:

    ```text
    {"message":"Rendering started (/electronics-spa/en/USD/)","context":{"timestamp":"2023-09-13T12:14:21.377Z","request":{"url":"/electronics-spa/en/USD/","uuid":"a076a5ba-7889-4c19-840e-395e89fde4b5","timeReceived":"2023-09-13T12:14:13.450Z","traceContext":{"version":"00","traceId":"0af7651916cd43dd8448eb211c80319c","parentId":"b7ad6b7169203331","traceFlags":"01"}}}}
    ```

    For more, see [Standardized SSR Logging](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/a54ac5aff3f6434aa1ed08a68e25084b.html?locale=en-US).

## ClientAuthStoreModule

- `HttpClientModule` has been removed from the `imports` property inside `NgModule` metadata. This should not be a problem, as long as you import `HttpClientModule` in your `app.module.ts`. Alternatively to _importing_ `HttpClientModule` in your `app.module.ts` you can _provide_  in `app.module.ts` the `provideHttpClient(withInterceptorsFromDi())` (optionally with `withFetch()`). For more, see https://angular.io/api/common/http/provideHttpClient

## AuthHttpHeaderService

- The variable name `refreshTokenTrigger$` has undergone a modification in its type, transitioning from being exclusively of type AuthToken to now encompassing the union type AuthToken | undefined.

## BaseCoreModule

- `ErrorHandlingModule` has been added to the `imports` property inside `NgModule` metadata. It provides `CxErrorHandler` which extends the default Angular `ErrorHandler`. As a result, all errors that occur during server-side rendering are passed to the `LoggerService`, and these errors are logged with an appropriate context. For more information about the `LoggerService`, see [Using the LoggerService](https://help.sap.com/docs/SAP_COMMERCE_COMPOSABLE_STOREFRONT/eaef8c61b6d9477daf75bff9ac1b7eb4/a54ac5aff3f6434aa1ed08a68e25084b.html?locale=en-US#using-the-loggerservice).

# Changes in feature lib organization

## MessageService

- The variable name `data$` has undergone a modification in its type, transitioning from being exclusively of type T to now encompassing the union type T | undefined.

# Changes in the storefront library

## AddressBookModule

- `AddressBookModule` previously housed within the storefront library has been relocated to the `UserProfileModule` within the user library. This transition integrates components, styles, and assets pertinent to the `AddressBookModule`. Such a relocation facilitates improved accessibility to essential services within the user library's domain and offers the potential to address constraints imposed by separate library boundaries.
