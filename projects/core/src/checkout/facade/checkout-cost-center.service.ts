import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { Cart } from '../../model/cart.model';
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
    if (this.actionAllowed()) {
      let userId;
      this.authService
        .getOccUserId()
        .pipe(take(1))
        .subscribe((occUserId) => (userId = occUserId));

      let cartId;
      this.activeCartService
        .getActiveCartId()
        .pipe(take(1))
        .subscribe((activeCartId) => (cartId = activeCartId));

      if (userId && cartId) {
        this.checkoutStore.dispatch(
          new CheckoutActions.SetCostCenter({
            userId: userId,
            cartId: cartId,
            costCenterId: costCenterId,
          })
        );
      }
    }
  }

  /**
   * Get cost center id from cart
   */
  getCartCostCenter(): Observable<string> {
    let cart: Cart;
    this.activeCartService
      .getActive()
      .pipe(take(1))
      .subscribe((data) => (cart = data));

    return this.checkoutStore.pipe(
      select(CheckoutSelectors.getCostCenter),
      tap((id) => {
        if (id === undefined) {
          if (cart && cart.costCenter) {
            this.checkoutStore.dispatch(
              new CheckoutActions.SetCostCenterSuccess(cart.costCenter.code)
            );
          }
        }
      })
    );
  }

  protected actionAllowed(): boolean {
    let userId;
    this.authService
      .getOccUserId()
      .subscribe((occUserId) => (userId = occUserId))
      .unsubscribe();
    return userId && userId !== OCC_USER_ID_ANONYMOUS;
  }
}
