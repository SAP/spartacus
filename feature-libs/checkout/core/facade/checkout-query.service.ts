import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  OrderPlacedEvent,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ReplenishmentOrderScheduledEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  CurrencySetEvent,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutActions } from '../store/actions/index';

@Injectable()
export class CheckoutQueryService implements CheckoutQueryFacade {
  protected checkoutQuery$ = this.query.create<CheckoutState>(
    () => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.takeActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (
            !userId ||
            !cartId ||
            (userId === OCC_USER_ID_ANONYMOUS &&
              !this.activeCartService.isGuestCart())
          ) {
            throw new Error('Checkout conditions not met');
          }
          return this.checkoutConnector.getCheckoutDetails(userId, cartId);
        })
      );
    },
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
      resetOn: [
        DeliveryAddressSetEvent,
        LogoutEvent,
        LoginEvent,
        DeliveryAddressClearedEvent,
        DeliveryModeSetEvent,
        DeliveryModeClearedEvent,
        SaveCartSuccessEvent,
        RestoreSavedCartSuccessEvent,
        PaymentDetailsCreatedEvent,
        PaymentDetailsSetEvent,
        // query state should be reset when checkout is finished (should be undefined after these 2 event)
        OrderPlacedEvent,
        ReplenishmentOrderScheduledEvent,
        this.actions$.pipe(ofType(CheckoutActions.CLEAR_CHECKOUT_DATA)),
        this.actions$.pipe(ofType(CartActions.MERGE_CART_SUCCESS)),
      ],
    }
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected checkoutConnector: CheckoutConnector,
    protected actions$: Actions
  ) {}

  getCheckoutDetails(): Observable<CheckoutState | undefined> {
    return this.checkoutQuery$.get();
  }

  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return this.checkoutQuery$.getState();
  }
}
