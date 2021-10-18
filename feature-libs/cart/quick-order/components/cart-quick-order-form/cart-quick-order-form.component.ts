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
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-quick-order-form',
  templateUrl: './cart-quick-order-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartQuickOrderFormComponent implements OnInit, OnDestroy {
  quickOrderForm: FormGroup;
  cartIsLoading$: Observable<boolean> = this.activeCartService
    .isStable()
    .pipe(map((loaded) => !loaded));
  cart$: Observable<Cart> = this.activeCartService.getActive();
  min = 1;

  private subscription: Subscription = new Subscription();
  private cartEventsSubscription: Subscription = new Subscription();
  private minQuantityValue: number = 1;

  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected formBuilder: FormBuilder,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.watchQuantityChange();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.cartEventsSubscription?.unsubscribe();
  }

  applyQuickOrder(): void {
    if (this.quickOrderForm.invalid) {
      this.quickOrderForm.markAllAsTouched();
      return;
    }

    const productCode = this.quickOrderForm.get('productCode')?.value;
    const quantity = this.quickOrderForm.get('quantity')?.value;

    this.watchAddEntrySuccessEvent();
    this.watchAddEntryFailEvent();

    if (productCode && quantity) {
      this.activeCartService.addEntry(productCode, quantity);
    }
  }

  protected buildForm(): void {
    this.quickOrderForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      quantity: [this.minQuantityValue, [Validators.required]],
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
    this.cartEventsSubscription.add(
      this.eventService
        .get(CartAddEntrySuccessEvent)
        .pipe(first())
        .subscribe((data: CartAddEntrySuccessEvent) => {
          let key = 'quickOrderCartForm.stockLevelReached';
          let productTranslation;
          let messageType = GlobalMessageType.MSG_TYPE_WARNING;

          if (data.quantityAdded) {
            key =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.entriesWereAdded'
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
    this.cartEventsSubscription.add(
      this.eventService
        .get(CartAddEntryFailEvent)
        .pipe(first())
        .subscribe(() => {
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
