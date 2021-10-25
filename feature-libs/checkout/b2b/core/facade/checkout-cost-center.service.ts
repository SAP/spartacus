import { Injectable, OnDestroy } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CostCenterSetEvent,
} from '@spartacus/checkout/b2b/root';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutQueryFacade,
  ResetCheckoutQueryEvent,
  ResetDeliveryModesEvent,
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
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/cost-center/checkout-cost-center.connector';

@Injectable()
export class CheckoutCostCenterService
  implements CheckoutCostCenterFacade, OnDestroy
{
  protected subscription = new Subscription();

  protected setCostCenterCommand: Command<string, Cart> = this.command.create<
    string,
    Cart
  >(
    (payload) => {
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
          return this.checkoutCostCenterConnector
            .setCostCenter(userId, cartId, payload)
            .pipe(
              tap(() => {
                this.checkoutDeliveryAddressService.clearCheckoutDeliveryAddress();
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
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutCostCenterConnector: CheckoutCostCenterConnector,
    protected checkoutDeliveryAddressService: CheckoutDeliveryAddressFacade,
    protected checkoutQueryService: CheckoutQueryFacade,
    protected eventService: EventService
  ) {
    this.registerResetTriggers();
  }

  registerResetTriggers(): void {
    this.subscription.add(
      this.eventService.get(CostCenterSetEvent).subscribe(() => {
        this.eventService.dispatch({}, ResetCheckoutQueryEvent);
        this.eventService.dispatch({}, ResetDeliveryModesEvent);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
