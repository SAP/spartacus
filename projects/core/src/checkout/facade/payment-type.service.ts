import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, shareReplay, tap, withLatestFrom, take } from 'rxjs/operators';
import { PaymentType, Cart } from '../../model/cart.model';
import { StateWithProcess } from '../../process/store/process-state';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { getProcessStateFactory } from '../../process/store/selectors/process-group.selectors';
import { CheckoutActions } from '../store/actions/index';
import {
  GET_PAYMENT_TYPES_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
  readonly ACCOUNT_PAYMENT = 'ACCOUNT';

  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Get payment types
   */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAllPaymentTypes),
      withLatestFrom(
        this.checkoutStore.pipe(
          select(getProcessStateFactory(GET_PAYMENT_TYPES_PROCESS_ID))
        )
      ),
      tap(([, loadingState]) => {
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
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe((occUserId) => (userId = occUserId));

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .pipe(take(1))
        .subscribe((activeCartId) => (cartId = activeCartId));

      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.SetPaymentType({
            userId: userId,
            cartId: cartId,
            typeCode: typeCode,
            poNumber: poNumber,
          })
        );
      }
    }
  }

  /**
   * Get the selected payment type
   */
  getSelectedPaymentType(): Observable<string> {
    let cart: Cart;
    this.activeCartService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (cart = data));

    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getSelectedPaymentType),
      tap((selected) => {
        if (selected === undefined) {
          if (cart && cart.paymentType) {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetPaymentTypeSuccess(cart)
            );
          } else {
            // set to the default type: account
            this.setPaymentType(this.ACCOUNT_PAYMENT);
          }
        }
      })
    );
  }

  /**
   * Get PO Number
   */
  getPoNumber(): Observable<string> {
    let cart: Cart;
    this.activeCartService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (cart = data));

    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getPoNumer),
      tap((po) => {
        if (po === undefined) {
          if (cart && cart.purchaseOrderNumber) {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetPaymentTypeSuccess(cart)
            );
          }
        }
      })
    );
  }

  protected actionAllowed(): boolean {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return userId && userId !== OCC_USER_ID_ANONYMOUS;
  }
}
