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

export function getCouponItemFromCart(couponCode: string) {
  return cy
    .get('cx-cart-coupon > cx-applied-coupons > .row')
    .contains('.cx-coupon-apply', couponCode);
}

export function getCouponItemOrderSummary(couponCode: string) {
  return cy
    .get('cx-order-summary > cx-applied-coupons')
    .contains('.cx-applied-coupon-code', couponCode);
}

export function navigateToCartPage() {
  const miniCart = cy.get('cx-mini-cart');
  miniCart.within(() => {
    cy.get('.count').should('exist');
  });
  miniCart.click();
}

export function navigateToCheckoutPage() {
  cy.get('cx-cart-totals > .btn')
    .should('contain', 'Proceed to Checkout')
    .click();
}

export function navigateToOrderDetailsPage() {
  cy.get('.cx-order-history-table tr')
    .first()
    .should('exist')
    .click();
}

export function verifyCouponInOrderSummary(
  couponCode: string,
  withCoupon: boolean
) {
  if (withCoupon) {
    getCouponItemOrderSummary(couponCode).should('exist');
  } else {
    getCouponItemOrderSummary(couponCode).should('not.exist');
  }
}

export function verifyGiftProductCoupon(productCode: string) {
  cy.get('cx-cart-item-list')
    .contains('cx-cart-item', productCode)
    .within(() => {
      cy.get('.cx-price>.cx-value').should('contain', '$0.00');
      cy.get('.cx-counter-value').should('not.exist');
      cy.get('.cx-total>.cx-value').should('contain', '$0.00');
    });
}
