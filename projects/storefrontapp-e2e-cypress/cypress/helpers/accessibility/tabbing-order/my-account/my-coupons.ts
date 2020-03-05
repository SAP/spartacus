import { TabElement } from '../../tabbing-order.model';
import { verifyTabbingOrder } from '../../tabbing-order';
import { claimCoupon, CouponWithOpenCatalog } from '../../../my-coupons';

const containerSelector = 'cx-my-coupons';

export function checkoutMyCouponsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/coupons');

  claimCoupon(CouponWithOpenCatalog);

  verifyTabbingOrder(containerSelector, config);
}
