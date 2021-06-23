import { Injectable } from '@angular/core';
import {
  CheckoutDetails,
  ClearCheckoutDataEvent,
  ClearCheckoutMiscDataEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CommandService,
  CurrencySetEvent,
  LanguageSetEvent,
  Query,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
@Injectable()
export class CheckService {
  protected checkoutQuery: Query<
    CheckoutDetails | undefined
  > = this.query.create(
    () =>
      combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (cartId) {
            return this.checkoutConnector.loadCheckoutDetails(userId, cartId);
          } else {
            return of(undefined);
          }
        })
      ),
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
      resetOn: [
        ClearCheckoutMiscDataEvent,
        ClearCheckoutDataEvent,
        this.userIdService.getUserId(),
        this.activeCartService.getActiveCartId().pipe(distinctUntilChanged()),
      ],
    }
  );

  constructor(
    protected checkoutConnector: CheckoutConnector,
    protected userIdService: UserIdService,
    protected activeCartService: ActiveCartService,
    protected query: QueryService,
    protected command: CommandService
  ) {}

  getCheckoutDetails(): Observable<QueryState<CheckoutDetails | undefined>> {
    return this.checkoutQuery.getState();
  }
}
