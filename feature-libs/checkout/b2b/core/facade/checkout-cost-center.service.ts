import { Injectable } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CostCenterSetEvent,
} from '@spartacus/checkout/b2b/root';
import { CheckoutQueryFacade } from '@spartacus/checkout/base/root';
import {
  ActiveCartService,
  Cart,
  Command,
  CommandService,
  CommandStrategy,
  EventService,
  OCC_USER_ID_ANONYMOUS,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/cost-center/checkout-cost-center.connector';

@Injectable()
export class CheckoutCostCenterService implements CheckoutCostCenterFacade {
  protected setCostCenterCommand: Command<string, Cart> = this.command.create<
    string,
    Cart
  >(
    (payload) =>
      this.checkoutPreconditions().pipe(
        switchMap(([userId, cartId]) =>
          this.checkoutCostCenterConnector
            .setCostCenter(userId, cartId, payload)
            .pipe(
              tap(() =>
                this.eventService.dispatch(
                  {
                    cartId,
                    userId,
                    code: payload,
                  },
                  CostCenterSetEvent
                )
              )
            )
        )
      ),
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutCostCenterConnector: CheckoutCostCenterConnector,
    protected checkoutQueryService: CheckoutQueryFacade,
    protected eventService: EventService
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

  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  setCostCenter(costCenterId: string): Observable<Cart> {
    return this.setCostCenterCommand.execute(costCenterId);
  }

  /**
   * Get cost center id from cart
   */
  getCostCenter(): Observable<QueryState<string>> {
    return this.checkoutQueryService.getCheckoutDetailsState().pipe(
      map((state) => ({
        ...state,
        data: state?.data?.costCenter?.code,
      }))
    );
  }
}
