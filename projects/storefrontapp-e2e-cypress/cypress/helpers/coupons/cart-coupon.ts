import { user } from '../../sample-data/checkout-flow';
import { waitForOrderToBePlacedRequest } from '../../support/utils/order-placed';

export const productCode1 = '300938';
export const couponForCart = 'CouponForCart'; //Get $10 off your order
export const productCode2 = '493683';
export const couponForProduct = 'CouponForProduct'; //Get 25% off in all camera lenses
export const productCode3 = '1986316';
export const freeGiftCoupon = 'FreeGiftCoupon'; //Get a free gift when you buy Powershot A480 (1934796)
export const giftProductCode = '443175';

export const powerShotA480 = '1934793';
export const springFestivalCoupon = 'springfestival';
export const midAutumnCoupon = 'midautumn';

export function visitProductPage(productCode: string) {
  registerProductDetailsRoute(productCode);
  cy.visit(`/product/${productCode}`);
  cy.wait('@product_details');
}

export function addProductToCart(productCode: string) {
  cy.get('cx-add-to-cart')
    .findAllByText(/Add To Cart/i)
    .first()
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.findByText(/view cart/i).click();
  });
}

export function applyCoupon(couponCode: string) {
  registerCartRefreshRoute();

  applyCartCoupon(couponCode);

  cy.wait('@refresh_cart').then((xhr) => {
    const subtotal = xhr.response.body.subTotal.formattedValue;
    const discount = xhr.response.body.totalDiscounts.formattedValue;
    cy.get('cx-global-message').should(
      'contain',
      `${couponCode} has been applied`
    );
    getCouponItemFromCart(couponCode).should('exist');
    cy.get('.cx-promotions > :nth-child(1)').should('exist');
    //verify price
    cy.get('.cx-summary-partials').within(() => {
      cy.get('.cx-summary-amount').should('contain', subtotal);
      cy.get(':nth-child(5)').should('contain', `You saved: ${discount}`);
    });
  });
}

export function verifyMyCoupons() {
  cy.get('.cx-available-coupon .coupon-id').should('have.length', 2);
  cy.get('.cx-available-coupon .coupon-id').should(
    'contain',
    springFestivalCoupon
  );
  cy.get('.cx-available-coupon .coupon-id').should('contain', midAutumnCoupon);
}

export function ApplyMyCoupons(
  couponCode: string,
  checkOrderPromotion: boolean = false
) {
  cy.get('.cx-available-coupon').within(() => {
    cy.findByText(couponCode).parent().click();
  });
  cy.get('cx-global-message').should(
    'contain',
    `${couponCode} has been applied`
  );
  getCouponItemFromCart(couponCode).should('exist');
  if (checkOrderPromotion) {
    cy.get('.cx-available-coupon .coupon-id').should('not.contain', couponCode);
  }
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

export function applyMyCouponAsAnonymous() {
  visitProductPage(powerShotA480);
  addProductToCart(powerShotA480);
  applyCartCoupon(midAutumnCoupon);
  getCouponItemFromCart(midAutumnCoupon).should('not.exist');
  cy.get('cx-global-message .alert').should('exist');
}

export function registerProductDetailsRoute(productCode: string) {
  const exp1 = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
    'BASE_SITE'
  )}/products/${productCode}?fields=*&lang=en&curr=USD`;

  cy.intercept('GET', exp1).as('product_details');
}

function registerCartRefreshRoute() {
  // When adding a coupon to the cart, this route matches Selective carts first
  //TODO matchers don't have proper regex (digits only). This might fail with a lot of carts in the system.
  const exp1 = `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
    'BASE_SITE'
  )}/users/current/carts/0*?fields=*&lang=en&curr=USD`;

  cy.intercept('GET', exp1).as('refresh_cart');
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

export function placeOrder(token: any) {
  return cy
    .get('.cx-total')
    .first()
    .then(($cart) => {
      cy.log('Placing order asynchronously');
      const cartId = $cart.text().match(/[0-9]+/)[0];
      // Need to pass numeric CartId explicitly to avoid using the wrong cart for checkout
      cy.requireShippingAddressAdded(user.address, token, cartId);
      cy.requireShippingMethodSelected(token, cartId);
      cy.requirePaymentDone(token, cartId);
      return cy.requirePlacedOrder(token, cartId);
    });
}

export function verifyOrderHistory(orderData: any, couponCode?: string) {
  waitForOrderToBePlacedRequest(orderData.body.code);
  registerOrderDetailsRoute(orderData.body.code);
  cy.visit('my-account/orders');
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-code  ').within(() => {
    cy.get('.cx-order-history-value')
      .should('contain', orderData.body.code)
      .click();
  });
  cy.wait('@order_details').then((xhr) => {
    console.log(JSON.stringify(xhr.response.body));
    const subtotal = xhr.response.body.subTotal.formattedValue;
    const orderDiscount = xhr.response.body.totalDiscounts.formattedValue;
    if (couponCode) {
      getCouponItemOrderSummary(couponCode).should('exist');
      cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 5);
      cy.get('.cx-summary-partials').within(() => {
        cy.get('.cx-summary-amount').should('contain', subtotal);
        cy.get(':nth-child(5)').should(
          'contain',
          `You saved: ${orderDiscount}`
        );
      });
    } else {
      verifyNoCouponInOrderHistory();
    }
  });
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
  navigateToOrderHistoryPage(orderData, couponCode);
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
  cy.get('cx-order-summary > cx-applied-coupons').should('not.be.visible');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 4);
  cy.get('.cx-summary-partials').within(() => {
    cy.get(':nth-child(5)').should('not.exist');
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

export function registerOrderDetailsRoute(orderCode: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${orderCode}?fields=*&lang=en&curr=USD`
  ).as('order_details');
}

export function navigateToOrderHistoryPage(orderData: any, couponCode: string) {
  registerOrderDetailsRoute(orderData.body.code);
  cy.visit('my-account/orders');
  cy.get('cx-order-history h3').should('contain', 'Order history');
  cy.get('.cx-order-history-code  ').within(() => {
    cy.get('.cx-order-history-value')
      .should('contain', orderData.body.code)
      .click();
  });
  cy.wait('@order_details').then((xhr) => {
    const subtotal = xhr.response.body.subTotal.formattedValue;
    const orderDiscount = xhr.response.body.totalDiscounts.formattedValue;
    getCouponItemOrderSummary(couponCode).should('exist');
    cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 5);
    cy.get('.cx-summary-partials').within(() => {
      cy.get('.cx-summary-amount').should('contain', subtotal);
      cy.get(':nth-child(5)').should('contain', `You saved: ${orderDiscount}`);
    });
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
  visitProductPage(powerShotA480);
  addProductToCart(powerShotA480);
  verifyProductInCart(powerShotA480);
  cy.get('.cx-available-coupon').should('not.exist');
  claimCoupon(springFestivalCoupon);
  claimCoupon(midAutumnCoupon);

  navigateToCartPage();
  verifyMyCoupons();
  ApplyMyCoupons(midAutumnCoupon, true);
  applyCoupon(couponForCart);
  //don't verify the total price which easy to changed by sample data
  verifyCouponAndSavedPrice(midAutumnCoupon, '$30');

  placeOrder(stateAuth).then((orderData: any) => {
    verifyOrderHistoryForCouponAndPrice(orderData, midAutumnCoupon, '$30');
    getCouponItemOrderSummary(couponForCart).should('exist');
  });
}

export function verifyCustomerCouponRemoving() {
  const stateAuth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token;
  visitProductPage(powerShotA480);
  claimCoupon(midAutumnCoupon);
  addProductToCart(powerShotA480);
  ApplyMyCoupons(midAutumnCoupon);
  verifyCouponAndSavedPrice(midAutumnCoupon, '$20');

  removeCoupon(midAutumnCoupon);

  placeOrder(stateAuth).then((orderData: any) => {
    verifyOrderHistory(orderData);
  });
}
