import { user } from '../sample-data/checkout-flow';

export function addProductToCart(productCode: string) {
  cy.get('cx-searchbox input')
    .clear()
    .type(`${productCode}{enter}`);
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.getByText(/view cart/i).click();
  });
}
export function applyCoupon(couponCode: string) {
  cy.get('#applyVoucher').type(couponCode);
  cy.get('.col-md-4 > .btn').click();
  cy.get('cx-global-message').should(
    'contain',
    `${couponCode} has been applied`
  );
}

export function removeCoupon(couponCode: string) {
  cy.get('.cx-coupon-apply > .close').click();
  getCouponItemFromCart(couponCode).should('not.exist');
  getCouponItemOrderSummary(couponCode).should('not.exist');
}

export function applyWrongCoupon() {
  cy.get('#applyVoucher').type('error');
  cy.get('.col-md-4 > .btn').click();
  cy.get('cx-global-message').should('contain', 'coupon.invalid.code.provided');
}

export function placeOrder(stateAuth: any) {
  return cy
    .get('.cx-total')
    .first()
    .then($cart => {
      const cartId = $cart.text().match(/[0-9]+/)[0];
      cy.requireShippingAddressAdded(user.address, stateAuth);
      cy.requireShippingMethodSelected(stateAuth);
      cy.requirePaymentDone(stateAuth);
      return cy.requirePlacedOrder(stateAuth, cartId);
    });
}
export function varifyOrderHistory(
  orderData: any,
  couponCode?: string,
  totalPrice?: string,
  savedPrice?: string
) {
  navigateToOrderHistoryPage(orderData);
  if (couponCode) {
    verifyCouponInOrderHistory(couponCode, totalPrice, savedPrice);
  } else {
    verifyNoCouponInOrderHistory();
  }
}
export function verifyCouponAndPromotion(
  couponCode: string,
  totalPrice: string,
  savedPrice: string
) {
  //verify coupon in cart
  getCouponItemFromCart(couponCode).should('exist');
  //verify promotion
  cy.get('.cx-promotions > :nth-child(1)').should('exist');
  //verify price
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-amount').should('contain', totalPrice);
    cy.get(':nth-child(4)').should('contain', `You saved: ${savedPrice}`);
  });
}

export function verifyGiftProductCoupon(productCode: string) {
  cy.get('cx-cart-item-list')
    .contains('cx-cart-item', productCode)
    .within(() => {
      cy.get('.cx-price > .cx-value').should('contain', '$0.00');
      cy.get(
        '.cx-quantity > .cx-value > .ng-untouched > .cx-counter-wrapper > .cx-counter > .cx-counter-value'
      ).should('contain', '1');
      cy.get('.cx-total > .cx-value').should('contain', '$0.00');
    });
}

export function verifyCouponInOrderHistory(
  couponCode: string,
  totalPrice: string,
  savedPrice: string
) {
  getCouponItemOrderSummary(couponCode).should('exist');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 5);
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-amount').should('contain', totalPrice);
    cy.get(':nth-child(4)').should('contain', `You saved: ${savedPrice}`);
  });
}

export function verifyNoCouponInOrderHistory() {
  cy.get('cx-order-summary > cx-applied-coupons').should('not.exist');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 4);
  cy.get('.cx-summary-partials').within(() => {
    cy.get(':nth-child(4)').should('not.contain', 'You saved');
  });
}

export function navigateToCheckoutPage() {
  cy.get('cx-cart-totals > .btn')
    .should('contain', 'Proceed to Checkout')
    .click();
}

export function navigateToCartPage() {
  cy.visit('cart');
}

export function navigateToOrderHistoryPage(orderData: any) {
  cy.visit('my-account/orders');
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-total > .cx-order-history-value').should(
    'contain',
    orderData.body.totalPrice.formattedValue
  );
  cy.get('.cx-order-history-code  ').within(() => {
    cy.get('.cx-order-history-value')
      .should('contain', orderData.body.code)
      .click();
  });
}

export function getCouponItemFromCart(couponCode: string) {
  return cy
    .get('cx-cart-coupon > cx-applied-coupons > .row')
    .contains('.cx-cart-coupon-code', couponCode);
}

export function getCouponItemOrderSummary(couponCode: string) {
  return cy
    .get('cx-order-summary > div > cx-applied-coupons')
    .contains('.cx-applied-coupon-code', couponCode);
}
