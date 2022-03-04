


# Class CartQuickOrderFormComponent 
## @spartacus/cart/quick-order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
  eventService: EventService
  formBuilder: FormBuilder
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  eventService: EventService
  formBuilder: FormBuilder
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
  activeCartService: ActiveCartService
  component: CmsComponentData<CmsQuickOrderComponent>
  globalMessageService: GlobalMessageService
  quickOrderService: QuickOrderFacade
  quickOrderStatePersistenceService: QuickOrderStatePersistenceService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  component: CmsComponentData<CmsQuickOrderComponent>
  globalMessageService: GlobalMessageService
  quickOrderService: QuickOrderFacade
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




# Class QuickOrderService 
## @spartacus/cart/quick-order/core


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
  eventService: EventService
  productSearchConnector: ProductSearchConnector
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  eventService: EventService
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




# Class QuickOrderOrderEntriesContext 
## @spartacus/cart/quick-order/root

moved to @spartacus/cart/quick-order/components




# Class AddToSavedCartComponent 
## @spartacus/cart/saved-cart/components


### Constructor changed.


Previous version: 

```

constructor(
  activeCartService: ActiveCartService
  authService: AuthService
  routingService: RoutingService
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
  authService: AuthService
  routingService: RoutingService
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


### Property activeCartService is removed.





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
  actionsSubject: ActionsSubject
  eventService: EventService
  stateEventService: StateEventService
  multiCartService: MultiCartService
)

```


Current version: 

```

constructor(
  actionsSubject: ActionsSubject
  eventService: EventService
  stateEventService: StateEventService
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

It was moved to 'CartEventBuilder', and was renamed to 'registerDeleteCart'.



# Class SavedCartService 
## @spartacus/cart/saved-cart/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart | StateWithProcess<void>>
  userIdService: UserIdService
  userService: UserService
  multiCartService: MultiCartService
  eventService: EventService
)

```


Current version: 

```

constructor(
  store: Store<StateWithMultiCart | StateWithProcess<void>>
  userIdService: UserIdService
  userService: UserService
  multiCartService: MultiCartFacade
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
  actionsSubject: ActionsSubject
  userIdService: UserIdService
  multiCartService: MultiCartService
  savedCartService: SavedCartFacade
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService
  userIdService: UserIdService
  multiCartService: MultiCartFacade
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
  actionsSubject: ActionsSubject
  userIdService: UserIdService
  multiCartService: MultiCartService
  savedCartService: SavedCartFacade
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService
  userIdService: UserIdService
  multiCartService: MultiCartFacade
  savedCartService: SavedCartFacade
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
  activeCartService: ActiveCartService
  semanticPathService: SemanticPathService
  router: Router
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
  semanticPathService: SemanticPathService
  router: Router
)

```


### Property activeCartService is removed.





# Class CheckoutAuthGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  authService: AuthService
  authRedirectService: AuthRedirectService
  checkoutConfigService: CheckoutConfigService
  activeCartService: ActiveCartService
  semanticPathService: SemanticPathService
  router: Router
  userService: UserAccountFacade
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  authService: AuthService
  authRedirectService: AuthRedirectService
  checkoutConfigService: CheckoutConfigService
  activeCartFacade: ActiveCartFacade
  semanticPathService: SemanticPathService
  router: Router
)

```


### Property activeCartService is removed.



### Property globalMessageService is removed.



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



### Property userService is removed.





# Class CheckoutComponentsModule 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutConfigService 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components




# Class CheckoutDetailsService 
## @spartacus/checkout/components


Class CheckoutDetailsService has been removed and is no longer part of the public API.




# Class CheckoutGuard 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  router: Router
  routingConfigService: RoutingConfigService
  checkoutConfigService: CheckoutConfigService
  expressCheckoutService: ExpressCheckoutService
  activeCartService: ActiveCartService
  checkoutStepService: CheckoutStepService
)

```


Current version: 

```

constructor(
  router: Router
  routingConfigService: RoutingConfigService
  checkoutConfigService: CheckoutConfigService
  expressCheckoutService: ExpressCheckoutService
  activeCartFacade: ActiveCartFacade
  checkoutStepService: CheckoutStepService
)

```


### Property activeCartService is removed.





# Class CheckoutLoginComponent 
## @spartacus/checkout/components

moved to @spartacus/checkout/base/components


### Constructor changed.


Previous version: 

```

constructor(
  formBuilder: FormBuilder
  authRedirectService: AuthRedirectService
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  formBuilder: FormBuilder
  authRedirectService: AuthRedirectService
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
  activeCartService: ActiveCartService
  checkoutStepService: CheckoutStepService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
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
  currentStepType: CheckoutStepType
  disabled: boolean
): void

```


Current version: 

```

disableEnableStep(
  currentStepType: CheckoutStepType | string
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
  paymentTypeService: PaymentTypeFacade
  checkoutStepService: CheckoutStepService
  checkoutDetailsService: CheckoutDetailsService
  routingConfigService: RoutingConfigService
  checkoutCostCenterService: CheckoutCostCenterFacade
  router: Router
)

```


Current version: 

```

constructor(
  checkoutStepService: CheckoutStepService
  routingConfigService: RoutingConfigService
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade
  checkoutPaymentFacade: CheckoutPaymentFacade
  checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
  router: Router
)

```


### Method canActivate changed.


Previous version: 

```

canActivate(
  route: ActivatedRouteSnapshot
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
  step: CheckoutStep
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
  userAddressService: UserAddressService
  userPaymentService: UserPaymentService
  checkoutDeliveryService: CheckoutDeliveryFacade
  checkoutPaymentService: CheckoutPaymentFacade
  checkoutDetailsService: CheckoutDetailsService
  checkoutConfigService: CheckoutConfigService
  clearCheckoutService: ClearCheckoutFacade
)

```


Current version: 

```

constructor(
  userAddressService: UserAddressService
  userPaymentService: UserPaymentService
  checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade
  checkoutPaymentFacade: CheckoutPaymentFacade
  checkoutConfigService: CheckoutConfigService
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
  authService: AuthService
  activeCartService: ActiveCartService
  semanticPathService: SemanticPathService
  router: Router
)

```


Current version: 

```

constructor(
  authService: AuthService
  activeCartFacade: ActiveCartFacade
  semanticPathService: SemanticPathService
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
  checkoutService: CheckoutFacade
  router: Router
  semanticPathService: SemanticPathService
)

```


Current version: 

```

constructor(
  orderFacade: OrderFacade
  router: Router
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

moved to @spartacus/checkout/base/core




# Interface CardTypesState 
## @spartacus/checkout/core


Interface CardTypesState has been removed and is no longer part of the public API.




# Variable CHECKOUT_DETAILS 
## @spartacus/checkout/core


Variable CHECKOUT_DETAILS has been removed and is no longer part of the public API.




# Variable CHECKOUT_FEATURE 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/root




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
  checkoutStore: Store<StateWithCheckout>
  activeCartService: ActiveCartService
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
  userIdService: UserIdService
  commandService: CommandService
  checkoutCostCenterConnector: CheckoutCostCenterConnector
  checkoutQueryFacade: CheckoutQueryFacade
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
  _checkoutEventBuilder: CheckoutEventBuilder
  _checkoutEventListener: CheckoutEventListener
)

```


Current version: 

```

constructor(
  _checkoutDeliveryAddressEventListener: CheckoutDeliveryAddressEventListener
  _checkoutDeliveryModeEventListener: CheckoutDeliveryModeEventListener
  _checkoutPaymentEventListener: CheckoutPaymentEventListener
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
  translation: TranslationService
  activeCartService: ActiveCartService
  basePageMetaResolver: BasePageMetaResolver
)

```


Current version: 

```

constructor(
  translationService: TranslationService
  activeCartFacade: ActiveCartFacade
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



### Method set is removed.





# Class CheckoutPaymentService 
## @spartacus/checkout/core

moved to @spartacus/checkout/base/core


### Constructor changed.


Previous version: 

```

constructor(
  checkoutStore: Store<StateWithCheckout>
  processStateStore: Store<StateWithProcess<void>>
  activeCartService: ActiveCartService
  userIdService: UserIdService
  checkoutService: CheckoutService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
  userIdService: UserIdService
  queryService: QueryService
  commandService: CommandService
  eventService: EventService
  checkoutPaymentConnector: CheckoutPaymentConnector
  checkoutQueryFacade: CheckoutQueryFacade
)

```


### Method actionAllowed is removed.



### Property activeCartService is removed.



### Property checkoutService is removed.



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
  store: Store<StateWithMultiCart>
  multiCartService: MultiCartService
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  multiCartFacade: MultiCartFacade
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
  cartState: ProcessesLoaderState<Cart>
  cartId: string
): boolean

```


Current version: 

```

isCartCreating(
  cartState: StateUtils.ProcessesLoaderState<Cart | undefined>
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





# Enum B2BPaymentTypeEnum 
## @spartacus/core

moved to @spartacus/checkout/b2b/root




# Class BadRequestHandler 
## @spartacus/core


### Method handleBadCartRequest is removed.



### Method handleVoucherOperationError is removed.





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
  userId: string
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string
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
  userId: string
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string
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
  actionsSubject: ActionsSubject
  event: EventService
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  actionsSubject: ActionsSubject
  event: EventService
  activeCartService: ActiveCartFacade
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
  cartValidationConnector: CartValidationConnector
  command: CommandService
  userIdService: UserIdService
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  cartValidationConnector: CartValidationConnector
  command: CommandService
  userIdService: UserIdService
  activeCartFacade: ActiveCartFacade
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
  store: Store<fromProcessStore.StateWithProcess<void>>
  activeCartService: ActiveCartService
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithProcess<void>>
  activeCartFacade: ActiveCartFacade
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
  commandFactory: (command: P) => Observable<any>
  options: {
        strategy?: CommandStrategy;
    }
): Command<P, R>

```


Current version: 

```

create(
  commandFactory: (command: PARAMS) => Observable<any>
  options: {
        strategy?: CommandStrategy;
    }
): Command<PARAMS, RESULT>

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
  source: S
  target: T
): T

```


Current version: 

```

convert(
  source: SOURCE
  target: TARGET
): TARGET

```




# Enum DaysOfWeek 
## @spartacus/core

moved to @spartacus/order/root




# Class DeleteUserAddressEvent 
## @spartacus/core


### Property userId is removed.





# Interface DeliveryMode 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface DeliveryOrderEntryGroup 
## @spartacus/core

moved to @spartacus/cart/base/root




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




# Enum GlobalMessageType 
## @spartacus/core


Enum GlobalMessageType changed.

Previous version: 

```
MSG_TYPE_CONFIRMATION,
MSG_TYPE_ERROR,
MSG_TYPE_INFO,
MSG_TYPE_WARNING
```


Current version: 

```
MSG_TYPE_ASSISTIVE,
MSG_TYPE_CONFIRMATION,
MSG_TYPE_ERROR,
MSG_TYPE_INFO,
MSG_TYPE_WARNING
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




# Variable MULTI_CART_DATA 
## @spartacus/core

moved to @spartacus/cart/base/core




# Variable MULTI_CART_FEATURE 
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
  cartId: string
  productCode: string
): Observable<OrderEntry | null>

```


Current version: 

```

getEntry(
  cartId: string
  productCode: string
): Observable<OrderEntry | undefined>

```


### Method getLastEntry changed.


Previous version: 

```

getLastEntry(
  cartId: string
  productCode: string
): Observable<OrderEntry | null>

```


Current version: 

```

getLastEntry(
  cartId: string
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




# Class OccCartAdapter 
## @spartacus/core

moved to @spartacus/cart/base/occ


### Method load changed.


Previous version: 

```

load(
  userId: string
  cartId: string
): Observable<Cart>

```


Current version: 

```

load(
  userId: string
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
  converter: ConverterService
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
  userId: string
  cartId: any
): string

```


Current version: 

```

getCartVoucherEndpoint(
  userId: string
  cartId: string
): string

```




# Interface OccEndpoints 
## @spartacus/core


### PropertySignature addEmail is removed.



### PropertySignature addEntries is removed.



### PropertySignature cancelOrder is removed.



### PropertySignature cancelReplenishmentOrder is removed.



### PropertySignature cancelReturn is removed.



### PropertySignature cart is removed.



### PropertySignature carts is removed.



### PropertySignature cartVoucher is removed.



### PropertySignature consignmentTracking is removed.



### PropertySignature createCart is removed.



### PropertySignature deleteCart is removed.



### PropertySignature orderDetail is removed.



### PropertySignature orderHistory is removed.



### PropertySignature orderReturnDetail is removed.



### PropertySignature orderReturns is removed.



### PropertySignature removeEntries is removed.



### PropertySignature replenishmentOrderDetails is removed.



### PropertySignature replenishmentOrderDetailsHistory is removed.



### PropertySignature replenishmentOrderHistory is removed.



### PropertySignature returnOrder is removed.



### PropertySignature saveCart is removed.



### PropertySignature scheduleReplenishmentOrder is removed.



### PropertySignature updateEntries is removed.



### PropertySignature validate is removed.





# Class OccOrderNormalizer 
## @spartacus/core

moved to @spartacus/order/occ


### Constructor changed.


Previous version: 

```

constructor(
  converter: ConverterService
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
  converter: ConverterService
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
  store: Store<StateWithUser | StateWithProcess<void>>
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithOrder>
  processStateStore: Store<StateWithProcess<void>>
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




# Enum PromotionLocation 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface PromotionOrderEntryConsumed 
## @spartacus/core

moved to @spartacus/cart/base/root




# Interface PromotionResult 
## @spartacus/core

moved to @spartacus/cart/base/root




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
  store: Store<StateWithMultiCart>
  userService: UserService
  multiCartService: MultiCartService
  baseSiteService: BaseSiteService
  cartConfigService: CartConfigService
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  userService: UserService
  multiCartFacade: MultiCartFacade
  baseSiteService: BaseSiteService
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





# Function StateUtils.entityProcessesLoaderReducer 
## @spartacus/core


Function entityProcessesLoaderReducer changed.

Previous version: 

```

entityProcessesLoaderReducer(
  entityType: string
  reducer: (state: T, action: ProcessesLoaderAction) => T
): (state: EntityProcessesLoaderState<T>, action: EntityProcessesLoaderAction) => EntityProcessesLoaderState<T>

```


Current version: 

```

entityProcessesLoaderReducer(
  entityType: string
  reducer: (state: T, action: ProcessesLoaderAction) => T
): (state: EntityProcessesLoaderState<T> | undefined, action: EntityProcessesLoaderAction) => EntityProcessesLoaderState<T>

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




# TypeAlias UserActions.UserOrdersAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




# TypeAlias UserActions.UserReplenishmentOrdersAction 
## @spartacus/core

moved to @spartacus/order/core
moved to namespace OrderActions




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




# Class UserReplenishmentOrderAdapter 
## @spartacus/core


Class UserReplenishmentOrderAdapter has been removed and is no longer part of the public API.




# Class UserReplenishmentOrderConnector 
## @spartacus/core


Class UserReplenishmentOrderConnector has been removed and is no longer part of the public API.




# Class UserReplenishmentOrderService 
## @spartacus/core


Class UserReplenishmentOrderService has been removed and is no longer part of the public API.




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




# Class WishListService 
## @spartacus/core

moved to @spartacus/cart/wish-list/core


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithMultiCart>
  userService: UserService
  multiCartService: MultiCartService
  userIdService: UserIdService
)

```


Current version: 

```

constructor(
  store: Store<StateWithMultiCart>
  userService: UserService
  multiCartFacade: MultiCartFacade
  userIdService: UserIdService
)

```


### Property multiCartService is removed.





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
  userOrderService: OrderFacade
  modalService: ModalService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade
  modalService: ModalService
)

```




# Class OrderCancellationService 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  orderDetailsService: OrderDetailsService
  userOrderService: OrderFacade
  routing: RoutingService
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService
  orderHistoryFacade: OrderHistoryFacade
  routing: RoutingService
  globalMessageService: GlobalMessageService
)

```


### Property userOrderService is removed.





# Class OrderDetailsService 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: OrderFacade
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade
  routingService: RoutingService
)

```




# Class OrderHistoryComponent 
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  routing: RoutingService
  userOrderService: OrderFacade
  translation: TranslationService
  userReplenishmentOrderService: ReplenishmentOrderFacade
)

```


Current version: 

```

constructor(
  routing: RoutingService
  orderHistoryFacade: OrderHistoryFacade
  translation: TranslationService
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
  userReplenishmentOrderService: ReplenishmentOrderFacade
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  vcr: ViewContainerRef
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
  userReplenishmentOrderService: ReplenishmentOrderFacade
  globalMessageService: GlobalMessageService
  launchDialogService: LaunchDialogService
  el: ElementRef
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  globalMessageService: GlobalMessageService
  launchDialogService: LaunchDialogService
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
  routingService: RoutingService
  userReplenishmentOrderService: ReplenishmentOrderFacade
)

```


Current version: 

```

constructor(
  routingService: RoutingService
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
  routing: RoutingService
  userReplenishmentOrderService: ReplenishmentOrderFacade
  translation: TranslationService
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  routing: RoutingService
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  translation: TranslationService
  vcr: ViewContainerRef
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
  activeModal: NgbActiveModal
  userOrderService: OrderFacade
)

```


Current version: 

```

constructor(
  activeModal: NgbActiveModal
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
  store: Store<StateWithOrder>
  processStateStore: Store<StateWithProcess<void>>
  userIdService: UserIdService
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  activeCartFacade: ActiveCartFacade
  userIdService: UserIdService
  commandService: CommandService
  orderConnector: OrderConnector
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




# Class ConfiguratorAddToCartButtonComponent 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  routingService: RoutingService
  configuratorCommonsService: ConfiguratorCommonsService
  configuratorCartService: ConfiguratorCartService
  configuratorGroupsService: ConfiguratorGroupsService
  configRouterExtractorService: ConfiguratorRouterExtractorService
  globalMessageService: GlobalMessageService
  orderFacade: OrderFacade
  commonConfiguratorUtilsService: CommonConfiguratorUtilsService
  configUtils: ConfiguratorStorefrontUtilsService
  intersectionService: IntersectionService
)

```


Current version: 

```

constructor(
  routingService: RoutingService
  configuratorCommonsService: ConfiguratorCommonsService
  configuratorCartService: ConfiguratorCartService
  configuratorGroupsService: ConfiguratorGroupsService
  configRouterExtractorService: ConfiguratorRouterExtractorService
  globalMessageService: GlobalMessageService
  orderHistoryFacade: OrderHistoryFacade
  commonConfiguratorUtilsService: CommonConfiguratorUtilsService
  configUtils: ConfiguratorStorefrontUtilsService
  intersectionService: IntersectionService
)

```


### Property orderFacade is removed.





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
  configUtils: ConfiguratorStorefrontUtilsService
  configuratorCommonsService: ConfiguratorCommonsService
  configuratorGroupsService: ConfiguratorGroupsService
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




# Class ConfiguratorCartService 
## @spartacus/product-configurator/rulebased


### Constructor changed.


Previous version: 

```

constructor(
  store: Store<StateWithConfigurator>
  activeCartService: ActiveCartService
  commonConfigUtilsService: CommonConfiguratorUtilsService
  checkoutFacade: CheckoutFacade
  userIdService: UserIdService
  configuratorUtilsService: ConfiguratorUtilsService
)

```


Current version: 

```

constructor(
  store: Store<StateWithConfigurator>
  activeCartService: ActiveCartFacade
  commonConfigUtilsService: CommonConfiguratorUtilsService
  checkoutQueryFacade: CheckoutQueryFacade
  userIdService: UserIdService
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
  store: Store<StateWithConfigurator>
  commonConfigUtilsService: CommonConfiguratorUtilsService
  configuratorCartService: ConfiguratorCartService
  activeCartService: ActiveCartService
  configuratorUtils: ConfiguratorUtilsService
)

```


Current version: 

```

constructor(
  store: Store<StateWithConfigurator>
  commonConfigUtilsService: CommonConfiguratorUtilsService
  configuratorCartService: ConfiguratorCartService
  activeCartService: ActiveCartFacade
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
  actionsSubject: ActionsSubject
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  importInfoService: ProductImportInfoService
  activeCartFacade: ActiveCartFacade
)

```


### Property actionsSubject is removed.



### Property activeCartService is removed.





# Class AddedToCartDialogComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components


### Constructor changed.


Previous version: 

```

constructor(
  modalService: ModalService
  cartService: ActiveCartService
)

```


Current version: 

```

constructor(
  modalService: ModalService
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




# Class AddToCartComponent 
## @spartacus/storefront

moved to @spartacus/cart/base/components/add-to-cart


### Constructor changed.


Previous version: 

```

constructor(
  modalService: ModalService
  currentProductService: CurrentProductService
  cd: ChangeDetectorRef
  activeCartService: ActiveCartService
  component: CmsComponentData<CmsAddToCartComponent>
)

```


Current version: 

```

constructor(
  currentProductService: CurrentProductService
  cd: ChangeDetectorRef
  activeCartService: ActiveCartFacade
  component: CmsComponentData<CmsAddToCartComponent>
  eventService: EventService
  productListItemContext: ProductListItemContext | undefined
)

```


### Constructor constructor is removed.



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
  wishListService: WishListService
  currentProductService: CurrentProductService
  authService: AuthService
)

```


Current version: 

```

constructor(
  wishListFacade: WishListFacade
  currentProductService: CurrentProductService
  authService: AuthService
)

```


### Method getProductInWishList changed.


Previous version: 

```

getProductInWishList(
  product: Product
  entries: OrderEntry[]
): OrderEntry

```


Current version: 

```

getProductInWishList(
  product: Product
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
  cartVoucherService: CartVoucherService
  formBuilder: FormBuilder
  customerCouponService: CustomerCouponService
  activeCartService: ActiveCartService
)

```


Current version: 

```

constructor(
  cartVoucherService: CartVoucherFacade
  formBuilder: FormBuilder
  customerCouponService: CustomerCouponService
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
  activeCartService: ActiveCartService
  selectiveCartService: SelectiveCartService
  authService: AuthService
  routingService: RoutingService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  selectiveCartService: SelectiveCartFacade
  authService: AuthService
  routingService: RoutingService
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


### Method isProductOutOfStock changed.


Previous version: 

```

isProductOutOfStock(
  product: any
): boolean

```


Current version: 

```

isProductOutOfStock(
  product: any
): any

```




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
  activeCartService: ActiveCartService
  selectiveCartService: SelectiveCartService
  userIdService: UserIdService
  multiCartService: MultiCartService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  selectiveCartService: SelectiveCartFacade
  userIdService: UserIdService
  multiCartService: MultiCartFacade
  cd: ChangeDetectorRef
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


Enum CartOutlets changed.

Previous version: 

```
ITEM,
ITEM_BUNDLE_DETAILS,
ITEM_DETAILS
```


Current version: 

```
CART_ITEM_LIST,
ITEM,
ITEM_BUNDLE_DETAILS,
ITEM_DETAILS,
ORDER_SUMMARY
```




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
  activeCartService: ActiveCartService
  selectiveCartService: SelectiveCartService
)

```


Current version: 

```

constructor(
  activeCartService: ActiveCartFacade
  selectiveCartService: SelectiveCartFacade
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
  slots$: Observable<string[]>
  pageTemplate: string
  section: string
): Observable<any>

```


Current version: 

```

handle(
  slots$: Observable<string[]>
  pageTemplate: string
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
  cartValidationService: CartValidationService
  semanticPathService: SemanticPathService
  router: Router
  globalMessageService: GlobalMessageService
  activeCartService: ActiveCartService
  cartValidationStateService: CartValidationStateService
  cartConfigService: CartConfigService
)

```


Current version: 

```

constructor(
  cartValidationService: CartValidationFacade
  semanticPathService: SemanticPathService
  router: Router
  globalMessageService: GlobalMessageService
  activeCartService: ActiveCartFacade
  cartValidationStateService: CartValidationStateService
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
  cmsComponentsService: CmsComponentsService
  injector: Injector
)

```


Current version: 

```

constructor(
  cmsComponentsService: CmsComponentsService
  unifiedInjector: UnifiedInjector
)

```


### Property injector is removed.





# Class ConsignmentTrackingComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userOrderService: UserOrderService
  modalService: ModalService
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade
  modalService: ModalService
)

```




# Variable defaultReplenishmentOrderCancellationLayoutConfig 
## @spartacus/storefront

moved to @spartacus/order/components




# Interface GetOrderEntriesContext 
## @spartacus/storefront

moved to @spartacus/cart/base/root




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
  orderDetailsService: OrderDetailsService
  userOrderService: UserOrderService
  routing: RoutingService
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService
  orderHistoryFacade: OrderHistoryFacade
  routing: RoutingService
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
  userOrderService: UserOrderService
  routingService: RoutingService
  unifiedInjector: UnifiedInjector
)

```


Current version: 

```

constructor(
  orderHistoryFacade: OrderHistoryFacade
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
  routing: RoutingService
  userOrderService: UserOrderService
  translation: TranslationService
  userReplenishmentOrderService: UserReplenishmentOrderService
)

```


Current version: 

```

constructor(
  routing: RoutingService
  orderHistoryFacade: OrderHistoryFacade
  translation: TranslationService
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
  returnRequestService: OrderReturnRequestService
  translation: TranslationService
)

```


Current version: 

```

constructor(
  returnRequestService: OrderReturnRequestFacade
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
  orderDetailsService: OrderDetailsService
  returnRequestService: OrderReturnRequestService
  routing: RoutingService
  globalMessageService: GlobalMessageService
)

```


Current version: 

```

constructor(
  orderDetailsService: OrderDetailsService
  returnRequestService: OrderReturnRequestFacade
  routing: RoutingService
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




# Class PageLayoutService 
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  cms: CmsService
  config: LayoutConfig
  breakpointService: BreakpointService
  handlers: PageLayoutHandler[]
)

```


Current version: 

```

constructor(
  cms: CmsService
  config: LayoutConfig
  breakpointService: BreakpointService
  unifiedInjector: UnifiedInjector
)

```




# TypeAlias ProductData 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Interface ProductImportInfo 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Enum ProductImportStatus 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Interface ProductImportSummary 
## @spartacus/storefront

moved to @spartacus/cart/base/root




# Class ProgressButtonComponent 
## @spartacus/storefront


### Property clikEvent is removed.

It is renamed to 'clickEvent' to fix a typo.



# Class ReplenishmentOrderCancellationComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  userReplenishmentOrderService: UserReplenishmentOrderService
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  vcr: ViewContainerRef
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
  userReplenishmentOrderService: UserReplenishmentOrderService
  globalMessageService: GlobalMessageService
  launchDialogService: LaunchDialogService
  el: ElementRef
)

```


Current version: 

```

constructor(
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  globalMessageService: GlobalMessageService
  launchDialogService: LaunchDialogService
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
  routingService: RoutingService
  userReplenishmentOrderService: UserReplenishmentOrderService
)

```


Current version: 

```

constructor(
  routingService: RoutingService
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
  routing: RoutingService
  userReplenishmentOrderService: UserReplenishmentOrderService
  translation: TranslationService
  vcr: ViewContainerRef
  launchDialogService: LaunchDialogService
)

```


Current version: 

```

constructor(
  routing: RoutingService
  replenishmentOrderHistoryFacade: ReplenishmentOrderHistoryFacade
  translation: TranslationService
  vcr: ViewContainerRef
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
  activatedRoutesService: ActivatedRoutesService
  injector: Injector
)

```


Current version: 

```

constructor(
  activatedRoutesService: ActivatedRoutesService
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
  cmsService: CmsService
  cartService: ActiveCartService
  selectiveCartService: SelectiveCartService
)

```


Current version: 

```

constructor(
  cmsService: CmsService
  cartService: ActiveCartFacade
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




# Class TabParagraphContainerComponent 
## @spartacus/storefront


### Method ngOnDestroy is removed.



### Property subscription is removed.





# Class TrackingEventsComponent 
## @spartacus/storefront

moved to @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  activeModal: NgbActiveModal
  userOrderService: UserOrderService
)

```


Current version: 

```

constructor(
  activeModal: NgbActiveModal
  orderHistoryFacade: OrderHistoryFacade
)

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

