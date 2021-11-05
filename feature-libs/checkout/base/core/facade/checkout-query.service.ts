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
  /**
   * Returns the reload triggers for the checkout query.
   */
  protected getQueryReloadTriggers(): QueryNotifier[] {
    return [
      ReloadCheckoutQueryEvent,
      ...this.getCheckoutQuerySiteContextReloadTriggers(),
    ];
  }
  /**
   * Returns the site-context reload triggers for the checkout query.
   */
  protected getCheckoutQuerySiteContextReloadTriggers(): QueryNotifier[] {
    return [LanguageSetEvent, CurrencySetEvent];
  }
  /**
   * Returns the reset triggers for the checkout query.
   */
  protected getQueryResetTriggers(): QueryNotifier[] {
    return [
      ResetCheckoutQueryEvent,
      ...this.getCheckoutQueryResetAuthTriggers(),
      ...this.getCheckoutQueryResetCartTriggers(),
      ...this.getCheckoutQueryResetOrderTriggers(),
    ];
  }
  /**
   * Returns the auth reset triggers for the checkout query.
   */
  protected getCheckoutQueryResetAuthTriggers(): QueryNotifier[] {
    return [LogoutEvent, LoginEvent];
  }
  /**
   * Returns the cart reset triggers for the checkout query.
   */
  protected getCheckoutQueryResetCartTriggers(): QueryNotifier[] {
    return [
      SaveCartSuccessEvent,
      RestoreSavedCartSuccessEvent,
      MergeCartSuccessEvent,
    ];
  }
  /**
   * Returns the order reset triggers for the checkout query.
   */
  protected getCheckoutQueryResetOrderTriggers(): QueryNotifier[] {
    return [
      // we need to reset the query's state after the checkout is finished
      OrderPlacedEvent,
    ];
  }

  protected checkoutQuery$: Query<CheckoutState | undefined> =
    this.query.create<CheckoutState | undefined>(
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

  /**
   * Performs the necessary checkout preconditions.
   */
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

  /**
   * Returns the checkout details state.
   */
  getCheckoutDetailsState(): Observable<QueryState<CheckoutState | undefined>> {
    return this.checkoutQuery$.getState();
  }
}
