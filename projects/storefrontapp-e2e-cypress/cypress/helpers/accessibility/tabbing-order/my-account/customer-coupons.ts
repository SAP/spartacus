import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';
import { claimCoupon } from '../../../my-coupons';

export function customerCouponsTabbingOrder(config: TabElement[]) {
  claimCoupon('springfestival');
  cy.get('cx-coupon-card .cx-coupon-card-id').should(
    'contain',
    'springfestival'
  );
  verifyTabbingOrder('.AccountPageTemplate', config);
}

export function customerCouponDialogTabbingOrder(config: TabElement[]) {
  claimCoupon('springfestival');
  cy.get('cx-coupon-card .cx-card-read-more')
    .first()
    .click();
  verifyTabbingOrder('cx-coupon-dialog', config);
}
