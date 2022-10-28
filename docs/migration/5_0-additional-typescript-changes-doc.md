# Class ConsignmentTrackingComponent
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  private orderHistoryFacade: OrderHistoryFacade,
  private modalService: ModalService
)

```


Current version: 

```

constructor(
  protected orderHistoryFacade: OrderHistoryFacade,
  protected launchDialogService: LaunchDialogService,
  protected vcr: ViewContainerRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property modalRef is removed.

It is not used anymore.



# Class TrackingEventsComponent
## @spartacus/order/components


### Constructor changed.


Previous version: 

```

constructor(
  public activeModal: NgbActiveModal,
  private orderHistoryFacade: OrderHistoryFacade
)

```


Current version: 

```

constructor(
  protected orderHistoryFacade: OrderHistoryFacade,
  protected launchDialogService: LaunchDialogService,
  protected el: ElementRef
)

```


### Property activeModal is removed.

Use 'launchDialogService' instead.

### Property consignmentCode is removed.

It is not used anymore.



# Class AddedToCartDialogEventListener
## @spartacus/cart/components


### Constructor changed.


Previous version: 

```

constructor(
  protected eventService: EventService,
  protected modalService: ModalService
)

```


Current version: 

```

constructor(
  protected eventService: EventService,
  protected launchDialogService: LaunchDialogService
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property modalRef is removed.

It is not used anymore.



# Class AddedToCartDialogComponent
## @spartacus/cart/components


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService,
  protected activeCartFacade: ActiveCartFacade
)

```


Current version: 

```

constructor(
  protected activeCartFacade: ActiveCartFacade,
  protected launchDialogService: LaunchDialogService,
  protected routingService: RoutingService,
  protected el: ElementRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property modalIsOpen is removed.

It is not used anymore.

### Property dialog is removed.

It is not used anymore.



# Class CheckoutPaymentFormComponent
## @spartacus/checkout/components


### Constructor changed.


Previous version: 

```

constructor(
  protected checkoutPaymentFacade: CheckoutPaymentFacade,
  protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  protected userPaymentService: UserPaymentService,
  protected globalMessageService: GlobalMessageService,
  protected fb: FormBuilder,
  protected modalService: ModalService,
  protected userAddressService: UserAddressService
)

```


Current version: 

```

constructor(
  protected checkoutPaymentFacade: CheckoutPaymentFacade,
  protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade,
  protected userPaymentService: UserPaymentService,
  protected globalMessageService: GlobalMessageService,
  protected fb: FormBuilder,
  protected userAddressService: UserAddressService,
  protected launchDialogService: LaunchDialogService
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property suggestedAddressModalRef is removed.

It is not used anymore.


# Class AddressFormComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  protected fb: FormBuilder,
  protected userService: UserService,
  protected userAddressService: UserAddressService,
  protected globalMessageService: GlobalMessageService,
  protected modalService: ModalService,
  protected translation: TranslationService
)

```


Current version: 

```

constructor(
  protected fb: FormBuilder,
  protected userService: UserService,
  protected userAddressService: UserAddressService,
  protected globalMessageService: GlobalMessageService,
  protected translation: TranslationService,
  protected launchDialogService: LaunchDialogService
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property addressVerifySub is removed.

It is not used anymore.

### Property regionsSub is removed.

It is not used anymore.

### Property suggestedAddressModalRef is removed.

It is not used anymore.



# Class SuggestedAddressDialogComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService
)

```


Current version: 

```

constructor(
  protected launchDialogService: LaunchDialogService,
  protected el: ElementRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property suggestedAddresses is removed.

It is not used anymore.

### Property enteredAddress is removed.

It is not used anymore.



# Class LaunchDialogService
## @spartacus/storefront



### Property _dialogClose changed.



Previous version: 

```

private _dialogClose = new BehaviorSubject<string | undefined>(undefined)

```


Current version: 

```

private _dialogClose = new BehaviorSubject<any | undefined>(undefined)

```

### Property dialogClose changed.



Previous version: 

```

get dialogClose(): Observable<string | undefined>

```


Current version: 

```

get dialogClose(): Observable<any | undefined>

```

### Property closeDialog changed.



Previous version: 

```

closeDialog(reason: string)

```


Current version: 

```

closeDialog(reason: any)

```

# Class CloseAccountComponent
## @spartacus/user/components


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService
)

```


Current version: 

```

constructor(
  protected launchDialogService: LaunchDialogService,
  protected vcr: ViewContainerRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property modal is removed.

It is not used anymore.


# Class CloseAccountModalComponent
## @spartacus/user/components


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService,
  protected authService: AuthService,
  protected globalMessageService: GlobalMessageService,
  protected routingService: RoutingService,
  protected translationService: TranslationService,
  protected userProfile: UserProfileFacade
)

```


Current version: 

```

constructor(
  protected authService: AuthService,
  protected globalMessageService: GlobalMessageService,
  protected routingService: RoutingService,
  protected translationService: TranslationService,
  protected userProfile: UserProfileFacade,
  protected launchDialogService: LaunchDialogService,
  protected el: ElementRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.


# Class CouponCardComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService,
  protected myCouponsComponentService: MyCouponsComponentService
)

```


Current version: 

```

constructor(
  protected myCouponsComponentService: MyCouponsComponentService,
  protected launchDialogService: LaunchDialogService,
  protected vcr: ViewContainerRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.

### Property modalRef is removed.

It is not used anymore.



# Class CouponDialogComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  protected modalService: ModalService
)

```


Current version: 

```

constructor(
  protected launchDialogService: LaunchDialogService,
  protected el: ElementRef
)

```



### Method dismissModal is removed.

It is replaced by 'close' method.

### Property modalService is removed.

Use 'launchDialogService' instead.

### Property dialog is removed.

It is not used anymore.



# Class StockNotificationDialogComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  private modalService: ModalService,
  private interestsService: UserInterestsService
)

```


Current version: 

```

constructor(
  private interestsService: UserInterestsService,
  protected launchDialogService: LaunchDialogService,
  protected el: ElementRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.



# Class StockNotificationComponent
## @spartacus/storefront


### Constructor changed.


Previous version: 

```

constructor(
  private currentProductService: CurrentProductService,
  private globalMessageService: GlobalMessageService,
  private translationService: TranslationService,
  private interestsService: UserInterestsService,
  private modalService: ModalService,
  private notificationPrefService: UserNotificationPreferenceService,
  private userIdService: UserIdService
)

```


Current version: 

```

constructor(
  private currentProductService: CurrentProductService,
  private globalMessageService: GlobalMessageService,
  private translationService: TranslationService,
  private interestsService: UserInterestsService,
  private notificationPrefService: UserNotificationPreferenceService,
  private userIdService: UserIdService,
  protected launchDialogService: LaunchDialogService,
  protected vcr: ViewContainerRef
)

```


### Property modalService is removed.

Use 'launchDialogService' instead.



# Interface ModalOptions 
## @spartacus/storefront


Interface ModalOptions has been removed and is no longer part of the public API.



# Class ModalRef 
## @spartacus/storefront


Class ModalRef has been removed and is no longer part of the public API.



# Class ModalDirectiveService 
## @spartacus/storefront


Class ModalDirectiveService has been removed and is no longer part of the public API.



# Class ModalModule 
## @spartacus/storefront


Class ModalModule has been removed and is no longer part of the public API.



# Class ModalService
## @spartacus/storefront

Class ModalService has been removed and is no longer part of the public API.
