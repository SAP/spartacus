import { Observable } from 'rxjs';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
export abstract class CartVoucherAdapter {
  /**
   * Abstract method used to apply voucher to cart
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
  abstract add(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}>;

  /**
   * Abstract method used to remove voucher from cart
   *
   * @param userId
   * @param cartId
   * @param voucherId
   */
  abstract remove(
    userId: string,
    cartId: string,
    voucherId: string
  ): Observable<{}>;
}
