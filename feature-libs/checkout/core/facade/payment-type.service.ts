import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PaymentTypeFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  B2BPaymentTypeEnum,
  PaymentType,
  ProcessSelectors,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  map,
  pluck,
  shareReplay,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutActions } from '../store/actions/index';
import {
  GET_PAYMENT_TYPES_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class PaymentTypeService implements PaymentTypeFacade {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Get payment types
   */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAllPaymentTypes),
      withLatestFrom(
        this.processStateStore.pipe(
          select(
            ProcessSelectors.getProcessStateFactory(
              GET_PAYMENT_TYPES_PROCESS_ID
            )
          )
        )
      ),
      tap(([_, loadingState]) => {
        if (
          !(loadingState.loading || loadingState.success || loadingState.error)
        ) {
          this.loadPaymentTypes();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  /**
   * Load the supported payment types
   */
  loadPaymentTypes(): void {
    this.checkoutStore.dispatch(new CheckoutActions.LoadPaymentTypes());
  }

  /**
   * Set payment type to cart
   * @param typeCode
   * @param poNumber : purchase order number
   */
  setPaymentType(typeCode: string, poNumber?: string): void {
    let cartId: string;
    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        if (cartId) {
          this.checkoutStore.dispatch(
            new CheckoutActions.SetPaymentType({
              userId: userId,
              cartId: cartId,
              typeCode: typeCode,
              poNumber: poNumber,
            })
          );
        }
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
  }

  /**
   * Get the selected payment type
   */
  getSelectedPaymentType(): Observable<string | undefined> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getSelectedPaymentType)),
    ]).pipe(
      tap(([cart, selected]) => {
        if (selected === undefined) {
          // in b2b, cart always has paymentType (default value 'CARD')
          if (cart && cart.paymentType) {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetPaymentTypeSuccess(cart)
            );
          }
        }
      }),
      map(([, selected]) => selected)
    );
  }

  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  isAccountPayment(): Observable<boolean> {
    return this.getSelectedPaymentType().pipe(
      map((selected) => selected === B2BPaymentTypeEnum.ACCOUNT_PAYMENT)
    );
  }

  /**
   * Get PO Number
   */
  getPoNumber(): Observable<string | undefined> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getPoNumer)),
    ]).pipe(
      tap(([cart, po]) => {
        if (po === undefined && cart && cart.purchaseOrderNumber) {
          this.checkoutStore.dispatch(
            new CheckoutActions.SetPaymentTypeSuccess(cart)
          );
        }
      }),
      map(([_, po]) => po)
    );
  }
}
