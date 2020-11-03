import { user } from '../sample-data/checkout-flow';
import { waitForOrderToBePlacedRequest } from '../support/utils/order-placed';

export const productCode1 = '300938';
export const couponCode1 = 'CouponForCart';
export const productCode2 = '493683';
export const couponCode2 = 'CouponForProduct';
export const productCode3 = '1986316';
export const couponCode3 = 'FreeGiftCoupon';
export const giftProductCode = '443175';

export const productCode4 = '1934793';
export const myCouponCode1 = 'springfestival';
export const myCouponCode2 = 'midautumn';

export function addProductToCart(productCode: string) {
  cy.get('cx-searchbox input')
    .clear({ force: true })
    .type(`${productCode}{enter}`, { force: true });
  cy.get('cx-add-to-cart')
    .findAllByText(/Add To Cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.findByText(/view cart/i).click();
  });
}

export function verifyEmptyCoupons() {
  cy.get('.cx-available-coupon').should('not.exist');
}

export function verifyMyCoupons() {
  cy.get('.cx-available-coupon .coupon-id').should('have.length', 2);
  cy.get('.cx-available-coupon .coupon-id').should('contain', myCouponCode1);
  cy.get('.cx-available-coupon .coupon-id').should('contain', myCouponCode2);
}

export function ApplyMyCoupons(couponCode: string) {
  cy.get('.cx-available-coupon').within(() => {
    cy.findByText(couponCode).parent().click();
  });
  cy.get('cx-global-message').should(
    'contain',
    `${couponCode} has been applied`
  );
  getCouponItemFromCart(couponCode).should('exist');
  cy.get('.cx-available-coupon .coupon-id').should('not.contain', couponCode);
}

export function claimCoupon(couponCode: string) {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/customercoupons/${couponCode}/claim`,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}

const cartCouponInput = 'input.input-coupon-code';
const cartCouponButton = 'button.apply-coupon-button';
const applyCartCoupon = (code: string) => {
  cy.get('cx-cart-coupon').within(() => {
    cy.get(cartCouponInput).type(code);
    cy.get(cartCouponButton).click();
  });
};

export function applyMyCouponAsAnonymous(couponCode: string) {
  addProductToCart(productCode4);
  applyCartCoupon(couponCode);
  getCouponItemFromCart(couponCode).should('not.exist');
  cy.get('cx-global-message .alert').should('exist');
}

export function applyCoupon(couponCode: string) {
  applyCartCoupon(couponCode);
  cy.get('cx-global-message').should(
    'contain',
    `${couponCode} has been applied`
  );
  getCouponItemFromCart(couponCode).should('exist');
}

export function removeCoupon(couponCode: string) {
  cy.get('.cx-coupon-apply > .close').click();
  getCouponItemFromCart(couponCode).should('not.exist');
  getCouponItemOrderSummary(couponCode).should('not.exist');
}

export function applyWrongCoupon() {
  applyCartCoupon('wrongCouponCode');
  cy.get('cx-global-message').should('contain', 'Invalid code provided.');
}

export function placeOrder(stateAuth: any) {
  return cy
    .get('.cx-total')
    .first()
    .then(($cart) => {
      const cartId = $cart.text().match(/[0-9]+/)[0];
      cy.requireShippingAddressAdded(user.address, stateAuth);
      cy.requireShippingMethodSelected(stateAuth);
      cy.requirePaymentDone(stateAuth);
      return cy.requirePlacedOrder(stateAuth, cartId);
    });
}
export function verifyOrderHistory(
  orderData: any,
  couponCode?: string,
  totalPrice?: string,
  savedPrice?: string
) {
  waitForOrderToBePlacedRequest(orderData.body.code);
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
    cy.get(':nth-child(5)').should('contain', `You saved: ${savedPrice}`);
  });
}

export function verifyCouponAndSavedPrice(
  couponCode: string,
  savedPrice: string
) {
  //verify coupon in cart
  getCouponItemFromCart(couponCode).should('exist');

  //verify saved price
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-row').contains(`You saved: ${savedPrice}`);
  });
}

export function verifyCouponAndSavedPriceInOrder(
  couponCode: string,
  savedPrice: string
) {
  //verify coupon in order
  getCouponItemOrderSummary(couponCode).should('exist');

  //verify saved price
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-row').contains(`You saved: ${savedPrice}`);
  });
}

export function verifyOrderHistoryForCouponAndPrice(
  orderData: any,
  couponCode?: string,
  savedPrice?: string
) {
  waitForOrderToBePlacedRequest(orderData.body.code);
  navigateToOrderHistoryPage(orderData);
  if (couponCode) {
    verifyCouponAndSavedPriceInOrder(couponCode, savedPrice);
  } else {
    verifyNoCouponInOrderHistory();
  }
}

export function verifyGiftProductCoupon(productCode: string) {
  cy.get('cx-cart-item-list')
    .contains('cx-cart-item', productCode)
    .within(() => {
      cy.get('.cx-price > .cx-value').should('contain', '$0.00');
      cy.get('cx-item-counter input').should('have.value', '1');
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
    cy.get(':nth-child(5)').should('contain', `You saved: ${savedPrice}`);
  });
}

export function verifyNoCouponInOrderHistory() {
  cy.get('cx-order-summary > cx-applied-coupons').should('not.exist');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 4);
  cy.get('.cx-summary-partials').within(() => {
    cy.get(':nth-child(5)').should('not.contain', 'You saved');
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
    .get('cx-order-summary cx-applied-coupons')
    .contains('.cx-applied-coupon-code', couponCode);
}

export function verifyProductInCart(productCode: string) {
  cy.get('cx-cart-item').within(() => {
    cy.get('.cx-code').should('contain', productCode);
  });
}

export function verifyOrderPlacingWithCouponAndCustomerCoupon() {
  const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token;
  addProductToCart(productCode4);
  verifyProductInCart(productCode4);
  verifyEmptyCoupons();
  claimCoupon(myCouponCode1);
  claimCoupon(myCouponCode2);

  navigateToCartPage();
  verifyMyCoupons();
  ApplyMyCoupons(myCouponCode2);
  applyCoupon(couponCode1);
  //don't verify the total price which easy to changed by sample data
  verifyCouponAndSavedPrice(myCouponCode2, '$30');

  placeOrder(stateAuth).then((orderData: any) => {
    verifyOrderHistoryForCouponAndPrice(orderData, myCouponCode2, '$30');
    getCouponItemOrderSummary(couponCode1).should('exist');
  });
}

export function verifyCustomerCouponRemoving() {
  const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token;
  claimCoupon(myCouponCode2);
  addProductToCart(productCode4);
  ApplyMyCoupons(myCouponCode2);
  verifyCouponAndSavedPrice(myCouponCode2, '$20');

  navigateToCheckoutPage();
  navigateToCartPage();
  removeCoupon(myCouponCode2);

  placeOrder(stateAuth).then((orderData: any) => {
    verifyOrderHistory(orderData);
  });
}
