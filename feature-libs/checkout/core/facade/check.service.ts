import { Injectable } from '@angular/core';
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
import {
  ClearCheckoutDataEvent,
  ClearCheckoutMiscDataEvent,
} from 'feature-libs/checkout/root';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
import { CheckoutDetails } from '../models/checkout.model';

@Injectable()
export class CheckService {
  protected checkoutQuery: Query<CheckoutDetails> = this.query.create(
    () =>
      combineLatest([
        this.userIdService.getUserId().pipe(tap((a) => console.log(a))),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        switchMap(([userId, cartId]) => {
          console.log(userId, cartId);
          return this.checkoutConnector.loadCheckoutDetails(userId, cartId);
        })
      ),
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
      resetOn: [
        ClearCheckoutMiscDataEvent,
        ClearCheckoutDataEvent,
        // this.userIdService
        //   .getUserId()
        //   .pipe(tap((userId) => console.log(userId))),
        // this.activeCartService.getActiveCartId().pipe(distinctUntilChanged()),
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
