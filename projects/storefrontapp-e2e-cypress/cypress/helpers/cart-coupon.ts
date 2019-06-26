export function navigateToCartPage() {
  const miniCart = cy.get('cx-mini-cart');
  miniCart.within(() => {
    cy.get('.count').should('contain', 2);
  });
  miniCart.click();
}

export function navigateToCheckoutPage() {
  cy.get('cx-cart-totals > .btn')
    .should('contain', 'Proceed to Checkout')
    .click();
}

export function getCouponItemFromCart(couponCode: string) {
  return cy
    .get('cx-cart-coupon > cx-applied-coupons')
    .contains('.cx-coupon-code-pill', couponCode);
}

export function getCouponItemOrderSummary(couponCode: string) {
  return cy
    .get('cx-order-summary > cx-applied-coupons')
    .contains('.cx-coupon-code-pill', couponCode);
}

export function applyCoupon(couponCode: string) {
  cy.get('#applyVoucher').type(couponCode);
  cy.get('.col-md-4 > .btn').click();
  getCouponItemFromCart(couponCode).should('exist');
  getCouponItemOrderSummary(couponCode).should('exist');
}

export function removeCoupon(couponCode: string) {
  getCouponItemFromCart(couponCode).within(() => {
    cy.get('.close').click();
  });
  getCouponItemFromCart(couponCode).should('not.exist');
  getCouponItemOrderSummary(couponCode).should('not.exist');
}
