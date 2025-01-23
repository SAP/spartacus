# Changes in feature lib order

## MyAccountV2OrderHistoryService

Method `getOrderDetails` has been removed. Instead directly use `getOrderDetailsV2`.

# Changes in feature lib product-configurator

## Removal of deprecated, obsolete CPQ connection scenario

Until this release, the CPQ integration foresaw a CPQ orchestration flavour where the storefront performed direct calls to CPQ for configuration read and change. This flavour is no longer supported from CPQ side, and is has been deprecated since release 22.11.25.

The flavour had been activated by switching configuration setting `productConfigurator.cpqOverOcc` to `false`. This attribute has been removed, and all entities that supported the flavour have been deleted as well.

Now the storefront only provides the orchestration flavour where all calls to CPQ are routed via the commerce back-end, meaning all calls will be done through OCC.

## Removal of obsolete configuration setting 'enableNavigationToConflict'

Until this release, the navigation to a conflict group from a conflicting attribute could be disabled using configurator setting `productConfigurator.enableNavigationToConflict`. Reason: This feature is supported by the underlying commerce release only after 22.05. Because the previous commerce versions are out of maintenance now, the configuration setting has been removed.

In case you are still running an out of maintenance version of commerce (21.05 or older), consider to adjust `ConfiguratorAttributeHeaderComponent` and always return false for method `isNavigationToConflictEnabled`.

## Removal of deprecated methods in ConfigureCartEntryComponent

### getQueryParams
Use `queryParams$` instead.

### getOwnerType
Use `retrieveOwnerTypeFromAbstractOrderType` instead.

### getEntityKey
Use `retrieveEntityKey` instead.

## Removal of deprecated methods or attributes in ConfiguratorTabBarComponent

### isOverviewPage$
Use `getPageType$` instead.

### getTabIndexConfigTab
Use `getTabIndexForConfigTab` instead.

### getTabIndexOverviewTab
Use `getTabIndexForOverviewTab` instead.

## Removal of deprecated attribute 'RETRACT_VALUE_CODE' in OccConfiguratorVariantSerializer

Use `Configurator.RetractValueCode`instead.

## Removal of deprecated attribute 'RETRACT_VALUE_CODE' in OccConfiguratorVariantNormalizer

Use `Configurator.RetractValueCode`instead.

