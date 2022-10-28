This file contains additional typescript breaking change doc for changes made after 5_0-generated-typescript-changes-doc.md was produced.

## Changes of generic types

### ItemActiveDirective (in `@spartacus/organization`)

- generic type `T` in `class ItemActiveDirective<T = BaseItem> ` has been changed to `T extends BaseItem`

### AssignCellComponent (in `@spartacus/organization`)

- generic type `T` in `class AssignCellComponent<T>` has been changed to `T extends BaseItem`

### function createFrom (in `@spartacus/core`)

- generic type `T` in `function createFrom<T>(type: Type<T>, data: T): T` has been changed to `T extends object`


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


