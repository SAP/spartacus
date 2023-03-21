<!-- Generated file.  Don't update directly -->

# 6.0 Typescript Breaking Changes

This document contains a list of breaking changes or potentially breaking changes for Spartacus 6.0.



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
  userAccountFacade: UserAccountFacade
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


### Property launchDialogService changed.


Previous version:

```
launchDialogService: LaunchDialogService | undefined
```


Current version:

```
launchDialogService: LaunchDialogService
```




# Class CustomerListComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  launchDialogService: LaunchDialogService,
  asmService: AsmService,
  breakpointService: BreakpointService,
  asmConfig: AsmConfig,
  translation: TranslationService,
  asmCustomerListFacade: AsmCustomerListFacade
)

```


Current version:

```

constructor(
  launchDialogService: LaunchDialogService,
  breakpointService: BreakpointService,
  asmConfig: AsmConfig,
  translation: TranslationService,
  asmCustomerListFacade: AsmCustomerListFacade
)

```


### Property asmService is removed.





# Class CustomerSelectionComponent
## @spartacus/asm/components


### Constructor changed.


Previous version:

```

constructor(
  fb: UntypedFormBuilder,
  asmService: AsmService,
  config: AsmConfig
)

```


Current version:

```

constructor(
  fb: UntypedFormBuilder,
  asmService: AsmService,
  config: AsmConfig,
  directionService: DirectionService
)

```


### Method closeResults changed.


Previous version:

```

closeResults(): void

```


Current version:

```

closeResults(
  event: UIEvent
): void

```


### Method onDocumentClick changed.


Previous version:

```

onDocumentClick(
  event: Event
): void

```


Current version:

```

onDocumentClick(
  event: UIEvent
): void

```


### Method selectCustomerFromList changed.


Previous version:

```

selectCustomerFromList(
  customer: User
): void

```


Current version:

```

selectCustomerFromList(
  event: UIEvent,
  customer: User
): void

```




# Class AsmConfig
## @spartacus/asm/core

moved to @spartacus/asm/root

Use class 'AsmConfig' from '@spartacus/asm/root' instead.



# Class AsmCustomerListService
## @spartacus/asm/core


### Constructor changed.


Previous version:

```

constructor(
  queryService: QueryService,
  asmConnector: AsmConnector
)

```


Current version:

```

constructor(
  queryService: QueryService,
  asmConnector: AsmConnector,
  store: Store<StateWithAsm>
)

```




# Class AsmService
## @spartacus/asm/core


### Method customerListCustomersSearch is removed.

Has been moved to correct service AsmCustomerListFacade

### Method customerListCustomersSearchReset is removed.

Has been moved to correct service AsmCustomerListFacade

### Method getCustomerListCustomersSearchResults is removed.

Has been moved to correct service AsmCustomerListFacade

### Method getCustomerListCustomersSearchResultsError is removed.

Has been moved to correct service AsmCustomerListFacade

### Method getCustomerListCustomersSearchResultsLoading is removed.

Has been moved to correct service AsmCustomerListFacade



# Interface AsmUi
## @spartacus/asm/core

moved to @spartacus/asm/root




# Interface CustomerSearchOptions
## @spartacus/asm/core

moved to @spartacus/asm/root




# Interface CustomerSearchPage
## @spartacus/asm/core

moved to @spartacus/asm/root




# Class CartActions.CartAddEntry
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
    }
)

```


Current version:

```

constructor(
  payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
    }
```


Current version:

```
payload: {
        cartId: string;
        userId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    }
```




# Class CartActions.CartAddEntryFail
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        error: any;
    }
)

```


Current version:

```

constructor(
  payload: {
        error: any;
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        error: any;
    }
```


Current version:

```
payload: {
        error: any;
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
    }
```




# Class CartActions.CartAddEntrySuccess
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    }
)

```


Current version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    }
```


Current version:

```
payload: {
        userId: string;
        cartId: string;
        productCode: string;
        quantity: number;
        pickupStore?: string;
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    }
```




# Class CartActions.CartUpdateEntry
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity: number;
    }
)

```


Current version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity: number;
    }
```


Current version:

```
payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
```




# Class CartActions.CartUpdateEntryFail
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
    }
)

```


Current version:

```

constructor(
  payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
    }
```


Current version:

```
payload: {
        error: any;
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
```




# Class CartActions.CartUpdateEntrySuccess
## @spartacus/cart/base/core


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
    }
)

```


Current version:

```

constructor(
  payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
    }
```


Current version:

```
payload: {
        userId: string;
        cartId: string;
        entryNumber: string;
        quantity?: number;
        pickupStore?: string;
        pickupToDelivery?: boolean;
    }
```




# Class QuickOrderOrderEntriesContext
## @spartacus/cart/quick-order/components


### Constructor changed.


Previous version:

```

constructor(
  quickOrderService: QuickOrderFacade,
  productConnector: ProductConnector,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  quickOrderService: QuickOrderFacade,
  productConnector: ProductConnector
)

```


### Property featureConfigService is removed.





# Class CDCRegisterComponentService
## @spartacus/cdc/user-profile


### Constructor changed.


Previous version:

```

constructor(
  userRegisterFacade: UserRegisterFacade,
  command: CommandService,
  store: Store,
  cdcJSService: CdcJsService,
  globalMessageService: GlobalMessageService,
  authService: AuthService,
  eventService: EventService
)

```


Current version:

```

constructor(
  userRegisterFacade: UserRegisterFacade,
  command: CommandService,
  store: Store,
  cdcJSService: CdcJsService,
  globalMessageService: GlobalMessageService,
  authService: AuthService,
  eventService: EventService,
  userProfileFacade: UserProfileFacade
)

```




# Class MerchandisingCarouselComponent
## @spartacus/cds


### Constructor changed.


Previous version:

```

constructor(
  componentData: CmsComponentData<CmsMerchandisingCarouselComponent>,
  merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
  routingService: RoutingService,
  intersectionService: IntersectionService,
  el: ElementRef
)

```


Current version:

```

constructor(
  componentData: CmsComponentData<model>,
  merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
  routingService: RoutingService,
  intersectionService: IntersectionService,
  el: ElementRef
)

```


### Property componentData changed.


Previous version:

```
componentData: CmsComponentData<CmsMerchandisingCarouselComponent>
```


Current version:

```
componentData: CmsComponentData<model>
```




# Class ProfileTagEventService
## @spartacus/cds


### Property latestConsentReference changed.


Previous version:

```
latestConsentReference: any
```


Current version:

```
latestConsentReference: BehaviorSubject<string | null>
```


### Method notifyProfileTagOfEventOccurence is removed.





# Class CheckoutB2BStepsSetGuard
## @spartacus/checkout/b2b/components


### Constructor changed.


Previous version:

```

constructor(
  checkoutStepService: CheckoutStepService,
  routingConfigService: RoutingConfigService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  router: Router,
  checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
  checkoutCostCenterFacade: CheckoutCostCenterFacade
)

```


Current version:

```

constructor(
  checkoutStepService: CheckoutStepService,
  routingConfigService: RoutingConfigService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  router: Router,
  checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
  checkoutCostCenterFacade: CheckoutCostCenterFacade,
  activeCartFacade: ActiveCartFacade
)

```




# Class CheckoutDeliveryAddressComponent
## @spartacus/checkout/base/components


### Constructor changed.


Previous version:

```

constructor(
  userAddressService: UserAddressService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  activatedRoute: ActivatedRoute,
  translationService: TranslationService,
  activeCartFacade: ActiveCartFacade,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  globalMessageService: GlobalMessageService,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  userAddressService: UserAddressService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  activatedRoute: ActivatedRoute,
  translationService: TranslationService,
  activeCartFacade: ActiveCartFacade,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  globalMessageService: GlobalMessageService
)

```


### Property featureConfigService is removed.





# Class CheckoutDeliveryModeComponent
## @spartacus/checkout/base/components


### Constructor changed.


Previous version:

```

constructor(
  fb: UntypedFormBuilder,
  checkoutConfigService: CheckoutConfigService,
  activatedRoute: ActivatedRoute,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
)

```


Current version:

```

constructor(
  fb: UntypedFormBuilder,
  checkoutConfigService: CheckoutConfigService,
  activatedRoute: ActivatedRoute,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  activeCartFacade: ActiveCartFacade
)

```


### Method ngOnDestroy is removed.



### Method ngOnInit is removed.



### Property subscriptions is removed.



### Property supportedDeliveryModes$ changed.


Previous version:

```
supportedDeliveryModes$: Observable<DeliveryMode[]>
```


Current version:

```
supportedDeliveryModes$: Observable<import("@spartacus/cart/base/root").DeliveryMode[]>
```




# Class CheckoutPaymentFormComponent
## @spartacus/checkout/base/components


### Constructor changed.


Previous version:

```

constructor(
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  userPaymentService: UserPaymentService,
  globalMessageService: GlobalMessageService,
  fb: UntypedFormBuilder,
  userAddressService: UserAddressService,
  launchDialogService: LaunchDialogService
)

```


Current version:

```

constructor(
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  userPaymentService: UserPaymentService,
  globalMessageService: GlobalMessageService,
  fb: UntypedFormBuilder,
  userAddressService: UserAddressService,
  launchDialogService: LaunchDialogService,
  translationService: TranslationService
)

```


### Method getAddressCardContent changed.


Previous version:

```

getAddressCardContent(
  address: Address
): Card

```


Current version:

```

getAddressCardContent(
  address: Address
): Observable<Card>

```


### Method getAddressCardContent is removed.



### Property translationService changed.


Previous version:

```
translationService: TranslationService | undefined
```


Current version:

```
translationService: TranslationService
```




# Class CheckoutReviewSubmitComponent
## @spartacus/checkout/base/components


### Constructor changed.


Previous version:

```

constructor(
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  activeCartFacade: ActiveCartFacade,
  translationService: TranslationService,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  activeCartFacade: ActiveCartFacade,
  translationService: TranslationService,
  checkoutStepService: CheckoutStepService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
)

```


### Property featureConfigService is removed.





# Class CheckoutStepsSetGuard
## @spartacus/checkout/base/components


### Constructor changed.


Previous version:

```

constructor(
  checkoutStepService: CheckoutStepService,
  routingConfigService: RoutingConfigService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  router: Router
)

```


Current version:

```

constructor(
  checkoutStepService: CheckoutStepService,
  routingConfigService: RoutingConfigService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
  router: Router,
  activeCartFacade: ActiveCartFacade
)

```




# Class HttpErrorHandler
## @spartacus/core


### Constructor changed.


Previous version:

```

constructor(
  globalMessageService: GlobalMessageService,
  platformId?: Object | undefined,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  globalMessageService: GlobalMessageService,
  platformId?: Object | undefined
)

```


### Property featureConfigService is removed.





# Class I18nextBackendService
## @spartacus/core


### Constructor changed.


Previous version:

```

constructor()

```


Current version:

```

constructor(
  backendInitializers: I18nextBackendInitializer[] | null
)

```




# Class I18nextHttpBackendService
## @spartacus/core


Class I18nextHttpBackendService has been removed and is no longer part of the public API.




# Class OrderConsignedEntriesComponent
## @spartacus/order/components


### Method getConsignmentProducts is removed.





# Class OrderDetailItemsComponent
## @spartacus/order/components


### Constructor changed.


Previous version:

```

constructor(
  orderDetailsService: OrderDetailsService,
  component: CmsComponentData<CmsOrderDetailItemsComponent>,
  translation: TranslationService
)

```


Current version:

```

constructor(
  orderDetailsService: OrderDetailsService,
  component: CmsComponentData<CmsOrderDetailItemsComponent>
)

```


### Property buyItAgainTranslation$ is removed.



### Property cancel$ is removed.



### Property completed$ is removed.



### Method ngOnInit is removed.



### Property others$ is removed.



### Property translation is removed.





# Class OrderDetailShippingComponent
## @spartacus/order/components


Class OrderDetailShippingComponent has been removed and is no longer part of the public API.




# Class OrderHistoryComponent
## @spartacus/order/components


### Constructor changed.


Previous version:

```

constructor(
  routing: RoutingService,
  orderHistoryFacade: OrderHistoryFacade,
  translation: TranslationService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  featureConfigService: FeatureConfigService
)

```


Current version:

```

constructor(
  routing: RoutingService,
  orderHistoryFacade: OrderHistoryFacade,
  translation: TranslationService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
)

```


### Property featureConfigService is removed.





# Class OrderOverviewComponent
## @spartacus/order/components


### Constructor changed.


Previous version:

```

constructor(
  translation: TranslationService
)

```


Current version:

```

constructor(
  translation: TranslationService,
  orderDetailsService: OrderDetailsService,
  component: CmsComponentData<CmsOrderDetailOverviewComponent>
)

```


### Property order is removed.





# Class OrderOverviewModule
## @spartacus/order/components


Class OrderOverviewModule has been removed and is no longer part of the public API.




# Class OrderHistoryService
## @spartacus/order/core


### Constructor changed.


Previous version:

```

constructor(
  store: Store<StateWithOrder>,
  processStateStore: Store<StateWithProcess<void>>,
  userIdService: UserIdService,
  routingService: RoutingService,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  store: Store<StateWithOrder>,
  processStateStore: Store<StateWithProcess<void>>,
  userIdService: UserIdService,
  routingService: RoutingService
)

```


### Property featureConfigService is removed.





# Class UnitUserListComponent
## @spartacus/organization/administration/components


### Constructor changed.


Previous version:

```

constructor(
  currentUnitService: CurrentUnitService
)

```


Current version:

```

constructor(
  currentUnitService: CurrentUnitService,
  b2bUserService: B2BUserService
)

```




# Class UnitUserRolesCellComponent
## @spartacus/organization/administration/components


### Constructor changed.


Previous version:

```

constructor(
  outlet: OutletContextData<TableDataOutletContext>,
  itemService: ItemService<B2BUnit>
)

```


Current version:

```

constructor(
  outlet: OutletContextData<TableDataOutletContext>,
  itemService: ItemService<B2BUnit>,
  b2bUserService: B2BUserService
)

```




# Class OrgUnitService
## @spartacus/organization/administration/core


### Method sortUnitList changed.


Previous version:

```

sortUnitList(
  a: B2BUnitNode,
  b: B2BUnitNode
): 1 | -1 | 0

```


Current version:

```

sortUnitList(
  a: B2BUnitNode,
  b: B2BUnitNode
): 0 | 1 | -1

```




# Class ConfiguratorCartEntryBundleInfoComponent
## @spartacus/product-configurator/common


### Method isDesktop is removed.

This method been removed.



# Class CpqAccessLoaderService
## @spartacus/product-configurator/rulebased/root


### Constructor changed.


Previous version:

```

constructor(
  http: HttpClient,
  occEndpointsService: OccEndpointsService
)

```


Current version:

```

constructor(
  http: HttpClient,
  occEndpointsService: OccEndpointsService,
  userIdService: UserIdService
)

```


### Property userIdService changed.


Previous version:

```
userIdService: UserIdService | undefined
```


Current version:

```
userIdService: UserIdService
```




# TypeAlias ConfiguratorActions.ConfiguratorAction
## @spartacus/product-configurator/rulebased


TypeAlias ConfiguratorAction changed.

Previous version:

```
CreateConfiguration,
 | ,
CreateConfigurationFail,
 | ,
CreateConfigurationSuccess,
 | ,
ReadConfiguration,
 | ,
ReadConfigurationFail,
 | ,
ReadConfigurationSuccess,
 | ,
UpdateConfiguration,
 | ,
UpdateConfigurationFail,
 | ,
UpdateConfigurationSuccess,
 | ,
UpdateConfigurationFinalizeFail,
 | ,
UpdateConfigurationFinalizeSuccess,
 | ,
UpdatePriceSummary,
 | ,
UpdatePriceSummaryFail,
 | ,
UpdatePriceSummarySuccess,
 | ,
ChangeGroup,
 | ,
ChangeGroupFinalize,
 | ,
GetConfigurationOverview,
 | ,
GetConfigurationOverviewFail,
 | ,
GetConfigurationOverviewSuccess,
 | ,
UpdateConfigurationOverview,
 | ,
UpdateConfigurationOverviewFail,
 | ,
UpdateConfigurationOverviewSuccess,
 | ,
RemoveConfiguration,
 | ,
SetInteractionState,
 | ,
SetMenuParentGroup,
 | ,
SetCurrentGroup,
 | ,
SetGroupsVisited,
 | ,
RemoveProductBoundConfigurations
```


Current version:

```
CreateConfiguration,
 | ,
CreateConfigurationFail,
 | ,
CreateConfigurationSuccess,
 | ,
ReadConfiguration,
 | ,
ReadConfigurationFail,
 | ,
ReadConfigurationSuccess,
 | ,
UpdateConfiguration,
 | ,
UpdateConfigurationFail,
 | ,
UpdateConfigurationSuccess,
 | ,
UpdateConfigurationFinalizeFail,
 | ,
UpdateConfigurationFinalizeSuccess,
 | ,
UpdatePriceSummary,
 | ,
UpdatePriceSummaryFail,
 | ,
UpdatePriceSummarySuccess,
 | ,
ChangeGroup,
 | ,
ChangeGroupFinalize,
 | ,
GetConfigurationOverview,
 | ,
GetConfigurationOverviewFail,
 | ,
GetConfigurationOverviewSuccess,
 | ,
UpdateConfigurationOverview,
 | ,
UpdateConfigurationOverviewFail,
 | ,
UpdateConfigurationOverviewSuccess,
 | ,
RemoveConfiguration,
 | ,
SetInteractionState,
 | ,
SetMenuParentGroup,
 | ,
SetCurrentGroup,
 | ,
SetGroupsVisited,
 | ,
RemoveProductBoundConfigurations,
 | ,
CheckConflictDialoge,
 | ,
DissmissConflictDialoge
```




# Class ConfiguratorActions.CreateConfiguration
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
    }
)

```


Current version:

```

constructor(
  payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
        forceReset?: boolean;
    }
)

```


### Property payload changed.


Previous version:

```
payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
    }
```


Current version:

```
payload: {
        owner: CommonConfigurator.Owner;
        configIdTemplate?: string;
        forceReset?: boolean;
    }
```




# Class ConfiguratorAttributeCheckBoxComponent
## @spartacus/product-configurator/rulebased


### Property selectionChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service

### Constructor changed.


Previous version:

```

constructor()

```


Current version:

```

constructor(
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeCheckBoxListComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtilsService: ConfiguratorStorefrontUtilsService,
  quantityService: ConfiguratorAttributeQuantityService
)

```


Current version:

```

constructor(
  configUtilsService: ConfiguratorStorefrontUtilsService,
  quantityService: ConfiguratorAttributeQuantityService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeDropDownComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeFooterComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService
)

```


Current version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext
)

```




# Class ConfiguratorAttributeHeaderComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtils: ConfiguratorStorefrontUtilsService,
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configuratorUiSettings: ConfiguratorUISettingsConfig
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




# Class ConfiguratorAttributeInputFieldComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  config: ConfiguratorUISettingsConfig
)

```


Current version:

```

constructor(
  config: ConfiguratorUISettingsConfig,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


### Property inputChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service



# Class ConfiguratorAttributeMultiSelectionBaseComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


### Property selectionChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service



# Class ConfiguratorAttributeMultiSelectionImageComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configUtilsService: ConfiguratorStorefrontUtilsService
)

```


Current version:

```

constructor(
  configUtilsService: ConfiguratorStorefrontUtilsService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


### Property selectionChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service



# Class ConfiguratorAttributeNumericInputFieldComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService
)

```


Current version:

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeRadioButtonComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeReadOnlyComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  translationService: TranslationService
)

```


Current version:

```

constructor(
  translationService: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext
)

```


### Property group changed.


Previous version:

```
group: String
```


Current version:

```
group: string
```


Type has been changed from 'String' to 'string'

### Property translationService changed.


Previous version:

```
translationService: TranslationService | undefined
```


Current version:

```
translationService: TranslationService
```




# Class ConfiguratorAttributeSingleSelectionBaseComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService
)

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```


### Property selectionChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service



# Class ConfiguratorAttributeSingleSelectionBundleDropdownComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor()

```


Current version:

```

constructor(
  quantityService: ConfiguratorAttributeQuantityService,
  translation: TranslationService,
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class ConfiguratorAttributeSingleSelectionImageComponent
## @spartacus/product-configurator/rulebased


### Property selectionChange is removed.

Has been removed, see general migration documentation. Updates are now done via facade service

### Constructor changed.


Previous version:

```

constructor()

```


Current version:

```

constructor(
  attributeComponentContext: ConfiguratorAttributeCompositionContext,
  configuratorCommonsService: ConfiguratorCommonsService
)

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
  languageService: LanguageService,
  configUtils: ConfiguratorStorefrontUtilsService,
  configExpertModeService: ConfiguratorExpertModeService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService
)

```


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  languageService: LanguageService,
  configUtils: ConfiguratorStorefrontUtilsService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  launchDialogService: LaunchDialogService
)

```


### Property activeLanguage$ is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Property configExpertModeService changed.


Previous version:

```
configExpertModeService: ConfiguratorExpertModeService | undefined
```


Current version:

```
configExpertModeService: ConfiguratorExpertModeService
```


### Property configUtils is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Method createGroupId is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Method displayConflictDescription is removed.



### Property expMode is removed.



### Method isConflictGroupType is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Property languageService is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Property subscriptions is removed.



### Property uiType is removed.

Has been moved to new carved out component ConfiguratorGroupComponent

### Method updateConfiguration is removed.

Has been moved to new carved out component ConfiguratorGroupComponent



# Class ConfiguratorGroupMenuComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  hamburgerMenuService: HamburgerMenuService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configUtils: ConfiguratorStorefrontUtilsService,
  configGroupMenuService: ConfiguratorGroupMenuService,
  directionService: DirectionService,
  translation: TranslationService
)

```


Current version:

```

constructor(
  configCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  hamburgerMenuService: HamburgerMenuService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configUtils: ConfiguratorStorefrontUtilsService,
  configGroupMenuService: ConfiguratorGroupMenuService,
  directionService: DirectionService,
  translation: TranslationService,
  configExpertModeService: ConfiguratorExpertModeService
)

```


### Property configExpertModeService changed.


Previous version:

```
configExpertModeService: ConfiguratorExpertModeService | undefined
```


Current version:

```
configExpertModeService: ConfiguratorExpertModeService
```




# Class ConfiguratorGroupTitleComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  breakpointService: BreakpointService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
  hamburgerMenuService: HamburgerMenuService
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
  breakpointService: BreakpointService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
  hamburgerMenuService: HamburgerMenuService,
  featureConfigService: FeatureConfigService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configExpertModeService: ConfiguratorExpertModeService,
  breakpointService: BreakpointService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService,
  hamburgerMenuService: HamburgerMenuService
)

```


### Property breakpointService changed.


Previous version:

```
breakpointService: BreakpointService | undefined
```


Current version:

```
breakpointService: BreakpointService
```


### Property configExpertModeService changed.


Previous version:

```
configExpertModeService: ConfiguratorExpertModeService | undefined
```


Current version:

```
configExpertModeService: ConfiguratorExpertModeService
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



### Property hamburgerMenuService changed.


Previous version:

```
hamburgerMenuService: HamburgerMenuService | undefined
```


Current version:

```
hamburgerMenuService: HamburgerMenuService
```




# Class ConfiguratorOverviewFormComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configUtils: ConfiguratorStorefrontUtilsService,
  configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
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




# Class ConfiguratorPriceComponent
## @spartacus/product-configurator/rulebased


### Property directionService changed.


Previous version:

```
directionService: DirectionService | undefined
```


Current version:

```
directionService: DirectionService
```




# Class ConfiguratorProductTitleComponent
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  productService: ProductService
)

```


Current version:

```

constructor(
  configuratorCommonsService: ConfiguratorCommonsService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  productService: ProductService,
  configExpertModeService: ConfiguratorExpertModeService
)

```


### Property configExpertModeService changed.


Previous version:

```
configExpertModeService: ConfiguratorExpertModeService | undefined
```


Current version:

```
configExpertModeService: ConfiguratorExpertModeService
```




# Class VariantConfiguratorOccAdapter
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version:

```

constructor(
  http: HttpClient,
  occEndpointsService: OccEndpointsService,
  converterService: ConverterService
)

```


Current version:

```

constructor(
  http: HttpClient,
  occEndpointsService: OccEndpointsService,
  converterService: ConverterService,
  configExpertModeService: ConfiguratorExpertModeService
)

```


### Property configExpertModeService changed.


Previous version:

```
configExpertModeService: ConfiguratorExpertModeService | undefined
```


Current version:

```
configExpertModeService: ConfiguratorExpertModeService
```




# Class SmartEditService
## @spartacus/smartedit/core


### Constructor changed.


Previous version:

```

constructor(
  cmsService: CmsService,
  routingService: RoutingService,
  baseSiteService: BaseSiteService,
  zone: NgZone,
  winRef: WindowRef,
  rendererFactory: RendererFactory2,
  config: SmartEditConfig,
  scriptLoader: ScriptLoader
)

```


Current version:

```

constructor(
  cmsService: CmsService,
  routingService: RoutingService,
  baseSiteService: BaseSiteService,
  zone: NgZone,
  winRef: WindowRef,
  rendererFactory: RendererFactory2,
  config: SmartEditConfig
)

```


### Method loadScript is removed.

This method been moved to SmartEditLauncherService class.

### Property scriptLoader is removed.





# Class SmartEditLauncherService
## @spartacus/smartedit/root


### Constructor changed.


Previous version:

```

constructor(
  config: SmartEditConfig,
  location: Location,
  featureModules: FeatureModulesService,
  scriptLoader: ScriptLoader
)

```


Current version:

```

constructor(
  config: SmartEditConfig,
  location: Location,
  scriptLoader: ScriptLoader
)

```


### Constructor changed.


Previous version:

```

constructor(
  config: SmartEditConfig,
  location: Location,
  featureModules: FeatureModulesService
)

```


Current version:

```

constructor(
  config: SmartEditConfig,
  location: Location,
  scriptLoader: ScriptLoader
)

```


### Property featureModules is removed.



### Property scriptLoader changed.


Previous version:

```
scriptLoader: ScriptLoader | undefined
```


Current version:

```
scriptLoader: ScriptLoader
```




# Class AddressBookComponent
## @spartacus/storefront


### Constructor changed.


Previous version:

```

constructor(
  service: AddressBookComponentService,
  translation: TranslationService,
  globalMessageService: GlobalMessageService,
  featureConfigService: FeatureConfigService
)

```


Current version:

```

constructor(
  service: AddressBookComponentService,
  translation: TranslationService,
  globalMessageService: GlobalMessageService
)

```


### Property featureConfigService is removed.





# Class MyInterestsComponent
## @spartacus/storefront


### Constructor changed.


Previous version:

```

constructor(
  productInterestService: UserInterestsService,
  translationService: TranslationService,
  productService: ProductService
)

```


Current version:

```

constructor(
  productInterestService: UserInterestsService,
  translationService: TranslationService,
  productService: ProductService,
  globalMessageService: GlobalMessageService
)

```




# Class ParagraphComponent
## @spartacus/storefront


### Constructor changed.


Previous version:

```

constructor(
  component: CmsComponentData<CmsParagraphComponent>,
  router: Router,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  component: CmsComponentData<CmsParagraphComponent>,
  router: Router
)

```


### Property featureConfigService is removed.





# Class CloseAccountModalComponent
## @spartacus/user/profile/components


### Constructor changed.


Previous version:

```

constructor(
  authService: AuthService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  translationService: TranslationService,
  userProfile: UserProfileFacade,
  launchDialogService: LaunchDialogService,
  el: ElementRef,
  featureConfigService?: FeatureConfigService | undefined
)

```


Current version:

```

constructor(
  authService: AuthService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  translationService: TranslationService,
  userProfile: UserProfileFacade,
  launchDialogService: LaunchDialogService,
  el: ElementRef
)

```


### Property featureConfigService is removed.





# Class UpdatePasswordComponentService
## @spartacus/user/profile/components


### Constructor changed.


Previous version:

```

constructor(
  userPasswordService: UserPasswordFacade,
  routingService: RoutingService,
  globalMessageService: GlobalMessageService,
  authRedirectService: AuthRedirectService,
  authService: AuthService
)

```


Current version:

```

constructor(
  userPasswordService: UserPasswordFacade,
  routingService: RoutingService,
  globalMessageService: GlobalMessageService,
  authRedirectService?: AuthRedirectService | undefined,
  authService?: AuthService | undefined
)

```


