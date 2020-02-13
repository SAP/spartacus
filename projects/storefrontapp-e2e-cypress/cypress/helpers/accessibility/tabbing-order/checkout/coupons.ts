import { addProduct, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';
import * as cartCoupon from '../../../cart-coupon';

const containerSelector = 'cx-cart-coupon';
const appliedCouponsContainerSelector = 'cx-applied-coupons';

export function checkoutCouponsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/users/current/carts*`
  ).as('getCarts');
  addProduct(cartCoupon.productCode1);
  cy.wait('@getCarts');
  verifyTabbingOrder(containerSelector, config);
}

export function checkoutAppliedCouponsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/users/current/carts*`
  ).as('getCarts');
  addProduct(cartCoupon.productCode1);
  cartCoupon.applyCoupon(cartCoupon.couponCode1);
  cy.wait('@getCarts');
  verifyTabbingOrder(appliedCouponsContainerSelector, config);
}
