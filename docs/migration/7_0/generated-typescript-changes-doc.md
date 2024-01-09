<!-- Generated file.  Don't update directly -->

# 7.0 Typescript Breaking Changes

This document contains a list of breaking changes or potentially breaking changes for Spartacus 7.0.



# Class AsmBindCartComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  globalMessageService: GlobalMessageService,
  activeCartFacade: ActiveCartFacade,
  multiCartFacade: MultiCartFacade,
  asmBindCartFacade: AsmBindCartFacade,
  launchDialogService: LaunchDialogService,
  savedCartFacade: SavedCartFacade,
  asmComponentService: AsmComponentService,
  routing: RoutingService,
  featureConfig: FeatureConfigService
)

```


Current version:

```

constructor(
  globalMessageService: GlobalMessageService,
  activeCartFacade: ActiveCartFacade,
  multiCartFacade: MultiCartFacade,
  asmBindCartFacade: AsmBindCartFacade,
  launchDialogService: LaunchDialogService,
  savedCartFacade: SavedCartFacade,
  asmComponentService?: AsmComponentService | undefined,
  routing?: RoutingService | undefined
)

```


### Property featureConfig is removed.



### Method goToActiveCartDetail is removed.



### Method isDeepLinkActiveCart is removed.



### Method isDeepLinkInactiveCart is removed.



### Method onDeeplinkCart is removed.





# Class AsmComponentService
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  authService: AuthService,
  csAgentAuthService: CsAgentAuthService,
  winRef: WindowRef,
  asmEnablerService: AsmEnablerService,
  asmDeepLinkService: AsmDeepLinkService
)

```


Current version:

```

constructor(
  authService: AuthService,
  csAgentAuthService: CsAgentAuthService,
  winRef: WindowRef,
  asmEnablerService?: AsmEnablerService | undefined,
  asmDeepLinkService?: AsmDeepLinkService | undefined
)

```




# Class AsmMainUiComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  authService: AuthService,
  csAgentAuthService: CsAgentAuthService,
  asmComponentService: AsmComponentService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  asmService: AsmService,
  userAccountFacade: UserAccountFacade,
  launchDialogService: LaunchDialogService,
  featureConfig: FeatureConfigService
)

```


Current version:

```

constructor(
  authService: AuthService,
  csAgentAuthService: CsAgentAuthService,
  asmComponentService: AsmComponentService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  asmService: AsmService,
  userAccountFacade: UserAccountFacade,
  launchDialogService: LaunchDialogService
)

```


### Property featureConfig is removed.



### Method handleDeepLinkParamsAfterStartSession is removed.





# Class CustomerEmulationComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  asmComponentService: AsmComponentService,
  userAccountFacade: UserAccountFacade,
  launchDialogService: LaunchDialogService,
  featureModules: FeatureModulesService
)

```


Current version:

```

constructor(
  asmComponentService: AsmComponentService,
  userAccountFacade: UserAccountFacade,
  launchDialogService?: LaunchDialogService | undefined,
  featureModules?: FeatureModulesService | undefined
)

```




# Class CustomerListComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  launchDialogService: LaunchDialogService,
  breakpointService: BreakpointService,
  asmConfig: AsmConfig,
  translation: TranslationService,
  asmCustomerListFacade: AsmCustomerListFacade,
  featureConfig?: FeatureConfigService,
  occConfig?: OccConfig
)

```


Current version:

```

constructor(
  launchDialogService: LaunchDialogService,
  breakpointService: BreakpointService,
  asmConfig: AsmConfig,
  translation: TranslationService,
  asmCustomerListFacade: AsmCustomerListFacade,
  occConfig?: OccConfig | undefined
)

```


### Property featureConfig is removed.





# Function property
## @spartacus/asm/core


Function property changed.

Previous version:

```

property(
  prop1: P1,
  prop2: P2,
  comparator: Comparator<T[P1][P2]>
): Comparator<T>

```


Current version:

```

property(
  prop: P,
  comparator: Comparator<T[P]>
): Comparator<T>

```




# Class CsAgentAuthService
## @spartacus/asm/root


### Constructor changed.


Previous version:

```

constructor(
  authService: AuthService,
  authStorageService: AsmAuthStorageService,
  userIdService: UserIdService,
  oAuthLibWrapperService: OAuthLibWrapperService,
  store: Store,
  _userProfileFacade: UserProfileFacade,
  userAccountFacade: UserAccountFacade
)

```


Current version:

```

constructor(
  authService: AuthService,
  authStorageService: AsmAuthStorageService,
  userIdService: UserIdService,
  oAuthLibWrapperService: OAuthLibWrapperService,
  store: Store,
  userAccountFacade: UserAccountFacade
)

```


### Constructor changed.


Previous version:

```

constructor(
  authService: AuthService,
  authStorageService: AsmAuthStorageService,
  userIdService: UserIdService,
  oAuthLibWrapperService: OAuthLibWrapperService,
  store: Store,
  userProfileFacade: UserProfileFacade,
  userAccountFacade: UserAccountFacade,
  featureConfig: FeatureConfigService
)

```


Current version:

```

constructor(
  authService: AuthService,
  authStorageService: AsmAuthStorageService,
  userIdService: UserIdService,
  oAuthLibWrapperService: OAuthLibWrapperService,
  store: Store,
  userAccountFacade: UserAccountFacade
)

```


### Property featureConfig is removed.



### Property userProfileFacade is removed.





# Class ActiveCartService
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  multiCartFacade: MultiCartFacade,
  userIdService: UserIdService
)

```


Current version:

```

constructor(
  multiCartFacade: MultiCartFacade,
  userIdService: UserIdService,
  winRef: WindowRef
)

```


### Property winRef changed.


Previous version:

```
winRef: WindowRef | undefined
```


Current version:

```
winRef: WindowRef
```




# Interface CardType
## @spartacus/cart/base/root

moved to @spartacus/core




# Interface PaymentDetails
## @spartacus/cart/base/root

moved to @spartacus/core




# Variable I18NEXT_HTTP_BACKEND_CLIENT
## @spartacus/core


Variable I18NEXT_HTTP_BACKEND_CLIENT changed.

Previous version:

```
I18NEXT_HTTP_BACKEND_CLIENT: InjectionToken<((options: BackendOptions, url: string, payload: string | {}, callback: RequestCallback) => void) | undefined>
```


Current version:

```
I18NEXT_HTTP_BACKEND_CLIENT: InjectionToken<((options: import("i18next-http-backend").HttpBackendOptions, url: string, payload: string | {}, callback: import("i18next-http-backend").RequestCallback) => void) | undefined>
```




# TypeAlias I18nextHttpBackendClient
## @spartacus/core


TypeAlias I18nextHttpBackendClient changed.

Previous version:

```
BackendOptions,
['request']
```


Current version:

```
HttpBackendOptions,
['request']
```




# Class I18nextHttpBackendInitializer
## @spartacus/core


### Method getBackendConfig changed.


Previous version:

```

getBackendConfig(): BackendOptions

```


Current version:

```

getBackendConfig(): HttpBackendOptions

```


### Method initialize changed.


Previous version:

```

initialize(): InitOptions

```


Current version:

```

initialize(): InitOptions<HttpBackendOptions>

```




# Class ConfiguratorAddToCartButtonComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  routingService: RoutingService,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorCartService: ConfiguratorCartService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  globalMessageService: GlobalMessageService,
  orderHistoryFacade: OrderHistoryFacade,
  commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
  configUtils: ConfiguratorStorefrontUtilsService,
  intersectionService: IntersectionService
)

```


Current version:

```

constructor(
  routingService: RoutingService,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorCartService: ConfiguratorCartService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  globalMessageService: GlobalMessageService,
  orderHistoryFacade: OrderHistoryFacade,
  commonConfiguratorUtilsService: CommonConfiguratorUtilsService,
  configUtils: ConfiguratorStorefrontUtilsService,
  intersectionService: IntersectionService,
  configuratorQuantityService: ConfiguratorQuantityService
)

```


### Property configuratorQuantityService changed.


Previous version:

```
configuratorQuantityService: ConfiguratorQuantityService | undefined
```


Current version:

```
configuratorQuantityService: ConfiguratorQuantityService
```




# Class ConfiguratorAttributeDropDownComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```




# Class ConfiguratorAttributeFooterComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  featureConfigService?: FeatureConfigService
)

```


Current version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext
)

```


### Property featureConfigService is removed.



### Method needsUserInputMessage is removed.





# Class ConfiguratorAttributeHeaderComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configuratorUiSettings: ConfiguratorUISettingsConfig,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  featureConfigService?: FeatureConfigService
)

```


Current version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configuratorUiSettings: ConfiguratorUISettingsConfig,
  attributeComponentContext: ConfiguratorAttributeCompositionContext
)

```


### Property featureConfigService is removed.



### Method isAttributeWithDomain is removed.



### Method isRequiredAttributeWithDomain is removed.





# Class ConfiguratorAttributeInputFieldComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  config: ConfiguratorUISettingsConfig,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  config: ConfiguratorUISettingsConfig,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```




# Class ConfiguratorAttributeNumericInputFieldComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
  featureConfigService: FeatureConfigService
)

```


Current version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Constructor changed.


Previous version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```


### Property featureConfigService is removed.





# Class ConfiguratorAttributeProductCardComponent
## @spartacus/product-configurator/rulebased


### Property attributeName is removed.





# Class ConfiguratorAttributeRadioButtonComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```




# Class ConfiguratorAttributeSingleSelectionBaseComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```




# Class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


### Property configuratorStorefrontUtilsService changed.


Previous version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService | undefined
```


Current version:

```
configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
```




# Class ConfiguratorFormComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService,
  featureConfigService: FeatureConfigService,
  globalMessageService: GlobalMessageService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService,
  globalMessageService: GlobalMessageService
)

```


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService,
  globalMessageService: GlobalMessageService
)

```


### Property featureConfigservice is removed.



### Property globalMessageService changed.


Previous version:

```
globalMessageService: GlobalMessageService | undefined
```


Current version:

```
globalMessageService: GlobalMessageService
```




# Class ConfiguratorGroupMenuComponent
## @spartacus/product-configurator/rulebased


### Method isConflictGroupType changed.


Previous version:

```

isConflictGroupType(
  groupType: Configurator.GroupType
): boolean

```


Current version:

```

isConflictGroupType(
  groupType: Configurator.GroupType | undefined
): boolean

```


### Method isConflictGroupTypeAllowingUndefined is removed.





# Class ConfiguratorOverviewFilterButtonComponent
## @spartacus/product-configurator/rulebased


### Property config$ is removed.





# Class ConfiguratorOverviewSidebarComponent
## @spartacus/product-configurator/rulebased


### Property config$ is removed.





# Class ConfiguratorRouterListener
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configuratorCartService: ConfiguratorCartService,
  routingService: RoutingService
)

```


Current version:

```

constructor(
  configuratorCartService: ConfiguratorCartService,
  routingService: RoutingService,
  configuratorQuantityService: ConfiguratorQuantityService
)

```


### Property configuratorQuantityService changed.


Previous version:

```
configuratorQuantityService: ConfiguratorQuantityService | undefined
```


Current version:

```
configuratorQuantityService: ConfiguratorQuantityService
```




# Class RulebasedConfiguratorConnector
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  adapters: RulebasedConfiguratorAdapter[],
  configUtilsService: CommonConfiguratorUtilsService
)

```


Current version:

```

constructor(
  adapters: RulebasedConfiguratorAdapter[],
  configUtilsService: CommonConfiguratorUtilsService,
  config: ConfiguratorCoreConfig
)

```


### Property config changed.


Previous version:

```
config: ConfiguratorCoreConfig | undefined
```


Current version:

```
config: ConfiguratorCoreConfig
```


