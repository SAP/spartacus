import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CardType,
  getLastValueSync,
  OCC_USER_ID_ANONYMOUS,
  PaymentDetails,
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { CheckoutActions } from '../store/actions/index';
import {
  SET_PAYMENT_DETAILS_PROCESS_ID,
  StateWithCheckout,
} from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';
import { CheckoutService } from './checkout.service';

@Injectable()
export class CheckoutPaymentService implements CheckoutPaymentFacade {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected processStateStore: Store<StateWithProcess<void>>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected checkoutService: CheckoutService
  ) {}

  /**
   * Get card types
   */
  getCardTypes(): Observable<CardType[]> {
    return this.checkoutStore.pipe(select(CheckoutSelectors.getAllCardTypes));
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
  getSetPaymentDetailsResultProcess(): Observable<
    StateUtils.LoaderState<void>
  > {
    return this.processStateStore.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(SET_PAYMENT_DETAILS_PROCESS_ID)
      )
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
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  createPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      let userId;
      this.userIdService
        .getUserId()
        .subscribe((occUserId) => (userId = occUserId))
        .unsubscribe();

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .subscribe((activeCartId) => (cartId = activeCartId))
        .unsubscribe();

      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.CreatePaymentDetails({
            userId,
            cartId,
            paymentDetails,
          })
        );
      }
    }
  }

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  setPaymentDetails(paymentDetails: PaymentDetails): void {
    if (this.actionAllowed()) {
      const userId = getLastValueSync(this.userIdService.getUserId());
      const cartId = getLastValueSync(this.activeCartService.getActiveCartId());

      if (userId && cartId) {
        combineLatest([
          this.activeCartService.isStable(),
          this.checkoutService.isLoading(),
        ])
          .pipe(
            filter(([isStable, isLoading]) => isStable && !isLoading),
            take(1)
          )
          .subscribe(() => {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetPaymentDetails({
                userId,
                cartId,
                paymentDetails: paymentDetails,
              })
            );
          });
      }
    }
  }

  /**
   * Sets payment loading to true without having the flicker issue (GH-3102)
   */
  paymentProcessSuccess() {
    this.checkoutStore.dispatch(new CheckoutActions.PaymentProcessSuccess());
  }

  protected actionAllowed(): boolean {
    let userId;
    this.userIdService
      .getUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return (
      (userId && userId !== OCC_USER_ID_ANONYMOUS) ||
      this.activeCartService.isGuestCart()
    );
  }
}
