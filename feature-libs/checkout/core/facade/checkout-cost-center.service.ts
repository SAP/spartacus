import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CheckoutCostCenterFacade } from '@spartacus/checkout/root';
import { ActiveCartService, UserIdService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable()
export class CheckoutCostCenterService implements CheckoutCostCenterFacade {
  constructor(
    protected checkoutStore: Store<StateWithCheckout>,
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService
  ) {}

  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  setCostCenter(costCenterId: string): void {
    let cartId: string;
    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.userIdService.takeUserId(true).subscribe(
      (userId) => {
        if (cartId) {
          this.checkoutStore.dispatch(
            new CheckoutActions.SetCostCenter({
              userId: userId,
              cartId: cartId,
              costCenterId: costCenterId,
            })
          );
        }
      },
      () => {
        // TODO: for future releases, refactor this part to thrown errors
      }
    );
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
