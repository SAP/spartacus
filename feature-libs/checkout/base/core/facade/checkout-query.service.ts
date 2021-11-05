import { Injectable } from '@angular/core';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
  OrderPlacedEvent,
  ReloadCheckoutQueryEvent,
  ResetCheckoutQueryEvent,
} from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  CurrencySetEvent,
  isJaloError,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  MergeCartSuccessEvent,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';

@Injectable()
export class CheckoutQueryService implements CheckoutQueryFacade {
  protected getQueryReloadTriggers(): QueryNotifier[] {
    return [ReloadCheckoutQueryEvent, ...this.getSiteContextTriggers()];
  }

  protected getSiteContextTriggers(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }

  protected getQueryResetTriggers(): QueryNotifier[] {
    return [
      ResetCheckoutQueryEvent,
      ...this.getAuthTriggers(),
      ...this.getCartTriggers(),
      ...this.getOrderTriggers(),
    ];
  }

  protected getAuthTriggers(): QueryNotifier[] {
    return [LogoutEvent, LoginEvent];
  }

  protected getCartTriggers(): QueryNotifier[] {
    return [
      SaveCartSuccessEvent,
      RestoreSavedCartSuccessEvent,
      MergeCartSuccessEvent,
    ];
  }

  protected getOrderTriggers(): QueryNotifier[] {
    return [
      // we should reset the query's state after the checkout is finished (should be undefined after the following events)
      OrderPlacedEvent,
    ];
  }

  protected checkoutQuery$: Query<CheckoutState> =
    this.query.create<CheckoutState>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutConnector.getCheckoutDetails(userId, cartId)
          )
        ),
      {
        reloadOn: this.getQueryReloadTriggers(),
        resetOn: this.getQueryResetTriggers(),
        retryOn: { shouldRetry: isJaloError },
      }
    );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected checkoutConnector: CheckoutConnector
  ) {}

  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartService.takeActiveCartId(),
    ]).pipe(
      take(1),
      map(([userId, cartId]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS &&
            !this.activeCartService.isGuestCart())
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return this.checkoutQuery$.getState();
  }
}
