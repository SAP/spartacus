import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
import { StateWithProcess } from '../../process/store/process-state';
import { CheckoutActions } from '../store/actions/index';
import { StateWithCheckout } from '../store/checkout-state';
import { CheckoutSelectors } from '../store/selectors/index';

@Injectable({
  providedIn: 'root',
})
export class CheckoutCostCenterService {
  constructor(
    protected checkoutStore: Store<StateWithCheckout | StateWithProcess<void>>,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  /**
   * Set cost center to cart
   * @param costCenterId : cost center id
   */
  setCostCenter(costCenterId: string): void {
    let cartId;
    this.activeCartService
      .getActiveCartId()
      .pipe(take(1))
      .subscribe((activeCartId) => (cartId = activeCartId));

    this.authService.invokeWithUserId((userId) => {
      if (userId && userId !== OCC_USER_ID_ANONYMOUS && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.SetCostCenter({
            userId: userId,
            cartId: cartId,
            costCenterId: costCenterId,
          })
        );
      }
    });
  }

  /**
   * Get cost center id from cart
   */
  getCostCenter(): Observable<string> {
    return combineLatest([
      this.activeCartService.getActive(),
      this.checkoutStore.pipe(select(CheckoutSelectors.getCostCenter)),
    ]).pipe(
      filter(([cart]) => Boolean(cart)),
      map(([cart, costCenterId]) => {
        if (costCenterId === undefined && cart.costCenter) {
          costCenterId = cart.costCenter.code;
          this.checkoutStore.dispatch(
            new CheckoutActions.SetCostCenterSuccess(cart.costCenter.code)
          );
        }
        return costCenterId;
      })
    );
  }
}
