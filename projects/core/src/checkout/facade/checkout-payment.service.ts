import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CartDataService } from '../../cart/facade/cart-data.service';
import { CardType, PaymentDetails, PaymentType } from '../../model/cart.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { getProcessStateFactory } from '../../process/store/selectors/process-group.selectors';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { CheckoutActions } from '../store/actions/index';
import {
  SET_PAYMENT_DETAILS_PROCESS_ID,
  SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutPaymentService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>,
    protected cartData: CartDataService
  ) {}

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.checkoutStore.pipe(select(CheckoutSelectors.getAllCardTypes));
  }

  /**
   * Get payment types
   */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getAllPaymentTypes),
      withLatestFrom(
        this.checkoutStore.pipe(
          select(getProcessStateFactory(SET_SUPPORTED_PAYMENT_TYPES_PROCESS_ID))
        )
      ),
      tap(([, loadingState]) => {
        if (
          !(loadingState.loading || loadingState.success || loadingState.error)
        ) {
          this.loadSupportedPaymentTypes();
        }
      }),
      pluck(0),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  setPaymentType(typeCode: string, poNumber?: string): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new CheckoutActions.SetPaymentType({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          typeCode: typeCode,
          poNumber: poNumber,
        })
      );
    }
  }

  /**
   * Get payment details
   */
  getPaymentDetails(): Observable<PaymentDetails> {
    return this.checkoutStore.pipe(select(CheckoutSelectors.getPaymentDetails));
  }

  /**
   * Get status about set Payment Details process
   */
  getSetPaymentDetailsResultProcess(): Observable<LoaderState<void>> {
    return this.checkoutStore.pipe(
      select(getProcessStateFactory(SET_PAYMENT_DETAILS_PROCESS_ID))
    );
  }

  /**
   * Clear info about process of setting Payment Details
   */
  resetSetPaymentDetailsProcess(): void {
    this.checkoutStore.dispatch(
      new CheckoutActions.ResetSetPaymentDetailsProcess()
    );
  }

  /**
   * Load the supported card types
   */
  loadSupportedCardTypes(): void {
    this.checkoutStore.dispatch(new CheckoutActions.LoadCardTypes());
  }

  /**
   * Load the supported payment types
   */
  loadSupportedPaymentTypes(): void {
    this.checkoutStore.dispatch(new CheckoutActions.LoadPaymentTypes());
  }

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  createPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new CheckoutActions.CreatePaymentDetails({
          userId: this.cartData.userId,
          cartId: this.cartData.cartId,
          paymentDetails,
        })
      );
    }
  }

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  setPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      this.checkoutStore.dispatch(
        new CheckoutActions.SetPaymentDetails({
          userId: this.cartData.userId,
          cartId: this.cartData.cart.code,
          paymentDetails: paymentDetails,
        })
      );
    }
  }

  /**
   * Sets payment loading to true without having the flicker issue (GH-3102)
   */
  paymentProcessSuccess() {
    this.checkoutStore.dispatch(new CheckoutActions.PaymentProcessSuccess());
  }

  protected actionAllowed(): boolean {
    return (
      this.cartData.userId !== OCC_USER_ID_ANONYMOUS ||
      this.cartData.isGuestCart
    );
  }
}
