import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-quick-form',
  templateUrl: './cart-quick-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartQuickFormComponent implements OnInit {
  orderForm: FormGroup;
  cartIsLoading$: Observable<boolean>;
  cart$: Observable<Cart>;
  cartId: string;
  min = 1;
  /**
   * Subscription responsible for auto-correcting control's value when it's invalid.
   */
  private subscription: Subscription = new Subscription();

  constructor(
    protected activeCartService: ActiveCartService,
    protected eventService: EventService,
    protected formBuilder: FormBuilder,
    protected globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActiveCartId().pipe(
      tap((activeCardId: string) => (this.cartId = activeCardId)),
      switchMap(() => this.activeCartService.getActive())
    );

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
    if (this.orderForm.invalid) {
      return;
    }
    const productCode = this.orderForm.get('productCode')?.value;
    const quantity = this.orderForm.get('quantity')?.value;

    if (productCode && quantity) {
      this.activeCartService.addEntry(productCode, quantity);
    }
  }

  protected buildForm(): void {
    this.orderForm = this.formBuilder.group({
      productCode: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
    });
  }

  protected watchQuantityChange(): void {
    this.subscription.add(
      this.orderForm
        .get('quantity')
        ?.valueChanges.subscribe((value) =>
          this.orderForm
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
          let messageType = GlobalMessageType.MSG_TYPE_WARNING;

          if (0 < data.quantityAdded) {
            key =
              data.quantityAdded > 1
                ? 'quickOrderCartForm.entriesWasAdded'
                : 'quickOrderCartForm.entryWasAdded';

            messageType = GlobalMessageType.MSG_TYPE_CONFIRMATION;
          }

          this.globalMessageService.add(
            {
              key,
              params: {
                product: data.entry.product?.name,
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
    this.orderForm.reset();
  }
}
