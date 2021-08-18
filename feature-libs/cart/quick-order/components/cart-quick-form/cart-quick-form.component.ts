import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActiveCartService,
  Cart,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-quick-order-form',
  templateUrl: './cart-quick-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartQuickOrderFormComponent implements OnInit, OnDestroy {
  quickOrderForm: FormGroup;
  cartIsLoading$: Observable<boolean>;
  cart$: Observable<Cart>;
  min = 1;

  private subscription: Subscription = new Subscription();

  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected formBuilder: FormBuilder,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();

    this.cartIsLoading$ = this.activeCartService
      .isStable()
      .pipe(map((loaded) => !loaded));

    this.buildForm();
    this.watchQuantityChange();
    this.watchAddEntrySuccessEvent();
    this.watchAddEntryFailEvent();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyQuickOrder(): void {
    if (this.quickOrderForm.invalid) {
      this.quickOrderForm.markAllAsTouched();
      return;
    }

    const productCode = this.quickOrderForm.get('productCode')?.value;
    const quantity = this.quickOrderForm.get('quantity')?.value;

    if (productCode && quantity) {
      this.activeCartService.addEntry(productCode, quantity);
    }
  }

  protected buildForm(): void {
    this.quickOrderForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
    });
  }

  protected watchQuantityChange(): void {
    this.subscription.add(
      this.quickOrderForm
        .get('quantity')
        ?.valueChanges.subscribe((value) =>
          this.quickOrderForm
            .get('quantity')
            ?.setValue(this.getValidCount(value), { emitEvent: false })
        )
    );
  }

  protected watchAddEntrySuccessEvent(): void {
    this.subscription.add(
      this.eventService
        .get(CartAddEntrySuccessEvent)
        .subscribe((data: CartAddEntrySuccessEvent) => {
          let key = 'quickOrderCartForm.stockLevelReached';
          let productTranslation;
          let messageType = GlobalMessageType.MSG_TYPE_WARNING;

          if (data.quantityAdded) {
            key =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.entriesWasAdded'
                : 'quickOrderCartForm.entryWasAdded';

            productTranslation =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.products'
                : 'quickOrderCartForm.product';

            messageType = GlobalMessageType.MSG_TYPE_CONFIRMATION;
          }

          this.globalMessageService.add(
            {
              key,
              params: {
                product: data?.entry?.product?.name || productTranslation,
                quantity: data.quantityAdded,
              },
            },
            messageType
          );
          this.resetForm();
        })
    );
  }

  protected watchAddEntryFailEvent(): void {
    this.subscription.add(
      this.eventService.get(CartAddEntryFailEvent).subscribe(() => {
        this.globalMessageService.add(
          {
            key: 'quickOrderCartForm.noResults',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      })
    );
  }

  private getValidCount(value: number) {
    if (value < this.min || !value) {
      value = this.min;
    }

    return value;
  }

  protected resetForm(): void {
    this.quickOrderForm.reset();
  }
}
