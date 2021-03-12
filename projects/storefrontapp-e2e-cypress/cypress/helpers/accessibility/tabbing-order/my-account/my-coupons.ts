import {
  claimCoupon,
  CouponWithOpenCatalog,
} from '../../../coupons/my-coupons';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-my-coupons';

export function checkoutMyCouponsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/coupons');

  claimCoupon(CouponWithOpenCatalog);

  verifyTabbingOrder(containerSelector, config);
}
