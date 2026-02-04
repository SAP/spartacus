# Breaking Changes
---

## Removed Constants
- **`USER_CMS_ENDPOINTS`** (from `projects/core/src/model/cms.model.ts`):
  - **Impact:** This config constant has been removed. The functionality is now always enabled.
  - **Action Required:** Remove any references to this constant in your code. The CMS adapters now always use user-specific endpoints.


- **`SMART_EDIT_DUMMY_COMPONENT_TYPE`** (from `projects/core/src/cms/config/cms-config.ts`):
  - **Impact:** This constant was unused since version 6.5. The `SmartEditLauncher` is now responsible for triggering the lazy loading of the `SMART_EDIT_FEATURE`.
  - **Action Required:** Remove any references to this constant if you were using it.


- **`CDC_USER_PREFERENCE_SERIALIZER`** (from `integration-libs/cdc/root/consent-management/converters/converter.ts`):
  - **Impact:** This constant was deprecated since version 2211.38 in favor of `CDC_PREFERENCE_SERIALIZER`.
  - **Action Required:** Remove any references to this constant if you were using it.


- **`Deprecated translation chunks removal`** the following members of public apis are removed:
  - | Constant name                                | From                                                                   |
    |----------------------------------------------|------------------------------------------------------------------------|
    | `asmTranslations`                            | `feature-libs/asm/assets/public_api.ts`                                |
    | `asmCustomer360Translations`                 | `feature-libs/asm/customer-360/assets/public_api.ts`                   |
    | `cartBaseTranslations`                       | `feature-libs/cart/base/assets/public_api.ts`                          |
    | `importExportTranslations`                   | `feature-libs/cart/import-export/assets/public_api.ts`                 |
    | `quickOrderTranslations`                     | `feature-libs/cart/quick-order/assets/public_api.ts`                   |
    | `savedCartTranslations`                      | `feature-libs/cart/saved-cart/assets/public_api.ts`                    |
    | `wishListTranslations`                       | `feature-libs/cart/wish-list/assets/public_api.ts`                     |
    | `checkoutB2BTranslations`                    | `feature-libs/checkout/b2b/assets/public_api.ts`                       |
    | `checkoutTranslations`                       | `feature-libs/checkout/base/assets/public_api.ts`                      |
    | `checkoutScheduledReplenishmentTranslations` | `feature-libs/checkout/scheduled-replenishment/assets/public_api.ts`   |
    | `customerTicketingTranslations`              | `feature-libs/customer-ticketing/assets/public_api.ts`                 |
    | `estimatedDeliveryDateTranslations`          | `feature-libs/estimated-delivery-date/assets/public_api.ts`            |
    | `orderTranslations`                          | `feature-libs/order/assets/public_api.ts`                              |
    | `documentFlowTranslations`                   | `feature-libs/order/document-flow/assets/public_api.ts`                |
    | `accountSummaryTranslations`                 | `feature-libs/organization/account-summary/assets/public_api.ts`       |
    | `organizationTranslations`                   | `feature-libs/organization/administration/assets/public_api.ts`        |
    | `orderApprovalTranslations`                  | `feature-libs/organization/order-approval/assets/public_api.ts`        |
    | `unitOrderTranslations`                      | `feature-libs/organization/unit-order/assets/public_api.ts`            |
    | `organizationUserRegistrationTranslations`   | `feature-libs/organization/user-registration/assets/public_api.ts`     |
    | `pdfInvoicesTranslations`                    | `feature-libs/pdf-invoices/assets/public_api.ts`                       |
    | `pickupInStoreTranslations`                  | `feature-libs/pickup-in-store/assets/public_api.ts`                    |
    | `bulkPricingTranslations`                    | `feature-libs/product/bulk-pricing/assets/public_api.ts`               |
    | `futureStockTranslations`                    | `feature-libs/product/future-stock/assets/public_api.ts`               |
    | `productImageZoomTranslations`               | `feature-libs/product/image-zoom/assets/public_api.ts`                 |
    | `productVariantsTranslations`                | `feature-libs/product/variants/assets/public_api.ts`                   |
    | `configuratorTranslations`                   | `feature-libs/product-configurator/common/assets/public_api.ts`        |
    | `multiDimensionalSelectorTranslations`       | `feature-libs/product-multi-dimensional/selector/assets/public_api.ts` |
    | `quoteTranslations`                          | `feature-libs/quote/assets/public_api.ts`                              |
    | `requestedDeliveryDateTranslations`          | `feature-libs/requested-delivery-date/assets/public_api.ts`            |
    | `storeFinderTranslations`                    | `feature-libs/storefinder/assets/public_api.ts`                        |
    | `userAccountTranslations`                    | `feature-libs/user/account/assets/public_api.ts`                       |
    | `userProfileTranslations`                    | `feature-libs/user/profile/assets/public_api.ts`                       |
    | `cdcTranslations`                            | `integration-libs/cdc/assets/public_api.ts`                            |
    | `cdsTranslations`                            | `integration-libs/cds/assets/public_api.ts`                            |
    | `cdsTranslationChunksConfig`                 | `integration-libs/cds/src/assets/public_api.ts`                        |
    | `cdsTranslations`                            | `integration-libs/cds/src/assets/public_api.ts`                        |
    | `cpqquoteTranslations`                       | `integration-libs/cpq-quote/assets/public_api.ts`                      |
    | `dpTranslations`                             | `integration-libs/digital-payments/assets/public_api.ts`               |
    | `epdVisualizationTranslations`               | `integration-libs/epd-visualization/assets/public_api.ts`              |
    | `opfCheckoutTranslations`                    | `integration-libs/opf/checkout/assets/public_api.ts`                   |
    | `opfPaymentTranslations`                     | `integration-libs/opf/payment/assets/public_api.ts`                    |
    | `s4ServiceTranslations`                      | `integration-libs/s4-service/assets/public_api.ts`                     |
    | `s4omTranslations`                           | `integration-libs/s4om/assets/public_api.ts`                           |
    | `translations`                               | `projects/assets/src/public_api.ts`                                    |


  - **Action Required** Remove any references to these constants if you were using it. Please use **specific language** translations (suffixed with language code) instead,
    like in the following example
    ```diff
      i18n: {
    -   resources: translations
    +   resources: { en: translationsEn }
      }
    ```

### `cart-proceed-to-checkout.component.ts`
- **Constructor Cleanup**: Removed the deprecated constructor overload `constructor(router: Router)`.
  - **Action Required**: Any classes extending this component must now provide both `Router` and `ChangeDetectorRef` (optional) in the `super()` call.

### `store-finder-stores-count.component.ts`
- **Required Dependency**: `RoutingService` is no longer optional. The `@Optional()` decorator and `inject` optional flag were removed.
  - **Action Required**: Ensure `RoutingService` is available in the injection context where this component is used.

### `default-cms-config.ts`
- **Config Consolidation**: Removed `defaultUserCmsModuleConfig`.
- **Breaking Impact**: `defaultCmsModuleConfig` was updated to include the configuration that was previously only in `defaultUserCmsModuleConfig`. If you were specifically relying on the old structure of `defaultCmsModuleConfig` (without the `/users/{userId}` defined as it is now), this may affect CMS request building.

### `occ-cms-component.adapter.ts`
- **Config constant removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` constant.
- **Behavior Change**: The adapter now **always** uses the `userIdService` to determine the current user and builds the component request URL accordingly.
- **API Cleanup**: Removed usage of `FeatureConfigService`.
- **Outcome**:
  - All CMS component requests now consistently include user context in the endpoint URL.
  - Endpoint format is now standardized: `/users/{userId}/cms/components` is always used instead of the legacy `/cms/components` format.

### `occ-cms-page.adapter.ts`
- **Config constant removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` constant.
- **Behavior Change**: Similar to the component adapter, it now always fetches the user ID to build CMS page request URLs.
- **API Cleanup**: Removed usage of `FeatureConfigService`.
- **Outcome**:
  - All CMS page requests now consistently include user context in the endpoint URL.
  - The conditional branching based on `USER_CMS_ENDPOINTS` constant has been eliminated, simplifying the code path.
  - Endpoint format is now standardized: `/users/{userId}/cms/pages` is always used instead of the legacy `/cms/pages` format.
  - This ensures personalized CMS content is consistently served based on the authenticated or anonymous user context.


### `search-box.component.ts`
- **Required Dependencies**: `BreakpointService` and `ChangeDetectorRef` are no longer optional.
  - **Action Required**: Ensure these services are available in the injector.
- **API Removal**: Removed `isEnabledFeature(feature: string)` method and the `FeatureConfigService` dependency.
- **Property Rename**: `changeDetecorRef` was renamed to `changeDetectorRef` (fixing a typo) and made `protected`.
  - **Action Required**: Update any references in subclasses to the new spelling `changeDetectorRef`.

### `cms-routes-impl.service.ts`
- **Refactored Guard Handling**: The `wrapCmsGuard` method no longer uses `CmsGuardsService.canActivateGuard` (which was removed).
- **New Dependencies**: Now uses `GuardsComposer` and `UnifiedInjector` to resolve and execute guards.
- **Internal Change**: This change primarily affects how Spartacus internally handles CMS-driven routes and guards, ensuring better support for both class-based and functional guards (`CanActivateFn`).

### `ng-select-a11y.directive.ts`
- **Method Removal**: Removed deprecated `onOpen()` and `appendAriaLabelToOptions()` methods.
- **Method Removal**: Removed `customizeNgSelectAriaLabelDropdown()` method.
- **Breaking Impact**: If you were overriding or calling these deprecated methods in a custom directive extending this one, your code will fail to compile.

### `cdc-reconsent.component.ts`
- **Property Removal**: Removed the deprecated property `totalConsents`.
  - **Action Required**: Remove any references to this property in your code.

##  Removed Methods & APIs

#### `CmsGuardsService`
- **Removed Method:** `canActivateGuard(guardClass: any, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuardResult>`
- **Reason:** Deprecated in favor of `GuardsComposer`.
- **Action Required:** Use the `GuardsComposer` service to execute guards manually if needed.

### `unit-address-item.service.ts`
- **Dependency Removal**: Removed `protected featureConfigService` with `optional: true` flag.
- **Feature Flag Removal**: Removed logic related to the `fixMyCompanyUnitAddressCreation` feature flag.
- **Breaking Impact**: Custom services extending this class that relied on `protected` access to `featureConfigService` will encounter compilation errors.
- **Action Required**: If feature configuration is needed in a subclass, inject `FeatureConfigService` directly within that subclass as a `private` property.

### `org-unit.effect.ts`
- **Dependency Removal**: Removed `protected featureConfigService` with `optional: true` flag.
- **Feature Flag Removal**: Removed logic related to the `fixMyCompanyUnitAddressCreation` feature flag in the address creation success action.
- **Breaking Impact**: The effect now always uses the simplified address creation response format (`{ id: payload.address.id }`).
- **Action Required**: Ensure any custom effects extending this class do not rely on the removed `featureConfigService` property.

### `cdc-user-consent.service.ts`
- **Removed Method:** `updateCdcConsent(isConsentGranted: boolean, consentCodes: string[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>`
- **Reason:** Deprecated in favor of `updateCdcUserPreferences(consentCodes: CdcConsent[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>` method.
- **Action Required:** Use the `updateCdcUserPreferences(consentCodes: CdcConsent[], user?: string, regToken?: string): Observable<{ errorCode: number; errorMessage: string }>` method if needed.

### `cdc-reconsent-component.service.ts`
- **Removed Method:** `saveConsentAndLogin(consentId: string[], userParams: any)`
- **Reason:** Deprecated in favor of `savePreferencesAndLogin(consents: CdcConsent[], userParams: any)` method.
- **Action Required:** Use the `savePreferencesAndLogin(consents: CdcConsent[], userParams: any)` method to save the preferences given in reconsent pop-up and trigger a re-login.

### `cdc-register-component.service.ts`
- **Removed Method:** `generatePreferencesObject()`
- **Reason:** Deprecated since **2211.38** as it is unused.

### `CdcUserPreferenceSerializer`
- **Removed Service**
- **Reason:** Deprecated in favor of `CdcPreferenceSerializer` service class.
- **Action Required:** Use the `CdcPreferenceSerializer` class methods.

## Removed Tokens

### `USE_LEGACY_MEDIA_COMPONENT`
- **File Removed:** `projects/storefrontlib/shared/components/media/media.token.ts`
- **Reason:** This injection token was deprecated since version 2211.31 and has now been removed.
- **Impact:** The token was used to force the `MediaComponent` to use the legacy `img` element instead of the `picture` element.
- **Action Required:** 
  - Remove any references to `USE_LEGACY_MEDIA_COMPONENT` from your code.
  - If you need to use `img` HTML element instead of `picture`, pass `[elementType]="'img'"` as an input to the `MediaComponent`.
  - Remove any providers for this token from your module or component configurations.

### `useLegacyMediaComponent` Config Property
- **Removed From:** `MediaConfig` in `projects/storefrontlib/shared/components/media/media.config.ts`
- **Reason:** This config property was deprecated since version 2211.31 and has now been removed.
- **Impact:** The config property was used to globally force the `MediaComponent` to use the legacy `img` element instead of the `picture` element.
- **Action Required:**
  - Remove `useLegacyMediaComponent` from your config if you were using it.
  - If you need to use `img` HTML element instead of `picture`, pass `[elementType]="'img'"` as an input to the `MediaComponent` where needed.

## Global Changes

#### `FeatureConfigService` Visibility Refactor
- **Change**: The `FeatureConfigService` (often injected as `featureConfigService` or `featureConfig`) has been made **private** across all Spartacus components and services.
- **Impact**: Any custom classes extending Spartacus components or services that relied on `protected` access to `FeatureConfigService` will now encounter compilation errors.
- **Action Required**: Subclasses should no longer rely on the base class's `FeatureConfigService`. If feature configuration is needed in a subclass, it should be injected directly within that subclass.

---
