/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyReviewOrderPage, waitForProductPage } from '../checkout-flow';
import * as b2bCheckout from './b2b-checkout';

export function visitProduct(productCode) {
  const page = `/product/${productCode}`;
  const bulkPricingAlias = 'bulkPrices';
  const productPageAlias = 'productPage';

  waitForProductPage(productCode, productPageAlias);

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgProducts/${productCode}*`
  ).as(bulkPricingAlias);

  cy.visit(page);

  cy.wait(`@${productPageAlias}`);
  cy.wait(`@${bulkPricingAlias}`).its('response.statusCode').should('eq', 200);
}

export function addOneToCart() {
  cy.get('cx-add-to-cart form button').last().click();
}

export function addAndverifyTotal(quantity) {
  cy.intercept(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgUsers/*/carts/*/entries?*`
  ).as('totalAlias');

  cy.get('cx-add-to-cart form div cx-item-counter input')
    .type('{selectall}')
    .type(quantity);
  cy.get('cx-add-to-cart form button').last().click();

  let totalPrice: string;
  cy.wait('@totalAlias').then((xhr) => {
    totalPrice = xhr.response.body.entry.totalPrice.value;
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').should(
      'contain',
      totalPrice
    );
  });
}

export function updateAndverifyTotal(newQuantity) {
  cy.intercept(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/carts/*/entries/0?lang=en&curr=USD`
  ).as('newTotalAlias');

  cy.get('cx-added-to-cart-dialog cx-item-counter input')
    .type('{selectall}')
    .type(newQuantity)
    .blur();

  let newTotalPrice: string;
  cy.wait('@newTotalAlias').then((xhr) => {
    newTotalPrice = xhr.response.body.entry.totalPrice.value;
    cy.get('cx-added-to-cart-dialog .cx-total .cx-value').should(
      'contain',
      newTotalPrice
    );
  });
}

export function loginB2bUser() {
  b2bCheckout.loginB2bUser();
}

export function placeOrder() {
  cy.get(
    'cx-added-to-cart-dialog .cx-dialog-buttons button.btn.btn-secondary'
  ).click();

  b2bCheckout.enterPONumber();
  b2bCheckout.selectAccountPayment();
  b2bCheckout.selectAccountShippingAddress();
  b2bCheckout.selectAccountDeliveryMode();

  verifyReviewOrderPage();

  cy.get('input[formcontrolname="termsAndConditions"]').check();

  b2bCheckout.placeOrder('/order-confirmation');
}
