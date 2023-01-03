/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { user } from '../../sample-data/checkout-flow';
import { waitForOrderToBePlacedRequest } from '../../support/utils/order-placed';
import { addProductToCart as addToCart } from '../applied-promotions';
import { AUTH_STORAGE_KEY, getStateAuth } from '../auth';
import { cartUser } from '../cart';
import { loginAsGuest } from '../checkout-as-guest';
import * as checkout from '../checkout-flow';
import { generateMail, randomString } from '../user';

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

export enum UserType {
  LOGGED = 'current',
  ANONYMOUS = 'anonymous',
}

export function visitProductPage(productCode: string) {
  registerProductDetailsRoute(productCode);
  cy.visit(`/product/${productCode}`);
  cy.wait('@product_details');
}

export function addProductToCart(productCode: string) {
  addToCart();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-code').should('contain', productCode);
    cy.findByText(/view cart/i).click();
  });
}

export function verifyPrice(subtotal: string, discount: string) {
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-amount').should('contain', subtotal);
    cy.get('.cx-summary-row')
      .contains(/you saved/i)
      .should('contain', `${discount}`);
  });
}

export function refreshCartAndVerifyIfCouponAdded(
  couponCode: string,
  userType = UserType.LOGGED
) {
  verifyRefreshCart(userType).then(({ subTotal, totalDiscounts }) => {
    const subtotal = subTotal.formattedValue;
    const discount = totalDiscounts.formattedValue;
    verifyBannerAfterAddingCoupon(couponCode);
    getCouponItemFromCart(couponCode).should('exist');
    verifyPrice(subtotal, discount);
    getCouponItemOrderSummary(couponCode).should('contain', couponCode);
  });
}

export function refreshCartAndVerifyIfCoupons(couponCode: string) {
  verifyRefreshCart(UserType.LOGGED).then(({ subTotal, totalDiscounts }) => {
    const subtotal = subTotal.formattedValue;
    const discount = totalDiscounts.formattedValue;
    getCouponItemFromCart(couponCode).should('exist');
    verifyPrice(subtotal, discount);
    getCouponItemOrderSummary(couponCode).should('contain', couponCode);
  });
}

export function verifyBannerAfterAddingCoupon(couponCode) {
  cy.get('cx-global-message').should(
    'contain',
    `${couponCode} has been applied`
  );
}

export function applyCoupon(couponCode: string, userType = UserType.LOGGED) {
  registerCartRefreshRoute(userType);

  applyCartCoupon(couponCode);

  refreshCartAndVerifyIfCouponAdded(couponCode, userType);
}

export function applyCouponAndProceedToGuestCheckout(couponCode: string) {
  applyCoupon(couponCode, UserType.ANONYMOUS);
  verifyLoginPageForGuestCheckout();
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
        JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)).token.access_token
      }`,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
}

const cartCouponInput = 'input.input-coupon-code';
const cartCouponButton = 'button.apply-coupon-button';
const applyCartCoupon = (code: string) => {
  interceptVoucherPostRequest();
  cy.get('cx-cart-coupon').within(() => {
    cy.get(cartCouponInput).type(code);
    cy.get(cartCouponButton).click();
    cy.wait('@fetchVoucher');
  });
};

export function applyMyCouponAsAnonymous() {
  visitProductPage(powerShotA480);
  addProductToCart(powerShotA480);
  applyCartCoupon(midAutumnCoupon);
  getCouponItemFromCart(midAutumnCoupon).should('not.exist');
  cy.get('cx-global-message .alert').should('exist');
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
  return goThroughCheckout(token, true);
}

export function goThroughCheckout(token: any, placeOrder = false) {
  return cy
    .get('.cx-total')
    .first()
    .then(($cart) => {
      cy.log('Placing order asynchronously');
      const cartId = $cart.text().match(/[0-9]+/)[0];
      // Need to pass numeric CartId explicitly to avoid using the wrong cart for checkout
      registerReviewOrderRoute(cartId);
      cy.requireDeliveryAddressAdded(user.address, token, cartId);
      cy.requireDeliveryMethodSelected(token, cartId);
      cy.requirePaymentDone(token, cartId);
      if (placeOrder) {
        return cy.requirePlacedOrder(token, cartId);
      }
    });
}

export function goThroughGuestCheckout() {
  return cy.log('Placing order synchronously').then(() => {
    registerReviewOrderRoute();
    loginAsGuest(user);
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
  });
}

export function verifyOrderHistory(orderData: any, couponCode?: string) {
  waitForOrderToBePlacedRequest(orderData.body.code);
  registerOrderDetailsRoute(orderData.body.code);
  visitOrdersPage();
  cy.get('cx-order-history h2').should('contain', 'Order history');
  cy.get('.cx-order-history-code  ').within(() => {
    cy.get('.cx-order-history-value')
      .should('contain', orderData.body.code)
      .click();
  });
  cy.wait('@order_details').then((xhr) => {
    const subtotal = xhr.response.body.subTotal.formattedValue;
    const orderDiscount = xhr.response.body.totalDiscounts.formattedValue;
    if (couponCode) {
      getCouponItemOrderSummary(couponCode).should('exist');
      cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 5);
      verifyPrice(subtotal, orderDiscount);
    } else {
      verifyNoCouponInOrder();
    }
  });
}

export function verifyCouponInReviewOrder(couponCode?: string) {
  visitReviewOrderPage();
  cy.wait('@review_order').then((xhr) => {
    const subtotal = xhr.response.body.subTotal.formattedValue;
    const orderDiscount = xhr.response.body.totalDiscounts.formattedValue;
    if (!couponCode) {
      verifyNoCouponInOrder();
    } else {
      getCouponItemOrderSummary(couponCode).should('exist');
      cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 5);
      verifyPrice(subtotal, orderDiscount);
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
  verifyPrice(totalPrice, savedPrice);
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
    verifyNoCouponInOrder();
  }
}

export function verifyGiftProductCoupon(productCode: string) {
  cy.get('cx-cart-item-list')
    .contains('tr[cx-cart-item-list-row]', productCode)
    .within(() => {
      cy.get('.cx-price > .cx-value').should('contain', '$0.00');
      cy.get('cx-item-counter input').should('have.value', '1');
      cy.get('.cx-total > .cx-value').should('contain', '$0.00');
    });
}

export function verifyNoCouponInOrder() {
  cy.get('cx-order-summary > cx-applied-coupons').should('not.be.visible');
  cy.get('.cx-summary-partials > .cx-summary-row').should('have.length', 4);
  cy.get('.cx-summary-partials').within(() => {
    cy.get(':nth-child(5)').should('not.exist');
  });
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
  visitOrdersPage();
  cy.get('cx-order-history h2').should('contain', 'Order history');
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
  cy.get('.cx-table-item-container').within(() => {
    cy.get('.cx-code').should('contain', productCode);
  });
}

export function verifyOrderPlacingWithCouponAndCustomerCoupon() {
  const stateAuth = getStateAuth();
  visitProductPage(powerShotA480);
  addProductToCart(powerShotA480);
  verifyProductInCart(powerShotA480);
  cy.get('.cx-available-coupon').should('not.exist');
  claimCoupon(springFestivalCoupon);
  claimCoupon(midAutumnCoupon);

  visitCartPage();
  verifyMyCoupons();
  ApplyMyCoupons(midAutumnCoupon, true);
  applyCoupon(couponForCart);
  //don't verify the total price which easy to changed by sample data
  verifyCouponAndSavedPrice(midAutumnCoupon, '$30');

  placeOrder(stateAuth.token).then((orderData: any) => {
    verifyOrderHistoryForCouponAndPrice(orderData, midAutumnCoupon, '$30');
    getCouponItemOrderSummary(couponForCart).should('exist');
  });
}

export function verifyCustomerCouponRemoving() {
  const stateAuth = getStateAuth();
  visitProductPage(powerShotA480);
  claimCoupon(midAutumnCoupon);
  addProductToCart(powerShotA480);
  ApplyMyCoupons(midAutumnCoupon);
  verifyCouponAndSavedPrice(midAutumnCoupon, '$20');

  removeCoupon(midAutumnCoupon);

  placeOrder(stateAuth.token).then((orderData: any) => {
    verifyOrderHistory(orderData);
  });
}

export function getCartUser() {
  return {
    ...cartUser,
    registrationData: {
      ...cartUser.registrationData,
      email: generateMail(randomString(), true),
    },
  };
}

export function getCartUserForExpressCheckout() {
  return {
    ...cartUser,
    registrationData: {
      ...cartUser.registrationData,
      email: generateMail(randomString(), true),
    },
    ...user,
  };
}

function registerProductDetailsRoute(productCode: string) {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/${productCode}?fields=*&lang=en&curr=USD`,
  }).as('product_details');
}
function registerCartRefreshRoute(userType = UserType.LOGGED) {
  // When adding a coupon to the cart, this route matches Selective carts first
  //TODO matchers don't have proper regex (digits only). This might fail with a lot of carts in the system.
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/${userType}/carts/${
      userType === UserType.ANONYMOUS ? '*' : '[0-9]*'
    }?fields=*&lang=en&curr=USD`,
  }).as(`refresh_${userType}_cart`);
}

function registerReviewOrderRoute(cartId?: string) {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}//users/${
      cartId ? UserType.LOGGED : UserType.ANONYMOUS
    }/carts/${cartId || '*'}?fields=DEFAULT*`,
  }).as('review_order');
}

function visitReviewOrderPage() {
  const reviewOrderPage = checkout.waitForPage(
    '/checkout/review-order',
    'getReviewOrder'
  );
  cy.visit('/checkout/review-order');
  cy.wait(`@${reviewOrderPage}`).its('response.statusCode').should('eq', 200);
}

function visitOrdersPage() {
  const ordersPage = checkout.waitForPage('/my-account/orders', 'getOrders');
  cy.visit('my-account/orders');
  cy.wait(`@${ordersPage}`).its('response.statusCode').should('eq', 200);
}

function visitCartPage() {
  const cartPage = checkout.waitForPage('cart', 'cartPage');
  cy.visit('cart');
  cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
}

export function verifyRefreshCart(userType: string) {
  const alias = `@refresh_${userType}_cart`;
  cy.wait(alias).its('response.statusCode').should('eq', 200);
  return cy.get(alias).its('response.body');
}

function verifyLoginPageForGuestCheckout() {
  const loginPage = checkout.waitForPage('login', 'getLoginPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
}

function interceptVoucherPostRequest() {
  cy.intercept({
    method: 'POST',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/vouchers?voucherId=*&lang=en&curr=USD`,
  }).as(`fetchVoucher`);
}
