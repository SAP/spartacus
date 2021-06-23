import { Injectable } from '@angular/core';
import {
  CheckFacade,
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
import { skip, switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';
@Injectable()
export class CheckService implements CheckFacade {
  protected checkoutQuery: Query<
    CheckoutDetails | undefined
  > = this.query.create(
    () => {
      return combineLatest([
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
      );
    },
    {
      reloadOn: [LanguageSetEvent, CurrencySetEvent],
      resetOn: [
        ClearCheckoutMiscDataEvent,
        ClearCheckoutDataEvent,
        // Skipping 1 emission as this streams are using `ReplySubject` under the hood, so the reset was triggered at the begging
        this.userIdService.getUserId().pipe(skip(1)),
        this.activeCartService.getActiveCartId().pipe(skip(1)),
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
