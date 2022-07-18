<!-- Generated file.  Don't update directly -->

# 5.0 Typescript Breaking Changes
This is a list of breaking changes or potentially breaking changes for Spartacus 5.0.


# Class AsmMainUiComponent 
## @spartacus/asm/components


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService,
  csAgentAuthService: CsAgentAuthService,
  userService: UserService,
  asmComponentService: AsmComponentService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  asmService: AsmService
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
  userAccountFacade: UserAccountFacade
)

```


### Property userService is removed.





# Class CustomerEmulationComponent 
## @spartacus/asm/components


### Constructor changed.


Previous version: 

```

constructor(
  asmComponentService: AsmComponentService,
  userService: UserService
)

```


Current version: 

```

constructor(
  asmComponentService: AsmComponentService,
  userAccountFacade: UserAccountFacade
)

```


### Property userService is removed.





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
  userService: UserService
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
  userProfileFacade: UserProfileFacade
)

```


### Property userService is removed.





# Class CartQuickOrderFormComponent 
## @spartacus/cart/quick-order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  eventService: EventService,
  formBuilder: FormBuilder,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  eventService: EventService,
  formBuilder: FormBuilder,
  globalMessageService: GlobalMessageService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```




# Class QuickOrderComponent 
## @spartacus/cart/quick-order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  component: CmsComponentData<CmsQuickOrderComponent>,
  globalMessageService: GlobalMessageService,
  quickOrderService: QuickOrderFacade,
  quickOrderStatePersistenceService: QuickOrderStatePersistenceService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  component: CmsComponentData<CmsQuickOrderComponent>,
  globalMessageService: GlobalMessageService,
  quickOrderService: QuickOrderFacade,
  quickOrderStatePersistenceService: QuickOrderStatePersistenceService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```




# Class QuickOrderFormComponent 
## @spartacus/cart/quick-order/components


### Constructor changed.


Previous version: 

```

constructor(
  globalMessageService: GlobalMessageService,
  quickOrderService: QuickOrderFacade
)

```


Current version: 

```

constructor(
  config: Config,
  cd: ChangeDetectorRef,
  quickOrderService: QuickOrderFacade,
  winRef: WindowRef
)

```


### Constructor changed.


Previous version: 

```

constructor(
  globalMessageService: GlobalMessageService,
  quickOrderService: QuickOrderFacade,
  config: Config,
  cd: ChangeDetectorRef,
  winRef: WindowRef
)

```


Current version: 

```

constructor(
  config: Config,
  cd: ChangeDetectorRef,
  quickOrderService: QuickOrderFacade,
  winRef: WindowRef
)

```


### Property cd changed.


Previous version: 

```
cd: ChangeDetectorRef | undefined
```


Current version: 

```
cd: ChangeDetectorRef
```


### Property config changed.


Previous version: 

```
config: Config | undefined
```


Current version: 

```
config: Config
```


### Property globalMessageService is removed.



### Property winRef changed.


Previous version: 

```
winRef: WindowRef | undefined
```


Current version: 

```
winRef: WindowRef
```




# Class QuickOrderService 
## @spartacus/cart/quick-order/core


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  productAdapter: ProductAdapter,
  eventService: EventService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  config: Config,
  eventService: EventService,
  productSearchConnector: ProductSearchConnector
)

```


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  productAdapter: ProductAdapter,
  eventService: EventService,
  productSearchConnector: ProductSearchConnector | undefined
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  config: Config,
  eventService: EventService,
  productSearchConnector: ProductSearchConnector
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property productAdapter is removed.



### Property productSearchConnector changed.


Previous version: 

```
productSearchConnector: ProductSearchConnector | undefined
```


Current version: 

```
productSearchConnector: ProductSearchConnector
```


### Method removeEntry is removed.

Use `softDeleteEntry` instead.

### Method search is removed.

Use `searchProducts` instead.



# Class QuickOrderConfig 
## @spartacus/cart/quick-order/root


### Property quickOrder changed.


Previous version: 

```
quickOrder: {
        searchForm?: {
            displayProductImages: boolean;
            maxProducts: number;
            minCharactersBeforeRequest: number;
        };
    }
```


Current version: 

```
quickOrder: {
        searchForm?: {
            displayProductImages: boolean;
            maxProducts: number;
            minCharactersBeforeRequest: number;
        };
        list?: {
            hardDeleteTimeout: number;
        };
    }
```




# Class QuickOrderFacade 
## @spartacus/cart/quick-order/root


### Method removeEntry is removed.



### Method search is removed.





# Class QuickOrderOrderEntriesContext 
## @spartacus/cart/quick-order/root

moved to @spartacus/cart/quick-order/components


### Method handleErrors changed.


Previous version: 

```

handleErrors(
  response: HttpErrorResponse,
  productCode: string,
  results$: Subject<ProductImportInfo>
): void

```


Current version: 

```

handleErrors(
  response: HttpErrorResponse,
  productCode: string
): ProductImportInfo

```


### Method handleResults changed.


Previous version: 

```

handleResults(
  product: Product,
  productData: ProductData,
  results$: Subject<ProductImportInfo>
): void

```


Current version: 

```

handleResults(
  product: Product,
  productData: ProductData
): ProductImportInfo

```




# Class AddToSavedCartComponent 
## @spartacus/cart/saved-cart/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  authService: AuthService,
  routingService: RoutingService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  authService: AuthService,
  routingService: RoutingService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


### Property activeCartService is removed.





# Class SavedCartDetailsItemsComponent 
## @spartacus/cart/saved-cart/components


### Constructor changed.


Previous version: 

```

constructor(
  savedCartDetailsService: SavedCartDetailsService,
  savedCartService: SavedCartFacade,
  eventSercvice: EventService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  savedCartDetailsService: SavedCartDetailsService,
  savedCartService: SavedCartFacade,
  eventSercvice: EventService,
  globalMessageService: GlobalMessageService,
  routingService: RoutingService,
  translation: TranslationService
)

```




# Class SavedCartAdapter 
## @spartacus/cart/saved-cart/core


### Method saveCart is removed.





# Class SavedCartConnector 
## @spartacus/cart/saved-cart/core


### Method saveCart is removed.





# Class SavedCartEventBuilder 
## @spartacus/cart/saved-cart/core


### Constructor changed.


Previous version: 

```

constructor(
  actionsSubject: ActionsSubject,
  eventService: EventService,
  stateEventService: StateEventService,
  multiCartService: MultiCartService
)

```


Current version: 

```

constructor(
  actionsSubject: ActionsSubject,
  eventService: EventService,
  stateEventService: StateEventService,
  multiCartService: MultiCartFacade
)

```


### Property multiCartService changed.


Previous version: 

```
multiCartService: MultiCartService
```


Current version: 

```
multiCartService: MultiCartFacade
```


### Method registerDeleteSavedCartEvents is removed.

Use 'registerDeleteCart' Method from Class 'CartEventBuilder' instead.



# Class SavedCartService 
## @spartacus/cart/saved-cart/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart | StateWithProcess<void>>,
  userIdService: UserIdService,
  userService: UserService,
  multiCartService: MultiCartService,
  eventService: EventService
)

```


Current version: 

```

constructor(
  store: Store<StateWithMultiCart | StateWithProcess<void>>,
  userIdService: UserIdService,
  userAccountFacade: UserAccountFacade,
  multiCartService: MultiCartFacade,
  eventService: EventService
)

```


### Method getSavedCart changed.


Previous version: 

```

getSavedCart(
  cartId: string
): Observable<StateUtils.ProcessesLoaderState<Cart>>

```


Current version: 

```

getSavedCart(
  cartId: string
): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>

```


### Property multiCartService changed.


Previous version: 

```
multiCartService: MultiCartService
```


Current version: 

```
multiCartService: MultiCartFacade
```


### Property userService is removed.





# Class OccSavedCartAdapter 
## @spartacus/cart/saved-cart/occ


### Method getSaveCartEndpoint is removed.



### Method saveCart is removed.





# Class DeleteSavedCartEvent 
## @spartacus/cart/saved-cart/root


Class DeleteSavedCartEvent has been removed and is no longer part of the public API.




# Class DeleteSavedCartFailEvent 
## @spartacus/cart/saved-cart/root


Class DeleteSavedCartFailEvent has been removed and is no longer part of the public API.




# Class DeleteSavedCartSuccessEvent 
## @spartacus/cart/saved-cart/root


Class DeleteSavedCartSuccessEvent has been removed and is no longer part of the public API.




# Class NewSavedCartOrderEntriesContext 
## @spartacus/cart/saved-cart/root

moved to @spartacus/cart/saved-cart/components


### Constructor changed.


Previous version: 

```

constructor(
  actionsSubject: ActionsSubject,
  userIdService: UserIdService,
  multiCartService: MultiCartService,
  savedCartService: SavedCartFacade
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService,
  userIdService: UserIdService,
  multiCartService: MultiCartFacade,
  savedCartService: SavedCartFacade
)

```


### Property actionsSubject is removed.



### Property multiCartService changed.


Previous version: 

```
multiCartService: MultiCartService
```


Current version: 

```
multiCartService: MultiCartFacade
```




# Class SavedCartFacade 
## @spartacus/cart/saved-cart/root


### Method getSavedCart changed.


Previous version: 

```

getSavedCart(
  cartId: string
): Observable<StateUtils.ProcessesLoaderState<Cart>>

```


Current version: 

```

getSavedCart(
  cartId: string
): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>

```




# Class SavedCartOrderEntriesContext 
## @spartacus/cart/saved-cart/root

moved to @spartacus/cart/saved-cart/components


### Constructor changed.


Previous version: 

```

constructor(
  actionsSubject: ActionsSubject,
  userIdService: UserIdService,
  multiCartService: MultiCartService,
  savedCartService: SavedCartFacade,
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService,
  userIdService: UserIdService,
  multiCartService: MultiCartFacade,
  savedCartService: SavedCartFacade,
  routingService: RoutingService
)

```


### Property actionsSubject is removed.



### Property multiCartService changed.


Previous version: 

```
multiCartService: MultiCartService
```


Current version: 

```
multiCartService: MultiCartFacade
```




# Function cdcJsFactory 
## @spartacus/cdc/root


Function cdcJsFactory changed.

Previous version: 

```

cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<Config>

```


Current version: 

```

cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<import("@spartacus/core").Config>

```




# Class CdcLogoutGuard 
## @spartacus/cdc/root


### Constructor changed.


Previous version: 

```

constructor(
  auth: AuthService,
  cms: CmsService,
  semanticPathService: SemanticPathService,
  protectedRoutes: ProtectedRoutesService,
  router: Router,
  winRef: WindowRef,
  authRedirectService: AuthRedirectService
)

```


Current version: 

```

constructor(
  auth: AuthService,
  cms: CmsService,
  semanticPathService: SemanticPathService,
  protectedRoutes: ProtectedRoutesService,
  router: Router,
  winRef: WindowRef
)

```


### Property authRedirectService is removed.





# Class CdsMerchandisingProductService 
## @spartacus/cds


### Constructor changed.


Previous version: 

```

constructor(
  strategyConnector: MerchandisingStrategyConnector,
  merchandisingUserContextService: CdsMerchandisingUserContextService,
  merchandisingSiteContextService: CdsMerchandisingSiteContextService
)

```


Current version: 

```

constructor(
  strategyConnector: MerchandisingStrategyConnector,
  merchandisingUserContextService: CdsMerchandisingUserContextService,
  merchandisingSiteContextService: CdsMerchandisingSiteContextService,
  merchandisingSearchContextService: CdsMerchandisingSearchContextService
)

```




# Class CdsMerchandisingUserContextService 
## @spartacus/cds


### Constructor changed.


Previous version: 

```

constructor(
  routingService: RoutingService,
  productSearchService: ProductSearchService,
  converterService: ConverterService,
  profileTagEventService: ProfileTagEventService
)

```


Current version: 

```

constructor(
  routingService: RoutingService,
  productSearchService: ProductSearchService,
  converterService: ConverterService,
  profileTagEventService: ProfileTagEventService,
  profileTagLifecycleService: ProfileTagLifecycleService
)

```




# Class ProfileTagPushEventsService 
## @spartacus/cds


### Constructor changed.


Previous version: 

```

constructor(
  eventService: EventService,
  personalizationContextService: PersonalizationContextService,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  eventService: EventService,
  personalizationContextService: PersonalizationContextService,
  activeCartFacade: ActiveCartFacade
)

```


### Constructor changed.


Previous version: 

```

constructor(
  eventService: EventService,
  personalizationContextService: PersonalizationContextService
)

```


Current version: 

```

constructor(
  eventService: EventService,
  personalizationContextService: PersonalizationContextService,
  activeCartFacade: ActiveCartFacade
)

```


### Property activeCartService is removed.





# Variable checkoutTranslationChunksConfig 
## @spartacus/checkout/assets

moved to @spartacus/checkout/base/assets




# Variable checkoutTranslations 
## @spartacus/checkout/assets

moved to @spartacus/checkout/base/assets




# Interface CardWithAddress 
## @spartacus/checkout/components

moved to @spartacus/checkout/b2b/components




# Class CartNotEmptyGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  semanticPathService: SemanticPathService,
  router: Router
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  semanticPathService: SemanticPathService,
  router: Router
)

```


### Property activeCartService is removed.

Use 'activeCartFacade' instead.'



# Class CheckoutAuthGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService,
  authRedirectService: AuthRedirectService,
  checkoutConfigService: CheckoutConfigService,
  activeCartService: ActiveCartService,
  semanticPathService: SemanticPathService,
  router: Router,
  userService: UserAccountFacade,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  authService: AuthService,
  authRedirectService: AuthRedirectService,
  checkoutConfigService: CheckoutConfigService,
  activeCartFacade: ActiveCartFacade,
  semanticPathService: SemanticPathService,
  router: Router
)

```


### Property activeCartService is removed.

Use 'activeCartFacade' instead.

### Property globalMessageService is removed.

It is not used in the base checkout entrypoint (b2c) as checkout has been decoupled into base (b2c), b2b, and replenishment. 'GlobalMessageService' is still a dependency when b2b checkout is used instead, which uses the new class 'CheckoutB2BAuthGuard.

### Method handleAnonymousUser changed.


Previous version: 

```

handleAnonymousUser(
  cartUser: User
): boolean | UrlTree

```


Current version: 

```

handleAnonymousUser(): boolean | UrlTree

```


### Method handleUserRole is removed.

It is not used in the base checkout entrypoint (b2c) as checkout has been decoupled into base (b2c), b2b, and replenishment. The method is found when b2b checkout is used instead, which uses the new class 'CheckoutB2BAuthGuard.

### Property userService is removed.

It is not used in the base checkout entrypoint (b2c) as checkout has been decoupled into base (b2c), b2b, and replenishment. 'UserAccountFacade' is still a dependency when b2b checkout is used instead, which uses the new class 'CheckoutB2BAuthGuard.



# Class CheckoutComponentsModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutConfigService 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutDetailsService 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/core
renamed to CheckoutQueryService




# Class CheckoutGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  router: Router,
  routingConfigService: RoutingConfigService,
  checkoutConfigService: CheckoutConfigService,
  expressCheckoutService: ExpressCheckoutService,
  activeCartService: ActiveCartService,
  checkoutStepService: CheckoutStepService
)

```


Current version: 

```

constructor(
  router: Router,
  routingConfigService: RoutingConfigService,
  checkoutConfigService: CheckoutConfigService,
  expressCheckoutService: ExpressCheckoutService,
  activeCartFacade: ActiveCartFacade,
  checkoutStepService: CheckoutStepService
)

```


### Property activeCartService is removed.

Use 'activeCartFacade' instead.



# Class CheckoutLoginComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  formBuilder: FormBuilder,
  authRedirectService: AuthRedirectService,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  formBuilder: FormBuilder,
  authRedirectService: AuthRedirectService,
  activeCartFacade: ActiveCartFacade
)

```


### Property activeCartService is removed.





# Class CheckoutLoginModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutOrchestratorComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutOrchestratorModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutOrderSummaryComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
)

```


### Property activeCartService is removed.





# Class CheckoutOrderSummaryModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutProgressComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutProgressMobileBottomComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutProgressMobileBottomModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutProgressMobileTopComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  checkoutStepService: CheckoutStepService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  checkoutStepService: CheckoutStepService
)

```


### Property activeCartService is removed.



### Method ngOnInit is removed.





# Class CheckoutProgressMobileTopModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutProgressModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutReplenishmentFormService 
## @spartacus/checkout/components

moved to @spartacus/checkout/scheduled-replenishment/components


### Constructor changed.


Previous version: 

```

constructor()

```


Current version: 

```

constructor(
  eventService: EventService
)

```




# Class CheckoutStepService 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Method disableEnableStep changed.


Previous version: 

```

disableEnableStep(
  currentStepType: CheckoutStepType,
  disabled: boolean
): void

```


Current version: 

```

disableEnableStep(
  currentStepType: CheckoutStepType | string,
  disabled: boolean
): void

```




# Class CheckoutStepsSetGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  paymentTypeService: PaymentTypeFacade,
  checkoutStepService: CheckoutStepService,
  checkoutDetailsService: CheckoutDetailsService,
  routingConfigService: RoutingConfigService,
  checkoutCostCenterService: CheckoutCostCenterFacade,
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
  router: Router
)

```


### Method canActivate changed.


Previous version: 

```

canActivate(
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
): Observable<boolean | UrlTree>

```


Current version: 

```

canActivate(
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree>

```


### Property checkoutCostCenterService is removed.



### Property checkoutDetailsService is removed.



### Method isPaymentTypeSet is removed.



### Method isShippingAddressAndCostCenterSet is removed.



### Method isStepSet changed.


Previous version: 

```

isStepSet(
  step: CheckoutStep,
  isAccountPayment: boolean
): Observable<boolean | UrlTree>

```


Current version: 

```

isStepSet(
  step: CheckoutStep
): Observable<boolean | UrlTree>

```


### Property paymentTypeService is removed.





# Class DeliveryModeComponent 
## @spartacus/checkout/components


Class DeliveryModeComponent has been removed and is no longer part of the public API.




# Class DeliveryModeModule 
## @spartacus/checkout/components


Class DeliveryModeModule has been removed and is no longer part of the public API.




# Class ExpressCheckoutService 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  userAddressService: UserAddressService,
  userPaymentService: UserPaymentService,
  checkoutDeliveryService: CheckoutDeliveryFacade,
  checkoutPaymentService: CheckoutPaymentFacade,
  checkoutDetailsService: CheckoutDetailsService,
  checkoutConfigService: CheckoutConfigService,
  clearCheckoutService: ClearCheckoutFacade
)

```


Current version: 

```

constructor(
  userAddressService: UserAddressService,
  userPaymentService: UserPaymentService,
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  checkoutPaymentFacade: CheckoutPaymentFacade,
  checkoutConfigService: CheckoutConfigService,
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
)

```


### Property checkoutDeliveryService is removed.



### Property checkoutDetailsService is removed.



### Property checkoutPaymentService is removed.



### Property clearCheckoutService is removed.



### Method setShippingAddress is removed.





# Class GuestRegisterFormComponent 
## @spartacus/checkout/components


Class GuestRegisterFormComponent has been removed and is no longer part of the public API.




# Class NotCheckoutAuthGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService,
  activeCartService: ActiveCartService,
  semanticPathService: SemanticPathService,
  router: Router
)

```


Current version: 

```

constructor(
  authService: AuthService,
  activeCartFacade: ActiveCartFacade,
  semanticPathService: SemanticPathService,
  router: Router
)

```


### Property activeCartService is removed.





# Class OrderConfirmationGuard 
## @spartacus/checkout/components

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  checkoutService: CheckoutFacade,
  router: Router,
  semanticPathService: SemanticPathService
)

```


Current version: 

```

constructor(
  orderFacade: OrderFacade,
  router: Router,
  semanticPathService: SemanticPathService
)

```




# Class OrderConfirmationItemsComponent 
## @spartacus/checkout/components


Class OrderConfirmationItemsComponent has been removed and is no longer part of the public API.




# Class OrderConfirmationModule 
## @spartacus/checkout/components


Class OrderConfirmationModule has been removed and is no longer part of the public API.




# Class OrderConfirmationOverviewComponent 
## @spartacus/checkout/components


Class OrderConfirmationOverviewComponent has been removed and is no longer part of the public API.




# Class OrderConfirmationThankYouMessageComponent 
## @spartacus/checkout/components


Class OrderConfirmationThankYouMessageComponent has been removed and is no longer part of the public API.




# Class OrderConfirmationTotalsComponent 
## @spartacus/checkout/components


Class OrderConfirmationTotalsComponent has been removed and is no longer part of the public API.




# Class PaymentFormComponent 
## @spartacus/checkout/components


Class PaymentFormComponent has been removed and is no longer part of the public API.




# Class PaymentFormModule 
## @spartacus/checkout/components


Class PaymentFormModule has been removed and is no longer part of the public API.




# Class PaymentMethodComponent 
## @spartacus/checkout/components


Class PaymentMethodComponent has been removed and is no longer part of the public API.




# Class PaymentMethodModule 
## @spartacus/checkout/components


Class PaymentMethodModule has been removed and is no longer part of the public API.




# Class PaymentTypeComponent 
## @spartacus/checkout/components


Class PaymentTypeComponent has been removed and is no longer part of the public API.




# Class PaymentTypeModule 
## @spartacus/checkout/components


Class PaymentTypeModule has been removed and is no longer part of the public API.




# Class PlaceOrderComponent 
## @spartacus/checkout/components


Class PlaceOrderComponent has been removed and is no longer part of the public API.




# Class PlaceOrderModule 
## @spartacus/checkout/components


Class PlaceOrderModule has been removed and is no longer part of the public API.




# Class ReplenishmentOrderConfirmationModule 
## @spartacus/checkout/components


Class ReplenishmentOrderConfirmationModule has been removed and is no longer part of the public API.




# Class ReviewSubmitComponent 
## @spartacus/checkout/components


Class ReviewSubmitComponent has been removed and is no longer part of the public API.




# Class ReviewSubmitModule 
## @spartacus/checkout/components


Class ReviewSubmitModule has been removed and is no longer part of the public API.




# Class ScheduleReplenishmentOrderComponent 
## @spartacus/checkout/components


Class ScheduleReplenishmentOrderComponent has been removed and is no longer part of the public API.




# Class ScheduleReplenishmentOrderModule 
## @spartacus/checkout/components


Class ScheduleReplenishmentOrderModule has been removed and is no longer part of the public API.




# Class ShippingAddressComponent 
## @spartacus/checkout/components


Class ShippingAddressComponent has been removed and is no longer part of the public API.




# Class ShippingAddressModule 
## @spartacus/checkout/components


Class ShippingAddressModule has been removed and is no longer part of the public API.




# Variable CARD_TYPE_NORMALIZER 
## @spartacus/checkout/core


Variable CARD_TYPE_NORMALIZER has been removed and is no longer part of the public API.




# Interface CardTypesState 
## @spartacus/checkout/core


Interface CardTypesState has been removed and is no longer part of the public API.




# Variable CHECKOUT_DETAILS 
## @spartacus/checkout/core


Variable CHECKOUT_DETAILS has been removed and is no longer part of the public API.




# Variable CHECKOUT_FEATURE 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/root




# Namespace CheckoutActions 
## @spartacus/checkout/core


Namespace CheckoutActions has been removed and is no longer part of the public API.




# Variable CheckoutActions.ADD_DELIVERY_ADDRESS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.ADD_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.ADD_DELIVERY_ADDRESS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.ADD_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.ADD_DELIVERY_ADDRESS 
## @spartacus/checkout/core


Variable CheckoutActions.ADD_DELIVERY_ADDRESS has been removed and is no longer part of the public API.




# Class CheckoutActions.AddDeliveryAddress 
## @spartacus/checkout/core


Class CheckoutActions.AddDeliveryAddress has been removed and is no longer part of the public API.




# Class CheckoutActions.AddDeliveryAddressFail 
## @spartacus/checkout/core


Class CheckoutActions.AddDeliveryAddressFail has been removed and is no longer part of the public API.




# Class CheckoutActions.AddDeliveryAddressSuccess 
## @spartacus/checkout/core


Class CheckoutActions.AddDeliveryAddressSuccess has been removed and is no longer part of the public API.




# TypeAlias CheckoutActions.CardTypesAction 
## @spartacus/checkout/core


TypeAlias CheckoutActions.CardTypesAction has been removed and is no longer part of the public API.




# Variable CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA 
## @spartacus/checkout/core


Variable CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA has been removed and is no longer part of the public API.




# TypeAlias CheckoutActions.CheckoutAction 
## @spartacus/checkout/core


TypeAlias CheckoutActions.CheckoutAction has been removed and is no longer part of the public API.




# Class CheckoutActions.CheckoutClearMiscsData 
## @spartacus/checkout/core


Class CheckoutActions.CheckoutClearMiscsData has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DATA 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DATA has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_CHECKOUT_STEP 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_CHECKOUT_STEP has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_PLACE_ORDER 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_PLACE_ORDER has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_SCHEDULE_REPLENISHMENT_ORDER 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_SCHEDULE_REPLENISHMENT_ORDER has been removed and is no longer part of the public API.




# Variable CheckoutActions.CLEAR_SUPPORTED_DELIVERY_MODES 
## @spartacus/checkout/core


Variable CheckoutActions.CLEAR_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutData 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutData has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryAddress 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryAddress has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryAddressFail 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryAddressFail has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryAddressSuccess 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryAddressSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryMode 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryMode has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryModeFail 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryModeFail has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutDeliveryModeSuccess 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutDeliveryModeSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearCheckoutStep 
## @spartacus/checkout/core


Class CheckoutActions.ClearCheckoutStep has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearPlaceOrder 
## @spartacus/checkout/core


Class CheckoutActions.ClearPlaceOrder has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearScheduleReplenishmentOrderAction 
## @spartacus/checkout/core


Class CheckoutActions.ClearScheduleReplenishmentOrderAction has been removed and is no longer part of the public API.




# Class CheckoutActions.ClearSupportedDeliveryModes 
## @spartacus/checkout/core


Class CheckoutActions.ClearSupportedDeliveryModes has been removed and is no longer part of the public API.




# Variable CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.CREATE_PAYMENT_DETAILS 
## @spartacus/checkout/core


Variable CheckoutActions.CREATE_PAYMENT_DETAILS has been removed and is no longer part of the public API.




# Class CheckoutActions.CreatePaymentDetails 
## @spartacus/checkout/core


Class CheckoutActions.CreatePaymentDetails has been removed and is no longer part of the public API.




# Class CheckoutActions.CreatePaymentDetailsFail 
## @spartacus/checkout/core


Class CheckoutActions.CreatePaymentDetailsFail has been removed and is no longer part of the public API.




# Class CheckoutActions.CreatePaymentDetailsSuccess 
## @spartacus/checkout/core


Class CheckoutActions.CreatePaymentDetailsSuccess has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CARD_TYPES_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CARD_TYPES_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CARD_TYPES_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CARD_TYPES_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CARD_TYPES 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CARD_TYPES has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_CHECKOUT_DETAILS 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_CHECKOUT_DETAILS has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_PAYMENT_TYPES_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_PAYMENT_TYPES_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_PAYMENT_TYPES_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_PAYMENT_TYPES_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_PAYMENT_TYPES 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_PAYMENT_TYPES has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES 
## @spartacus/checkout/core


Variable CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCardTypes 
## @spartacus/checkout/core


Class CheckoutActions.LoadCardTypes has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCardTypesFail 
## @spartacus/checkout/core


Class CheckoutActions.LoadCardTypesFail has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCardTypesSuccess 
## @spartacus/checkout/core


Class CheckoutActions.LoadCardTypesSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCheckoutDetails 
## @spartacus/checkout/core


Class CheckoutActions.LoadCheckoutDetails has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCheckoutDetailsFail 
## @spartacus/checkout/core


Class CheckoutActions.LoadCheckoutDetailsFail has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadCheckoutDetailsSuccess 
## @spartacus/checkout/core


Class CheckoutActions.LoadCheckoutDetailsSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadPaymentTypes 
## @spartacus/checkout/core


Class CheckoutActions.LoadPaymentTypes has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadPaymentTypesFail 
## @spartacus/checkout/core


Class CheckoutActions.LoadPaymentTypesFail has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadPaymentTypesSuccess 
## @spartacus/checkout/core


Class CheckoutActions.LoadPaymentTypesSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadSupportedDeliveryModes 
## @spartacus/checkout/core


Class CheckoutActions.LoadSupportedDeliveryModes has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadSupportedDeliveryModesFail 
## @spartacus/checkout/core


Class CheckoutActions.LoadSupportedDeliveryModesFail has been removed and is no longer part of the public API.




# Class CheckoutActions.LoadSupportedDeliveryModesSuccess 
## @spartacus/checkout/core


Class CheckoutActions.LoadSupportedDeliveryModesSuccess has been removed and is no longer part of the public API.




# TypeAlias CheckoutActions.OrderTypesActions 
## @spartacus/checkout/core


TypeAlias CheckoutActions.OrderTypesActions has been removed and is no longer part of the public API.




# Variable CheckoutActions.PAYMENT_PROCESS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.PAYMENT_PROCESS_SUCCESS has been removed and is no longer part of the public API.




# Class CheckoutActions.PaymentProcessSuccess 
## @spartacus/checkout/core


Class CheckoutActions.PaymentProcessSuccess has been removed and is no longer part of the public API.




# TypeAlias CheckoutActions.PaymentTypesAction 
## @spartacus/checkout/core


TypeAlias CheckoutActions.PaymentTypesAction has been removed and is no longer part of the public API.




# Variable CheckoutActions.PLACE_ORDER_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.PLACE_ORDER_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.PLACE_ORDER_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.PLACE_ORDER_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.PLACE_ORDER 
## @spartacus/checkout/core


Variable CheckoutActions.PLACE_ORDER has been removed and is no longer part of the public API.




# Class CheckoutActions.PlaceOrder 
## @spartacus/checkout/core


Class CheckoutActions.PlaceOrder has been removed and is no longer part of the public API.




# Class CheckoutActions.PlaceOrderFail 
## @spartacus/checkout/core


Class CheckoutActions.PlaceOrderFail has been removed and is no longer part of the public API.




# Class CheckoutActions.PlaceOrderSuccess 
## @spartacus/checkout/core


Class CheckoutActions.PlaceOrderSuccess has been removed and is no longer part of the public API.




# TypeAlias CheckoutActions.ReplenishmentOrderActions 
## @spartacus/checkout/core


TypeAlias CheckoutActions.ReplenishmentOrderActions has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_LOAD_PAYMENT_TYPES_PROCESS_ID 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_LOAD_PAYMENT_TYPES_PROCESS_ID has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_SET_COST_CENTER_PROCESS 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_SET_COST_CENTER_PROCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_SET_DELIVERY_ADDRESS_PROCESS 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_SET_DELIVERY_ADDRESS_PROCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_SET_DELIVERY_MODE_PROCESS 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_SET_DELIVERY_MODE_PROCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_SET_PAYMENT_DETAILS_PROCESS 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_SET_PAYMENT_DETAILS_PROCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS 
## @spartacus/checkout/core


Variable CheckoutActions.RESET_SUPPORTED_SET_DELIVERY_MODES_PROCESS has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetLoadPaymentTypesProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetLoadPaymentTypesProcess has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetLoadSupportedDeliveryModesProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetLoadSupportedDeliveryModesProcess has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetSetCostCenterProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetSetCostCenterProcess has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetSetDeliveryAddressProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetSetDeliveryAddressProcess has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetSetDeliveryModeProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetSetDeliveryModeProcess has been removed and is no longer part of the public API.




# Class CheckoutActions.ResetSetPaymentDetailsProcess 
## @spartacus/checkout/core


Class CheckoutActions.ResetSetPaymentDetailsProcess has been removed and is no longer part of the public API.




# Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER 
## @spartacus/checkout/core


Variable CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER has been removed and is no longer part of the public API.




# Class CheckoutActions.ScheduleReplenishmentOrder 
## @spartacus/checkout/core


Class CheckoutActions.ScheduleReplenishmentOrder has been removed and is no longer part of the public API.




# Class CheckoutActions.ScheduleReplenishmentOrderFail 
## @spartacus/checkout/core


Class CheckoutActions.ScheduleReplenishmentOrderFail has been removed and is no longer part of the public API.




# Class CheckoutActions.ScheduleReplenishmentOrderSuccess 
## @spartacus/checkout/core


Class CheckoutActions.ScheduleReplenishmentOrderSuccess has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_COST_CENTER_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_COST_CENTER_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_COST_CENTER_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_COST_CENTER_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_COST_CENTER 
## @spartacus/checkout/core


Variable CheckoutActions.SET_COST_CENTER has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_ADDRESS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_ADDRESS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_ADDRESS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_ADDRESS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_ADDRESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_ADDRESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_MODE_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_MODE_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_MODE_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_MODE_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_DELIVERY_MODE 
## @spartacus/checkout/core


Variable CheckoutActions.SET_DELIVERY_MODE has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_ORDER_TYPE 
## @spartacus/checkout/core


Variable CheckoutActions.SET_ORDER_TYPE has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_DETAILS_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_DETAILS_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_DETAILS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_DETAILS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_TYPE_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_TYPE_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_TYPE_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_TYPE_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_PAYMENT_TYPE 
## @spartacus/checkout/core


Variable CheckoutActions.SET_PAYMENT_TYPE has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_FAIL 
## @spartacus/checkout/core


Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_FAIL has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_SUCCESS 
## @spartacus/checkout/core


Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES_SUCCESS has been removed and is no longer part of the public API.




# Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES 
## @spartacus/checkout/core


Variable CheckoutActions.SET_SUPPORTED_DELIVERY_MODES has been removed and is no longer part of the public API.




# Class CheckoutActions.SetCostCenter 
## @spartacus/checkout/core


Class CheckoutActions.SetCostCenter has been removed and is no longer part of the public API.




# Class CheckoutActions.SetCostCenterFail 
## @spartacus/checkout/core


Class CheckoutActions.SetCostCenterFail has been removed and is no longer part of the public API.




# Class CheckoutActions.SetCostCenterSuccess 
## @spartacus/checkout/core


Class CheckoutActions.SetCostCenterSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryAddress 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryAddress has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryAddressFail 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryAddressFail has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryAddressSuccess 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryAddressSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryMode 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryMode has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryModeFail 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryModeFail has been removed and is no longer part of the public API.




# Class CheckoutActions.SetDeliveryModeSuccess 
## @spartacus/checkout/core


Class CheckoutActions.SetDeliveryModeSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.SetOrderType 
## @spartacus/checkout/core


Class CheckoutActions.SetOrderType has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentDetails 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentDetails has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentDetailsFail 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentDetailsFail has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentDetailsSuccess 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentDetailsSuccess has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentType 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentType has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentTypeFail 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentTypeFail has been removed and is no longer part of the public API.




# Class CheckoutActions.SetPaymentTypeSuccess 
## @spartacus/checkout/core


Class CheckoutActions.SetPaymentTypeSuccess has been removed and is no longer part of the public API.




# Class CheckoutAdapter 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Method clearCheckoutDeliveryAddress is removed.



### Method clearCheckoutDeliveryMode is removed.



### Method loadCheckoutDetails is removed.



### Method placeOrder is removed.





# Class CheckoutConnector 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Method clearCheckoutDeliveryAddress is removed.



### Method clearCheckoutDeliveryMode is removed.



### Method loadCheckoutDetails is removed.



### Method placeOrder is removed.





# Class CheckoutCoreModule 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core




# Class CheckoutCostCenterAdapter 
## @spartacus/checkout/core

moved to @spartacus/checkout/b2b/core




# Class CheckoutCostCenterConnector 
## @spartacus/checkout/core

moved to @spartacus/checkout/b2b/core




# Class CheckoutCostCenterService 
## @spartacus/checkout/core

moved to @spartacus/checkout/b2b/core


### Constructor changed.


Previous version: 

```

constructor(
  checkoutStore: Store<StateWithCheckout>,
  activeCartService: ActiveCartService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  userIdService: UserIdService,
  commandService: CommandService,
  checkoutCostCenterConnector: CheckoutCostCenterConnector,
  checkoutQueryFacade: CheckoutQueryFacade,
  eventService: EventService
)

```


### Property activeCartService is removed.



### Property checkoutStore is removed.



### Method getCostCenter is removed.



### Method setCostCenter changed.


Previous version: 

```

setCostCenter(
  costCenterId: string
): void

```


Current version: 

```

setCostCenter(
  costCenterId: string
): Observable<Cart>

```




# Class CheckoutDeliveryAdapter 
## @spartacus/checkout/core


Class CheckoutDeliveryAdapter has been removed and is no longer part of the public API.




# Class CheckoutDeliveryConnector 
## @spartacus/checkout/core


Class CheckoutDeliveryConnector has been removed and is no longer part of the public API.




# Class CheckoutDeliveryService 
## @spartacus/checkout/core


Class CheckoutDeliveryService has been removed and is no longer part of the public API.




# TypeAlias CheckoutDetails 
## @spartacus/checkout/core


TypeAlias CheckoutDetails has been removed and is no longer part of the public API.




# Class CheckoutEventBuilder 
## @spartacus/checkout/core


Class CheckoutEventBuilder has been removed and is no longer part of the public API.




# Class CheckoutEventListener 
## @spartacus/checkout/core


Class CheckoutEventListener has been removed and is no longer part of the public API.




# Class CheckoutEventModule 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/root


### Constructor changed.


Previous version: 

```

constructor(
  _checkoutEventBuilder: CheckoutEventBuilder,
  _checkoutEventListener: CheckoutEventListener
)

```


Current version: 

```

constructor(
  _checkoutQueryEventListener: CheckoutQueryEventListener,
  _checkoutDeliveryAddressEventListener: CheckoutDeliveryAddressEventListener,
  _checkoutDeliveryModeEventListener: CheckoutDeliveryModeEventListener,
  _checkoutPaymentEventListener: CheckoutPaymentEventListener,
  _checkoutPlaceOrderEventListener: CheckoutPlaceOrderEventListener,
  _checkoutLegacyStoreEventListener: CheckoutLegacyStoreEventListener
)

```




# Class CheckoutPageMetaResolver 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Constructor changed.


Previous version: 

```

constructor(
  translation: TranslationService,
  activeCartService: ActiveCartService,
  basePageMetaResolver: BasePageMetaResolver
)

```


Current version: 

```

constructor(
  translationService: TranslationService,
  activeCartFacade: ActiveCartFacade,
  basePageMetaResolver: BasePageMetaResolver
)

```


### Property activeCartService is removed.



### Property cart$ is removed.



### Method resolveTitle changed.


Previous version: 

```

resolveTitle(): Observable<string>

```


Current version: 

```

resolveTitle(): Observable<string | undefined>

```


### Property translation is removed.





# Class CheckoutPaymentAdapter 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Method create is removed.



### Method loadCardTypes is removed.



### Method set is removed.





# Class CheckoutPaymentConnector 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Method create is removed.



### Method getCardTypes is removed.



### Method set is removed.





# Class CheckoutPaymentService 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Constructor changed.


Previous version: 

```

constructor(
  checkoutStore: Store<StateWithCheckout>,
  processStateStore: Store<StateWithProcess<void>>,
  activeCartService: ActiveCartService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  userIdService: UserIdService,
  queryService: QueryService,
  commandService: CommandService,
  eventService: EventService,
  checkoutPaymentConnector: CheckoutPaymentConnector,
  checkoutQueryFacade: CheckoutQueryFacade
)

```


### Method actionAllowed is removed.



### Property activeCartService is removed.



### Property checkoutStore is removed.



### Method createPaymentDetails changed.


Previous version: 

```

createPaymentDetails(
  paymentDetails: PaymentDetails
): void

```


Current version: 

```

createPaymentDetails(
  paymentDetails: PaymentDetails
): Observable<unknown>

```


### Method getCardTypes is removed.



### Method getPaymentDetails is removed.



### Method getSetPaymentDetailsResultProcess is removed.



### Method loadSupportedCardTypes is removed.



### Method paymentProcessSuccess is removed.



### Property processStateStore is removed.



### Method resetSetPaymentDetailsProcess is removed.



### Method setPaymentDetails changed.


Previous version: 

```

setPaymentDetails(
  paymentDetails: PaymentDetails
): void

```


Current version: 

```

setPaymentDetails(
  paymentDetails: PaymentDetails
): Observable<unknown>

```




# Class CheckoutReplenishmentOrderAdapter 
## @spartacus/checkout/core


Class CheckoutReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class CheckoutReplenishmentOrderConnector 
## @spartacus/checkout/core


Class CheckoutReplenishmentOrderConnector has been removed and is no longer part of the public API.




# Namespace CheckoutSelectors 
## @spartacus/checkout/core


Namespace CheckoutSelectors has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getAllCardTypes 
## @spartacus/checkout/core


Variable CheckoutSelectors.getAllCardTypes has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getAllPaymentTypes 
## @spartacus/checkout/core


Variable CheckoutSelectors.getAllPaymentTypes has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCardTypesEntites 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCardTypesEntites has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCardTypesState 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCardTypesState has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutDetailsLoaded 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutDetailsLoaded has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutLoading 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutLoading has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutOrderDetails 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutOrderDetails has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutState 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutState has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutSteps 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutSteps has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCheckoutStepsState 
## @spartacus/checkout/core


Variable CheckoutSelectors.getCheckoutStepsState has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getCostCenter 
## @spartacus/checkout/core

moved to @spartacus/organization/administration/core
moved to namespace CostCenterSelectors


Variable getCostCenter changed.

Previous version: 

```
getCostCenter: MemoizedSelector<StateWithCheckout, string | undefined>
```


Current version: 

```
getCostCenter: (costCenterCode: string) => MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<CostCenter>>
```




# Variable CheckoutSelectors.getDeliveryAddress 
## @spartacus/checkout/core


Variable CheckoutSelectors.getDeliveryAddress has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getDeliveryMode 
## @spartacus/checkout/core


Variable CheckoutSelectors.getDeliveryMode has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getOrderTypesState 
## @spartacus/checkout/core


Variable CheckoutSelectors.getOrderTypesState has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getPaymentDetails 
## @spartacus/checkout/core


Variable CheckoutSelectors.getPaymentDetails has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getPaymentTypesEntites 
## @spartacus/checkout/core


Variable CheckoutSelectors.getPaymentTypesEntites has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getPaymentTypesState 
## @spartacus/checkout/core


Variable CheckoutSelectors.getPaymentTypesState has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getPoNumer 
## @spartacus/checkout/core


Variable CheckoutSelectors.getPoNumer has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSelectedDeliveryMode 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSelectedDeliveryMode has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSelectedDeliveryModeCode 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSelectedDeliveryModeCode has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSelectedOrderType 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSelectedOrderType has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSelectedOrderTypeSelector 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSelectedOrderTypeSelector has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSelectedPaymentType 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSelectedPaymentType has been removed and is no longer part of the public API.




# Variable CheckoutSelectors.getSupportedDeliveryModes 
## @spartacus/checkout/core


Variable CheckoutSelectors.getSupportedDeliveryModes has been removed and is no longer part of the public API.




# Class CheckoutService 
## @spartacus/checkout/core


Class CheckoutService has been removed and is no longer part of the public API.




# Interface CheckoutState 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/root


### PropertySignature cardTypes is removed.



### PropertySignature orderType is removed.



### PropertySignature paymentTypes is removed.



### PropertySignature steps is removed.





# Interface CheckoutStepsState 
## @spartacus/checkout/core


Interface CheckoutStepsState has been removed and is no longer part of the public API.




# Class ClearCheckoutService 
## @spartacus/checkout/core


Class ClearCheckoutService has been removed and is no longer part of the public API.




# Variable DELIVERY_MODE_NORMALIZER 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core




# Variable GET_PAYMENT_TYPES_PROCESS_ID 
## @spartacus/checkout/core


Variable GET_PAYMENT_TYPES_PROCESS_ID has been removed and is no longer part of the public API.




# Interface OrderTypesState 
## @spartacus/checkout/core


Interface OrderTypesState has been removed and is no longer part of the public API.




# Variable PAYMENT_DETAILS_SERIALIZER 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core




# Variable PAYMENT_TYPE_NORMALIZER 
## @spartacus/checkout/core


Variable PAYMENT_TYPE_NORMALIZER has been removed and is no longer part of the public API.




# Class PaymentTypeAdapter 
## @spartacus/checkout/core


Class PaymentTypeAdapter has been removed and is no longer part of the public API.




# Class PaymentTypeConnector 
## @spartacus/checkout/core


Class PaymentTypeConnector has been removed and is no longer part of the public API.




# Class PaymentTypeService 
## @spartacus/checkout/core


Class PaymentTypeService has been removed and is no longer part of the public API.




# Interface PaymentTypesState 
## @spartacus/checkout/core


Interface PaymentTypesState has been removed and is no longer part of the public API.




# Variable PLACED_ORDER_PROCESS_ID 
## @spartacus/checkout/core


Variable PLACED_ORDER_PROCESS_ID has been removed and is no longer part of the public API.




# Variable REPLENISHMENT_ORDER_FORM_SERIALIZER 
## @spartacus/checkout/core

moved to @spartacus/order/root




# Variable SET_COST_CENTER_PROCESS_ID 
## @spartacus/checkout/core


Variable SET_COST_CENTER_PROCESS_ID has been removed and is no longer part of the public API.




# Variable SET_DELIVERY_ADDRESS_PROCESS_ID 
## @spartacus/checkout/core


Variable SET_DELIVERY_ADDRESS_PROCESS_ID has been removed and is no longer part of the public API.




# Variable SET_DELIVERY_MODE_PROCESS_ID 
## @spartacus/checkout/core


Variable SET_DELIVERY_MODE_PROCESS_ID has been removed and is no longer part of the public API.




# Variable SET_PAYMENT_DETAILS_PROCESS_ID 
## @spartacus/checkout/core


Variable SET_PAYMENT_DETAILS_PROCESS_ID has been removed and is no longer part of the public API.




# Variable SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID 
## @spartacus/checkout/core


Variable SET_SUPPORTED_DELIVERY_MODE_PROCESS_ID has been removed and is no longer part of the public API.




# Interface StateWithCheckout 
## @spartacus/checkout/core


Interface StateWithCheckout has been removed and is no longer part of the public API.




# Interface CheckoutOccEndpoints 
## @spartacus/checkout/occ

moved to @spartacus/checkout/base/occ


### PropertySignature loadCheckoutDetails is removed.



### PropertySignature paymentTypes is removed.



### PropertySignature placeOrder is removed.



### PropertySignature setCartCostCenter is removed.



### PropertySignature setCartPaymentType is removed.





# Class CheckoutOccModule 
## @spartacus/checkout/occ

moved to @spartacus/checkout/base/occ




# Class OccCheckoutAdapter 
## @spartacus/checkout/occ

moved to @spartacus/checkout/base/occ


### Method clearCheckoutDeliveryAddress is removed.



### Method clearCheckoutDeliveryMode is removed.



### Method getClearDeliveryModeEndpoint is removed.



### Method getLoadCheckoutDetailsEndpoint is removed.



### Method getPlaceOrderEndpoint is removed.



### Method getRemoveDeliveryAddressEndpoint is removed.



### Method loadCheckoutDetails is removed.



### Method placeOrder is removed.





# Class OccCheckoutCostCenterAdapter 
## @spartacus/checkout/occ

moved to @spartacus/checkout/b2b/occ




# Class OccCheckoutDeliveryAdapter 
## @spartacus/checkout/occ


Class OccCheckoutDeliveryAdapter has been removed and is no longer part of the public API.




# Class OccCheckoutPaymentAdapter 
## @spartacus/checkout/occ

moved to @spartacus/checkout/base/occ


### Method create is removed.



### Method getCardTypesEndpoint is removed.



### Method loadCardTypes is removed.



### Method set is removed.





# Class OccCheckoutPaymentTypeAdapter 
## @spartacus/checkout/occ

moved to @spartacus/checkout/b2b/occ


### Method loadPaymentTypes is removed.





# Class OccCheckoutReplenishmentOrderAdapter 
## @spartacus/checkout/occ


Class OccCheckoutReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class OccReplenishmentOrderFormSerializer 
## @spartacus/checkout/occ


Class OccReplenishmentOrderFormSerializer has been removed and is no longer part of the public API.




# Variable CHECKOUT_CORE_FEATURE 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Variable CHECKOUT_FEATURE 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Class CheckoutConfig 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Class CheckoutCostCenterFacade 
## @spartacus/checkout/root

moved to @spartacus/checkout/b2b/root


### Method getCostCenter is removed.



### Method setCostCenter changed.


Previous version: 

```

setCostCenter(
  costCenterId: string
): void

```


Current version: 

```

setCostCenter(
  costCenterId: string
): Observable<Cart>

```




# Class CheckoutDeliveryFacade 
## @spartacus/checkout/root


Class CheckoutDeliveryFacade has been removed and is no longer part of the public API.




# Class CheckoutFacade 
## @spartacus/checkout/root


Class CheckoutFacade has been removed and is no longer part of the public API.




# Class CheckoutPaymentFacade 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root


### Method createPaymentDetails changed.


Previous version: 

```

createPaymentDetails(
  paymentDetails: PaymentDetails
): void

```


Current version: 

```

createPaymentDetails(
  paymentDetails: PaymentDetails
): Observable<unknown>

```


### Method getCardTypes is removed.



### Method getPaymentDetails is removed.



### Method getSetPaymentDetailsResultProcess is removed.



### Method loadSupportedCardTypes is removed.



### Method paymentProcessSuccess is removed.



### Method resetSetPaymentDetailsProcess is removed.



### Method setPaymentDetails changed.


Previous version: 

```

setPaymentDetails(
  paymentDetails: PaymentDetails
): void

```


Current version: 

```

setPaymentDetails(
  paymentDetails: PaymentDetails
): Observable<unknown>

```




# Variable checkoutPaymentSteps 
## @spartacus/checkout/root


Variable checkoutPaymentSteps has been removed and is no longer part of the public API.




# Class CheckoutRootModule 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Variable checkoutShippingSteps 
## @spartacus/checkout/root


Variable checkoutShippingSteps has been removed and is no longer part of the public API.




# Interface CheckoutStep 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Enum CheckoutStepType 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root


Enum CheckoutStepType changed.

Previous version: 

```
DELIVERY_MODE,
PAYMENT_DETAILS,
PAYMENT_TYPE,
REVIEW_ORDER,
SHIPPING_ADDRESS
```


Current version: 

```
DELIVERY_ADDRESS,
DELIVERY_MODE,
PAYMENT_DETAILS,
REVIEW_ORDER
```




# Class ClearCheckoutFacade 
## @spartacus/checkout/root


Class ClearCheckoutFacade has been removed and is no longer part of the public API.




# Function defaultCheckoutComponentsConfig 
## @spartacus/checkout/root

moved to @spartacus/checkout/b2b/root


Function defaultCheckoutComponentsConfig changed.

Previous version: 

```

defaultCheckoutComponentsConfig(): {
    featureModules: {
        checkout: {
            cmsComponents: string[];
        };
        checkoutCore: string;
    };
}

```


Current version: 

```

defaultCheckoutComponentsConfig(): CmsConfig

```




# Enum DeliveryModePreferences 
## @spartacus/checkout/root

moved to @spartacus/checkout/base/root




# Class OrderConfirmationOrderEntriesContext 
## @spartacus/checkout/root

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  checkoutService: CheckoutFacade
)

```


Current version: 

```

constructor(
  orderFacade: OrderFacade
)

```


### Property checkoutService is removed.





# Class OrderPlacedEvent 
## @spartacus/checkout/root

moved to @spartacus/order/root


### Property code is removed.





# Class PaymentTypeFacade 
## @spartacus/checkout/root


Class PaymentTypeFacade has been removed and is no longer part of the public API.




# Class CheckoutModule 
## @spartacus/checkout

moved to @spartacus/checkout/base




# Class ActiveCartService 
## @spartacus/core

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart>,
  multiCartService: MultiCartService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  multiCartFacade: MultiCartFacade,
  userIdService: UserIdService
)

```


### Property cartSelector$ is removed.



### Method getEntry changed.


Previous version: 

```

getEntry(
  productCode: string
): Observable<OrderEntry>

```


Current version: 

```

getEntry(
  productCode: string
): Observable<OrderEntry | undefined>

```


### Method getLastEntry changed.


Previous version: 

```

getLastEntry(
  productCode: string
): Observable<OrderEntry>

```


Current version: 

```

getLastEntry(
  productCode: string
): Observable<OrderEntry | undefined>

```


### Method isCartCreating changed.


Previous version: 

```

isCartCreating(
  cartState: ProcessesLoaderState<Cart>,
  cartId: string
): boolean

```


Current version: 

```

isCartCreating(
  cartState: StateUtils.ProcessesLoaderState<Cart | undefined>,
  cartId: string
): boolean | undefined

```


### Method isEmail is removed.



### Method isEmpty is removed.



### Method isGuestCart changed.


Previous version: 

```

isGuestCart(
  cart: Cart
): boolean

```


Current version: 

```

isGuestCart(
  cart: Cart
): Observable<boolean>

```


### Method isJustLoggedIn is removed.



### Property multiCartService is removed.



### Method requireLoadedCart changed.


Previous version: 

```

requireLoadedCart(
  customCartSelector$: Observable<ProcessesLoaderState<Cart>>
): Observable<ProcessesLoaderState<Cart>>

```


Current version: 

```

requireLoadedCart(
  forGuestMerge: boolean
): Observable<Cart>

```


### Method requireLoadedCartForGuestMerge is removed.



### Property store is removed.





# Variable ADD_VOUCHER_PROCESS_ID 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class AddUserAddressEvent 
## @spartacus/core


### Property userId is removed.





# Variable AnonymousConsentsSelectors.getAnonymousConsentByTemplateCode 
## @spartacus/core


Variable getAnonymousConsentByTemplateCode changed.

Previous version: 

```
getAnonymousConsentByTemplateCode: (templateCode: string) => MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent>
```


Current version: 

```
getAnonymousConsentByTemplateCode: (templateCode: string) => MemoizedSelector<StateWithAnonymousConsents, AnonymousConsent | undefined>
```




# Variable AnonymousConsentsSelectors.getAnonymousConsentTemplate 
## @spartacus/core


Variable getAnonymousConsentTemplate changed.

Previous version: 

```
getAnonymousConsentTemplate: (templateCode: string) => MemoizedSelector<StateWithAnonymousConsents, ConsentTemplate>
```


Current version: 

```
getAnonymousConsentTemplate: (templateCode: string) => MemoizedSelector<StateWithAnonymousConsents, ConsentTemplate | undefined>
```




# Class AnonymousConsentsService 
## @spartacus/core


### Method getConsent changed.


Previous version: 

```

getConsent(
  templateId: string
): Observable<AnonymousConsent>

```


Current version: 

```

getConsent(
  templateId: string
): Observable<AnonymousConsent | undefined>

```


### Method getTemplate changed.


Previous version: 

```

getTemplate(
  templateCode: string
): Observable<ConsentTemplate>

```


Current version: 

```

getTemplate(
  templateCode: string
): Observable<ConsentTemplate | undefined>

```


### Method isConsentGiven changed.


Previous version: 

```

isConsentGiven(
  consent: AnonymousConsent
): boolean

```


Current version: 

```

isConsentGiven(
  consent: AnonymousConsent | undefined
): boolean

```




# Class AuthHttpHeaderService 
## @spartacus/core


### Method getValidToken changed.


Previous version: 

```

getValidToken(
  requestToken: AuthToken
): Observable<AuthToken | undefined>

```


Current version: 

```

getValidToken(
  requestToken: AuthToken | undefined
): Observable<AuthToken | undefined>

```


### Method handleExpiredAccessToken changed.


Previous version: 

```

handleExpiredAccessToken(
  request: HttpRequest<any>,
  next: HttpHandler,
  initialToken: AuthToken
): Observable<HttpEvent<AuthToken>>

```


Current version: 

```

handleExpiredAccessToken(
  request: HttpRequest<any>,
  next: HttpHandler,
  initialToken: AuthToken | undefined
): Observable<HttpEvent<AuthToken>>

```


### Method handleExpiredToken is removed.

Use 'getValidToken' instead.

### Property refreshInProgress is removed.

Use 'refreshInProgress$' Observable instead from 'AuthService'.

### Property stopProgress$ changed.


Previous version: 

```
stopProgress$: Observable<[AuthToken, AuthToken]>
```


Current version: 

```
stopProgress$: Observable<[AuthToken | undefined, AuthToken | undefined]>
```


### Property tokenToRetryRequest$ changed.


Previous version: 

```
tokenToRetryRequest$: Observable<AuthToken>
```


Current version: 

```
tokenToRetryRequest$: Observable<AuthToken | undefined>
```




# Class AuthRedirectService 
## @spartacus/core


### Method reportAuthGuard is removed.

Use 'saveCurrentNavigationUrl' method instead.

### Method reportNotAuthGuard is removed.

No replacement needed. Every visited URL is now remembered automatically as redirect URL on 'NavigationEnd' event.



# Class AuthStatePersistenceService 
## @spartacus/core


### Method readStateFromStorage changed.


Previous version: 

```

readStateFromStorage(): SyncedAuthState

```


Current version: 

```

readStateFromStorage(): SyncedAuthState | undefined

```




# Enum B2BPaymentTypeEnum 
## @spartacus/core

moved to @spartacus/checkout/b2b/root




# Class BadRequestHandler 
## @spartacus/core


### Method handleBadCartRequest is removed.



### Method handleVoucherOperationError is removed.

It is now being handled in 'BadVoucherRequestHandler' from @spartacus/cart/base/core



# Interface BaseSiteState 
## @spartacus/core


### PropertySignature entities changed.


Previous version: 

```
entities: BaseSiteEntities
```


Current version: 

```
entities: BaseSiteEntities | null
```




# Interface BreadcrumbMeta 
## @spartacus/core


### PropertySignature link changed.


Previous version: 

```
link: string
```


Current version: 

```
link: string | any[]
```




# Variable CANCEL_ORDER_PROCESS_ID 
## @spartacus/core

moved to @spartacus/order/core




# Variable CANCEL_REPLENISHMENT_ORDER_PROCESS_ID 
## @spartacus/core

moved to @spartacus/order/core




# Variable CANCEL_RETURN_PROCESS_ID 
## @spartacus/core

moved to @spartacus/order/core




# Interface CancellationRequestEntryInputList 
## @spartacus/core

moved to @spartacus/order/root




# Interface CancelOrReturnRequestEntryInput 
## @spartacus/core

moved to @spartacus/order/root




# Interface Carrier 
## @spartacus/core

moved to @spartacus/order/root




# Variable CART_MODIFICATION_NORMALIZER 
## @spartacus/core

moved to @spartacus/cart/base/root




# Variable CART_NORMALIZER 
## @spartacus/core

moved to @spartacus/cart/base/root




# Variable CART_VALIDATION_NORMALIZER 
## @spartacus/core

moved to @spartacus/cart/base/core




# Variable CART_VOUCHER_NORMALIZER 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface Cart 
## @spartacus/core

moved to @spartacus/cart/base/root




# Namespace CartActions 
## @spartacus/core

moved to @spartacus/cart/base/core




# Variable CartActions.ADD_EMAIL_TO_CART_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.ADD_EMAIL_TO_CART_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.ADD_EMAIL_TO_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.AddEmailToCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.AddEmailToCartFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.AddEmailToCartSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_ENTRY_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_ENTRY_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_ENTRY 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_VOUCHER_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_VOUCHER_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_ADD_VOUCHER 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_PROCESSES_DECREMENT 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_PROCESSES_INCREMENT 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_ENTRY_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_ENTRY_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_ENTRY 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_VOUCHER_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_VOUCHER_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_REMOVE_VOUCHER 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_RESET_ADD_VOUCHER 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_UPDATE_ENTRY_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_UPDATE_ENTRY_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CART_UPDATE_ENTRY 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# TypeAlias CartActions.CartAction 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddEntry 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddEntryFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddEntrySuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddVoucher 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddVoucherFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartAddVoucherSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# TypeAlias CartActions.CartEntryAction 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartProcessesDecrement 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartProcessesIncrement 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveEntry 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveEntryFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveEntrySuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveVoucher 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveVoucherFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartRemoveVoucherSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartResetAddVoucher 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartUpdateEntry 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartUpdateEntryFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CartUpdateEntrySuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# TypeAlias CartActions.CartVoucherAction 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CLEAR_CART_STATE 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.ClearCartState 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CREATE_CART_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CREATE_CART_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CREATE_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.CREATE_WISH_LIST_FAIL 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Variable CartActions.CREATE_WISH_LIST_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Variable CartActions.CREATE_WISH_LIST 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartActions.CreateCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CreateCartFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CreateCartSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.CreateWishList 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        userId: string;
        name: string;
        description?: string;
    }
)

```


Current version: 

```

constructor(
  payload: {
        userId: string;
        name?: string;
        description?: string;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        userId: string;
        name: string;
        description?: string;
    }
```


Current version: 

```
payload: {
        userId: string;
        name?: string;
        description?: string;
    }
```




# Class CartActions.CreateWishListFail 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartActions.CreateWishListSuccess 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        cart: Cart;
        userId: string;
    }
)

```


Current version: 

```

constructor(
  payload: {
        cart: Cart;
        cartId: string;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        cart: Cart;
        userId: string;
    }
```


Current version: 

```
payload: {
        cart: Cart;
        cartId: string;
    }
```




# Variable CartActions.DELETE_CART_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.DELETE_CART_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.DELETE_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.DeleteCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.DeleteCartFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.DeleteCartSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.LOAD_CART_FAIL 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.LOAD_CART_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.LOAD_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.LOAD_CARTS_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.LOAD_WISH_LIST_FAIL 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Variable CartActions.LOAD_WISH_LIST_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Variable CartActions.LOAD_WISH_LIST 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartActions.LoadCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.LoadCartFail 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.LoadCartsSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.LoadCartSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.LoadWishList 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartActions.LoadWishListFail 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartActions.LoadWishListSuccess 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions


### Constructor changed.


Previous version: 

```

constructor(
  payload: LoadWishListSuccessPayload
)

```


Current version: 

```

constructor(
  payload: {
        cart: Cart;
        cartId: string;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: LoadWishListSuccessPayload
```


Current version: 

```
payload: {
        cart: Cart;
        cartId: string;
    }
```




# Variable CartActions.MERGE_CART_SUCCESS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.MERGE_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.MergeCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.MergeCartSuccess 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# TypeAlias CartActions.MultiCartActions 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions


TypeAlias MultiCartActions changed.

Previous version: 

```
SetTempCart,
 | ,
CartProcessesIncrement,
 | ,
CartProcessesDecrement,
 | ,
SetActiveCartId,
 | ,
ClearCartState
```


Current version: 

```
CartProcessesIncrement,
 | ,
CartProcessesDecrement,
 | ,
SetActiveCartId,
 | ,
ClearCartState,
 | ,
SetCartTypeIndex,
 | ,
SetCartData
```




# Variable CartActions.REMOVE_CART 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.RemoveCart 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.RESET_CART_DETAILS 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.RESET_WISH_LIST_DETAILS 
## @spartacus/core


Variable CartActions.RESET_WISH_LIST_DETAILS has been removed and is no longer part of the public API.




# Class CartActions.ResetCartDetails 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.SET_ACTIVE_CART_ID 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Variable CartActions.SET_TEMP_CART 
## @spartacus/core


Variable CartActions.SET_TEMP_CART has been removed and is no longer part of the public API.




# Class CartActions.SetActiveCartId 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace CartActions




# Class CartActions.SetTempCart 
## @spartacus/core


Class CartActions.SetTempCart has been removed and is no longer part of the public API.




# TypeAlias CartActions.WishListActions 
## @spartacus/core

moved to @spartacus/cart/wish-list/core
moved to namespace WishListActions




# Class CartAdapter 
## @spartacus/core

moved to @spartacus/cart/base/core


### Method load changed.


Previous version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart | undefined>

```




# Class CartAddEntryEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartAddEntryFailEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartAddEntrySuccessEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartConfig 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartConfigService 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartConnector 
## @spartacus/core

moved to @spartacus/cart/base/core


### Method load changed.


Previous version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart | undefined>

```




# Class CartEntryAdapter 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartEntryConnector 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartEventBuilder 
## @spartacus/core

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  actionsSubject: ActionsSubject,
  event: EventService,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  actionsSubject: ActionsSubject,
  event: EventService,
  activeCartService: ActiveCartFacade,
  stateEventService: StateEventService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```




# Class CartEventModule 
## @spartacus/core

moved to @spartacus/cart/base/core




# Interface CartModification 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface CartModificationList 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartModule 
## @spartacus/core


Class CartModule has been removed and is no longer part of the public API.




# Class CartOccModule 
## @spartacus/core


Class CartOccModule has been removed and is no longer part of the public API.




# Class CartPersistenceModule 
## @spartacus/core

moved to @spartacus/cart/base/core


### Method forRoot is removed.





# Class CartRemoveEntryFailEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartRemoveEntrySuccessEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartUpdateEntryFailEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartUpdateEntrySuccessEvent 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartValidationAdapter 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartValidationConnector 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartValidationService 
## @spartacus/core

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  cartValidationConnector: CartValidationConnector,
  command: CommandService,
  userIdService: UserIdService,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  cartValidationConnector: CartValidationConnector,
  command: CommandService,
  userIdService: UserIdService,
  activeCartFacade: ActiveCartFacade,
  cartValidationStateService: CartValidationStateService
)

```


### Property activeCartService is removed.





# Enum CartValidationStatusCode 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class CartVoucherAdapter 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartVoucherConnector 
## @spartacus/core

moved to @spartacus/cart/base/core




# Class CartVoucherService 
## @spartacus/core

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<fromProcessStore.StateWithProcess<void>>,
  activeCartService: ActiveCartService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithProcess<void>>,
  activeCartFacade: ActiveCartFacade,
  userIdService: UserIdService
)

```


### Property activeCartService is removed.



### Property store changed.


Previous version: 

```
store: Store<fromProcessStore.StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithProcess<void>>
```




# Class ClientTokenInterceptor 
## @spartacus/core


### Method getClientToken changed.


Previous version: 

```

getClientToken(
  isClientTokenRequest: boolean
): Observable<ClientToken>

```


Current version: 

```

getClientToken(
  isClientTokenRequest: boolean
): Observable<ClientToken | undefined>

```




# Class ClientTokenService 
## @spartacus/core


### Method getClientToken changed.


Previous version: 

```

getClientToken(): Observable<ClientToken>

```


Current version: 

```

getClientToken(): Observable<ClientToken | undefined>

```




# Class CmsActions.LoadCmsComponent 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        uid: string;
        pageContext: PageContext;
    }
)

```


Current version: 

```

constructor(
  payload: {
        uid: string;
        pageContext?: PageContext;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        uid: string;
        pageContext: PageContext;
    }
```


Current version: 

```
payload: {
        uid: string;
        pageContext?: PageContext;
    }
```




# Class CmsComponentConnector 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  cmsStructureConfigService: CmsStructureConfigService,
  cmsComponentAdapter: CmsComponentAdapter,
  config: OccConfig
)

```


Current version: 

```

constructor(
  cmsStructureConfigService: CmsStructureConfigService,
  cmsComponentAdapter: CmsComponentAdapter,
  config: CmsConfig
)

```


### Property config changed.


Previous version: 

```
config: OccConfig
```


Current version: 

```
config: CmsConfig
```




# Variable CmsSelectors.componentsContextExistsSelectorFactory 
## @spartacus/core


Variable componentsContextExistsSelectorFactory changed.

Previous version: 

```
componentsContextExistsSelectorFactory: (uid: string, context: string) => MemoizedSelector<StateWithCms, boolean | undefined>
```


Current version: 

```
componentsContextExistsSelectorFactory: (uid: string, context: string) => MemoizedSelector<StateWithCms, boolean>
```




# Variable CmsSelectors.componentsContextSelectorFactory 
## @spartacus/core


Variable componentsContextSelectorFactory changed.

Previous version: 

```
componentsContextSelectorFactory: (uid: string) => MemoizedSelector<StateWithCms, ComponentsContext>
```


Current version: 

```
componentsContextSelectorFactory: (uid: string) => MemoizedSelector<StateWithCms, ComponentsContext | undefined>
```




# Variable CmsSelectors.getCurrentSlotSelectorFactory 
## @spartacus/core


Variable getCurrentSlotSelectorFactory changed.

Previous version: 

```
getCurrentSlotSelectorFactory: (pageContext: PageContext, position: string) => MemoizedSelector<StateWithCms, ContentSlotData>
```


Current version: 

```
getCurrentSlotSelectorFactory: (pageContext: PageContext, position: string) => MemoizedSelector<StateWithCms, ContentSlotData | undefined>
```




# Class CmsService 
## @spartacus/core


### Method getPage changed.


Previous version: 

```

getPage(
  pageContext: PageContext,
  forceReload: boolean
): Observable<Page>

```


Current version: 

```

getPage(
  pageContext: PageContext,
  forceReload: boolean
): Observable<Page | null>

```


### Method loadNavigationItems changed.


Previous version: 

```

loadNavigationItems(
  rootUid: string,
  itemList: {
        id: string;
        superType: string;
    }[]
): void

```


Current version: 

```

loadNavigationItems(
  rootUid: string,
  itemList: {
        id: string | undefined;
        superType: string | undefined;
    }[]
): void

```




# Class CmsStructureConfigService 
## @spartacus/core


### Method getPageFromConfig changed.


Previous version: 

```

getPageFromConfig(
  pageId: string
): Observable<CmsPageConfig>

```


Current version: 

```

getPageFromConfig(
  pageId: string
): Observable<CmsPageConfig | undefined>

```




# Class Command 
## @spartacus/core


### Method execute changed.


Previous version: 

```

execute(
  params: P
): Observable<R>

```


Current version: 

```

execute(
  parameters: PARAMS
): Observable<RESULT>

```




# Class CommandService 
## @spartacus/core


### Method create changed.


Previous version: 

```

create(
  commandFactory: (command: P) => Observable<any>,
  options: {
        strategy?: CommandStrategy;
    }
): Command<P, R>

```


Current version: 

```

create(
  commandFactory: (command: PARAMS) => Observable<any>,
  options: {
        strategy?: CommandStrategy;
    }
): Command<PARAMS, RESULT>

```




# Class ConfigInitializerService 
## @spartacus/core


### Property ongoingScopes$ changed.


Previous version: 

```
ongoingScopes$: BehaviorSubject<string[]>
```


Current version: 

```
ongoingScopes$: BehaviorSubject<string[] | undefined>
```




# Class ConfigModule 
## @spartacus/core


### Method withConfigFactory changed.


Previous version: 

```

withConfigFactory(
  configFactory: Function,
  deps: any[]
): ModuleWithProviders<ConfigModule>

```


Current version: 

```

withConfigFactory(
  configFactory: ConfigFactory,
  deps: any[]
): ModuleWithProviders<ConfigModule>

```




# Class ConfigurableRoutesService 
## @spartacus/core


### Method validateRouteConfig changed.


Previous version: 

```

validateRouteConfig(
  routeConfig: RouteConfig,
  routeName: string,
  route: Route
): void

```


Current version: 

```

validateRouteConfig(
  routeConfig: RouteConfig | null | undefined,
  routeName: string,
  route: Route
): void

```




# Class ConsentService 
## @spartacus/core


### Method getConsent changed.


Previous version: 

```

getConsent(
  templateCode: string
): Observable<AnonymousConsent | Consent>

```


Current version: 

```

getConsent(
  templateCode: string
): Observable<AnonymousConsent | Consent | undefined>

```




# Variable CONSIGNMENT_TRACKING_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Interface Consignment 
## @spartacus/core

moved to @spartacus/order/root




# Interface ConsignmentEntry 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface ConsignmentTracking 
## @spartacus/core

moved to @spartacus/order/root




# Interface ConsignmentTrackingEvent 
## @spartacus/core

moved to @spartacus/order/root




# Interface ConsignmentTrackingState 
## @spartacus/core

moved to @spartacus/order/core




# Interface Converter 
## @spartacus/core


### MethodSignature convert changed.


Previous version: 

```

convert(
  source: S,
  target: T
): T

```


Current version: 

```

convert(
  source: SOURCE,
  target: TARGET
): TARGET

```




# Interface CurrenciesState 
## @spartacus/core


### PropertySignature activeCurrency changed.


Previous version: 

```
activeCurrency: string
```


Current version: 

```
activeCurrency: string | null
```


### PropertySignature entities changed.


Previous version: 

```
entities: CurrencyEntities
```


Current version: 

```
entities: CurrencyEntities | null
```




# Class CurrencyStatePersistenceService 
## @spartacus/core


### Method onRead changed.


Previous version: 

```

onRead(
  valueFromStorage: string
): void

```


Current version: 

```

onRead(
  valueFromStorage: string | undefined
): void

```




# Enum DaysOfWeek 
## @spartacus/core

moved to @spartacus/order/root




# Class DefaultRoutePageMetaResolver 
## @spartacus/core


### Method getParams changed.


Previous version: 

```

getParams(): Observable<{
        [_: string]: any;
    }>

```


Current version: 

```

getParams(): Observable<{
        [_: string]: any;
    } | undefined>

```




# Class DeleteUserAddressEvent 
## @spartacus/core


### Property userId is removed.





# Interface DeliveryMode 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface DeliveryOrderEntryGroup 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class ForbiddenHandler 
## @spartacus/core


### Method handleError changed.


Previous version: 

```

handleError(
  request: any
): void

```


Current version: 

```

handleError(
  request: HttpRequest<any>
): void

```




# Function getCartIdByUserId 
## @spartacus/core

moved to @spartacus/cart/base/core




# Function getWishlistName 
## @spartacus/core

moved to @spartacus/cart/wish-list/core




# Class GlobalMessageConfig 
## @spartacus/core


### Property globalMessages changed.


Previous version: 

```
globalMessages: {
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
    }
```


Current version: 

```
globalMessages: {
        [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_ERROR]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_WARNING]?: GlobalMessageTypeConfig;
        [GlobalMessageType.MSG_TYPE_ASSISTIVE]?: GlobalMessageTypeConfig;
    }
```




# Class HttpErrorHandler 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  globalMessageService: GlobalMessageService,
  platformId: Object
)

```


Current version: 

```

constructor(
  globalMessageService: GlobalMessageService,
  platformId: Object | undefined
)

```


### Property platformId changed.


Previous version: 

```
platformId: Object
```


Current version: 

```
platformId: Object | undefined
```




# Class InterceptorUtil 
## @spartacus/core


### Method getInterceptorParam changed.


Previous version: 

```

getInterceptorParam(
  headerName: string,
  headers: HttpHeaders
): T

```


Current version: 

```

getInterceptorParam(
  headerName: string,
  headers: HttpHeaders
): T | undefined

```




# Function isCartNotFoundError 
## @spartacus/core

moved to @spartacus/cart/base/core




# Function isSelectiveCart 
## @spartacus/core

moved to @spartacus/cart/base/core




# Function isTempCartId 
## @spartacus/core

moved to @spartacus/cart/base/core




# Interface LanguagesState 
## @spartacus/core


### PropertySignature activeLanguage changed.


Previous version: 

```
activeLanguage: string
```


Current version: 

```
activeLanguage: string | null
```


### PropertySignature entities changed.


Previous version: 

```
entities: LanguagesEntities
```


Current version: 

```
entities: LanguagesEntities | null
```




# Class LanguageStatePersistenceService 
## @spartacus/core


### Method onRead changed.


Previous version: 

```

onRead(
  valueFromStorage: string
): void

```


Current version: 

```

onRead(
  valueFromStorage: string | undefined
): void

```




# Function locationInitializedFactory 
## @spartacus/core


Function locationInitializedFactory changed.

Previous version: 

```

locationInitializedFactory(
  configInitializer: ConfigInitializerService
): Promise<Config>

```


Current version: 

```

locationInitializedFactory(
  configInitializer: ConfigInitializerService
): Promise<import("@spartacus/core").Config>

```




# Class MockTranslatePipe 
## @spartacus/core


### Method transform changed.


Previous version: 

```

transform(
  input: Translatable | string,
  options: object
): string

```


Current version: 

```

transform(
  input: Translatable | string,
  options: object
): string | undefined

```




# Variable MULTI_CART_DATA 
## @spartacus/core

moved to @spartacus/cart/base/core




# Variable MULTI_CART_FEATURE 
## @spartacus/core

moved to @spartacus/cart/base/core




# Namespace MultiCartSelectors 
## @spartacus/core

moved to @spartacus/cart/base/core




# Variable MultiCartSelectors.getActiveCartId 
## @spartacus/core


Variable MultiCartSelectors.getActiveCartId has been removed and is no longer part of the public API.




# Variable MultiCartSelectors.getCartEntitySelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors


Variable getCartEntitySelectorFactory changed.

Previous version: 

```
getCartEntitySelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, ProcessesLoaderState<Cart>>
```


Current version: 

```
getCartEntitySelectorFactory: (cartId: string) => MemoizedSelector<StateWithMultiCart, StateUtils.ProcessesLoaderState<Cart | undefined>>
```




# Variable MultiCartSelectors.getCartEntriesSelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getCartEntrySelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors


Variable getCartEntrySelectorFactory changed.

Previous version: 

```
getCartEntrySelectorFactory: (cartId: string, productCode: string) => MemoizedSelector<StateWithMultiCart, OrderEntry>
```


Current version: 

```
getCartEntrySelectorFactory: (cartId: string, productCode: string) => MemoizedSelector<StateWithMultiCart, OrderEntry | undefined>
```




# Variable MultiCartSelectors.getCartHasPendingProcessesSelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getCartIsStableSelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getCartSelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getCartsSelectorFactory 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getMultiCartEntities 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors


Variable getMultiCartEntities changed.

Previous version: 

```
getMultiCartEntities: MemoizedSelector<StateWithMultiCart, EntityProcessesLoaderState<Cart>>
```


Current version: 

```
getMultiCartEntities: MemoizedSelector<StateWithMultiCart, StateUtils.EntityProcessesLoaderState<Cart | undefined>>
```




# Variable MultiCartSelectors.getMultiCartState 
## @spartacus/core

moved to @spartacus/cart/base/core
moved to namespace MultiCartSelectors




# Variable MultiCartSelectors.getWishListId 
## @spartacus/core


Variable MultiCartSelectors.getWishListId has been removed and is no longer part of the public API.




# Class MultiCartService 
## @spartacus/core

moved to @spartacus/cart/base/core


### Method createCart changed.


Previous version: 

```

createCart(
  { userId, oldCartId, toMergeCartGuid, extraData, }: {
        userId: string;
        oldCartId?: string;
        toMergeCartGuid?: string;
        extraData?: {
            active?: boolean;
        };
    }
): Observable<ProcessesLoaderState<Cart>>

```


Current version: 

```

createCart(
  { userId, oldCartId, toMergeCartGuid, extraData, }: {
        userId: string;
        oldCartId?: string;
        toMergeCartGuid?: string;
        extraData?: {
            active?: boolean;
        };
    }
): Observable<Cart>

```


### Method getCartEntity changed.


Previous version: 

```

getCartEntity(
  cartId: string
): Observable<ProcessesLoaderState<Cart>>

```


Current version: 

```

getCartEntity(
  cartId: string
): Observable<StateUtils.ProcessesLoaderState<Cart | undefined>>

```


### Method getEntry changed.


Previous version: 

```

getEntry(
  cartId: string,
  productCode: string
): Observable<OrderEntry | null>

```


Current version: 

```

getEntry(
  cartId: string,
  productCode: string
): Observable<OrderEntry | undefined>

```


### Method getLastEntry changed.


Previous version: 

```

getLastEntry(
  cartId: string,
  productCode: string
): Observable<OrderEntry | null>

```


Current version: 

```

getLastEntry(
  cartId: string,
  productCode: string
): Observable<OrderEntry | undefined>

```




# Interface MultiCartState 
## @spartacus/core

moved to @spartacus/cart/base/core


### PropertySignature active is removed.



### PropertySignature carts changed.


Previous version: 

```
carts: EntityProcessesLoaderState<Cart>
```


Current version: 

```
carts: StateUtils.EntityProcessesLoaderState<Cart | undefined>
```


### PropertySignature wishList is removed.





# Class MultiCartStatePersistenceService 
## @spartacus/core

moved to @spartacus/cart/base/core




# Function normalizeHttpError 
## @spartacus/core


Function normalizeHttpError changed.

Previous version: 

```

normalizeHttpError(
  error: HttpErrorResponse | any
): HttpErrorModel | undefined

```


Current version: 

```

normalizeHttpError(
  error: HttpErrorResponse | HttpErrorModel | any
): HttpErrorModel | undefined

```




# Class NotAuthGuard 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService,
  authRedirectService: AuthRedirectService,
  semanticPathService: SemanticPathService,
  router: Router
)

```


Current version: 

```

constructor(
  authService: AuthService,
  semanticPathService: SemanticPathService,
  router: Router
)

```


### Property authRedirectService is removed.





# Class OAuthLibWrapperService 
## @spartacus/core


### Method tryLogin changed.


Previous version: 

```

tryLogin(): Promise<boolean>

```


Current version: 

```

tryLogin(): Promise<OAuthTryLoginResult>

```




# Class OccCartAdapter 
## @spartacus/core

moved to @spartacus/cart/base/occ


### Method load changed.


Previous version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string,
  cartId: string
): Observable<Cart | undefined>

```




# Class OccCartEntryAdapter 
## @spartacus/core

moved to @spartacus/cart/base/occ




# Class OccCartNormalizer 
## @spartacus/core

moved to @spartacus/cart/base/occ


### Constructor changed.


Previous version: 

```

constructor(
  converter: ConverterService,
  entryPromotionService: OrderEntryPromotionsService
)

```


Current version: 

```

constructor(
  converter: ConverterService
)

```




# Class OccCartValidationAdapter 
## @spartacus/core

moved to @spartacus/cart/base/occ




# Class OccCartVoucherAdapter 
## @spartacus/core

moved to @spartacus/cart/base/occ


### Method getCartVoucherEndpoint changed.


Previous version: 

```

getCartVoucherEndpoint(
  userId: string,
  cartId: any
): string

```


Current version: 

```

getCartVoucherEndpoint(
  userId: string,
  cartId: string
): string

```




# Function occConfigValidator 
## @spartacus/core


Function occConfigValidator changed.

Previous version: 

```

occConfigValidator(
  config: OccConfig
): string

```


Current version: 

```

occConfigValidator(
  config: OccConfig
): "Please configure backend.occ.baseUrl before using storefront library!" | undefined

```




# Class OccCostCenterNormalizer 
## @spartacus/core


### Method normalizeBoolean changed.


Previous version: 

```

normalizeBoolean(
  property: string | boolean
): boolean

```


Current version: 

```

normalizeBoolean(
  property: string | boolean | undefined
): boolean

```




# Interface OccEndpoints 
## @spartacus/core


### PropertySignature addEmail is removed.



### PropertySignature addEntries is removed.



### PropertySignature b2bUser is removed.



### PropertySignature b2bUserApprover is removed.



### PropertySignature b2bUserApprovers is removed.



### PropertySignature b2bUserPermission is removed.



### PropertySignature b2bUserPermissions is removed.



### PropertySignature b2bUsers is removed.



### PropertySignature b2bUserUserGroup is removed.



### PropertySignature b2bUserUserGroups is removed.



### PropertySignature budget is removed.



### PropertySignature budgets is removed.



### PropertySignature cancelOrder is removed.



### PropertySignature cancelReplenishmentOrder is removed.



### PropertySignature cancelReturn is removed.



### PropertySignature cart is removed.



### PropertySignature carts is removed.



### PropertySignature cartVoucher is removed.



### PropertySignature consignmentTracking is removed.



### PropertySignature costCenter is removed.



### PropertySignature costCenterBudget is removed.



### PropertySignature costCenterBudgets is removed.



### PropertySignature costCenters is removed.



### PropertySignature costCentersAll is removed.



### PropertySignature createCart is removed.



### PropertySignature deleteCart is removed.



### PropertySignature orderApproval is removed.



### PropertySignature orderApprovalDecision is removed.



### PropertySignature orderApprovalPermissionTypes is removed.



### PropertySignature orderApprovals is removed.



### PropertySignature orderDetail is removed.



### PropertySignature orderHistory is removed.



### PropertySignature orderReturnDetail is removed.



### PropertySignature orderReturns is removed.



### PropertySignature orgUnit is removed.



### PropertySignature orgUnitApprover is removed.



### PropertySignature orgUnitApprovers is removed.



### PropertySignature orgUnits is removed.



### PropertySignature orgUnitsAddress is removed.



### PropertySignature orgUnitsAddresses is removed.



### PropertySignature orgUnitsApprovalProcesses is removed.



### PropertySignature orgUnitsAvailable is removed.



### PropertySignature orgUnitsTree is removed.



### PropertySignature orgUnitUserRole is removed.



### PropertySignature orgUnitUserRoles is removed.



### PropertySignature orgUnitUsers is removed.



### PropertySignature permission is removed.



### PropertySignature permissions is removed.



### PropertySignature removeEntries is removed.



### PropertySignature replenishmentOrderDetails is removed.



### PropertySignature replenishmentOrderDetailsHistory is removed.



### PropertySignature replenishmentOrderHistory is removed.



### PropertySignature returnOrder is removed.



### PropertySignature saveCart is removed.



### PropertySignature scheduleReplenishmentOrder is removed.



### PropertySignature store is removed.



### PropertySignature stores is removed.



### PropertySignature storescounts is removed.



### PropertySignature updateEntries is removed.



### PropertySignature userGroup is removed.



### PropertySignature userGroupAvailableOrderApprovalPermissions is removed.



### PropertySignature userGroupAvailableOrgCustomers is removed.



### PropertySignature userGroupMember is removed.



### PropertySignature userGroupMembers is removed.



### PropertySignature userGroupOrderApprovalPermission is removed.



### PropertySignature userGroupOrderApprovalPermissions is removed.



### PropertySignature userGroups is removed.



### PropertySignature validate is removed.





# Class OccOrderNormalizer 
## @spartacus/core

moved to @spartacus/order/occ


### Constructor changed.


Previous version: 

```

constructor(
  converter: ConverterService,
  entryPromotionService: OrderEntryPromotionsService
)

```


Current version: 

```

constructor(
  converter: ConverterService
)

```




# Class OccReplenishmentOrderNormalizer 
## @spartacus/core

moved to @spartacus/order/occ


### Constructor changed.


Previous version: 

```

constructor(
  converter: ConverterService,
  entryPromotionService: OrderEntryPromotionsService
)

```


Current version: 

```

constructor(
  converter: ConverterService
)

```




# Class OccReturnRequestNormalizer 
## @spartacus/core

moved to @spartacus/order/occ




# Class OccUserOrderAdapter 
## @spartacus/core


Class OccUserOrderAdapter has been removed and is no longer part of the public API.




# Class OccUserReplenishmentOrderAdapter 
## @spartacus/core


Class OccUserReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Variable ORDER_HISTORY_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Variable ORDER_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Variable ORDER_RETURN_REQUEST_INPUT_SERIALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Variable ORDER_RETURN_REQUEST_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Variable ORDER_RETURNS_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Enum ORDER_TYPE 
## @spartacus/core

moved to @spartacus/order/root




# Interface Order 
## @spartacus/core

moved to @spartacus/order/root




# Interface OrderEntry 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class OrderEntryPromotionsService 
## @spartacus/core


Class OrderEntryPromotionsService has been removed and is no longer part of the public API.




# Interface OrderHistory 
## @spartacus/core

moved to @spartacus/order/root




# Interface OrderHistoryList 
## @spartacus/core

moved to @spartacus/order/root




# Class OrderOccModule 
## @spartacus/core

moved to @spartacus/order/occ




# Class OrderReturnRequestService 
## @spartacus/core

moved to @spartacus/order/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrder>,
  processStateStore: Store<StateWithProcess<void>>,
  userIdService: UserIdService
)

```


### Method getOrderReturnRequestList changed.


Previous version: 

```

getOrderReturnRequestList(
  pageSize: number
): Observable<ReturnRequestList>

```


Current version: 

```

getOrderReturnRequestList(
  pageSize: number
): Observable<ReturnRequestList | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithUser | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrder>
```




# Interface PaymentType 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface PickupOrderEntryGroup 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class ProductActions.GetProductSuggestions 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        term: string;
        searchConfig: SearchConfig;
    }
)

```


Current version: 

```

constructor(
  payload: {
        term: string;
        searchConfig?: SearchConfig;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        term: string;
        searchConfig: SearchConfig;
    }
```


Current version: 

```
payload: {
        term: string;
        searchConfig?: SearchConfig;
    }
```




# Class ProductActions.GetProductSuggestionsFail 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: ErrorModel
)

```


Current version: 

```

constructor(
  payload: ErrorModel | undefined
)

```


### Property payload changed.


Previous version: 

```
payload: ErrorModel
```


Current version: 

```
payload: ErrorModel | undefined
```




# Class ProductActions.SearchProducts 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        queryText: string;
        searchConfig: SearchConfig;
    },
  auxiliary: boolean
)

```


Current version: 

```

constructor(
  payload: {
        queryText: string;
        searchConfig?: SearchConfig;
    },
  auxiliary: boolean | undefined
)

```


### Property auxiliary changed.


Previous version: 

```
auxiliary: boolean
```


Current version: 

```
auxiliary: boolean | undefined
```


### Property payload changed.


Previous version: 

```
payload: {
        queryText: string;
        searchConfig: SearchConfig;
    }
```


Current version: 

```
payload: {
        queryText: string;
        searchConfig?: SearchConfig;
    }
```




# Class ProductActions.SearchProductsFail 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: ErrorModel,
  auxiliary: boolean
)

```


Current version: 

```

constructor(
  payload: ErrorModel | undefined,
  auxiliary: boolean | undefined
)

```


### Property auxiliary changed.


Previous version: 

```
auxiliary: boolean
```


Current version: 

```
auxiliary: boolean | undefined
```


### Property payload changed.


Previous version: 

```
payload: ErrorModel
```


Current version: 

```
payload: ErrorModel | undefined
```




# Class ProductActions.SearchProductsSuccess 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: ProductSearchPage,
  auxiliary: boolean
)

```


Current version: 

```

constructor(
  payload: ProductSearchPage,
  auxiliary: boolean | undefined
)

```


### Property auxiliary changed.


Previous version: 

```
auxiliary: boolean
```


Current version: 

```
auxiliary: boolean | undefined
```




# Class ProductEventBuilder 
## @spartacus/core


### Method buildFacetChangedEvent changed.


Previous version: 

```

buildFacetChangedEvent(): Observable<FacetChangedEvent>

```


Current version: 

```

buildFacetChangedEvent(): Observable<FacetChangedEvent | undefined>

```




# Class ProductSearchService 
## @spartacus/core


### Method search changed.


Previous version: 

```

search(
  query: string,
  searchConfig: SearchConfig
): void

```


Current version: 

```

search(
  query: string | undefined,
  searchConfig: SearchConfig
): void

```




# Variable ProductSelectors.getProductState 
## @spartacus/core


Variable getProductState changed.

Previous version: 

```
getProductState: MemoizedSelector<StateWithProduct, StateUtils.EntityLoaderState<Product>>
```


Current version: 

```
getProductState: MemoizedSelector<StateWithProduct, EntityScopedLoaderState<Product>>
```




# Variable ProductSelectors.getSelectedProductReviewsFactory 
## @spartacus/core


Variable getSelectedProductReviewsFactory changed.

Previous version: 

```
getSelectedProductReviewsFactory: (productCode: any) => MemoizedSelector<StateWithProduct, Review[]>
```


Current version: 

```
getSelectedProductReviewsFactory: (productCode: string) => MemoizedSelector<StateWithProduct, Review[] | undefined>
```




# Class ProductService 
## @spartacus/core


### Method get changed.


Previous version: 

```

get(
  productCode: string,
  scopes: (ProductScope | string)[] | ProductScope | string
): Observable<Product>

```


Current version: 

```

get(
  productCode: string,
  scopes: (ProductScope | string)[] | ProductScope | string
): Observable<Product | undefined>

```




# Enum PromotionLocation 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface PromotionOrderEntryConsumed 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface PromotionResult 
## @spartacus/core

moved to @spartacus/cart/base/root




# Function provideConfigFactory 
## @spartacus/core


Function provideConfigFactory changed.

Previous version: 

```

provideConfigFactory(
  configFactory: Function,
  deps: any[],
  defaultConfig: boolean
): FactoryProvider

```


Current version: 

```

provideConfigFactory(
  configFactory: ConfigFactory,
  deps: any[],
  defaultConfig: boolean
): FactoryProvider

```




# Function provideDefaultConfigFactory 
## @spartacus/core


Function provideDefaultConfigFactory changed.

Previous version: 

```

provideDefaultConfigFactory(
  configFactory: Function,
  deps: any[]
): FactoryProvider

```


Current version: 

```

provideDefaultConfigFactory(
  configFactory: ConfigFactory,
  deps: any[]
): FactoryProvider

```




# Interface Query 
## @spartacus/core


### MethodSignature get changed.


Previous version: 

```

get(
  params: P
): Observable<T | undefined>

```


Current version: 

```

get(
  params: PARAMS
): Observable<RESULT | undefined>

```


### MethodSignature getState changed.


Previous version: 

```

getState(
  params: P
): Observable<QueryState<T>>

```


Current version: 

```

getState(
  params: PARAMS
): Observable<QueryState<RESULT>>

```




# Variable recurrencePeriod 
## @spartacus/core

moved to @spartacus/order/root




# Interface RegionsState 
## @spartacus/core


### PropertySignature country changed.


Previous version: 

```
country: string
```


Current version: 

```
country: string | null
```




# Variable REPLENISHMENT_ORDER_HISTORY_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Variable REPLENISHMENT_ORDER_NORMALIZER 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReplenishmentOrder 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReplenishmentOrderList 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReturnRequest 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReturnRequestEntry 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReturnRequestEntryInputList 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReturnRequestList 
## @spartacus/core

moved to @spartacus/order/root




# Interface ReturnRequestModification 
## @spartacus/core

moved to @spartacus/order/root




# Class RoutingConfigService 
## @spartacus/core


### Method getRouteConfig changed.


Previous version: 

```

getRouteConfig(
  routeName: string
): RouteConfig

```


Current version: 

```

getRouteConfig(
  routeName: string
): RouteConfig | undefined

```




# Class RoutingPageMetaResolver 
## @spartacus/core


### Method getPageMetaConfig changed.


Previous version: 

```

getPageMetaConfig(
  route: ActivatedRouteSnapshotWithPageMeta
): RoutePageMetaConfig

```


Current version: 

```

getPageMetaConfig(
  route: ActivatedRouteSnapshotWithPageMeta
): RoutePageMetaConfig | undefined

```




# Variable RoutingSelector.getNextPageContext 
## @spartacus/core


Variable getNextPageContext changed.

Previous version: 

```
getNextPageContext: MemoizedSelector<any, PageContext>
```


Current version: 

```
getNextPageContext: MemoizedSelector<any, PageContext | undefined>
```




# Class RoutingService 
## @spartacus/core


### Method getNextPageContext changed.


Previous version: 

```

getNextPageContext(): Observable<PageContext>

```


Current version: 

```

getNextPageContext(): Observable<PageContext | undefined>

```




# Variable SAVE_CART_NORMALIZER 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class SaveCartAdapter 
## @spartacus/core


Class SaveCartAdapter has been removed and is no longer part of the public API.




# Class SaveCartConnector 
## @spartacus/core


Class SaveCartConnector has been removed and is no longer part of the public API.




# Interface SaveCartResult 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface ScheduleReplenishmentForm 
## @spartacus/core

moved to @spartacus/order/root




# Class SelectiveCartService 
## @spartacus/core

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart>,
  userService: UserService,
  multiCartService: MultiCartService,
  baseSiteService: BaseSiteService,
  cartConfigService: CartConfigService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  userProfileFacade: UserProfileFacade,
  multiCartFacade: MultiCartFacade,
  baseSiteService: BaseSiteService,
  userIdService: UserIdService
)

```


### Property cartConfigService is removed.



### Property cartId is removed.



### Property cartId$ is removed.



### Property cartSelector$ is removed.



### Property customerId is removed.



### Method getEntry changed.


Previous version: 

```

getEntry(
  productCode: string
): Observable<OrderEntry>

```


Current version: 

```

getEntry(
  productCode: string
): Observable<OrderEntry | undefined>

```


### Method isEmpty is removed.



### Method isEnabled is removed.



### Method isJustLoggedIn is removed.



### Method isLoggedIn is removed.



### Method load is removed.



### Property multiCartService is removed.



### Property PREVIOUS_USER_ID_INITIAL_VALUE is removed.



### Property previousUserId is removed.



### Property store is removed.



### Property userId is removed.



### Property userService is removed.





# Class SemanticPathService 
## @spartacus/core


### Method get changed.


Previous version: 

```

get(
  routeName: string
): string

```


Current version: 

```

get(
  routeName: string
): string | undefined

```




# Class SiteConnector 
## @spartacus/core


### Method getBaseSite changed.


Previous version: 

```

getBaseSite(
  siteUid: string
): Observable<BaseSite>

```


Current version: 

```

getBaseSite(
  siteUid: string
): Observable<BaseSite | undefined>

```




# Interface SiteContext 
## @spartacus/core


### MethodSignature setActive changed.


Previous version: 

```

setActive(
  isocode: string
): any

```


Current version: 

```

setActive(
  isocode: string
): void

```




# Class SiteContextActions.CurrencyChange 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        previous: string;
        current: string;
    }
)

```


Current version: 

```

constructor(
  payload: {
        previous: string | null;
        current: string | null;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        previous: string;
        current: string;
    }
```


Current version: 

```
payload: {
        previous: string | null;
        current: string | null;
    }
```




# Class SiteContextActions.LanguageChange 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        previous: string;
        current: string;
    }
)

```


Current version: 

```

constructor(
  payload: {
        previous: string | null;
        current: string | null;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        previous: string;
        current: string;
    }
```


Current version: 

```
payload: {
        previous: string | null;
        current: string | null;
    }
```




# Class SiteContextInterceptor 
## @spartacus/core


### Property activeCurr changed.


Previous version: 

```
activeCurr: string
```


Current version: 

```
activeCurr: string | undefined
```


### Property activeLang changed.


Previous version: 

```
activeLang: string
```


Current version: 

```
activeLang: string | undefined
```




# Class SiteContextParamsService 
## @spartacus/core


### Method getParamDefaultValue changed.


Previous version: 

```

getParamDefaultValue(
  param: string
): string

```


Current version: 

```

getParamDefaultValue(
  param: string
): string | undefined

```


### Method getValue changed.


Previous version: 

```

getValue(
  param: string
): string

```


Current version: 

```

getValue(
  param: string
): string | undefined

```




# Variable SiteContextSelectors.getActiveCurrency 
## @spartacus/core


Variable getActiveCurrency changed.

Previous version: 

```
getActiveCurrency: MemoizedSelector<StateWithSiteContext, string>
```


Current version: 

```
getActiveCurrency: MemoizedSelector<StateWithSiteContext, string | null>
```




# Variable SiteContextSelectors.getActiveLanguage 
## @spartacus/core


Variable getActiveLanguage changed.

Previous version: 

```
getActiveLanguage: MemoizedSelector<StateWithSiteContext, string>
```


Current version: 

```
getActiveLanguage: MemoizedSelector<StateWithSiteContext, string | null>
```




# Variable SiteContextSelectors.getAllBaseSites 
## @spartacus/core


Variable getAllBaseSites changed.

Previous version: 

```
getAllBaseSites: MemoizedSelector<StateWithSiteContext, BaseSite[]>
```


Current version: 

```
getAllBaseSites: MemoizedSelector<StateWithSiteContext, BaseSite[] | null>
```




# Variable SiteContextSelectors.getAllCurrencies 
## @spartacus/core


Variable getAllCurrencies changed.

Previous version: 

```
getAllCurrencies: MemoizedSelector<StateWithSiteContext, Currency[]>
```


Current version: 

```
getAllCurrencies: MemoizedSelector<StateWithSiteContext, Currency[] | null>
```




# Variable SiteContextSelectors.getAllLanguages 
## @spartacus/core


Variable getAllLanguages changed.

Previous version: 

```
getAllLanguages: MemoizedSelector<StateWithSiteContext, Language[]>
```


Current version: 

```
getAllLanguages: MemoizedSelector<StateWithSiteContext, Language[] | null>
```




# Variable SiteContextSelectors.getBaseSitesEntities 
## @spartacus/core


Variable getBaseSitesEntities changed.

Previous version: 

```
getBaseSitesEntities: MemoizedSelector<StateWithSiteContext, BaseSiteEntities>
```


Current version: 

```
getBaseSitesEntities: MemoizedSelector<StateWithSiteContext, BaseSiteEntities | null>
```




# Variable SiteContextSelectors.getCurrenciesEntities 
## @spartacus/core


Variable getCurrenciesEntities changed.

Previous version: 

```
getCurrenciesEntities: MemoizedSelector<StateWithSiteContext, CurrencyEntities>
```


Current version: 

```
getCurrenciesEntities: MemoizedSelector<StateWithSiteContext, CurrencyEntities | null>
```




# Variable SiteContextSelectors.getLanguagesEntities 
## @spartacus/core


Variable getLanguagesEntities changed.

Previous version: 

```
getLanguagesEntities: MemoizedSelector<StateWithSiteContext, LanguagesEntities>
```


Current version: 

```
getLanguagesEntities: MemoizedSelector<StateWithSiteContext, LanguagesEntities | null>
```




# Class StateUtils.EntityFailAction 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  entityType: string,
  id: string | string[],
  error: any
)

```


Current version: 

```

constructor(
  entityType: string,
  id: string | string[] | null,
  error: any
)

```




# Function StateUtils.entityFailMeta 
## @spartacus/core


Function entityFailMeta changed.

Previous version: 

```

entityFailMeta(
  entityType: string,
  id: string | string[],
  error: any
): EntityLoaderMeta

```


Current version: 

```

entityFailMeta(
  entityType: string,
  id: string | string[] | null,
  error: any
): EntityLoaderMeta

```




# Class StateUtils.EntityLoadAction 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  entityType: string,
  id: string | string[]
)

```


Current version: 

```

constructor(
  entityType: string,
  id: string | string[] | null
)

```




# Function StateUtils.entityLoaderReducer 
## @spartacus/core


Function entityLoaderReducer changed.

Previous version: 

```

entityLoaderReducer(
  entityType: string,
  reducer: (state: T, action: LoaderAction) => T
): (state: EntityLoaderState<T>, action: EntityLoaderAction) => EntityLoaderState<T>

```


Current version: 

```

entityLoaderReducer(
  entityType: string,
  reducer: (state: T | undefined, action: V | LoaderAction) => T | undefined
): (state: EntityLoaderState<T> | undefined, action: EntityLoaderAction) => EntityLoaderState<T>

```




# Class StateUtils.EntityLoaderResetAction 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  entityType: string,
  id: string | string[]
)

```


Current version: 

```

constructor(
  entityType: string,
  id: string | string[] | null
)

```




# Function StateUtils.entityLoadMeta 
## @spartacus/core


Function entityLoadMeta changed.

Previous version: 

```

entityLoadMeta(
  entityType: string,
  id: string | string[]
): EntityLoaderMeta

```


Current version: 

```

entityLoadMeta(
  entityType: string,
  id: string | string[] | null
): EntityLoaderMeta

```




# Function StateUtils.entityMeta 
## @spartacus/core


Function entityMeta changed.

Previous version: 

```

entityMeta(
  type: string,
  id: string | string[]
): EntityMeta

```


Current version: 

```

entityMeta(
  type: string,
  id: string | string[] | null
): EntityMeta

```




# Interface StateUtils.EntityMeta 
## @spartacus/core


### PropertySignature entityId changed.


Previous version: 

```
entityId: string | string[]
```


Current version: 

```
entityId: string | string[] | null
```




# Function StateUtils.entityProcessesLoaderReducer 
## @spartacus/core


Function entityProcessesLoaderReducer changed.

Previous version: 

```

entityProcessesLoaderReducer(
  entityType: string,
  reducer: (state: T, action: ProcessesLoaderAction) => T
): (state: EntityProcessesLoaderState<T>, action: EntityProcessesLoaderAction) => EntityProcessesLoaderState<T>

```


Current version: 

```

entityProcessesLoaderReducer(
  entityType: string,
  reducer: (state: T | undefined, action: ProcessesLoaderAction) => T
): (state: EntityProcessesLoaderState<T> | undefined, action: EntityProcessesLoaderAction) => EntityProcessesLoaderState<T>

```




# Function StateUtils.entityReducer 
## @spartacus/core


Function entityReducer changed.

Previous version: 

```

entityReducer(
  entityType: string,
  reducer: (state: T, action: Action) => T
): (state: EntityState<T>, action: EntityAction) => EntityState<T>

```


Current version: 

```

entityReducer(
  entityType: string,
  reducer: (state: T, action: Action | V) => T
): (state: EntityState<T> | undefined, action: EntityAction) => EntityState<T>

```




# Class StateUtils.EntityRemoveAction 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  entityType: string,
  id: string | string[]
)

```


Current version: 

```

constructor(
  entityType: string,
  id: string | string[] | null
)

```




# Function StateUtils.entityRemoveMeta 
## @spartacus/core


Function entityRemoveMeta changed.

Previous version: 

```

entityRemoveMeta(
  type: string,
  id: string | string[]
): EntityMeta

```


Current version: 

```

entityRemoveMeta(
  type: string,
  id: string | string[] | null
): EntityMeta

```




# Function StateUtils.entityResetMeta 
## @spartacus/core


Function entityResetMeta changed.

Previous version: 

```

entityResetMeta(
  entityType: string,
  id: string | string[]
): EntityLoaderMeta

```


Current version: 

```

entityResetMeta(
  entityType: string,
  id: string | string[] | null
): EntityLoaderMeta

```




# Function StateUtils.entitySelector 
## @spartacus/core


Function entitySelector changed.

Previous version: 

```

entitySelector(
  state: EntityState<T>,
  id: string
): T

```


Current version: 

```

entitySelector(
  state: EntityState<T>,
  id: string
): T | undefined

```




# Class StateUtils.EntitySuccessAction 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  entityType: string,
  id: string | string[],
  payload: any
)

```


Current version: 

```

constructor(
  entityType: string,
  id: string | string[] | null,
  payload: any
)

```




# Function StateUtils.entitySuccessMeta 
## @spartacus/core


Function entitySuccessMeta changed.

Previous version: 

```

entitySuccessMeta(
  entityType: string,
  id: string | string[]
): EntityLoaderMeta

```


Current version: 

```

entitySuccessMeta(
  entityType: string,
  id: string | string[] | null
): EntityLoaderMeta

```




# Interface StateUtils.LoaderMeta 
## @spartacus/core


### PropertySignature loader changed.


Previous version: 

```
loader: {
        load?: boolean;
        error?: any;
        success?: boolean;
    }
```


Current version: 

```
loader: {
        load?: boolean;
        error?: any;
        success?: boolean;
    } | undefined
```




# Function StateUtils.loaderReducer 
## @spartacus/core


Function loaderReducer changed.

Previous version: 

```

loaderReducer(
  entityType: string,
  reducer: (state: T, action: Action | V) => T
): (state: LoaderState<T> | undefined, action: LoaderAction) => LoaderState<T>

```


Current version: 

```

loaderReducer(
  entityType: string,
  reducer: (state: T | undefined, action: Action | V) => T | undefined
): (state: LoaderState<T> | undefined, action: LoaderAction) => LoaderState<T>

```




# Interface StateUtils.ProcessesLoaderMeta 
## @spartacus/core


### PropertySignature processesCountDiff changed.


Previous version: 

```
processesCountDiff: number
```


Current version: 

```
processesCountDiff: number | null
```




# Function StateUtils.processesLoaderReducer 
## @spartacus/core


Function processesLoaderReducer changed.

Previous version: 

```

processesLoaderReducer(
  entityType: string,
  reducer: (state: T, action: Action) => T
): (state: ProcessesLoaderState<T>, action: ProcessesLoaderAction) => ProcessesLoaderState<T>

```


Current version: 

```

processesLoaderReducer(
  entityType: string,
  reducer: (state: T | undefined, action: Action) => T
): (state: ProcessesLoaderState<T>, action: ProcessesLoaderAction) => ProcessesLoaderState<T>

```




# Interface StateWithMultiCart 
## @spartacus/core

moved to @spartacus/cart/base/core




# Interface Trigger 
## @spartacus/core

moved to @spartacus/order/root




# Class UpdateUserAddressEvent 
## @spartacus/core


### Property userId is removed.





# Variable USER_ORDER_DETAILS 
## @spartacus/core


Variable USER_ORDER_DETAILS has been removed and is no longer part of the public API.




# Variable USER_ORDERS 
## @spartacus/core


Variable USER_ORDERS has been removed and is no longer part of the public API.




# Variable USER_REPLENISHMENT_ORDER_DETAILS 
## @spartacus/core


Variable USER_REPLENISHMENT_ORDER_DETAILS has been removed and is no longer part of the public API.




# Variable USER_REPLENISHMENT_ORDERS 
## @spartacus/core


Variable USER_REPLENISHMENT_ORDERS has been removed and is no longer part of the public API.




# Variable USER_RETURN_REQUEST_DETAILS 
## @spartacus/core


Variable USER_RETURN_REQUEST_DETAILS has been removed and is no longer part of the public API.




# Variable USER_RETURN_REQUESTS 
## @spartacus/core


Variable USER_RETURN_REQUESTS has been removed and is no longer part of the public API.




# Class UserAccountFacadeTransitionalToken 
## @spartacus/core


Class UserAccountFacadeTransitionalToken has been removed and is no longer part of the public API.




# Variable UserActions.CANCEL_ORDER_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_ORDER_RETURN_REQUEST_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_ORDER_RETURN_REQUEST_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_ORDER_RETURN_REQUEST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_ORDER_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_ORDER 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_REPLENISHMENT_ORDER_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CANCEL_REPLENISHMENT_ORDER 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrder 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrderFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrderReturnRequest 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrderReturnRequestFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrderReturnRequestSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelOrderSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelReplenishmentOrder 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelReplenishmentOrderFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CancelReplenishmentOrderSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClaimCustomerCoupon 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        userId: string;
        couponCode: any;
    }
)

```


Current version: 

```

constructor(
  payload: {
        userId: string;
        couponCode: string;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        userId: string;
        couponCode: any;
    }
```


Current version: 

```
payload: {
        userId: string;
        couponCode: string;
    }
```




# Variable UserActions.CLEAR_CANCEL_REPLENISHMENT_ORDER 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_CONSIGNMENT_TRACKING 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_ORDER_DETAILS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_ORDER_RETURN_REQUEST_LIST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_ORDER_RETURN_REQUEST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.ClEAR_REPLENISHMENT_ORDER_DETAILS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_USER_ORDERS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CLEAR_USER_REPLENISHMENT_ORDERS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearCancelReplenishmentOrder 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearConsignmentTracking 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearOrderDetails 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearOrderReturnRequest 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearOrderReturnRequestList 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearReplenishmentOrderDetails 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearUserOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ClearUserReplenishmentOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.ConsignmentTrackingAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CREATE_ORDER_RETURN_REQUEST_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CREATE_ORDER_RETURN_REQUEST_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.CREATE_ORDER_RETURN_REQUEST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CreateOrderReturnRequest 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CreateOrderReturnRequestFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.CreateOrderReturnRequestSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.GiveUserConsent 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        userId: string;
        consentTemplateId: string;
        consentTemplateVersion: number;
    }
)

```


Current version: 

```

constructor(
  payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        userId: string;
        consentTemplateId: string;
        consentTemplateVersion: number;
    }
```


Current version: 

```
payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    }
```




# Variable UserActions.LOAD_CONSIGNMENT_TRACKING_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_CONSIGNMENT_TRACKING_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_CONSIGNMENT_TRACKING 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_DETAILS_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_DETAILS_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_DETAILS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST_LIST_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST_LIST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_ORDER_RETURN_REQUEST 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_REPLENISHMENT_ORDER_DETAILS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_ORDERS_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_ORDERS_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_ORDERS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_REPLENISHMENT_ORDERS_FAIL 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.LOAD_USER_REPLENISHMENT_ORDERS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadConsignmentTracking 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadConsignmentTrackingFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadConsignmentTrackingSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderDetails 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderDetailsFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderDetailsSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequest 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequestFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequestList 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequestListFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequestListSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadOrderReturnRequestSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadReplenishmentOrderDetails 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadReplenishmentOrderDetailsFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadReplenishmentOrderDetailsSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserOrdersFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserOrdersSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserReplenishmentOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserReplenishmentOrdersFail 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.LoadUserReplenishmentOrdersSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.OrderDetailsAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.OrderReturnRequestAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.ReplenishmentOrderDetailsAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.RESET_CANCEL_ORDER_PROCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Variable UserActions.RESET_CANCEL_RETURN_PROCESS 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ResetCancelOrderProcess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.ResetCancelReturnProcess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserActions.TransferAnonymousConsent 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  payload: {
        userId: string;
        consentTemplateId: string;
        consentTemplateVersion: number;
    }
)

```


Current version: 

```

constructor(
  payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    }
)

```


### Property payload changed.


Previous version: 

```
payload: {
        userId: string;
        consentTemplateId: string;
        consentTemplateVersion: number;
    }
```


Current version: 

```
payload: {
        userId: string;
        consentTemplateId: string | undefined;
        consentTemplateVersion: number | undefined;
    }
```




# TypeAlias UserActions.UserOrdersAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.UserReplenishmentOrdersAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# Class UserAddressService 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService,
  userAddressConnector: UserAddressConnector,
  command: CommandService
)

```


Current version: 

```

constructor(
  store: Store<StateWithUser>,
  userIdService: UserIdService,
  userAddressConnector: UserAddressConnector,
  command: CommandService
)

```


### Method getCountry changed.


Previous version: 

```

getCountry(
  isocode: string
): Observable<Country>

```


Current version: 

```

getCountry(
  isocode: string
): Observable<Country | null>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithUser | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithUser>
```




# Class UserConsentService 
## @spartacus/core


### Method getConsent changed.


Previous version: 

```

getConsent(
  templateId: string
): Observable<Consent>

```


Current version: 

```

getConsent(
  templateId: string
): Observable<Consent | undefined>

```


### Method isConsentWithdrawn changed.


Previous version: 

```

isConsentWithdrawn(
  consent: Consent
): boolean

```


Current version: 

```

isConsentWithdrawn(
  consent: Consent | undefined
): boolean

```




# Class UserCostCenterService 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithUser>,
  userIdService: UserIdService
)

```


### Property store changed.


Previous version: 

```
store: Store<StateWithUser | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithUser>
```




# Class UserOccTransitional_4_2_Module 
## @spartacus/core


Class UserOccTransitional_4_2_Module has been removed and is no longer part of the public API.




# Class UserOccTransitionalModule 
## @spartacus/core


Class UserOccTransitionalModule has been removed and is no longer part of the public API.




# Class UserOrderAdapter 
## @spartacus/core


Class UserOrderAdapter has been removed and is no longer part of the public API.




# Class UserOrderConnector 
## @spartacus/core


Class UserOrderConnector has been removed and is no longer part of the public API.




# Class UserOrderService 
## @spartacus/core


Class UserOrderService has been removed and is no longer part of the public API.




# Class UserPaymentService 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithUser>,
  userIdService: UserIdService
)

```


### Property store changed.


Previous version: 

```
store: Store<StateWithUser | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithUser>
```




# Class UserReplenishmentOrderAdapter 
## @spartacus/core


Class UserReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class UserReplenishmentOrderConnector 
## @spartacus/core


Class UserReplenishmentOrderConnector has been removed and is no longer part of the public API.




# Class UserReplenishmentOrderService 
## @spartacus/core


Class UserReplenishmentOrderService has been removed and is no longer part of the public API.




# Class UserService 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService,
  userAccountFacade: UserAccountFacadeTransitionalToken,
  userProfileFacade: UserProfileFacadeTransitionalToken
)

```


Current version: 

```

constructor(
  store: Store<StateWithUser | StateWithProcess<void>>,
  userIdService: UserIdService,
  userProfileFacade: UserProfileFacadeTransitionalToken | undefined
)

```


### Method get is removed.



### Property userAccountFacade is removed.



### Property userProfileFacade changed.


Previous version: 

```
userProfileFacade: UserProfileFacadeTransitionalToken
```


Current version: 

```
userProfileFacade: UserProfileFacadeTransitionalToken | undefined
```




# Variable UsersSelectors.countrySelectorFactory 
## @spartacus/core


Variable countrySelectorFactory changed.

Previous version: 

```
countrySelectorFactory: (isocode: string) => MemoizedSelector<StateWithUser, Country>
```


Current version: 

```
countrySelectorFactory: (isocode: string) => MemoizedSelector<StateWithUser, Country | null>
```




# Variable UsersSelectors.getConsentByTemplateId 
## @spartacus/core


Variable getConsentByTemplateId changed.

Previous version: 

```
getConsentByTemplateId: (templateId: string) => MemoizedSelector<StateWithUser, ConsentTemplate>
```


Current version: 

```
getConsentByTemplateId: (templateId: string) => MemoizedSelector<StateWithUser, ConsentTemplate | undefined>
```




# Variable UsersSelectors.getConsignmentTracking 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getConsignmentTracking changed.

Previous version: 

```
getConsignmentTracking: MemoizedSelector<StateWithUser, ConsignmentTracking>
```


Current version: 

```
getConsignmentTracking: MemoizedSelector<StateWithOrder, ConsignmentTracking>
```




# Variable UsersSelectors.getConsignmentTrackingState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getConsignmentTrackingState changed.

Previous version: 

```
getConsignmentTrackingState: MemoizedSelector<StateWithUser, ConsignmentTrackingState>
```


Current version: 

```
getConsignmentTrackingState: MemoizedSelector<StateWithOrder, ConsignmentTrackingState>
```




# Variable UsersSelectors.getOrderDetails 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderDetails changed.

Previous version: 

```
getOrderDetails: MemoizedSelector<StateWithUser, Order>
```


Current version: 

```
getOrderDetails: MemoizedSelector<StateWithOrder, Order>
```




# Variable UsersSelectors.getOrderReturnRequest 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequest changed.

Previous version: 

```
getOrderReturnRequest: MemoizedSelector<StateWithUser, ReturnRequest>
```


Current version: 

```
getOrderReturnRequest: MemoizedSelector<StateWithOrder, ReturnRequest>
```




# Variable UsersSelectors.getOrderReturnRequestList 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequestList changed.

Previous version: 

```
getOrderReturnRequestList: MemoizedSelector<StateWithUser, ReturnRequestList>
```


Current version: 

```
getOrderReturnRequestList: MemoizedSelector<StateWithOrder, ReturnRequestList>
```




# Variable UsersSelectors.getOrderReturnRequestListState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequestListState changed.

Previous version: 

```
getOrderReturnRequestListState: MemoizedSelector<StateWithUser, LoaderState<ReturnRequestList>>
```


Current version: 

```
getOrderReturnRequestListState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<ReturnRequestList>>
```




# Variable UsersSelectors.getOrderReturnRequestLoading 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequestLoading changed.

Previous version: 

```
getOrderReturnRequestLoading: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getOrderReturnRequestLoading: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getOrderReturnRequestState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequestState changed.

Previous version: 

```
getOrderReturnRequestState: MemoizedSelector<StateWithUser, LoaderState<ReturnRequest>>
```


Current version: 

```
getOrderReturnRequestState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<ReturnRequest>>
```




# Variable UsersSelectors.getOrderReturnRequestSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderReturnRequestSuccess changed.

Previous version: 

```
getOrderReturnRequestSuccess: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getOrderReturnRequestSuccess: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrders changed.

Previous version: 

```
getOrders: MemoizedSelector<StateWithUser, OrderHistoryList>
```


Current version: 

```
getOrders: MemoizedSelector<StateWithOrder, OrderHistoryList>
```




# Variable UsersSelectors.getOrdersLoaded 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrdersLoaded changed.

Previous version: 

```
getOrdersLoaded: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getOrdersLoaded: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getOrdersState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrdersState changed.

Previous version: 

```
getOrdersState: MemoizedSelector<StateWithUser, LoaderState<OrderHistoryList>>
```


Current version: 

```
getOrdersState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<OrderHistoryList>>
```




# Variable UsersSelectors.getOrderState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getOrderState changed.

Previous version: 

```
getOrderState: MemoizedSelector<StateWithUser, LoaderState<Order>>
```


Current version: 

```
getOrderState: MemoizedSelector<StateWithOrder, OrderState>
```




# Variable UsersSelectors.getRegionsCountry 
## @spartacus/core


Variable getRegionsCountry changed.

Previous version: 

```
getRegionsCountry: MemoizedSelector<StateWithUser, string>
```


Current version: 

```
getRegionsCountry: MemoizedSelector<StateWithUser, string | null>
```




# Variable UsersSelectors.getRegionsDataAndLoading 
## @spartacus/core


Variable getRegionsDataAndLoading changed.

Previous version: 

```
getRegionsDataAndLoading: MemoizedSelector<StateWithUser, {
    loaded: boolean;
    loading: boolean;
    regions: Region[];
    country: string;
}>
```


Current version: 

```
getRegionsDataAndLoading: MemoizedSelector<StateWithUser, {
    loaded: boolean;
    loading: boolean;
    regions: Region[];
    country: string | null;
}>
```




# Variable UsersSelectors.getReplenishmentOrderDetailsError 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrderDetailsError changed.

Previous version: 

```
getReplenishmentOrderDetailsError: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrderDetailsError: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrderDetailsLoading 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrderDetailsLoading changed.

Previous version: 

```
getReplenishmentOrderDetailsLoading: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrderDetailsLoading: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrderDetailsSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrderDetailsSuccess changed.

Previous version: 

```
getReplenishmentOrderDetailsSuccess: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrderDetailsSuccess: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrderDetailsValue 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrderDetailsValue changed.

Previous version: 

```
getReplenishmentOrderDetailsValue: MemoizedSelector<StateWithUser, ReplenishmentOrder>
```


Current version: 

```
getReplenishmentOrderDetailsValue: MemoizedSelector<StateWithOrder, ReplenishmentOrder>
```




# Variable UsersSelectors.getReplenishmentOrders 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrders changed.

Previous version: 

```
getReplenishmentOrders: MemoizedSelector<StateWithUser, ReplenishmentOrderList>
```


Current version: 

```
getReplenishmentOrders: MemoizedSelector<StateWithOrder, ReplenishmentOrderList>
```




# Variable UsersSelectors.getReplenishmentOrdersError 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrdersError changed.

Previous version: 

```
getReplenishmentOrdersError: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrdersError: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrdersLoading 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrdersLoading changed.

Previous version: 

```
getReplenishmentOrdersLoading: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrdersLoading: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrdersState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrdersState changed.

Previous version: 

```
getReplenishmentOrdersState: MemoizedSelector<StateWithUser, LoaderState<ReplenishmentOrderList>>
```


Current version: 

```
getReplenishmentOrdersState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<ReplenishmentOrderList>>
```




# Variable UsersSelectors.getReplenishmentOrdersSuccess 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrdersSuccess changed.

Previous version: 

```
getReplenishmentOrdersSuccess: MemoizedSelector<StateWithUser, boolean>
```


Current version: 

```
getReplenishmentOrdersSuccess: MemoizedSelector<StateWithOrder, boolean>
```




# Variable UsersSelectors.getReplenishmentOrderState 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderSelectors


Variable getReplenishmentOrderState changed.

Previous version: 

```
getReplenishmentOrderState: MemoizedSelector<StateWithUser, LoaderState<ReplenishmentOrder>>
```


Current version: 

```
getReplenishmentOrderState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<ReplenishmentOrder>>
```




# Interface UserState 
## @spartacus/core


### PropertySignature consignmentTracking is removed.



### PropertySignature order is removed.



### PropertySignature orderReturn is removed.



### PropertySignature orderReturnList is removed.



### PropertySignature orders is removed.



### PropertySignature replenishmentOrder is removed.



### PropertySignature replenishmentOrders is removed.





# Class UserTransitional_4_2_Module 
## @spartacus/core


Class UserTransitional_4_2_Module has been removed and is no longer part of the public API.




# Class UserTransitionalModule 
## @spartacus/core


Class UserTransitionalModule has been removed and is no longer part of the public API.




# Interface Voucher 
## @spartacus/core

moved to @spartacus/cart/base/root




# Class WindowRef 
## @spartacus/core


### Constructor changed.


Previous version: 

```

constructor(
  document: any,
  platformId: Object,
  serverUrl: string,
  serverOrigin: string
)

```


Current version: 

```

constructor(
  document: any,
  platformId: Object,
  serverUrl: string | undefined,
  serverOrigin: string | undefined
)

```


### Property serverOrigin changed.


Previous version: 

```
serverOrigin: string
```


Current version: 

```
serverOrigin: string | undefined
```


### Property serverUrl changed.


Previous version: 

```
serverUrl: string
```


Current version: 

```
serverUrl: string | undefined
```




# Class WishListService 
## @spartacus/core

moved to @spartacus/cart/wish-list/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart>,
  userService: UserService,
  multiCartService: MultiCartService,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithMultiCart>,
  userAccountFacade: UserAccountFacade,
  multiCartFacade: MultiCartFacade,
  userIdService: UserIdService
)

```


### Property multiCartService is removed.



### Property userService is removed.





# Variable dpTranslationChunksConfig 
## @spartacus/digital-payments

moved to @spartacus/digital-payments/assets




# Variable dpTranslations 
## @spartacus/digital-payments

moved to @spartacus/digital-payments/assets




# Class IncubatorCoreModule 
## @spartacus/incubator


Class IncubatorCoreModule has been removed and is no longer part of the public API.




# Class IncubatorStorefrontModule 
## @spartacus/incubator


Class IncubatorStorefrontModule has been removed and is no longer part of the public API.




# Class ConsignmentTrackingComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: OrderFacade,
  modalService: ModalService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade,
  modalService: ModalService
)

```




# Class OrderCancellationService 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  userOrderService: OrderFacade,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  orderHistoryFacade: OrderHistoryFacade,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


### Property userOrderService is removed.





# Class OrderDetailItemsComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  component: CmsComponentData<CmsOrderDetailItemsComponent>,
  translation: TranslationService
)

```




# Class OrderDetailsService 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: OrderFacade,
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade,
  routingService: RoutingService
)

```




# Class OrderHistoryComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routing: RoutingService,
  userOrderService: OrderFacade,
  translation: TranslationService,
  userReplenishmentOrderService: ReplenishmentOrderFacade
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


### Property userOrderService is removed.



### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderCancellationComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userReplenishmentOrderService: ReplenishmentOrderFacade,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderCancellationDialogComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userReplenishmentOrderService: ReplenishmentOrderFacade,
  globalMessageService: GlobalMessageService,
  launchDialogService: LaunchDialogService,
  el: ElementRef
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  globalMessageService: GlobalMessageService,
  launchDialogService: LaunchDialogService,
  el: ElementRef
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderDetailsService 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routingService: RoutingService,
  userReplenishmentOrderService: ReplenishmentOrderFacade
)

```


Current version: 

```

constructor(
  routingService: RoutingService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderHistoryComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routing: RoutingService,
  userReplenishmentOrderService: ReplenishmentOrderFacade,
  translation: TranslationService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  routing: RoutingService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  translation: TranslationService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


### Property userReplenishmentOrderService is removed.





# Class TrackingEventsComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeModal: NgbActiveModal,
  userOrderService: OrderFacade
)

```


Current version: 

```

constructor(
  activeModal: NgbActiveModal,
  orderHistoryFacade: OrderHistoryFacade
)

```




# Variable CONSIGNMENT_TRACKING_NORMALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Variable ORDER_HISTORY_NORMALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Variable ORDER_RETURN_REQUEST_INPUT_SERIALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Variable ORDER_RETURN_REQUEST_NORMALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Variable ORDER_RETURNS_NORMALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Class OrderAdapter 
## @spartacus/order/core


### Method cancel is removed.



### Method cancelReturnRequest is removed.



### Method createReturnRequest is removed.



### Method getConsignmentTracking is removed.



### Method load is removed.



### Method loadHistory is removed.



### Method loadReturnRequestDetail is removed.



### Method loadReturnRequestList is removed.





# Class OrderConnector 
## @spartacus/order/core


### Method cancel is removed.



### Method cancelReturnRequest is removed.



### Method get is removed.



### Method getConsignmentTracking is removed.



### Method getHistory is removed.



### Method getReturnRequestDetail is removed.



### Method getReturnRequestList is removed.



### Method return is removed.





# Class OrderService 
## @spartacus/order/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrder>,
  processStateStore: Store<StateWithProcess<void>>,
  userIdService: UserIdService,
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade,
  userIdService: UserIdService,
  commandService: CommandService,
  orderConnector: OrderConnector,
  eventService: EventService
)

```


### Method cancelOrder is removed.



### Method clearConsignmentTracking is removed.



### Method clearOrderDetails is removed.



### Method clearOrderList is removed.



### Method getCancelOrderLoading is removed.



### Method getCancelOrderSuccess is removed.



### Method getConsignmentTracking is removed.



### Method getOrderDetails changed.


Previous version: 

```

getOrderDetails(): Observable<Order>

```


Current version: 

```

getOrderDetails(): Observable<Order | undefined>

```


### Method getOrderHistoryList is removed.



### Method getOrderHistoryListLoaded is removed.



### Method loadConsignmentTracking is removed.



### Method loadOrderDetails is removed.



### Method loadOrderList is removed.



### Property processStateStore is removed.



### Method resetCancelOrderProcessState is removed.



### Property routingService is removed.



### Property store is removed.





# Variable REPLENISHMENT_ORDER_HISTORY_NORMALIZER 
## @spartacus/order/core

moved to @spartacus/order/root




# Class ReplenishmentOrderAdapter 
## @spartacus/order/core


Class ReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class ReplenishmentOrderConnector 
## @spartacus/order/core


Class ReplenishmentOrderConnector has been removed and is no longer part of the public API.




# Class ReplenishmentOrderService 
## @spartacus/order/core


Class ReplenishmentOrderService has been removed and is no longer part of the public API.




# Class OccOrderAdapter 
## @spartacus/order/occ


### Method cancel is removed.



### Method cancelReturnRequest is removed.



### Method createReturnRequest is removed.



### Method getConsignmentTracking is removed.



### Method load is removed.



### Method loadHistory is removed.



### Method loadReturnRequestDetail is removed.



### Method loadReturnRequestList is removed.





# Class OccReplenishmentOrderAdapter 
## @spartacus/order/occ


Class OccReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class OrderDetailsOrderEntriesContext 
## @spartacus/order/root

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: OrderFacade
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade
)

```


### Property userOrderService is removed.





# Class OrderFacade 
## @spartacus/order/root


### Method cancelOrder is removed.



### Method clearConsignmentTracking is removed.



### Method clearOrderDetails is removed.



### Method clearOrderList is removed.



### Method getCancelOrderLoading is removed.



### Method getCancelOrderSuccess is removed.



### Method getConsignmentTracking is removed.



### Method getOrderDetails changed.


Previous version: 

```

getOrderDetails(): Observable<Order>

```


Current version: 

```

getOrderDetails(): Observable<Order | undefined>

```


### Method getOrderHistoryList is removed.



### Method getOrderHistoryListLoaded is removed.



### Method loadConsignmentTracking is removed.



### Method loadOrderDetails is removed.



### Method loadOrderList is removed.



### Method resetCancelOrderProcessState is removed.





# Function orderFacadeFactory 
## @spartacus/order/root


Function orderFacadeFactory has been removed and is no longer part of the public API.




# Class ReplenishmentOrderFacade 
## @spartacus/order/root


Class ReplenishmentOrderFacade has been removed and is no longer part of the public API.




# Function replenishmentOrderFacadeFactory 
## @spartacus/order/root


Function replenishmentOrderFacadeFactory has been removed and is no longer part of the public API.




# Class AmountCellComponent 
## @spartacus/organization/administration/components


### Property property changed.


Previous version: 

```
property: string
```


Current version: 

```
property: string | undefined
```




# Class AssignCellComponent 
## @spartacus/organization/administration/components


### Method notify changed.


Previous version: 

```

notify(
  item: any,
  state: any
): void

```


Current version: 

```

notify(
  item: any,
  state: string
): void

```




# Class BaseMessageComponent 
## @spartacus/organization/administration/components


### Property messageIcon changed.


Previous version: 

```
messageIcon: ICON_TYPE
```


Current version: 

```
messageIcon: ICON_TYPE | undefined
```


### Method resolveType changed.


Previous version: 

```

resolveType(): string

```


Current version: 

```

resolveType(): string | undefined

```


### Property type changed.


Previous version: 

```
type: string
```


Current version: 

```
type: string | undefined
```




# Class BudgetFormComponent 
## @spartacus/organization/administration/components


### Method createCodeWithName changed.


Previous version: 

```

createCodeWithName(
  name: AbstractControl,
  code: AbstractControl
): void

```


Current version: 

```

createCodeWithName(
  name: AbstractControl | null,
  code: AbstractControl | null
): void

```


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```




# Class BudgetItemService 
## @spartacus/organization/administration/components


### Method update changed.


Previous version: 

```

update(
  code: any,
  value: Budget
): Observable<OrganizationItemStatus<Budget>>

```


Current version: 

```

update(
  code: string,
  value: Budget
): Observable<OrganizationItemStatus<Budget>>

```




# Class CardComponent 
## @spartacus/organization/administration/components


### Property item$ changed.


Previous version: 

```
item$: Observable<T>
```


Current version: 

```
item$: Observable<T | undefined>
```


### Property itemKey changed.


Previous version: 

```
itemKey: any
```


Current version: 

```
itemKey: string | undefined
```


### Method refreshMessages changed.


Previous version: 

```

refreshMessages(
  item: T
): void

```


Current version: 

```

refreshMessages(
  item: T | undefined
): void

```


### Property showHint changed.


Previous version: 

```
showHint: boolean
```


Current version: 

```
showHint: boolean | undefined
```




# Class CellComponent 
## @spartacus/organization/administration/components


### Property property changed.


Previous version: 

```
property: string
```


Current version: 

```
property: string | undefined
```




# Class CostCenterAssignedBudgetListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Budget>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Budget> | undefined>

```




# Class CostCenterBudgetListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Budget>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Budget> | undefined>

```




# Class CostCenterFormComponent 
## @spartacus/organization/administration/components


### Method createCodeWithName changed.


Previous version: 

```

createCodeWithName(
  name: AbstractControl,
  code: AbstractControl
): void

```


Current version: 

```

createCodeWithName(
  name: AbstractControl | null,
  code: AbstractControl | null
): void

```


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```




# Class CurrentItemService 
## @spartacus/organization/administration/components


### Method getItem changed.


Previous version: 

```

getItem(
  params: any[]
): Observable<T>

```


Current version: 

```

getItem(
  params: any[]
): Observable<T | undefined>

```


### Property item$ changed.


Previous version: 

```
item$: Observable<T>
```


Current version: 

```
item$: Observable<T | undefined>
```




# Class CurrentUnitAddressService 
## @spartacus/organization/administration/components


### Method getItem changed.


Previous version: 

```

getItem(
  unitUid: string,
  addressId: string
): Observable<Address>

```


Current version: 

```

getItem(
  unitUid: string,
  addressId: string
): Observable<Address | undefined>

```


### Property item$ changed.


Previous version: 

```
item$: Observable<Address>
```


Current version: 

```
item$: Observable<Address | undefined>
```




# Class CurrentUserService 
## @spartacus/organization/administration/components


### Property name$ changed.


Previous version: 

```
name$: Observable<string>
```


Current version: 

```
name$: Observable<string | undefined>
```




# Class DeleteItemComponent 
## @spartacus/organization/administration/components


### Property confirmation changed.


Previous version: 

```
confirmation: Subject<ConfirmationMessageData>
```


Current version: 

```
confirmation: Subject<ConfirmationMessageData> | null
```


### Property current$ changed.


Previous version: 

```
current$: Observable<T>
```


Current version: 

```
current$: Observable<T | undefined>
```




# Class DisableInfoComponent 
## @spartacus/organization/administration/components


### Property current$ changed.


Previous version: 

```
current$: Observable<T>
```


Current version: 

```
current$: Observable<T | undefined>
```


### Method displayDisabledCreate changed.


Previous version: 

```

displayDisabledCreate(
  item: T
): boolean

```


Current version: 

```

displayDisabledCreate(
  item: T
): boolean | undefined

```


### Method displayDisabledDisable changed.


Previous version: 

```

displayDisabledDisable(
  item: T
): boolean

```


Current version: 

```

displayDisabledDisable(
  item: T
): boolean | undefined

```


### Method displayDisabledEdit changed.


Previous version: 

```

displayDisabledEdit(
  item: T
): boolean

```


Current version: 

```

displayDisabledEdit(
  item: T
): boolean | undefined

```


### Method displayDisabledEnable changed.


Previous version: 

```

displayDisabledEnable(
  item: T
): boolean

```


Current version: 

```

displayDisabledEnable(
  item: T
): boolean | undefined

```




# Class FormComponent 
## @spartacus/organization/administration/components


### Property form$ changed.


Previous version: 

```
form$: Observable<FormGroup>
```


Current version: 

```
form$: Observable<FormGroup | null>
```


### Method notify changed.


Previous version: 

```

notify(
  item: T,
  action: string
): void

```


Current version: 

```

notify(
  item: T | undefined,
  action: string
): void

```




# Class FormService 
## @spartacus/organization/administration/components


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Method getForm changed.


Previous version: 

```

getForm(
  item: T
): FormGroup

```


Current version: 

```

getForm(
  item: T
): FormGroup | null

```




# Class ItemActiveDirective 
## @spartacus/organization/administration/components


### Property subscription changed.


Previous version: 

```
subscription: any
```


Current version: 

```
subscription: Subscription
```




# Class ItemExistsDirective 
## @spartacus/organization/administration/components


### Property subscription changed.


Previous version: 

```
subscription: any
```


Current version: 

```
subscription: Subscription
```




# Class ItemService 
## @spartacus/organization/administration/components


### Property current$ changed.


Previous version: 

```
current$: Observable<T>
```


Current version: 

```
current$: Observable<T | undefined>
```


### Method getForm changed.


Previous version: 

```

getForm(
  item: T
): FormGroup

```


Current version: 

```

getForm(
  item: T
): FormGroup | null

```




# Class ListComponent 
## @spartacus/organization/administration/components


### Method browse changed.


Previous version: 

```

browse(
  pagination: P,
  pageNumber: number
): void

```


Current version: 

```

browse(
  pagination: P | undefined,
  pageNumber: number
): void

```


### Method getListCount changed.


Previous version: 

```

getListCount(
  dataTable: Table
): number

```


Current version: 

```

getListCount(
  dataTable: Table | EntitiesModel<T>
): number | undefined

```


### Property listData$ changed.


Previous version: 

```
listData$: Observable<EntitiesModel<T>>
```


Current version: 

```
listData$: Observable<EntitiesModel<T> | undefined>
```


### Method sort changed.


Previous version: 

```

sort(
  pagination: P
): void

```


Current version: 

```

sort(
  pagination: P | undefined
): void

```


### Property sortCode changed.


Previous version: 

```
sortCode: string
```


Current version: 

```
sortCode: string | undefined
```




# Class ListService 
## @spartacus/organization/administration/components


### Method getData changed.


Previous version: 

```

getData(
  args: any
): Observable<EntitiesModel<T>>

```


Current version: 

```

getData(
  args: any
): Observable<EntitiesModel<T> | undefined>

```


### Method hasGhostData changed.


Previous version: 

```

hasGhostData(
  data: EntitiesModel<T>
): boolean

```


Current version: 

```

hasGhostData(
  data: EntitiesModel<T> | undefined
): boolean

```


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  args: any
): Observable<EntitiesModel<T>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  args: any
): Observable<EntitiesModel<T> | undefined>

```




# Class MessageService 
## @spartacus/organization/administration/components


### Method close changed.


Previous version: 

```

close(
  message: Subject<MessageEventData>
): void

```


Current version: 

```

close(
  message: Subject<MessageEventData> | null
): void

```


### Property data$ changed.


Previous version: 

```
data$: ReplaySubject<MessageData>
```


Current version: 

```
data$: ReplaySubject<T>
```


### Method get changed.


Previous version: 

```

get(): Observable<MessageData>

```


Current version: 

```

get(): Observable<T>

```




# Class PermissionFormComponent 
## @spartacus/organization/administration/components


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property types$ changed.


Previous version: 

```
types$: Observable<OrderApprovalPermissionType[]>
```


Current version: 

```
types$: Observable<OrderApprovalPermissionType[] | undefined>
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```




# Class PermissionFormService 
## @spartacus/organization/administration/components


### Method patchData changed.


Previous version: 

```

patchData(
  item: any
): void

```


Current version: 

```

patchData(
  item: Permission
): void

```




# Class PermissionItemService 
## @spartacus/organization/administration/components


### Method update changed.


Previous version: 

```

update(
  code: any,
  value: Permission
): Observable<OrganizationItemStatus<Permission>>

```


Current version: 

```

update(
  code: string,
  value: Permission
): Observable<OrganizationItemStatus<Permission>>

```




# Class StatusCellComponent 
## @spartacus/organization/administration/components


### Property label changed.


Previous version: 

```
label: "organization.enabled" | "organization.disabled"
```


Current version: 

```
label: "organization.enabled" | "organization.disabled" | undefined
```




# Class SubListComponent 
## @spartacus/organization/administration/components


### Property listData$ changed.


Previous version: 

```
listData$: Observable<EntitiesModel<any>>
```


Current version: 

```
listData$: Observable<EntitiesModel<any> | undefined>
```


### Property showHint changed.


Previous version: 

```
showHint: boolean
```


Current version: 

```
showHint: boolean | undefined
```




# Class SubListService 
## @spartacus/organization/administration/components


### Method filterSelected changed.


Previous version: 

```

filterSelected(
  list: EntitiesModel<T>
): EntitiesModel<T>

```


Current version: 

```

filterSelected(
  list: EntitiesModel<T> | undefined
): EntitiesModel<T> | undefined

```




# Class ToggleStatusComponent 
## @spartacus/organization/administration/components


### Property confirmation changed.


Previous version: 

```
confirmation: Subject<ConfirmationMessageData>
```


Current version: 

```
confirmation: Subject<ConfirmationMessageData> | null
```


### Property current$ changed.


Previous version: 

```
current$: Observable<T>
```


Current version: 

```
current$: Observable<T | undefined>
```




# Class UnitAddressDetailsComponent 
## @spartacus/organization/administration/components


### Method getCountry changed.


Previous version: 

```

getCountry(
  isoCode: any
): Observable<Country>

```


Current version: 

```

getCountry(
  isoCode: string | undefined
): Observable<Country | undefined>

```


### Property unit$ changed.


Previous version: 

```
unit$: Observable<B2BUnit>
```


Current version: 

```
unit$: Observable<B2BUnit | undefined>
```




# Class UnitAddressFormComponent 
## @spartacus/organization/administration/components


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property unit$ changed.


Previous version: 

```
unit$: Observable<B2BUnit>
```


Current version: 

```
unit$: Observable<B2BUnit | undefined>
```




# Class UnitAddressListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  _pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Address>>

```


Current version: 

```

load(
  _pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Address> | undefined>

```




# Class UnitApproverListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UnitAssignedApproverListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UnitChildItemService 
## @spartacus/organization/administration/components


### Method buildRouteParams changed.


Previous version: 

```

buildRouteParams(
  item: B2BUnit
): {
        uid: string;
    }

```


Current version: 

```

buildRouteParams(
  item: B2BUnit
): {
        uid: string | undefined;
    }

```




# Class UnitChildrenComponent 
## @spartacus/organization/administration/components


### Property unit$ changed.


Previous version: 

```
unit$: Observable<B2BUnit>
```


Current version: 

```
unit$: Observable<B2BUnit | undefined>
```




# Class UnitCostCenterItemService 
## @spartacus/organization/administration/components


### Method buildRouteParams changed.


Previous version: 

```

buildRouteParams(
  item: CostCenter
): {
        uid: string;
    }

```


Current version: 

```

buildRouteParams(
  item: CostCenter
): {
        uid: string | undefined;
    }

```




# Class UnitCostCenterListComponent 
## @spartacus/organization/administration/components


### Property unit$ changed.


Previous version: 

```
unit$: Observable<B2BUnit>
```


Current version: 

```
unit$: Observable<B2BUnit | undefined>
```




# Class UnitFormComponent 
## @spartacus/organization/administration/components


### Method createUidWithName changed.


Previous version: 

```

createUidWithName(
  name: AbstractControl,
  code: AbstractControl
): void

```


Current version: 

```

createUidWithName(
  name: AbstractControl | null,
  code: AbstractControl | null
): void

```


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```




# Class UnitFormService 
## @spartacus/organization/administration/components


### Method isRootUnit changed.


Previous version: 

```

isRootUnit(
  item: B2BUnit
): boolean

```


Current version: 

```

isRootUnit(
  item: B2BUnit | undefined
): boolean

```




# Class UnitItemService 
## @spartacus/organization/administration/components


### Method update changed.


Previous version: 

```

update(
  code: any,
  value: B2BUnit
): Observable<OrganizationItemStatus<B2BUnit>>

```


Current version: 

```

update(
  code: string,
  value: B2BUnit
): Observable<OrganizationItemStatus<B2BUnit>>

```




# Class UnitListService 
## @spartacus/organization/administration/components


### Method convertListItem changed.


Previous version: 

```

convertListItem(
  unit: B2BUnitNode,
  depthLevel: number,
  pagination: {
        totalResults: number;
    }
): EntitiesModel<B2BUnitTreeNode>

```


Current version: 

```

convertListItem(
  unit: B2BUnitNode | undefined,
  depthLevel: number,
  pagination: {
        totalResults: number;
    }
): EntitiesModel<B2BUnitTreeNode> | undefined

```


### Method load changed.


Previous version: 

```

load(): Observable<EntitiesModel<B2BUnitTreeNode>>

```


Current version: 

```

load(): Observable<EntitiesModel<B2BUnitTreeNode> | undefined>

```




# Class UnitUserListComponent 
## @spartacus/organization/administration/components


### Property unit$ changed.


Previous version: 

```
unit$: Observable<B2BUnit>
```


Current version: 

```
unit$: Observable<B2BUnit | undefined>
```




# Class UnitUserListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UnitUserRolesFormComponent 
## @spartacus/organization/administration/components


### Property form$ changed.


Previous version: 

```
form$: Observable<FormGroup>
```


Current version: 

```
form$: Observable<FormGroup | null>
```


### Property item changed.


Previous version: 

```
item: B2BUser
```


Current version: 

```
item: B2BUser | undefined
```




# Class UnitUserRolesFormService 
## @spartacus/organization/administration/components


### Method getForm changed.


Previous version: 

```

getForm(
  item: B2BUser
): FormGroup

```


Current version: 

```

getForm(
  item: B2BUser
): FormGroup | null

```




# Class UserApproverListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserAssignedApproverListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserAssignedPermissionListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserAssignedUserGroupListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<UserGroup>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<UserGroup> | undefined>

```




# Class UserChangePasswordFormComponent 
## @spartacus/organization/administration/components


### Property form$ changed.


Previous version: 

```
form$: Observable<FormGroup>
```


Current version: 

```
form$: Observable<FormGroup | null>
```




# Class UserChangePasswordFormService 
## @spartacus/organization/administration/components


### Method getForm changed.


Previous version: 

```

getForm(
  item: User
): FormGroup

```


Current version: 

```

getForm(
  item: User
): FormGroup | null

```




# Class UserFormComponent 
## @spartacus/organization/administration/components


### Constructor changed.


Previous version: 

```

constructor(
  itemService: ItemService<B2BUser>,
  unitService: OrgUnitService,
  userService: UserService,
  b2bUserService: B2BUserService
)

```


Current version: 

```

constructor(
  itemService: ItemService<B2BUser>,
  unitService: OrgUnitService,
  userProfileFacade: UserProfileFacade,
  b2bUserService: B2BUserService
)

```


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```


### Property userService is removed.





# Class UserGroupAssignedPermissionsListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Permission>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Permission> | undefined>

```




# Class UserGroupAssignedUserListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserGroupFormComponent 
## @spartacus/organization/administration/components


### Method createUidWithName changed.


Previous version: 

```

createUidWithName(
  name: AbstractControl,
  code: AbstractControl
): void

```


Current version: 

```

createUidWithName(
  name: AbstractControl | null,
  code: AbstractControl | null
): void

```


### Property form changed.


Previous version: 

```
form: FormGroup
```


Current version: 

```
form: FormGroup | null
```


### Property units$ changed.


Previous version: 

```
units$: Observable<B2BUnitNode[]>
```


Current version: 

```
units$: Observable<B2BUnitNode[] | undefined>
```




# Class UserGroupPermissionListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Permission>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<Permission> | undefined>

```




# Class UserGroupUserListComponent 
## @spartacus/organization/administration/components


### Method notify changed.


Previous version: 

```

notify(
  item: UserGroup
): void

```


Current version: 

```

notify(
  item: UserGroup | undefined
): void

```




# Class UserGroupUserListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserItemService 
## @spartacus/organization/administration/components


### Method update changed.


Previous version: 

```

update(
  code: any,
  value: B2BUser
): Observable<OrganizationItemStatus<B2BUser>>

```


Current version: 

```

update(
  code: string,
  value: B2BUser
): Observable<OrganizationItemStatus<B2BUser>>

```




# Class UserPermissionListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<B2BUser> | undefined>

```




# Class UserUserGroupListService 
## @spartacus/organization/administration/components


### Method load changed.


Previous version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<UserGroup>>

```


Current version: 

```

load(
  pagination: PaginationModel,
  code: string
): Observable<EntitiesModel<UserGroup> | undefined>

```




# Class AdminGuard 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  userService: UserService,
  routingService: RoutingService,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  userAccountFacade: UserAccountFacade,
  routingService: RoutingService,
  globalMessageService: GlobalMessageService
)

```


### Property userService is removed.





# Class B2BUserService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method getApprovers changed.


Previous version: 

```

getApprovers(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

getApprovers(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser> | undefined>

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  orgCustomerId: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  orgCustomerId: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<B2BUser> | undefined>

```


### Method getPermissions changed.


Previous version: 

```

getPermissions(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<Permission>>

```


Current version: 

```

getPermissions(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<Permission> | undefined>

```


### Method getUserGroups changed.


Previous version: 

```

getUserGroups(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<UserGroup>>

```


Current version: 

```

getUserGroups(
  orgCustomerId: string,
  params: SearchConfig
): Observable<EntitiesModel<UserGroup> | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Class BudgetService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  budgetCode: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  budgetCode: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<Budget>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<Budget> | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Class CostCenterService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method getBudgets changed.


Previous version: 

```

getBudgets(
  costCenterCode: string,
  params: SearchConfig
): Observable<EntitiesModel<Budget>>

```


Current version: 

```

getBudgets(
  costCenterCode: string,
  params: SearchConfig
): Observable<EntitiesModel<Budget> | undefined>

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  costCenterCode: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  costCenterCode: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<CostCenter>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<CostCenter> | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Interface OrganizationItemStatus 
## @spartacus/organization/administration/core


### PropertySignature item changed.


Previous version: 

```
item: T
```


Current version: 

```
item: T | undefined
```


### PropertySignature status changed.


Previous version: 

```
status: LoadStatus
```


Current version: 

```
status: LoadStatus | null
```




# Variable OrgUnitSelectors.getB2BAddresses 
## @spartacus/organization/administration/core


Variable getB2BAddresses changed.

Previous version: 

```
getB2BAddresses: (orgUnitId: string, params: SearchConfig) => MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<EntitiesModel<Address>>>
```


Current version: 

```
getB2BAddresses: (orgUnitId: string, params?: SearchConfig | undefined) => MemoizedSelector<StateWithOrganization, StateUtils.LoaderState<EntitiesModel<Address>>>
```




# Class OrgUnitService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method findUnitChildrenInTree changed.


Previous version: 

```

findUnitChildrenInTree(
  orginitId: any,
  unit: B2BUnitNode
): B2BUnitNode[]

```


Current version: 

```

findUnitChildrenInTree(
  orginitId: string,
  unit: B2BUnitNode
): B2BUnitNode[]

```


### Method getActiveUnitList changed.


Previous version: 

```

getActiveUnitList(): Observable<B2BUnitNode[]>

```


Current version: 

```

getActiveUnitList(): Observable<B2BUnitNode[] | undefined>

```


### Method getAddress changed.


Previous version: 

```

getAddress(
  orgUnitId: string,
  addressId: string
): Observable<Address>

```


Current version: 

```

getAddress(
  orgUnitId: string,
  addressId: string
): Observable<Address | undefined>

```


### Method getAddresses changed.


Previous version: 

```

getAddresses(
  orgUnitId: string
): Observable<EntitiesModel<Address>>

```


Current version: 

```

getAddresses(
  orgUnitId: string
): Observable<EntitiesModel<Address> | undefined>

```


### Method getApprovalProcesses changed.


Previous version: 

```

getApprovalProcesses(): Observable<B2BApprovalProcess[]>

```


Current version: 

```

getApprovalProcesses(): Observable<B2BApprovalProcess[] | undefined>

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  orgCustomerId: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  orgCustomerId: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(): Observable<B2BUnitNode[]>

```


Current version: 

```

getList(): Observable<B2BUnitNode[] | undefined>

```


### Method getTree changed.


Previous version: 

```

getTree(): Observable<B2BUnitNode>

```


Current version: 

```

getTree(): Observable<B2BUnitNode | undefined>

```


### Method getUsers changed.


Previous version: 

```

getUsers(
  orgUnitId: string,
  roleId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

getUsers(
  orgUnitId: string,
  roleId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser> | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Class PermissionService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  permissionCode: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  permissionCode: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<Permission>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<Permission> | undefined>

```


### Method getTypes changed.


Previous version: 

```

getTypes(): Observable<OrderApprovalPermissionType[]>

```


Current version: 

```

getTypes(): Observable<OrderApprovalPermissionType[] | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Class UserGroupService 
## @spartacus/organization/administration/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithOrganization | StateWithProcess<void>>,
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrganization>,
  userIdService: UserIdService
)

```


### Method getAvailableOrderApprovalPermissions changed.


Previous version: 

```

getAvailableOrderApprovalPermissions(
  userGroupId: string,
  params: SearchConfig
): Observable<EntitiesModel<Permission>>

```


Current version: 

```

getAvailableOrderApprovalPermissions(
  userGroupId: string,
  params: SearchConfig
): Observable<EntitiesModel<Permission> | undefined>

```


### Method getAvailableOrgCustomers changed.


Previous version: 

```

getAvailableOrgCustomers(
  userGroupId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser>>

```


Current version: 

```

getAvailableOrgCustomers(
  userGroupId: string,
  params: SearchConfig
): Observable<EntitiesModel<B2BUser> | undefined>

```


### Method getErrorState changed.


Previous version: 

```

getErrorState(
  code: any
): Observable<boolean>

```


Current version: 

```

getErrorState(
  code: string
): Observable<boolean>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<UserGroup>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<UserGroup> | undefined>

```


### Property store changed.


Previous version: 

```
store: Store<StateWithOrganization | StateWithProcess<void>>
```


Current version: 

```
store: Store<StateWithOrganization>
```




# Class OrderApprovalDetailFormComponent 
## @spartacus/organization/order-approval


### Property orderApproval$ changed.


Previous version: 

```
orderApproval$: Observable<OrderApproval>
```


Current version: 

```
orderApproval$: Observable<OrderApproval | undefined>
```




# Class OrderApprovalDetailService 
## @spartacus/organization/order-approval


### Method getOrderApproval changed.


Previous version: 

```

getOrderApproval(): Observable<OrderApproval>

```


Current version: 

```

getOrderApproval(): Observable<OrderApproval | undefined>

```


### Property orderApproval$ changed.


Previous version: 

```
orderApproval$: Observable<OrderApproval>
```


Current version: 

```
orderApproval$: Observable<OrderApproval | undefined>
```




# Class OrderApprovalListComponent 
## @spartacus/organization/order-approval


### Property orderApprovals$ changed.


Previous version: 

```
orderApprovals$: Observable<EntitiesModel<OrderApproval>>
```


Current version: 

```
orderApprovals$: Observable<EntitiesModel<OrderApproval> | undefined>
```


### Property sortLabels$ changed.


Previous version: 

```
sortLabels$: any
```


Current version: 

```
sortLabels$: Observable<{
        byDate: string;
        byOrderNumber: string;
    }>
```




# Class OrderApprovalService 
## @spartacus/organization/order-approval


### Method get changed.


Previous version: 

```

get(
  orderApprovalCode: string
): Observable<OrderApproval>

```


Current version: 

```

get(
  orderApprovalCode: string
): Observable<OrderApproval | undefined>

```


### Method getList changed.


Previous version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<OrderApproval>>

```


Current version: 

```

getList(
  params: SearchConfig
): Observable<EntitiesModel<OrderApproval> | undefined>

```




# Class BulkPricingService 
## @spartacus/product/bulk-pricing/core


### Method convert changed.


Previous version: 

```

convert(
  productPriceScope: Product
): BulkPrice[] | undefined

```


Current version: 

```

convert(
  productPriceScope: Product | undefined
): BulkPrice[] | undefined

```




# Class ConfiguratorCartEntryBundleInfoComponent 
## @spartacus/product-configurator/common


### Constructor changed.


Previous version: 

```

constructor(
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
  breakpointService: BreakpointService,
  cartItemContext: CartItemContext | undefined
)

```


Current version: 

```

constructor(
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService,
  breakpointService: BreakpointService,
  translation: TranslationService,
  cartItemContext: CartItemContext | undefined
)

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
  globalMessageService: GlobalMessageService
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
  intersectionService: IntersectionService
)

```




# Class ConfiguratorAttributeDropDownComponent 
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
  translation: TranslationService
)

```




# Class ConfiguratorAttributeHeaderComponent 
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
  configuratorCommonsService: ConfiguratorCommonsService,
  configuratorGroupsService: ConfiguratorGroupsService,
  configuratorUiSettings: ConfiguratorUISettingsConfig
)

```


### Method getConflictMessageKey changed.


Previous version: 

```

getConflictMessageKey(
  groupType: Configurator.GroupType
): string

```


Current version: 

```

getConflictMessageKey(): string

```


### Method isAttributeGroup changed.


Previous version: 

```

isAttributeGroup(
  groupType: Configurator.GroupType
): boolean

```


Current version: 

```

isAttributeGroup(): boolean

```


### Method isMultiSelection is removed.

It has been converted to a getter instead.



# Class ConfiguratorAttributeMultiSelectionBundleComponent 
## @spartacus/product-configurator/rulebased


### Method extractProductCardParameters changed.


Previous version: 

```

extractProductCardParameters(
  disableAllButtons: boolean | null,
  hideRemoveButton: boolean | null,
  value: Configurator.Value
): ConfiguratorAttributeProductCardComponentOptions

```


Current version: 

```

extractProductCardParameters(
  disableAllButtons: boolean | null,
  hideRemoveButton: boolean | null,
  value: Configurator.Value,
  index: number
): ConfiguratorAttributeProductCardComponentOptions

```




# Class ConfiguratorAttributeNumericInputFieldComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig
)

```


Current version: 

```

constructor(
  configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
  config: ConfiguratorUISettingsConfig,
  translation: TranslationService
)

```




# Class ConfiguratorAttributeProductCardComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  productService: ProductService,
  keyBoardFocus: KeyboardFocusService
)

```


Current version: 

```

constructor(
  productService: ProductService,
  keyBoardFocus: KeyboardFocusService,
  translation: TranslationService
)

```




# Class ConfiguratorAttributeRadioButtonComponent 
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
  translation: TranslationService
)

```




# Class ConfiguratorAttributeSingleSelectionBaseComponent 
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
  translation: TranslationService
)

```




# Class ConfiguratorAttributeSingleSelectionBundleComponent 
## @spartacus/product-configurator/rulebased


### Method extractProductCardParameters changed.


Previous version: 

```

extractProductCardParameters(
  value: Configurator.Value
): ConfiguratorAttributeProductCardComponentOptions

```


Current version: 

```

extractProductCardParameters(
  value: Configurator.Value,
  index: number
): ConfiguratorAttributeProductCardComponentOptions

```




# Class ConfiguratorCartService 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithConfigurator>,
  activeCartService: ActiveCartService,
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  checkoutFacade: CheckoutFacade,
  userIdService: UserIdService,
  configuratorUtilsService: ConfiguratorUtilsService
)

```


Current version: 

```

constructor(
  store: Store<StateWithConfigurator>,
  activeCartService: ActiveCartFacade,
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  checkoutQueryFacade: CheckoutQueryFacade,
  userIdService: UserIdService,
  configuratorUtilsService: ConfiguratorUtilsService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property checkoutFacade is removed.





# Class ConfiguratorCommonsService 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithConfigurator>,
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  configuratorCartService: ConfiguratorCartService,
  activeCartService: ActiveCartService,
  configuratorUtils: ConfiguratorUtilsService
)

```


Current version: 

```

constructor(
  store: Store<StateWithConfigurator>,
  commonConfigUtilsService: CommonConfiguratorUtilsService,
  configuratorCartService: ConfiguratorCartService,
  activeCartService: ActiveCartFacade,
  configuratorUtils: ConfiguratorUtilsService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Method removeObsoleteProductBoundConfiguration is removed.

It is no longer needed because an obsolete product bound configuration is handled within action `RemoveCartBoundConfigurations`. So in case you called `removeObsoleteProductBoundConfiguration` before, consider to raise that action, which will clear all cart bound configurations, and in addition delete the obsolete product bound configuration that is predecessor of a cart bound configuration.



# Class ConfiguratorExitButtonComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  productService: ProductService,
  routingService: RoutingService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configuratorCommonsService: ConfiguratorCommonsService,
  breakpointService: BreakpointService,
  windowRef: WindowRef
)

```


Current version: 

```

constructor(
  productService: ProductService,
  routingService: RoutingService,
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configuratorCommonsService: ConfiguratorCommonsService,
  breakpointService: BreakpointService,
  windowRef: WindowRef,
  location: Location
)

```


### Property product$ is removed.





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
  directionService: DirectionService
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
  translation: TranslationService
)

```




# Class ConfiguratorGroupTitleComponent 
## @spartacus/product-configurator/rulebased


### Property configuration$ is removed.

In case you use it in a sub component, consider to declare it there via `configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService .extractRouterData() .pipe( switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner) ) );`



# Class ConfiguratorOverviewBundleAttributeComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  productService: ProductService
)

```


Current version: 

```

constructor(
  productService: ProductService,
  translation: TranslationService
)

```




# Class ConfiguratorOverviewNotificationBannerComponent 
## @spartacus/product-configurator/rulebased


### Method countIssuesInGroup is removed.





# Class ConfiguratorProductTitleComponent 
## @spartacus/product-configurator/rulebased


### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | undefined>
```




# Class ConfiguratorStorefrontUtilsService 
## @spartacus/product-configurator/rulebased


### Method isInViewport is removed.

It is not needed anymore as scrolling is always executed on navigation regardless of position of element.



# Class ConfiguratorTabBarComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  configRouterExtractorService: ConfiguratorRouterExtractorService
)

```


Current version: 

```

constructor(
  configRouterExtractorService: ConfiguratorRouterExtractorService,
  configuratorCommonsService: ConfiguratorCommonsService
)

```




# Class OccConfiguratorVariantNormalizer 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  config: OccConfig,
  translation: TranslationService
)

```


Current version: 

```

constructor(
  config: OccConfig,
  translation: TranslationService,
  uiSettingsConfig: ConfiguratorUISettingsConfig
)

```


### Method convertAttributeType changed.


Previous version: 

```

convertAttributeType(
  type: OccConfigurator.UiType
): Configurator.UiType

```


Current version: 

```

convertAttributeType(
  sourceAttribute: OccConfigurator.Attribute
): Configurator.UiType

```




# Class RulebasedConfiguratorEventListener 
## @spartacus/product-configurator/rulebased


Class RulebasedConfiguratorEventListener has been removed and is no longer part of the public API.
Please use 'ConfiguratorRouterListener' instead.  RulebasedConfiguratorEventListener was responsible for deleting cart bound configurations when an order was submitted. This is now handled by `ConfiguratorRouterListener`, which checks on cart boundconfigurations on every navigation that is not configurator related, and deletes cart bound configurations if needed.



# Class RulebasedConfiguratorEventModule 
## @spartacus/product-configurator/rulebased


Class RulebasedConfiguratorEventModule has been removed and is no longer part of the public API.




# Variable defaultB2bCheckoutConfig 
## @spartacus/setup


Variable defaultB2bCheckoutConfig has been removed and is no longer part of the public API.




# Class ActiveCartOrderEntriesContext 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  actionsSubject: ActionsSubject,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService,
  activeCartFacade: ActiveCartFacade
)

```


### Property actionsSubject is removed.



### Property activeCartService is removed.





# Class ActiveFacetsComponent 
## @spartacus/storefront


### Method getFocusKey changed.


Previous version: 

```

getFocusKey(
  facetList: FacetList,
  facet: Breadcrumb
): string

```


Current version: 

```

getFocusKey(
  facetList: FacetList,
  facet: Breadcrumb
): string | undefined

```




# Class AddedToCartDialogComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  modalService: ModalService,
  cartService: ActiveCartService
)

```


Current version: 

```

constructor(
  modalService: ModalService,
  activeCartFacade: ActiveCartFacade
)

```


### Property cartService is removed.



### Property entry$ changed.


Previous version: 

```
entry$: Observable<OrderEntry>
```


Current version: 

```
entry$: Observable<OrderEntry | undefined>
```


### Method ngOnInit is removed.



### Property numberOfEntriesBeforeAdd is removed.





# Interface AddOrderEntriesContext 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class AddressBookComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  service: AddressBookComponentService,
  translation: TranslationService
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


### Property editCard changed.


Previous version: 

```
editCard: string
```


Current version: 

```
editCard: string | null
```


### Method getCardContent changed.


Previous version: 

```

getCardContent(
  address: Address
): Observable<{
        textBold: string;
        text: string[];
        actions: {
            name: string;
            event: string;
        }[];
        header: string;
        deleteMsg: string;
    }>

```


Current version: 

```

getCardContent(
  address: Address
): Observable<Card>

```


### Method setAddressAsDefault changed.


Previous version: 

```

setAddressAsDefault(
  addressId: string
): void

```


Current version: 

```

setAddressAsDefault(
  address: Address
): void

```




# Class AddressFormComponent 
## @spartacus/storefront


### Method countrySelected changed.


Previous version: 

```

countrySelected(
  country: Country
): void

```


Current version: 

```

countrySelected(
  country: Country | undefined
): void

```


### Property suggestedAddressModalRef changed.


Previous version: 

```
suggestedAddressModalRef: ModalRef
```


Current version: 

```
suggestedAddressModalRef: ModalRef | null
```




# Class FormErrorsComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor()

```


Current version: 

```

constructor(
  ChangeDetectionRef: ChangeDetectorRef,
  keyValueDiffers: KeyValueDiffers
)

```




# Class AddToCartComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components/add-to-cart


### Constructor changed.


Previous version: 

```

constructor(
  modalService: ModalService,
  currentProductService: CurrentProductService,
  cd: ChangeDetectorRef,
  activeCartService: ActiveCartService,
  component: CmsComponentData<CmsAddToCartComponent>
)

```


Current version: 

```

constructor(
  currentProductService: CurrentProductService,
  cd: ChangeDetectorRef,
  activeCartService: ActiveCartFacade,
  component: CmsComponentData<CmsAddToCartComponent>,
  eventService: EventService,
  productListItemContext: ProductListItemContext | undefined
)

```


### Constructor changed.


Previous version: 

```

constructor(
  modalService: ModalService,
  currentProductService: CurrentProductService,
  cd: ChangeDetectorRef,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  currentProductService: CurrentProductService,
  cd: ChangeDetectorRef,
  activeCartService: ActiveCartFacade,
  component: CmsComponentData<CmsAddToCartComponent>,
  eventService: EventService,
  productListItemContext: ProductListItemContext | undefined
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property modalRef is removed.



### Property modalService is removed.



### Property numberOfEntriesBeforeAdd is removed.



### Method openModal is removed.





# Class AddToCartModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components/add-to-cart




# Class AddToWishListComponent 
## @spartacus/storefront

moved to @spartacus/cart/wish-list/components/add-to-wishlist


### Constructor changed.


Previous version: 

```

constructor(
  wishListService: WishListService,
  currentProductService: CurrentProductService,
  authService: AuthService
)

```


Current version: 

```

constructor(
  wishListFacade: WishListFacade,
  currentProductService: CurrentProductService,
  authService: AuthService
)

```


### Method getProductInWishList changed.


Previous version: 

```

getProductInWishList(
  product: Product,
  entries: OrderEntry[]
): OrderEntry

```


Current version: 

```

getProductInWishList(
  product: Product,
  entries: OrderEntry[]
): OrderEntry | undefined

```


### Property wishListService is removed.





# Class AddToWishListModule 
## @spartacus/storefront

moved to @spartacus/cart/wish-list/components/add-to-wishlist




# Class AmendOrderActionsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class AmendOrderActionsModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class AmendOrderItemsModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Enum AmendOrderType 
## @spartacus/storefront

moved to @spartacus/order/components




# Class AnonymousConsentDialogComponent 
## @spartacus/storefront


### Method getCorrespondingConsent changed.


Previous version: 

```

getCorrespondingConsent(
  template: ConsentTemplate,
  consents: AnonymousConsent[]
): AnonymousConsent

```


Current version: 

```

getCorrespondingConsent(
  template: ConsentTemplate,
  consents: AnonymousConsent[]
): AnonymousConsent | null

```


### Property showLegalDescription changed.


Previous version: 

```
showLegalDescription: boolean
```


Current version: 

```
showLegalDescription: boolean | undefined
```




# Class AppliedCouponsComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  cartVoucherService: CartVoucherService
)

```


Current version: 

```

constructor(
  cartVoucherService: CartVoucherFacade
)

```


### Property cartVoucherService changed.


Previous version: 

```
cartVoucherService: CartVoucherService
```


Current version: 

```
cartVoucherService: CartVoucherFacade
```




# Class BannerComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  component: CmsComponentData<CmsBannerComponent>
)

```


Current version: 

```

constructor(
  component: CmsComponentData<CmsBannerComponent>,
  urlService: SemanticPathService,
  cmsService: CmsService
)

```




# Class BreadcrumbSchemaBuilder 
## @spartacus/storefront


### Method collect changed.


Previous version: 

```

collect(
  pageMeta: PageMeta
): any

```


Current version: 

```

collect(
  pageMeta: PageMeta | null
): any

```




# Class BreakpointService 
## @spartacus/storefront


### Method getMaxSize changed.


Previous version: 

```

getMaxSize(
  breakpoint: BREAKPOINT
): number

```


Current version: 

```

getMaxSize(
  breakpoint: BREAKPOINT
): number | null

```


### Method getMinSize changed.


Previous version: 

```

getMinSize(
  breakpoint: BREAKPOINT
): number

```


Current version: 

```

getMinSize(
  breakpoint: BREAKPOINT
): number | null

```


### Method getSize changed.


Previous version: 

```

getSize(
  breakpoint: BREAKPOINT
): number

```


Current version: 

```

getSize(
  breakpoint: BREAKPOINT
): number | null

```




# Class CancelOrderComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class CancelOrderConfirmationComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class CancelOrderConfirmationModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class CancelOrderModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class CancelOrReturnItemsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class CardComponent 
## @spartacus/storefront


### Property content changed.


Previous version: 

```
content: Card
```


Current version: 

```
content: Card | null
```




# Class CarouselComponent 
## @spartacus/storefront


### Property title changed.


Previous version: 

```
title: string
```


Current version: 

```
title: string | undefined | null
```




# Class CartComponentModule 
## @spartacus/storefront


Class CartComponentModule has been removed and is no longer part of the public API.




# Class CartCouponComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  cartVoucherService: CartVoucherService,
  formBuilder: FormBuilder,
  customerCouponService: CustomerCouponService,
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  cartVoucherService: CartVoucherFacade,
  formBuilder: FormBuilder,
  customerCouponService: CustomerCouponService,
  activeCartService: ActiveCartFacade
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property cartVoucherService changed.


Previous version: 

```
cartVoucherService: CartVoucherService
```


Current version: 

```
cartVoucherService: CartVoucherFacade
```




# Class CartCouponModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartDetailsComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  selectiveCartService: SelectiveCartService,
  authService: AuthService,
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  selectiveCartService: SelectiveCartFacade,
  authService: AuthService,
  routingService: RoutingService,
  cartConfig: CartConfigService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property selectiveCartService changed.


Previous version: 

```
selectiveCartService: SelectiveCartService
```


Current version: 

```
selectiveCartService: SelectiveCartFacade
```




# Class CartDetailsModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartItemComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Interface CartItemComponentOptions 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class CartItemContext 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class CartItemContextSource 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartItemListComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  selectiveCartService: SelectiveCartService,
  userIdService: UserIdService,
  multiCartService: MultiCartService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  selectiveCartService: SelectiveCartFacade,
  userIdService: UserIdService,
  multiCartService: MultiCartFacade,
  cd: ChangeDetectorRef,
  outlet: OutletContextData<ItemListContext> | undefined
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Method getControl changed.


Previous version: 

```

getControl(
  item: OrderEntry
): Observable<FormGroup>

```


Current version: 

```

getControl(
  item: OrderEntry
): Observable<FormGroup> | undefined

```


### Property multiCartService changed.


Previous version: 

```
multiCartService: MultiCartService
```


Current version: 

```
multiCartService: MultiCartFacade
```


### Property selectiveCartService changed.


Previous version: 

```
selectiveCartService: SelectiveCartService
```


Current version: 

```
selectiveCartService: SelectiveCartFacade
```




# Class CartOrderEntriesContext 
## @spartacus/storefront


Class CartOrderEntriesContext has been removed and is no longer part of the public API.




# Enum CartOutlets 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class CartPageEvent 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class CartPageEventBuilder 
## @spartacus/storefront

moved to @spartacus/cart/base/core




# Class CartPageEventModule 
## @spartacus/storefront

moved to @spartacus/cart/base/core




# Class CartPageLayoutHandler 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  selectiveCartService: SelectiveCartService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade,
  selectiveCartService: SelectiveCartFacade,
  cartConfig: CartConfigService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Method handle changed.


Previous version: 

```

handle(
  slots$: Observable<string[]>,
  pageTemplate: string,
  section: string
): Observable<any>

```


Current version: 

```

handle(
  slots$: Observable<string[]>,
  pageTemplate: string,
  section: string
): Observable<string[]>

```


### Property selectiveCartService changed.


Previous version: 

```
selectiveCartService: SelectiveCartService
```


Current version: 

```
selectiveCartService: SelectiveCartFacade
```




# Class CartSharedModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartTotalsComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
)

```


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService,
  router: Router
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property cartValidationInProgress is removed.



### Property router is removed.



### Method disableButtonWhileNavigation is removed.



### Property entries$ is removed.



### Method ngOnDestroy is removed.



### Property router is removed.



### Property subscription is removed.





# Class CartTotalsModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartValidationComponentsModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CartValidationGuard 
## @spartacus/storefront

moved to @spartacus/cart/base/core


### Constructor changed.


Previous version: 

```

constructor(
  cartValidationService: CartValidationService,
  semanticPathService: SemanticPathService,
  router: Router,
  globalMessageService: GlobalMessageService,
  activeCartService: ActiveCartService,
  cartValidationStateService: CartValidationStateService,
  cartConfigService: CartConfigService
)

```


Current version: 

```

constructor(
  cartValidationService: CartValidationFacade,
  semanticPathService: SemanticPathService,
  router: Router,
  globalMessageService: GlobalMessageService,
  activeCartService: ActiveCartFacade,
  cartValidationStateService: CartValidationStateService,
  cartConfigService: CartConfigService
)

```


### Property activeCartService changed.


Previous version: 

```
activeCartService: ActiveCartService
```


Current version: 

```
activeCartService: ActiveCartFacade
```


### Property cartValidationService changed.


Previous version: 

```
cartValidationService: CartValidationService
```


Current version: 

```
cartValidationService: CartValidationFacade
```




# Class CartValidationStateService 
## @spartacus/storefront

moved to @spartacus/cart/base/core




# Class CartValidationWarningsComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  cartValidationStateService: CartValidationStateService
)

```


Current version: 

```

constructor(
  cartValidationFacade: CartValidationFacade
)

```


### Property cartValidationStateService is removed.





# Class CartValidationWarningsModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class CmsGuardsService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  cmsComponentsService: CmsComponentsService,
  injector: Injector
)

```


Current version: 

```

constructor(
  cmsComponentsService: CmsComponentsService,
  unifiedInjector: UnifiedInjector
)

```


### Property injector is removed.





# Class ComponentHandlerService 
## @spartacus/storefront


### Method getLauncher changed.


Previous version: 

```

getLauncher(
  componentMapping: CmsComponentMapping,
  viewContainerRef: ViewContainerRef,
  elementInjector: Injector,
  module: NgModuleRef<any>
): Observable<{
        elementRef: ElementRef;
        componentRef?: ComponentRef<any>;
    }>

```


Current version: 

```

getLauncher(
  componentMapping: CmsComponentMapping,
  viewContainerRef: ViewContainerRef,
  elementInjector: Injector,
  module: NgModuleRef<any>
): Observable<{
        elementRef: ElementRef;
        componentRef?: ComponentRef<any>;
    }> | undefined

```


### Method resolve changed.


Previous version: 

```

resolve(
  componentMapping: CmsComponentMapping
): ComponentHandler

```


Current version: 

```

resolve(
  componentMapping: CmsComponentMapping
): ComponentHandler | undefined

```




# Class ComponentWrapperDirective 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  vcr: ViewContainerRef,
  cmsComponentsService: CmsComponentsService,
  injector: Injector,
  dynamicAttributeService: DynamicAttributeService,
  renderer: Renderer2,
  componentHandler: ComponentHandlerService,
  cmsInjector: CmsInjectorService
)

```


Current version: 

```

constructor(
  vcr: ViewContainerRef,
  cmsComponentsService: CmsComponentsService,
  injector: Injector,
  dynamicAttributeService: DynamicAttributeService,
  renderer: Renderer2,
  componentHandler: ComponentHandlerService,
  cmsInjector: CmsInjectorService,
  eventService: EventService
)

```


### Property cmpRef changed.


Previous version: 

```
public
```


Current version: 

```
`cmpRef` has been made `protected` due to being unsafe.
```




# Class ConsentManagementFormComponent 
## @spartacus/storefront


### Property consent changed.


Previous version: 

```
consent: AnonymousConsent
```


Current version: 

```
consent: AnonymousConsent | null
```


### Method isRequired changed.


Previous version: 

```

isRequired(
  templateId: string
): boolean

```


Current version: 

```

isRequired(
  templateId: string | undefined
): boolean

```




# Class ConsignmentTrackingComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: UserOrderService,
  modalService: ModalService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade,
  modalService: ModalService
)

```




# Class CustomFormValidators 
## @spartacus/storefront


### Method dateRange changed.


Previous version: 

```

dateRange(
  startDateKey: string,
  endDateKey: string,
  getDate: (value: string) => Date
): (FormGroup: any) => any

```


Current version: 

```

dateRange(
  startDateKey: string,
  endDateKey: string,
  getDate: (value: string) => Date | undefined
): (_: FormGroup) => ValidationErrors | null

```




# Class DatePickerComponent 
## @spartacus/storefront


### Method getDate changed.


Previous version: 

```

getDate(
  date: string
): string

```


Current version: 

```

getDate(
  date: string
): string | undefined

```




# Class DatePickerService 
## @spartacus/storefront


### Method getDate changed.


Previous version: 

```

getDate(
  value: string
): Date

```


Current version: 

```

getDate(
  value: string
): Date | undefined

```




# Variable defaultKeyboardFocusConfig 
## @spartacus/storefront


Variable defaultKeyboardFocusConfig has been removed and is no longer part of the public API.




# Variable defaultReplenishmentOrderCancellationLayoutConfig 
## @spartacus/storefront

moved to @spartacus/order/components




# Class DirectionService 
## @spartacus/storefront


### Property config changed.


Previous version: 

```
config: Direction
```


Current version: 

```
config: Direction | undefined
```


### Method getDirection changed.


Previous version: 

```

getDirection(
  language: string
): DirectionMode

```


Current version: 

```

getDirection(
  language: string
): DirectionMode | undefined

```


### Method setDirection changed.


Previous version: 

```

setDirection(
  el: HTMLElement,
  direction: DirectionMode
): void

```


Current version: 

```

setDirection(
  el: HTMLElement,
  direction: DirectionMode | undefined
): void

```




# Class FileUploadComponent 
## @spartacus/storefront


### Property update changed.


Previous version: 

```
update: EventEmitter<FileList>
```


Current version: 

```
update: EventEmitter<FileList | null>
```




# Class FooterNavigationComponent 
## @spartacus/storefront


### Property styleClass$ changed.


Previous version: 

```
styleClass$: Observable<string>
```


Current version: 

```
styleClass$: Observable<string | undefined>
```




# Class FormErrorsComponent 
## @spartacus/storefront


### Property _control changed.


Previous version: 

```
_control: FormControl
```


Current version: 

```
_control: FormControl | AbstractControl
```


### Property control changed.


Previous version: 

```
control: FormControl
```


Current version: 

```
control: FormControl | AbstractControl
```


### Property errors$ is removed.



### Property errorsDetails$ changed.


Previous version: 

```
errorsDetails$: Observable<Array<[string, string]>>
```


Current version: 

```
errorsDetails$: Observable<Array<[string, string | boolean]>>
```


### Property translationParams changed.


Previous version: 

```
translationParams: {
        [key: string]: string;
    }
```


Current version: 

```
translationParams: {
        [key: string]: string | null;
    }
```




# Class GenericLinkComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  router: Router
)

```


Current version: 

```

constructor(
  router: Router,
  service: GenericLinkComponentService
)

```


### Property fragment changed.


Previous version: 

```
fragment: string
```


Current version: 

```
fragment: string | undefined
```


### Property MAILTO_PROTOCOL_REGEX is removed.



### Property queryParams changed.


Previous version: 

```
queryParams: Params
```


Current version: 

```
queryParams: Params | undefined
```


### Property rel changed.


Previous version: 

```
rel: string
```


Current version: 

```
rel: "noopener" | null
```


### Property routerUrl changed.


Previous version: 

```
routerUrl: any[]
```


Current version: 

```
routerUrl: string[] | undefined
```


### Property style changed.


Previous version: 

```
style: string
```


Current version: 

```
style: string | undefined
```


### Property TEL_PROTOCOL_REGEX is removed.





# Interface GetOrderEntriesContext 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class IconComponent 
## @spartacus/storefront


### Property icon changed.


Previous version: 

```
icon: SafeHtml
```


Current version: 

```
icon: SafeHtml | undefined
```




# Class IconLoaderService 
## @spartacus/storefront


### Method getFlipDirection changed.


Previous version: 

```

getFlipDirection(
  type: ICON_TYPE | string
): DirectionMode

```


Current version: 

```

getFlipDirection(
  type: ICON_TYPE | string
): DirectionMode | undefined

```


### Method getHtml changed.


Previous version: 

```

getHtml(
  type: ICON_TYPE | string
): SafeHtml

```


Current version: 

```

getHtml(
  type: ICON_TYPE | string
): SafeHtml | undefined

```


### Method getSymbol changed.


Previous version: 

```

getSymbol(
  iconType: ICON_TYPE | string
): string

```


Current version: 

```

getSymbol(
  iconType: ICON_TYPE | string
): string | undefined

```




# Class InnerComponentsHostDirective 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  data: CmsComponentData<CmsComponent>,
  vcr: ViewContainerRef,
  cmsComponentsService: CmsComponentsService,
  injector: Injector,
  dynamicAttributeService: DynamicAttributeService,
  renderer: Renderer2,
  componentHandler: ComponentHandlerService,
  cmsInjector: CmsInjectorService
)

```


Current version: 

```

constructor(
  data: CmsComponentData<CmsComponent>,
  vcr: ViewContainerRef,
  cmsComponentsService: CmsComponentsService,
  injector: Injector,
  dynamicAttributeService: DynamicAttributeService,
  renderer: Renderer2,
  componentHandler: ComponentHandlerService,
  cmsInjector: CmsInjectorService,
  eventService: EventService
)

```




# Class JsonLdDirective 
## @spartacus/storefront


### Method generateJsonLdScript changed.


Previous version: 

```

generateJsonLdScript(
  schema: string | {}
): SafeHtml

```


Current version: 

```

generateJsonLdScript(
  schema: string | {}
): SafeHtml | undefined

```


### Property jsonLD changed.


Previous version: 

```
jsonLD: SafeHtml
```


Current version: 

```
jsonLD: SafeHtml | undefined
```




# Class KeyboardFocusConfig 
## @spartacus/storefront


Class KeyboardFocusConfig has been removed and is no longer part of the public API.




# Function keyboardFocusFactory 
## @spartacus/storefront


Function keyboardFocusFactory has been removed and is no longer part of the public API.




# Class LaunchDialogService 
## @spartacus/storefront


### Property dialogClose changed.


Previous version: 

```
dialogClose: Observable<string>
```


Current version: 

```
dialogClose: Observable<string | undefined>
```


### Method getStrategy changed.


Previous version: 

```

getStrategy(
  config: LaunchOptions
): LaunchRenderStrategy

```


Current version: 

```

getStrategy(
  config: LaunchOptions
): LaunchRenderStrategy | undefined

```




# Class LinkComponent 
## @spartacus/storefront


### Property styleClasses changed.


Previous version: 

```
styleClasses: string
```


Current version: 

```
styleClasses: string | undefined
```




# Class LoginGuard 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService,
  authRedirectService: AuthRedirectService,
  authConfigService: AuthConfigService,
  cmsPageGuard: CmsPageGuard
)

```


Current version: 

```

constructor(
  authService: AuthService,
  authConfigService: AuthConfigService,
  cmsPageGuard: CmsPageGuard
)

```


### Property authRedirectService is removed.





# Class LogoutGuard 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  auth: AuthService,
  cms: CmsService,
  semanticPathService: SemanticPathService,
  protectedRoutes: ProtectedRoutesService,
  router: Router,
  authRedirectService: AuthRedirectService
)

```


Current version: 

```

constructor(
  auth: AuthService,
  cms: CmsService,
  semanticPathService: SemanticPathService,
  protectedRoutes: ProtectedRoutesService,
  router: Router
)

```


### Property authRedirectService is removed.





# Class MediaComponent 
## @spartacus/storefront


### Property loadingStrategy changed.


Previous version: 

```
loadingStrategy: string | ImageLoadingStrategy | null
```


Current version: 

```
loadingStrategy: ImageLoadingStrategy | null
```


### Property media changed.


Previous version: 

```
media: Media
```


Current version: 

```
media: Media | undefined
```




# Class MediaService 
## @spartacus/storefront


### Method resolveBestFormat changed.


Previous version: 

```

resolveBestFormat(
  media: MediaContainer | Image
): string

```


Current version: 

```

resolveBestFormat(
  media: MediaContainer | Image
): string | undefined

```




# Class MessageComponent 
## @spartacus/storefront


### Property getIconType changed.


Previous version: 

```
getIconType: string
```


Current version: 

```
getIconType: ICON_TYPE
```




# Class MiniCartComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components/mini-cart


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  miniCartComponentService: MiniCartComponentService
)

```


### Property activeCartService is removed.





# Class MiniCartModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components/mini-cart




# Class ModalService 
## @spartacus/storefront


### Method getActiveModal changed.


Previous version: 

```

getActiveModal(): ModalRef

```


Current version: 

```

getActiveModal(): ModalRef | null

```




# Class MyInterestsComponent 
## @spartacus/storefront


### Method removeInterest changed.


Previous version: 

```

removeInterest(
  relation: ProductInterestEntryRelation & {
        product$?: Observable<Product>;
    }
): void

```


Current version: 

```

removeInterest(
  relation: ProductInterestEntryRelation & {
        product$?: Observable<Product | undefined>;
    }
): void

```




# Class NavigationComponent 
## @spartacus/storefront


### Property styleClass$ changed.


Previous version: 

```
styleClass$: Observable<string>
```


Current version: 

```
styleClass$: Observable<string | undefined>
```




# Class NavigationService 
## @spartacus/storefront


### Method getLink changed.


Previous version: 

```

getLink(
  item: any
): string | string[]

```


Current version: 

```

getLink(
  item: any
): string | string[] | undefined

```




# Class NavigationUIComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  router: Router,
  renderer: Renderer2,
  elemRef: ElementRef,
  hamburgerMenuService: HamburgerMenuService
)

```


Current version: 

```

constructor(
  router: Router,
  renderer: Renderer2,
  elemRef: ElementRef,
  hamburgerMenuService: HamburgerMenuService,
  winRef: WindowRef
)

```


### Property node changed.


Previous version: 

```
node: NavigationNode
```


Current version: 

```
node: NavigationNode | null
```


### Method reinitalizeMenu is removed.

Use 'reinitializeMenu' instead.

### Property resetMenuOnClose changed.


Previous version: 

```
resetMenuOnClose: boolean
```


Current version: 

```
resetMenuOnClose: boolean | undefined
```




# Variable ORDER_ENTRIES_CONTEXT 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class OrderAmendService 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderCancellationGuard 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderCancellationModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderCancellationService 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  userOrderService: UserOrderService,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  orderHistoryFacade: OrderHistoryFacade,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


### Property userOrderService is removed.





# Class OrderConsignedEntriesComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderDetailActionsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderDetailItemsComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  component: CmsComponentData<CmsOrderDetailItemsComponent>,
  translation: TranslationService
)

```


### Property cancel$ changed.


Previous version: 

```
cancel$: Observable<Consignment[]>
```


Current version: 

```
cancel$: Observable<Consignment[] | undefined>
```


### Property completed$ changed.


Previous version: 

```
completed$: Observable<Consignment[]>
```


Current version: 

```
completed$: Observable<Consignment[] | undefined>
```


### Property order$ changed.


Previous version: 

```
order$: Observable<any>
```


Current version: 

```
order$: Observable<Order>
```


### Property others$ changed.


Previous version: 

```
others$: Observable<Consignment[]>
```


Current version: 

```
others$: Observable<Consignment[] | undefined>
```




# Class OrderDetailShippingComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderDetailsModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderDetailsService 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: UserOrderService,
  routingService: RoutingService,
  unifiedInjector: UnifiedInjector
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade,
  routingService: RoutingService
)

```




# Class OrderDetailsServiceTransitionalToken 
## @spartacus/storefront


Class OrderDetailsServiceTransitionalToken has been removed and is no longer part of the public API.




# Class OrderDetailTotalsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# TypeAlias OrderEntriesContext 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Enum OrderEntriesSource 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class OrderHistoryComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routing: RoutingService,
  userOrderService: UserOrderService,
  translation: TranslationService,
  userReplenishmentOrderService: UserReplenishmentOrderService
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


### Property orders$ changed.


Previous version: 

```
orders$: Observable<OrderHistoryList>
```


Current version: 

```
orders$: Observable<OrderHistoryList | undefined>
```


### Property userOrderService is removed.



### Property userReplenishmentOrderService is removed.





# Class OrderHistoryModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderModule 
## @spartacus/storefront

moved to @spartacus/order




# Class OrderOverviewComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Method getOrderCurrentDateCardContent changed.


Previous version: 

```

getOrderCurrentDateCardContent(
  isoDate: string
): Observable<Card>

```


Current version: 

```

getOrderCurrentDateCardContent(
  isoDate: string | null
): Observable<Card>

```


### Method getReplenishmentNextDateCardContent changed.


Previous version: 

```

getReplenishmentNextDateCardContent(
  isoDate: string
): Observable<Card>

```


Current version: 

```

getReplenishmentNextDateCardContent(
  isoDate: string | null
): Observable<Card>

```


### Method getReplenishmentStartOnCardContent changed.


Previous version: 

```

getReplenishmentStartOnCardContent(
  isoDate: string
): Observable<Card>

```


Current version: 

```

getReplenishmentStartOnCardContent(
  isoDate: string | null
): Observable<Card>

```




# Class OrderOverviewModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderReturnGuard 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderReturnModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class OrderReturnRequestListComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  returnRequestService: OrderReturnRequestService,
  translation: TranslationService
)

```


Current version: 

```

constructor(
  returnRequestService: OrderReturnRequestFacade,
  translation: TranslationService
)

```


### Property returnRequests$ changed.


Previous version: 

```
returnRequests$: Observable<ReturnRequestList>
```


Current version: 

```
returnRequests$: Observable<ReturnRequestList | undefined>
```




# Class OrderReturnService 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  returnRequestService: OrderReturnRequestService,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService,
  returnRequestService: OrderReturnRequestFacade,
  routing: RoutingService,
  globalMessageService: GlobalMessageService
)

```


### Property returnRequestService changed.


Previous version: 

```
returnRequestService: OrderReturnRequestService
```


Current version: 

```
returnRequestService: OrderReturnRequestFacade
```




# Class OrderSummaryComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class OutletDirective 
## @spartacus/storefront


### Property loaded changed.


Previous version: 

```
loaded: EventEmitter<Boolean>
```


Current version: 

```
loaded: EventEmitter<boolean>
```




# Class OutletService 
## @spartacus/storefront


### Method get changed.


Previous version: 

```

get(
  outlet: string,
  position: OutletPosition,
  stacked: boolean
): T[] | T

```


Current version: 

```

get(
  outlet: string,
  position: OutletPosition,
  stacked: boolean
): T[] | T | undefined

```




# Variable PAGE_LAYOUT_HANDLER 
## @spartacus/storefront


Variable PAGE_LAYOUT_HANDLER changed.

Previous version: 

```
PAGE_LAYOUT_HANDLER: InjectionToken<PageLayoutHandler[]>
```


Current version: 

```
PAGE_LAYOUT_HANDLER: InjectionToken<PageLayoutHandler>
```




# Class PageLayoutComponent 
## @spartacus/storefront


### Property pageFoldSlot$ changed.


Previous version: 

```
pageFoldSlot$: Observable<string>
```


Current version: 

```
pageFoldSlot$: Observable<string | undefined>
```


### Property section$ changed.


Previous version: 

```
section$: BehaviorSubject<string>
```


Current version: 

```
section$: BehaviorSubject<string | undefined>
```




# Class PageLayoutService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  cms: CmsService,
  config: LayoutConfig,
  breakpointService: BreakpointService,
  handlers: PageLayoutHandler[]
)

```


Current version: 

```

constructor(
  cms: CmsService,
  config: LayoutConfig,
  breakpointService: BreakpointService,
  unifiedInjector: UnifiedInjector
)

```


### Method getPageFoldSlot changed.


Previous version: 

```

getPageFoldSlot(
  pageTemplate: string
): Observable<string>

```


Current version: 

```

getPageFoldSlot(
  pageTemplate: string
): Observable<string | undefined>

```


### Method getSlotConfig changed.


Previous version: 

```

getSlotConfig(
  templateUid: string,
  configAttribute: string,
  section: string,
  breakpoint: BREAKPOINT
): SlotConfig

```


Current version: 

```

getSlotConfig(
  templateUid: string,
  configAttribute: string,
  section: string,
  breakpoint: BREAKPOINT
): SlotConfig | undefined

```


### Method getSlotConfigForSection changed.


Previous version: 

```

getSlotConfigForSection(
  templateUid: string,
  configAttribute: string,
  section: string,
  breakpoint: BREAKPOINT
): SlotConfig

```


Current version: 

```

getSlotConfigForSection(
  templateUid: string,
  configAttribute: string,
  section: string,
  breakpoint: BREAKPOINT
): SlotConfig | undefined

```




# Class PageSlotComponent 
## @spartacus/storefront


### Property position changed.


Previous version: 

```
position: string
```


Current version: 

```
position: string | undefined
```


### Property position$ changed.


Previous version: 

```
position$: BehaviorSubject<string>
```


Current version: 

```
position$: BehaviorSubject<string | undefined>
```




# Class PageSlotService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  cmsComponentsService: CmsComponentsService,
  platformId: any,
  document: any
)

```


Current version: 

```

constructor(
  cmsComponentsService: CmsComponentsService,
  platformId: any,
  document: Document
)

```


### Property document changed.


Previous version: 

```
document: any
```


Current version: 

```
document: Document
```


### Method getComponentDeferOptions changed.


Previous version: 

```

getComponentDeferOptions(
  slot: string,
  componentType: string
): IntersectionOptions

```


Current version: 

```

getComponentDeferOptions(
  slot: string | undefined,
  componentType: string
): IntersectionOptions

```


### Property prerenderedSlots changed.


Previous version: 

```
prerenderedSlots: string[] | undefined
```


Current version: 

```
prerenderedSlots: (string | null)[] | undefined
```




# Class PaginationBuilder 
## @spartacus/storefront


### Method getStartOfRange changed.


Previous version: 

```

getStartOfRange(
  pageCount: number,
  current: number
): number

```


Current version: 

```

getStartOfRange(
  pageCount: number,
  current: number
): number | null

```




# Class PaginationComponent 
## @spartacus/storefront


### Property defaultPage changed.


Previous version: 

```
defaultPage: any
```


Current version: 

```
defaultPage: number | undefined
```




# Class ParagraphComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  component: CmsComponentData<CmsParagraphComponent>
)

```


Current version: 

```

constructor(
  component: CmsComponentData<CmsParagraphComponent>,
  router: Router
)

```




# Class PaymentMethodsComponent 
## @spartacus/storefront


### Property editCard changed.


Previous version: 

```
editCard: string
```


Current version: 

```
editCard: string | undefined
```




# Class PopoverComponent 
## @spartacus/storefront


### Method close changed.


Previous version: 

```

close(
  event: MouseEvent | KeyboardEvent
): void

```


Current version: 

```

close(
  event: MouseEvent | KeyboardEvent | Event
): void

```


### Method isClickedOnDirective changed.


Previous version: 

```

isClickedOnDirective(
  event: any
): any

```


Current version: 

```

isClickedOnDirective(
  event: MouseEvent
): any

```


### Method isClickedOnPopover changed.


Previous version: 

```

isClickedOnPopover(
  event: any
): any

```


Current version: 

```

isClickedOnPopover(
  event: MouseEvent
): any

```


### Property isTemplate is removed.





# Class PositioningService 
## @spartacus/storefront


### Method offset changed.


Previous version: 

```

offset(
  element: HTMLElement,
  round: boolean
): ClientRect

```


Current version: 

```

offset(
  element: HTMLElement,
  round: boolean
): UIPositionRectangle

```


### Method position changed.


Previous version: 

```

position(
  element: HTMLElement,
  round: boolean
): ClientRect

```


Current version: 

```

position(
  element: HTMLElement,
  round: boolean
): UIPositionRectangle

```




# Class ProductAttributesComponent 
## @spartacus/storefront


### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | null>
```




# Class ProductCarouselComponent 
## @spartacus/storefront


### Property items$ changed.


Previous version: 

```
items$: Observable<Observable<Product>[]>
```


Current version: 

```
items$: Observable<Observable<Product | undefined>[]>
```


### Property PRODUCT_SCOPE changed.


Previous version: 

```
PRODUCT_SCOPE: 
```


Current version: 

```
PRODUCT_SCOPE: ProductScope[]
```


### Property title$ changed.


Previous version: 

```
title$: Observable<string>
```


Current version: 

```
title$: Observable<string | undefined>
```




# TypeAlias ProductData 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class ProductDetailsTabComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  currentProductService: CurrentProductService
)

```


Current version: 

```

constructor(
  currentProductService: CurrentProductService,
  componentData: CmsComponentData<CmsComponentWithChildren>,
  cmsService: CmsService
)

```


### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | null>
```




# Interface ProductImportInfo 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Enum ProductImportStatus 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Interface ProductImportSummary 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class ProductIntroComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  currentProductService: CurrentProductService,
  translationService: TranslationService,
  winRef: WindowRef
)

```


Current version: 

```

constructor(
  currentProductService: CurrentProductService,
  translationService: TranslationService,
  winRef: WindowRef,
  eventService: EventService
)

```


### Method ngAfterContentChecked is removed.



### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | null>
```


### Property reviewsTabAvailable is removed.

Use 'areReviewsAvailable$' instead.



# Class ProductListComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  pageLayoutService: PageLayoutService,
  productListComponentService: ProductListComponentService,
  scrollConfig: ViewConfig
)

```


Current version: 

```

constructor(
  pageLayoutService: PageLayoutService,
  productListComponentService: ProductListComponentService,
  globalMessageService: GlobalMessageService,
  scrollConfig: ViewConfig
)

```


### Property isInfiniteScroll changed.


Previous version: 

```
isInfiniteScroll: boolean
```


Current version: 

```
isInfiniteScroll: boolean | undefined
```




# Class ProductListComponentService 
## @spartacus/storefront


### Method getQueryFromRouteParams changed.


Previous version: 

```

getQueryFromRouteParams(
  { query, categoryCode, brandCode, }: ProductListRouteParams
): string

```


Current version: 

```

getQueryFromRouteParams(
  { query, categoryCode, brandCode, }: ProductListRouteParams
): string | undefined

```




# Class ProductReferencesComponent 
## @spartacus/storefront


### Property items$ changed.


Previous version: 

```
items$: Observable<Observable<Product>[]>
```


Current version: 

```
items$: Observable<Observable<Product | undefined>[]>
```


### Property title$ changed.


Previous version: 

```
title$: Observable<string>
```


Current version: 

```
title$: Observable<string | undefined>
```




# Class ProductReviewsComponent 
## @spartacus/storefront


### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | null>
```




# Class ProductScrollComponent 
## @spartacus/storefront


### Property maxProducts changed.


Previous version: 

```
maxProducts: number
```


Current version: 

```
maxProducts: number | undefined
```


### Property productLimit changed.


Previous version: 

```
productLimit: number
```


Current version: 

```
productLimit: number | undefined
```




# Class ProductSummaryComponent 
## @spartacus/storefront


### Property product$ changed.


Previous version: 

```
product$: Observable<Product>
```


Current version: 

```
product$: Observable<Product | null>
```




# Class ProductViewComponent 
## @spartacus/storefront


### Property modeChange changed.


Previous version: 

```
modeChange: EventEmitter<string>
```


Current version: 

```
modeChange: EventEmitter<ViewModes>
```




# Class ProgressButtonComponent 
## @spartacus/storefront


### Property clikEvent is removed.

Use 'clickEvent' instead.



# Class ReplenishmentOrderCancellationComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userReplenishmentOrderService: UserReplenishmentOrderService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderCancellationDialogComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userReplenishmentOrderService: UserReplenishmentOrderService,
  globalMessageService: GlobalMessageService,
  launchDialogService: LaunchDialogService,
  el: ElementRef
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  globalMessageService: GlobalMessageService,
  launchDialogService: LaunchDialogService,
  el: ElementRef
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderCancellationDialogModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReplenishmentOrderDetailsModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReplenishmentOrderDetailsService 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routingService: RoutingService,
  userReplenishmentOrderService: UserReplenishmentOrderService
)

```


Current version: 

```

constructor(
  routingService: RoutingService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
)

```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderHistoryComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routing: RoutingService,
  userReplenishmentOrderService: UserReplenishmentOrderService,
  translation: TranslationService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  routing: RoutingService,
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade,
  translation: TranslationService,
  vcr: ViewContainerRef,
  launchDialogService: LaunchDialogService
)

```


### Property replenishmentOrders$ changed.


Previous version: 

```
replenishmentOrders$: Observable<ReplenishmentOrderList>
```


Current version: 

```
replenishmentOrders$: Observable<ReplenishmentOrderList | undefined>
```


### Property userReplenishmentOrderService is removed.





# Class ReplenishmentOrderHistoryModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnOrderComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnOrderConfirmationComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnOrderConfirmationModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnOrderModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnRequestDetailModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnRequestItemsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnRequestListModule 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnRequestOverviewComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class ReturnRequestTotalsComponent 
## @spartacus/storefront

moved to @spartacus/order/components




# Class RoutingContextService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  activatedRoutesService: ActivatedRoutesService,
  injector: Injector
)

```


Current version: 

```

constructor(
  activatedRoutesService: ActivatedRoutesService,
  injector: UnifiedInjector
)

```


### Property injector changed.


Previous version: 

```
injector: Injector
```


Current version: 

```
injector: UnifiedInjector
```




# Class SaveForLaterComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  cmsService: CmsService,
  cartService: ActiveCartService,
  selectiveCartService: SelectiveCartService
)

```


Current version: 

```

constructor(
  cmsService: CmsService,
  cartService: ActiveCartFacade,
  selectiveCartService: SelectiveCartFacade
)

```


### Property cartService changed.


Previous version: 

```
cartService: ActiveCartService
```


Current version: 

```
cartService: ActiveCartFacade
```


### Property selectiveCartService changed.


Previous version: 

```
selectiveCartService: SelectiveCartService
```


Current version: 

```
selectiveCartService: SelectiveCartFacade
```




# Class SaveForLaterModule 
## @spartacus/storefront

moved to @spartacus/cart/base/components




# Class SearchBoxComponentService 
## @spartacus/storefront


### Method getExactSuggestion changed.


Previous version: 

```

getExactSuggestion(
  config: SearchBoxConfig
): Observable<string>

```


Current version: 

```

getExactSuggestion(
  config: SearchBoxConfig
): Observable<string | undefined>

```


### Method getSearchMessage changed.


Previous version: 

```

getSearchMessage(
  config: SearchBoxConfig
): Observable<string>

```


Current version: 

```

getSearchMessage(
  config: SearchBoxConfig
): Observable<string | undefined>

```




# Interface SearchBoxConfig 
## @spartacus/storefront


### PropertySignature displayProductImages changed.


Previous version: 

```
displayProductImages: boolean
```


Current version: 

```
displayProductImages: boolean | string
```


### PropertySignature displayProducts changed.


Previous version: 

```
displayProducts: boolean
```


Current version: 

```
displayProducts: boolean | string
```


### PropertySignature displaySuggestions changed.


Previous version: 

```
displaySuggestions: boolean
```


Current version: 

```
displaySuggestions: boolean | string
```




# Class SearchBoxSuggestionSelectedEvent 
## @spartacus/storefront


### Property searchSuggestions changed.


Previous version: 

```
searchSuggestions: Suggestion[]
```


Current version: 

```
searchSuggestions: (Suggestion | string)[]
```




# Class SelectFocusUtility 
## @spartacus/storefront


### Method findFirstFocusable changed.


Previous version: 

```

findFirstFocusable(
  host: HTMLElement,
  config: AutoFocusConfig
): HTMLElement

```


Current version: 

```

findFirstFocusable(
  host: HTMLElement | null | undefined,
  config: AutoFocusConfig
): HTMLElement | undefined

```


### Method findFocusable changed.


Previous version: 

```

findFocusable(
  host: HTMLElement,
  locked: boolean,
  invisible: boolean
): HTMLElement[]

```


Current version: 

```

findFocusable(
  host: HTMLElement | null | undefined,
  locked: boolean,
  invisible: boolean
): HTMLElement[]

```


### Method query changed.


Previous version: 

```

query(
  host: HTMLElement,
  selector: string
): HTMLElement[]

```


Current version: 

```

query(
  host: HTMLElement | null | undefined,
  selector: string
): HTMLElement[]

```




# Class SeoMetaService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  ngTitle: Title,
  ngMeta: Meta,
  pageMetaService: PageMetaService,
  pageMetaLinkService: PageMetaLinkService
)

```


Current version: 

```

constructor(
  ngTitle: Title,
  ngMeta: Meta,
  pageMetaService: PageMetaService,
  pageMetaLinkService: PageMetaLinkService | undefined
)

```


### Property pageMetaLinkService changed.


Previous version: 

```
pageMetaLinkService: PageMetaLinkService
```


Current version: 

```
pageMetaLinkService: PageMetaLinkService | undefined
```




# Class SiteContextComponentService 
## @spartacus/storefront


### Method getContext changed.


Previous version: 

```

getContext(
  context: SiteContextType
): Observable<string>

```


Current version: 

```

getContext(
  context: SiteContextType
): Observable<string | undefined>

```




# Class SortingComponent 
## @spartacus/storefront


### Property selectedLabel changed.


Previous version: 

```
selectedLabel: string
```


Current version: 

```
selectedLabel: string | undefined
```


### Property selectedOption changed.


Previous version: 

```
selectedOption: string
```


Current version: 

```
selectedOption: string | undefined
```


### Property sortLabels changed.


Previous version: 

```
sortLabels: {
        [code: string]: string;
    }
```


Current version: 

```
sortLabels: {
        [code: string]: string;
    } | null
```


### Property sortOptions changed.


Previous version: 

```
sortOptions: SortModel[]
```


Current version: 

```
sortOptions: SortModel[] | undefined
```




# Class SplitViewService 
## @spartacus/storefront


### Property _views$ changed.


Previous version: 

```
_views$: BehaviorSubject<any[]>
```


Current version: 

```
_views$: BehaviorSubject<SplitViewState[]>
```




# Class StorefrontComponent 
## @spartacus/storefront


### Property startNavigating changed.


Previous version: 

```
startNavigating: any
```


Current version: 

```
startNavigating: boolean
```


### Property stopNavigating changed.


Previous version: 

```
stopNavigating: any
```


Current version: 

```
stopNavigating: boolean
```




# Class TableHeaderCellComponent 
## @spartacus/storefront


### Property fieldOptions changed.


Previous version: 

```
fieldOptions: TableFieldOptions
```


Current version: 

```
fieldOptions: TableFieldOptions | undefined
```


### Property header changed.


Previous version: 

```
header: string
```


Current version: 

```
header: string | undefined
```


### Property i18nRoot changed.


Previous version: 

```
i18nRoot: string
```


Current version: 

```
i18nRoot: string | undefined
```




# Class TableRendererService 
## @spartacus/storefront


### Method getDataOutletContext changed.


Previous version: 

```

getDataOutletContext(
  type: string,
  options: TableOptions,
  i18nRoot: string,
  field: string,
  data: any
): TableDataOutletContext

```


Current version: 

```

getDataOutletContext(
  type: string,
  options: TableOptions | undefined,
  i18nRoot: string,
  field: string,
  data: any
): TableDataOutletContext

```


### Method getDataRenderer changed.


Previous version: 

```

getDataRenderer(
  structure: TableStructure,
  field: string
): Type<any>

```


Current version: 

```

getDataRenderer(
  structure: TableStructure,
  field: string
): Type<any> | undefined

```


### Method getHeaderOutletContext changed.


Previous version: 

```

getHeaderOutletContext(
  type: string,
  options: TableOptions,
  i18nRoot: string,
  field: string
): TableHeaderOutletContext

```


Current version: 

```

getHeaderOutletContext(
  type: string,
  options: TableOptions | undefined,
  i18nRoot: string,
  field: string
): TableHeaderOutletContext

```


### Method getHeaderRenderer changed.


Previous version: 

```

getHeaderRenderer(
  structure: TableStructure,
  field: string
): Type<any>

```


Current version: 

```

getHeaderRenderer(
  structure: TableStructure,
  field: string
): Type<any> | undefined

```




# Class TableService 
## @spartacus/storefront


### Method getTableConfig changed.


Previous version: 

```

getTableConfig(
  type: string,
  breakpoint: BREAKPOINT,
  defaultStructure: ResponsiveTableConfiguration
): TableStructureConfiguration

```


Current version: 

```

getTableConfig(
  type: string,
  breakpoint: BREAKPOINT,
  defaultStructure: ResponsiveTableConfiguration
): TableStructureConfiguration | null

```




# Class TabParagraphContainerComponent 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  componentData: CmsComponentData<CMSTabParagraphContainer>,
  cmsService: CmsService,
  winRef: WindowRef,
  breakpointService: BreakpointService
)

```


Current version: 

```

constructor(
  componentData: CmsComponentData<CMSTabParagraphContainer>,
  cmsService: CmsService,
  winRef: WindowRef
)

```


### Property breakpointService is removed.



### Method ngOnDestroy is removed.



### Property subscription is removed.





# Class ThemeService 
## @spartacus/storefront


### Method setTheme changed.


Previous version: 

```

setTheme(
  theme: string
): void

```


Current version: 

```

setTheme(
  theme: string | undefined
): void

```




# Variable titleScores 
## @spartacus/storefront


Variable titleScores changed.

Previous version: 

```
titleScores: {
    mr: number;
    mrs: number;
    miss: number;
    ms: number;
    dr: number;
    rev: number;
}
```


Current version: 

```
titleScores: {
    [code: string]: number;
}
```




# Class TrackingEventsComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeModal: NgbActiveModal,
  userOrderService: UserOrderService
)

```


Current version: 

```

constructor(
  activeModal: NgbActiveModal,
  orderHistoryFacade: OrderHistoryFacade
)

```




# Class ViewComponent 
## @spartacus/storefront


### Property _hidden changed.


Previous version: 

```
_hidden: any
```


Current version: 

```
_hidden: boolean | undefined
```


### Property disappeared changed.


Previous version: 

```
disappeared: boolean
```


Current version: 

```
disappeared: boolean | undefined
```




# Class WishListComponent 
## @spartacus/storefront

moved to @spartacus/cart/wish-list/components


### Constructor changed.


Previous version: 

```

constructor(
  wishListService: WishListService
)

```


Current version: 

```

constructor(
  wishListFacade: WishListFacade
)

```


### Property wishListService is removed.





# Class WishListItemComponent 
## @spartacus/storefront

moved to @spartacus/cart/wish-list/components




# Class WishListModule 
## @spartacus/storefront

moved to @spartacus/cart/wish-list




# Class RegisterComponent 
## @spartacus/user/profile/components


### Property anonymousConsent$ changed.


Previous version: 

```
anonymousConsent$: Observable<{
        consent: AnonymousConsent;
        template: string;
    }>
```


Current version: 

```
anonymousConsent$: Observable<{
        consent: AnonymousConsent | undefined;
        template: string;
    }>
```


### Method isConsentGiven changed.


Previous version: 

```

isConsentGiven(
  consent: AnonymousConsent
): boolean

```


Current version: 

```

isConsentGiven(
  consent: AnonymousConsent | undefined
): boolean

```

