import { addProduct, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-cart-coupon';

export function checkoutCouponsTabbingOrder(config: TabElement[]) {
  addProduct();
  verifyTabbingOrder(containerSelector, config);
}

