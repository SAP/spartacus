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

# Changes in feature lib cart

## ActiveCartService

- `WindowRef` is now a required constructor dependency.
