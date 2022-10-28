This file contains additional typescript breaking change doc for changes made after 5_0-generated-typescript-changes-doc.md was produced.

## Changes of generic types

### ItemActiveDirective (in `@spartacus/organization`)

- generic type `T` in `class ItemActiveDirective<T = BaseItem> ` has been changed to `T extends BaseItem`

### AssignCellComponent (in `@spartacus/organization`)

- generic type `T` in `class AssignCellComponent<T>` has been changed to `T extends BaseItem`

### function createFrom (in `@spartacus/core`)

- generic type `T` in `function createFrom<T>(type: Type<T>, data: T): T` has been changed to `T extends object`


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
