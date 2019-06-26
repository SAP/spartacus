export function navigateToCartPage() {
  const miniCart = cy.get('cx-mini-cart');
  miniCart.within(() => {
    cy.get('.count').should('contain', 1);
  });
  miniCart.click();
}

export function getCouponItem(couponCode: string) {
  return cy
    .get('cx-cart-coupon > cx-applied-coupons')
    .contains('.cx-coupon-code-pill', couponCode);
}

export function applyCoupon(couponCode: string) {
  cy.get('#applyVoucher').type(couponCode);
  cy.get('.col-md-4 > .btn').click();
  getCouponItem(couponCode).should('exist');
}

export function removeCoupon(couponCode: string) {
  getCouponItem(couponCode).within(() => {
    cy.get('.close').click();
  });
  getCouponItem(couponCode).should('not.exist');
}
