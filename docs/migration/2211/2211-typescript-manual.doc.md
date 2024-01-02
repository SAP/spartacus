# Changes in feature lib product-configurator 

## Changes related to the CPQ configurator

The provisioning of the CPQ normalizers and serializers has been moved from `CpqConfiguratorRestModule` to `CpqConfiguratorCommonModule`.

## Changes related to configurator components

### ConfiguratorAddToCartButtonComponent

Constructor has been extended with a new dependency to `GlobalMessageService`.

### ConfiguratorFormComponent

Constructor has been extended with a new dependency to `ConfiguratorQuantityService`.

### ConfiguratorAttributeProductCardComponent

Method  `get attributeName()` has been removed. Instead directly use `productCardOptions.attributeName`, which has been turned to a mandatory instead of an optional attribute.

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
