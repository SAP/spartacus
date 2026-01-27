# Breaking Changes
---

## Removed Constants
- **`USER_CMS_ENDPOINTS`** (from `projects/core/src/model/cms.model.ts`):
  - **Impact:** This config constant has been removed. The functionality is now always enabled.
  - **Action Required:** Remove any references to this constant in your code. The CMS adapters now always use user-specific endpoints.


- **`SMART_EDIT_DUMMY_COMPONENT_TYPE`** (from `projects/core/src/cms/config/cms-config.ts`):
  - **Impact:** This constant was unused since version 6.5. The `SmartEditLauncher` is now responsible for triggering the lazy loading of the `SMART_EDIT_FEATURE`.
  - **Action Required:** Remove any references to this constant if you were using it.

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

## Global Changes

#### `FeatureConfigService` Visibility Refactor
- **Change**: The `FeatureConfigService` (often injected as `featureConfigService` or `featureConfig`) has been made **private** across all Spartacus components and services.
- **Impact**: Any custom classes extending Spartacus components or services that relied on `protected` access to `FeatureConfigService` will now encounter compilation errors.
- **Action Required**: Subclasses should no longer rely on the base class's `FeatureConfigService`. If feature configuration is needed in a subclass, it should be injected directly within that subclass.

---
