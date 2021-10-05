import { Injectable } from '@angular/core';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CurrencySetEvent,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from 'feature-libs/cart/saved-cart/root';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';

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
      ],
    }
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected checkoutConnector: CheckoutConnector
  ) {}

  getCheckoutDetails(): Observable<CheckoutState | undefined> {
    return this.checkoutQuery$.get();
  }

  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return this.checkoutQuery$.getState();
  }
}
