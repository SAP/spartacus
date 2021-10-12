import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  CheckoutCostCenterFacade,
  CheckoutDeliveryFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  Cart,
  CartActions,
  Command,
  CommandService,
  CommandStrategy,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/cost-center/checkout-cost-center.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

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
                this.checkoutStore.dispatch(
                  new CartActions.LoadCart({
                    cartId,
                    userId,
                  })
                );
                this.checkoutStore.dispatch(
                  new CheckoutActions.SetCostCenterSuccess(payload)
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
    protected checkoutDeliveryService: CheckoutDeliveryFacade
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
  getCostCenter(): Observable<string | undefined> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getCostCenter)),
    ]).pipe(
      filter(([cart]) => Boolean(cart)),
      map(([cart, costCenterId]) => {
        if (costCenterId === undefined && cart.costCenter) {
          costCenterId = cart.costCenter.code;
          this.checkoutStore.dispatch(
            new CheckoutActions.SetCostCenterSuccess(
              cart.costCenter.code as string
            )
          );
        }
        return costCenterId;
      })
    );
  }
}
