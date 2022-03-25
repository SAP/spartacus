import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  MergeCartSuccessEvent,
} from '@spartacus/cart/base/root';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutQueryFacade,
  CheckoutReloadQueryEvent,
  CheckoutResetQueryEvent,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  CurrencySetEvent,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  Query,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { OrderPlacedEvent } from '@spartacus/order/root';
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
      CheckoutReloadQueryEvent,
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
      CheckoutResetQueryEvent,
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
    this.queryService.create<CheckoutState | undefined>(
      () =>
        this.checkoutPreconditions().pipe(
          switchMap(([userId, cartId]) =>
            this.checkoutConnector.getCheckoutDetails(userId, cartId)
          )
        ),
      {
        reloadOn: this.getQueryReloadTriggers(),
        resetOn: this.getQueryResetTriggers(),
      }
    );

  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected userIdService: UserIdService,
    protected queryService: QueryService,
    protected checkoutConnector: CheckoutConnector
  ) {}

  /**
   * Performs the necessary checkout preconditions.
   */
  protected checkoutPreconditions(): Observable<[string, string]> {
    return combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
      this.activeCartFacade.isGuestCart(),
    ]).pipe(
      take(1),
      map(([userId, cartId, isGuestCart]) => {
        if (
          !userId ||
          !cartId ||
          (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)
        ) {
          throw new Error('Checkout conditions not met');
        }
        return [userId, cartId];
      })
    );
  }

  getCheckoutDetailsState(): Observable<QueryState<CheckoutState | undefined>> {
    return this.checkoutQuery$.getState();
  }
}
