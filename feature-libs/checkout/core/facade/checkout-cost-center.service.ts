import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckoutCostCenterFacade,
  CheckoutDeliveryFacade,
  CheckoutQueryFacade,
  CostCenterSetEvent,
} from '@spartacus/checkout/root';
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
import { StateWithCheckout } from '../store/checkout-state';

@Injectable()
export class CheckoutCostCenterService implements CheckoutCostCenterFacade {
  protected setCostCenterCommand: Command<string, Cart> = this.command.create<
    string,
    Cart
  >(
    (payload) => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
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
          return this.checkoutCostCenterConnector
            .setCostCenter(userId, cartId, payload)
            .pipe(
              tap(() => {
                this.checkoutDeliveryService.clearCheckoutDeliveryAddress();
                this.eventService.dispatch(
                  {
                    cartId,
                    userId,
                    code: payload,
                  },
                  CostCenterSetEvent
                );
              })
            );
        })
      );
    },
    {
      strategy: CommandStrategy.CancelPrevious,
    }
  );

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutCostCenterConnector: CheckoutCostCenterConnector,
    protected checkoutDeliveryService: CheckoutDeliveryFacade,
    protected checkoutQueryService: CheckoutQueryFacade,
    protected eventService: EventService
  ) {}

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
