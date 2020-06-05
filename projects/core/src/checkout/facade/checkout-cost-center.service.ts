import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { AuthService } from '../../auth/facade/auth.service';
import { ActiveCartService } from '../../cart/facade/active-cart.service';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
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
      tap(([cart, id]) => {
        if (id === undefined && cart && cart.costCenter) {
          this.checkoutStore.dispatch(
            new CheckoutActions.SetCostCenterSuccess(cart.costCenter.code)
          );
        }
      }),
      map(([_, po]) => po)
    );
  }
}
