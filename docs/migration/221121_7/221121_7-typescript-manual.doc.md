# Breaking Changes
---

## Removed Constants
- **`USER_CMS_ENDPOINTS`** (from `@spartacus/core`):
  - **Impact:** This config constant has been removed. The functionality is now always enabled.
  - **Action Required:** Remove any references to this constant in your code. The CMS adapters now always use user-specific endpoints.


- **`SMART_EDIT_DUMMY_COMPONENT_TYPE`** (from `@spartacus/core`):
  - **Impact:** This constant was unused since version 6.5. The `SmartEditLauncher` is now responsible for triggering the lazy loading of the `SMART_EDIT_FEATURE`.
  - **Action Required:** Remove any references to this constant if you were using it.


- **`CDC_USER_PREFERENCE_SERIALIZER`** (from `@spartacus/cdc/root`):
  - **Impact:** This constant was deprecated since version 2211.38 in favor of `CDC_PREFERENCE_SERIALIZER`.
  - **Action Required:** Remove any references to this constant if you were using it.


- **`Deprecated translation chunks removal`** the following members of public apis are removed:
  - | Constant name                                | From                                                   |
    |----------------------------------------------|--------------------------------------------------------|
    | `asmTranslations`                            | `@spartacus/asm/assets`                                |
    | `asmCustomer360Translations`                 | `@spartacus/asm/customer-360/assets`                   |
    | `cartBaseTranslations`                       | `@spartacus/cart/base/assets`                          |
    | `importExportTranslations`                   | `@spartacus/cart/import-export/assets`                 |
    | `quickOrderTranslations`                     | `@spartacus/cart/quick-order/assets`                   |
    | `savedCartTranslations`                      | `@spartacus/cart/saved-cart/assets`                    |
    | `wishListTranslations`                       | `@spartacus/cart/wish-list/assets`                     |
    | `checkoutB2BTranslations`                    | `@spartacus/checkout/b2b/assets`                       |
    | `checkoutTranslations`                       | `@spartacus/checkout/base/assets`                      |
    | `checkoutScheduledReplenishmentTranslations` | `@spartacus/checkout/scheduled-replenishment/assets`   |
    | `customerTicketingTranslations`              | `@spartacus/customer-ticketing/assets`                 |
    | `estimatedDeliveryDateTranslations`          | `@spartacus/estimated-delivery-date/assets`            |
    | `orderTranslations`                          | `@spartacus/order/assets`                              |
    | `documentFlowTranslations`                   | `@spartacus/order/document-flow/assets`                |
    | `accountSummaryTranslations`                 | `@spartacus/organization/account-summary/assets`       |
    | `organizationTranslations`                   | `@spartacus/organization/administration/assets`        |
    | `orderApprovalTranslations`                  | `@spartacus/organization/order-approval/assets`        |
    | `unitOrderTranslations`                      | `@spartacus/organization/unit-order/assets`            |
    | `organizationUserRegistrationTranslations`   | `@spartacus/organization/user-registration/assets`     |
    | `pdfInvoicesTranslations`                    | `@spartacus/pdf-invoices/assets`                       |
    | `pickupInStoreTranslations`                  | `@spartacus/pickup-in-store/assets`                    |
    | `bulkPricingTranslations`                    | `@spartacus/product/bulk-pricing/assets`               |
    | `futureStockTranslations`                    | `@spartacus/product/future-stock/assets`               |
    | `productImageZoomTranslations`               | `@spartacus/product/image-zoom/assets`                 |
    | `productVariantsTranslations`                | `@spartacus/product/variants/assets`                   |
    | `configuratorTranslations`                   | `@spartacus/product-configurator/common/assets`        |
    | `multiDimensionalSelectorTranslations`       | `@spartacus/product-multi-dimensional/selector/assets` |
    | `quoteTranslations`                          | `@spartacus/quote/assets`                              |
    | `requestedDeliveryDateTranslations`          | `@spartacus/requested-delivery-date/assets`            |
    | `storeFinderTranslations`                    | `@spartacus/storefinder/assets`                        |
    | `userAccountTranslations`                    | `@spartacus/user/account/assets`                       |
    | `userProfileTranslations`                    | `@spartacus/user/profile/assets`                       |
    | `cdcTranslations`                            | `@spartacus/cdc/assets`                                |
    | `cdsTranslationChunksConfig`                 | `@spartacus/cds/assets`                            |
    | `cdsTranslations`                            | `@spartacus/cds/assets`                            |
    | `cpqquoteTranslations`                       | `@spartacus/cpq-quote/assets`                          |
    | `dpTranslations`                             | `@spartacus/digital-payments/assets`                   |
    | `epdVisualizationTranslations`               | `@spartacus/epd-visualization/assets`                  |
    | `opfCheckoutTranslations`                    | `@spartacus/opf/checkout/assets`                       |
    | `opfPaymentTranslations`                     | `@spartacus/opf/payment/assets`                        |
    | `s4ServiceTranslations`                      | `@spartacus/s4-service/assets`                         |
    | `s4omTranslations`                           | `@spartacus/s4om/assets`                               |
    | `translations`                               | `@spartacus/assets`                                    |


  - **Action Required** Remove any references to these constants if you were using it. Please use **specific language** translations (suffixed with language code) instead,
    like in the following example
    ```diff
      i18n: {
    -   resources: translations
    +   resources: { en: translationsEn }
      }
    ```

### `CartProceedToCheckoutComponent`
- **Constructor Cleanup**: Removed the deprecated constructor overload `constructor(router: Router)`.
  - **Action Required**: Any classes extending this component must now provide both `Router` and `ChangeDetectorRef` (optional) in the `super()` call.

### `StoreFinderStoresCountComponent`
- **Required Dependency**: `RoutingService` is no longer optional. The `@Optional()` decorator and `inject` optional flag were removed.
  - **Action Required**: Ensure `RoutingService` is available in the injection context where this component is used.

### `defaultUserCmsModuleConfig`
- **Config Consolidation**: Removed `defaultUserCmsModuleConfig`.
- **Breaking Impact**: `defaultCmsModuleConfig` was updated to include the configuration that was previously only in `defaultUserCmsModuleConfig`. If you were specifically relying on the old structure of `defaultCmsModuleConfig` (without the `/users/{userId}` defined as it is now), this may affect CMS request building.

### `OccCmsComponentAdapter`
- **Config constant removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` constant.
- **Behavior Change**: The adapter now **always** uses the `userIdService` to determine the current user and builds the component request URL accordingly.
- **API Cleanup**: Removed usage of `FeatureConfigService`.
- **Outcome**:
  - All CMS component requests now consistently include user context in the endpoint URL.
  - Endpoint format is now standardized: `/users/{userId}/cms/components` is always used instead of the legacy `/cms/components` format.

### `OccCmsPageAdapter`
- **Config constant removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` constant.
- **Behavior Change**: Similar to the component adapter, it now always fetches the user ID to build CMS page request URLs.
- **API Cleanup**: Removed usage of `FeatureConfigService`.
- **Outcome**:
  - All CMS page requests now consistently include user context in the endpoint URL.
  - The conditional branching based on `USER_CMS_ENDPOINTS` constant has been eliminated, simplifying the code path.
  - Endpoint format is now standardized: `/users/{userId}/cms/pages` is always used instead of the legacy `/cms/pages` format.
  - This ensures personalized CMS content is consistently served based on the authenticated or anonymous user context.


### `SearchBoxComponent`
- **Required Dependencies**: `BreakpointService` and `ChangeDetectorRef` are no longer optional.
  - **Action Required**: Ensure these services are available in the injector.
- **API Removal**: Removed `isEnabledFeature(feature: string)` method and the `FeatureConfigService` dependency.
- **Property Rename**: `changeDetecorRef` was renamed to `changeDetectorRef` (fixing a typo) and made `protected`.
  - **Action Required**: Update any references in subclasses to the new spelling `changeDetectorRef`.

### `CmsRoutesImplService`
- **Refactored Guard Handling**: The `wrapCmsGuard` method no longer uses `CmsGuardsService.canActivateGuard` (which was removed).
- **New Dependencies**: Now uses `GuardsComposer` and `UnifiedInjector` to resolve and execute guards.
- **Internal Change**: This change primarily affects how Spartacus internally handles CMS-driven routes and guards, ensuring better support for both class-based and functional guards (`CanActivateFn`).

### `NgSelectA11yDirective`
- **Method Removal**: Removed deprecated `onOpen()` and `appendAriaLabelToOptions()` methods.
- **Method Removal**: Removed `customizeNgSelectAriaLabelDropdown()` method.
- **Breaking Impact**: If you were overriding or calling these deprecated methods in a custom directive extending this one, your code will fail to compile.

### `CdcReconsentComponent`
- **Property Removal**: Removed the deprecated property `totalConsents`.
  - **Action Required**: Remove any references to this property in your code.

### `order-guest-register-form.component.ts`
- **Constructor Change**: Removed `protected authService: AuthService` parameter from the constructor.
- **Property Removal**: Removed `subscription: Subscription` property.
- **Interface Removal**: The class no longer implements `OnDestroy`.
- **Breaking Impact**: Custom components extending this class that pass `AuthService` in the `super()` call or access the `authService` or `subscription` properties will fail to compile.
  - **Action Required**: Remove `AuthService` from the `super()` call and remove any references to the `authService` or `subscription` properties in subclasses.

##  Removed Methods & APIs

#### `CmsGuardsService`
- **Removed Method:** `canActivateGuard(guardClass: any, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuardResult>`
- **Reason:** Deprecated in favor of `GuardsComposer`.
- **Action Required:** Use the `GuardsComposer` service to execute guards manually if needed.

### `UnitAddressItemService`
- **Dependency Removal**: Removed `protected featureConfigService` with `optional: true` flag.
- **Feature Flag Removal**: Removed logic related to the `fixMyCompanyUnitAddressCreation` feature flag.
- **Breaking Impact**: Custom services extending this class that relied on `protected` access to `featureConfigService` will encounter compilation errors.
- **Action Required**: If feature configuration is needed in a subclass, inject `FeatureConfigService` directly within that subclass as a `private` property.

### `OrgUnitEffects`
- **Dependency Removal**: Removed `protected featureConfigService` with `optional: true` flag.
- **Feature Flag Removal**: Removed logic related to the `fixMyCompanyUnitAddressCreation` feature flag in the address creation success action.
- **Breaking Impact**: The effect now always uses the simplified address creation response format (`{ id: payload.address.id }`).
- **Action Required**: Ensure any custom effects extending this class do not rely on the removed `featureConfigService` property.

### `CdcUserConsentService`
- **Removed Method:** `updateCdcConsent(isConsentGranted: boolean, consentCodes: string[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>`
- **Reason:** Deprecated in favor of `updateCdcUserPreferences(consentCodes: CdcConsent[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>` method.
- **Action Required:** Use the `updateCdcUserPreferences(consentCodes: CdcConsent[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>` method if needed.

### `CdcReconsentComponentService`
- **Removed Method:** `saveConsentAndLogin(consentId: string[], userParams: any)`
- **Reason:** Deprecated in favor of `savePreferencesAndLogin(consents: CdcConsent[], userParams: any)` method.
- **Action Required:** Use the `savePreferencesAndLogin(consents: CdcConsent[], userParams: any)` method to save the preferences given in reconsent pop-up and trigger a re-login.

### `CDCRegisterComponentService`
- **Removed Method:** `generatePreferencesObject()`
- **Reason:** Deprecated since **2211.38** as it is unused.

### `CdcUserPreferenceSerializer`
- **Removed Service**
- **Reason:** Deprecated in favor of `CdcPreferenceSerializer` service class.
- **Action Required:** Use the `CdcPreferenceSerializer` class methods.

### `OptimizedSsrEngine`
- **Removed Method:** `log(message: string, _ignoredLegacyDebugParameter: boolean, context: ExpressServerLoggerContext)`
- **Reason:** Deprecated since **2211.27**
- **Action Required:** Use `this.logger` instead, e.g. `this.logger.log(message, context);`

## Removed Tokens

### `USE_LEGACY_MEDIA_COMPONENT`
- **File Removed:** `@spartacus/storefront`
- **Reason:** This injection token was deprecated since version 2211.31 and has now been removed.
- **Impact:** The token was used to force the `MediaComponent` to use the legacy `img` element instead of the `picture` element.
- **Action Required:** 
  - Remove any references to `USE_LEGACY_MEDIA_COMPONENT` from your code.
  - If you need to use `img` HTML element instead of `picture`, pass `[elementType]="'img'"` as an input to the `MediaComponent`.
  - Remove any providers for this token from your module or component configurations.

### `useLegacyMediaComponent` Config Property
- **Removed From:** `MediaConfig` in `@spartacus/storefront`
- **Reason:** This config property was deprecated since version 2211.31 and has now been removed.
- **Impact:** The config property was used to globally force the `MediaComponent` to use the legacy `img` element instead of the `picture` element.
- **Action Required:**
  - Remove `useLegacyMediaComponent` from your config if you were using it.
  - If you need to use `img` HTML element instead of `picture`, pass `[elementType]="'img'"` as an input to the `MediaComponent` where needed.

## Method Signature Changes

### `persist-focus.directive.ts`, `lock-focus.directive.ts`, `auto-focus.directive.ts`
- **Method Signature Change**: The `handleFocus` method parameter type has been corrected from `KeyboardEvent` to `FocusEvent`.
  - **Before:** `handleFocus(event?: KeyboardEvent)`
  - **After:** `handleFocus(event?: FocusEvent)`
- **Reason**: The method is bound to the DOM `focus` event via `@HostListener('focus', ['$event'])`, which emits a `FocusEvent`, not a `KeyboardEvent`. The previous type annotation was incorrect.
- **Breaking Impact**: Custom directives extending any of these classes that override `handleFocus` with a `KeyboardEvent` parameter will fail to compile.
  - **Action Required**: Update any overridden `handleFocus` methods to use `FocusEvent` instead of `KeyboardEvent`.

## Global Changes

#### `FeatureConfigService` Visibility Refactor
- **Change**: The `FeatureConfigService` (often injected as `featureConfigService` or `featureConfig`) has been made **private** across all Spartacus components and services.
- **Impact**: Any custom classes extending Spartacus components or services that relied on `protected` access to `FeatureConfigService` will now encounter compilation errors.
- **Action Required**: Subclasses should no longer rely on the base class's `FeatureConfigService`. If feature configuration is needed in a subclass, it should be injected directly within that subclass.

---
