# Breaking Changes
---

### 1. `cart-proceed-to-checkout.component.ts`
- **Constructor Cleanup**: Removed the deprecated constructor overload `constructor(router: Router)`.
  - **Action Required**: Any classes extending this component must now provide both `Router` and `ChangeDetectorRef` (optional) in the `super()` call.

### 2. `store-finder-stores-count.component.ts`
- **Required Dependency**: `RoutingService` is no longer optional. The `@Optional()` decorator and `inject` optional flag were removed.
  - **Action Required**: Ensure `RoutingService` is available in the injection context where this component is used.

### 3. `default-cms-config.ts`
- **Config Consolidation**: Removed `defaultUserCmsModuleConfig`.
- **Breaking Impact**: `defaultCmsModuleConfig` was updated to include the configuration that was previously only in `defaultUserCmsModuleConfig`. If you were specifically relying on the old structure of `defaultCmsModuleConfig` (without the `pages` endpoint defined as it is now), this may affect CMS request building.

### 4. `occ-cms-component.adapter.ts` (referenced as `cc-cms-component.adapter.ts`)
- **Feature Toggle Removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` feature toggle.
- **Behavior Change**: The adapter now **always** uses the `userIdService` to determine the current user and builds the component request URL accordingly.
- **API Cleanup**: Removed usage of `FeatureConfigService`.

### 5. `occ-cms-page.adapter.ts`
- **Feature Toggle Removal**: Removed all logic related to the `USER_CMS_ENDPOINTS` feature toggle.
- **Behavior Change**: Similar to the component adapter, it now always fetches the user ID to build CMS page request URLs.
- **API Cleanup**: Removed usage of `FeatureConfigService`.

### 6. `user-register.action.ts`
- **Comment Cleanup**: Removed a `@deprecated` TSDoc comment for the `RegisterUserSuccess` class.
- **Impact**: No functional breaking change, but indicates that the migration of this action to `@spartacus/user/profile/core` is considered complete/standard.

### 7. `search-box.component.ts`
- **Required Dependencies**: `BreakpointService` and `ChangeDetectorRef` are no longer optional.
  - **Action Required**: Ensure these services are available in the injector.
- **API Removal**: Removed `isEnabledFeature(feature: string)` method and the `FeatureConfigService` dependency.
- **Property Rename**: `changeDetecorRef` was renamed to `changeDetectorRef` (fixing a typo) and made `protected`.
  - **Action Required**: Update any references in subclasses to the new spelling `changeDetectorRef`.

### 8. `cms-routes-impl.service.ts`
- **Refactored Guard Handling**: The `wrapCmsGuard` method no longer uses `CmsGuardsService.canActivateGuard` (which was removed).
- **New Dependencies**: Now uses `GuardsComposer` and `UnifiedInjector` to resolve and execute guards.
- **Internal Change**: This change primarily affects how Spartacus internally handles CMS-driven routes and guards, ensuring better support for both class-based and functional guards (`CanActivateFn`).

### 9. `ng-select-a11y.directive.ts`
- **Standalone Migration**: Converted to a **standalone component** (implicit as `standalone: false` was removed and it's a Directive).
- **Method Removal**: Removed deprecated `onOpen()` and `appendAriaLabelToOptions()` methods.
- **Method Removal**: Removed `customizeNgSelectAriaLabelDropdown()` method.
- **Logic Update**: Switched from direct event subscriptions to using `outputToObservable` for `openEvent` and `closeEvent`.
- **Aria Attributes**: The logic for appending aria-labels to options was refactored/removed as it's now handled differently or considered standard.
- **Breaking Impact**: If you were overriding or calling these deprecated methods in a custom directive extending this one, your code will fail to compile.

### 10. Removed Methods & APIs

#### `CmsGuardsService`
- **Removed Method:** `canActivateGuard(guardClass: any, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuardResult>`
- **Reason:** Deprecated in favor of `GuardsComposer`.
- **Action Required:** Use the `GuardsComposer` service to execute guards manually if needed.

### 11. Global Changes

#### `FeatureConfigService` Visibility Refactor
- **Change**: The `FeatureConfigService` (often injected as `featureConfigService` or `featureConfig`) has been made **private** across all Spartacus components and services.
- **Impact**: Any custom classes extending Spartacus components or services that relied on `protected` access to `FeatureConfigService` will now encounter compilation errors.
- **Action Required**: Subclasses should no longer rely on the base class's `FeatureConfigService`. If feature configuration is needed in a subclass, it should be injected directly within that subclass.

#### New ESLint Rule: `feature-config-service-must-be-private`
- **Change**: A new ESLint rule has been introduced to enforce that `FeatureConfigService` is always injected as a `private` property.
- **Reason**: To prevent the exposure of internal feature configuration logic in the public/protected API of components and services.
- **Action Required**: Ensure that any manual injections of `FeatureConfigService` in your codebase use the `private` modifier. You can use `eslint --fix` to automatically resolve most violations.

---
