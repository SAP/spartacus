import { Observable } from 'rxjs';
import { Cart } from '../../../model/cart.model';

export abstract class CheckoutCostCenterAdapter {
  /**
   * Abstract method used to set cost center to cart
   *
   * @param userId: user id
   * @param cartId: cart id
   * @param costCenterId: cost center id
   */
  abstract setCostCenter(
    userId: string,
    cartId: string,
    costCenterId: string
  ): Observable<Cart>;
}
