import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CheckFacade,
  CheckoutCostCenterFacade,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  Command,
  CommandService,
  OCC_USER_ID_ANONYMOUS,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CheckoutCostCenterConnector } from '../connectors/cost-center/checkout-cost-center.connector';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';

@Injectable()
export class CheckoutCostCenterService implements CheckoutCostCenterFacade {
  protected setCostCenterCommand: Command<any> = this.command.create(
    (payload) => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.getActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          //! What about guest checkout? Why it is not allowed?
          if (userId && userId !== OCC_USER_ID_ANONYMOUS && cartId) {
            return this.checkoutCostCenterConnector
              .setCostCenter(userId, cartId, payload.costCenterId)
              .pipe(
                tap(() => {
                  //! Why we trigger cart load? Maybe to reload cost center data?
                  this.checkoutStore.dispatch(
                    new CartActions.LoadCart({
                      cartId,
                      userId,
                    })
                  );
                  //! We clear everything? We should just reset the checkout data from backend
                  this.checkoutStore.dispatch(
                    new CheckoutActions.ClearCheckoutData()
                  );
                  //! What does it do?
                  this.checkoutStore.dispatch(
                    new CheckoutActions.ClearCheckoutDeliveryAddress({
                      userId,
                      cartId,
                    })
                  );
                })
              );
          } else {
            return throwError({
              message: 'error message',
            });
          }
        })
      );
    }
  );

  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected command: CommandService,
    protected checkoutCostCenterConnector: CheckoutCostCenterConnector,
    protected checkService: CheckFacade
  ) {}

  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  // TODO: Multiple layers interface
  setCostCenter(costCenterId: string): Observable<unknown> {
    return this.setCostCenterCommand.execute({ costCenterId: costCenterId });
  }

  /**
   * Get cost center id from cart
   */
  getCostCenter(): Observable<string | undefined> {
    // TODO: Why we won't return whole cost center with addresses from here?
    return this.checkService
      .getCheckoutDetails()
      .pipe(map((state) => state?.data?.costCenter?.code));
  }
}
