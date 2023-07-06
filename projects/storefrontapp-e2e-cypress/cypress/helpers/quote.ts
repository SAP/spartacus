/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as loginTools from './login';
import * as productSearch from './product-search';
import * as authentication from './auth-forms';

/**
 * Clicks on 'Add to cart' on the product details page.
 */
export function clickOnAddToCartBtnOnPD(): void {
  cy.get('cx-add-to-cart button.btn-primary')
    .contains('Add to cart')
    .click()
    .then(() => {
      cy.get('cx-added-to-cart-dialog').should('be.visible');
      cy.get('div.cx-dialog-body').should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-primary')
        .contains('view cart')
        .should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-secondary')
        .contains('proceed to checkout')
        .should('be.visible');
    });
}

/**
 * Clicks on 'View Cart' on the product details page.
 */
export function clickOnViewCartBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons a.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/cart');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Clicks on 'Request Quote' on the cart page.
 */
export function clickOnRequestQuoteInCart(): void {
  cy.get('cx-quote-request-button button')
    //.contains('Request A Quote')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/quote');
      cy.get('cx-quote-details-overview').should('be.visible');
    });
}

/**
 * Clicks on 'Proceed to Checkout' on the product details page.
 */
export function clickOnProceedToCheckoutBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons a.btn-secondary')
    .contains('proceed to checkout')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/delivery-address');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      cy.get('cx-delivery-address').should('be.visible');
    });
}

/**
 * Searches for a product by a product name.
 *
 * @param {string} productName - Product name
 */
export function searchForProduct(productName: string): void {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/suggestions?term=${productName}*`,
  }).as('productSearch');

  productSearch.searchForProduct(productName);
  cy.wait('@productSearch');
}

export function login(email: string, password: string, name: string): void {
  // Click on the 'Sign in / Register' link
  // & wait until the login-form is displayed
  cy.get('cx-login [role="link"]')
    .click()
    .then(() => {
      cy.get('cx-login-form').should('be.visible');
    });
  // Login via authentication service
  authentication.login(email, password);
  // Verify whether the user logged in successfully,
  // namely the logged in user should be greeted
  cy.get('.cx-login-greet').should('contain', name);
  cy.get('cx-login').should('not.contain', 'Sign In');
}

export function requestQuote(productName: string): void {
  this.searchForProduct(productName);
  this.clickOnAddToCartBtnOnPD();
  this.clickOnViewCartBtnOnPD();
  this.clickOnRequestQuoteInCart();
}
