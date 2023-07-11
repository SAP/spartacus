/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
 * Sets quantity on PDP
 */
export function setQtyOnPD(quantity: string): void {
  cy.get('input.ng-pristine').clear().type(quantity);
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
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/quote');
      cy.get('cx-quote-details-overview').should('be.visible');
    })
    .then(() => {
      cy.get('cx-quote-actions-by-role').should('be.visible');
    });
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

export function requestQuote(
  shopName,
  productName: string,
  quantity: string
): void {
  this.goToPDPage(shopName, productName);
  this.setQtyOnPD(quantity);
  this.clickOnAddToCartBtnOnPD();
  this.clickOnViewCartBtnOnPD();
  this.clickOnRequestQuoteInCart();
}

/**
 * Navigates to the product detail page.
 *
 * @param {string} shopName - shop name
 * @param {string} productId - Product ID
 */
export function goToPDPage(shopName: string, productId: string): void {
  const location = `${shopName}/en/USD/product/${productId}/${productId}`;
  cy.visit(location).then(() => {
    checkLoadingMsgNotDisplayed();
    cy.location('pathname').should('contain', location);
    cy.get('.ProductDetailsPageTemplate').should('be.visible');
  });
}

/**
 * Verifies whether the loading message is not displayed.
 */
export function checkLoadingMsgNotDisplayed(): void {
  cy.log('Wait until the loading notification is not displayed anymore');
  cy.get('cx-storefront').should('not.contain.value', 'Loading');
}

/**
 * Checks on the global message on the top of the page.
 */
export function checkGlobalMessageDisplayed(isDisplayed: boolean): void {
  if (isDisplayed) {
    cy.get('cx-global-message').should('be.visible');
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Checks submit button on quote page.
 */
export function checkSubmitButton(isEnabled: boolean): void {
  if (isEnabled) {
    cy.get('button.btn-primary').should('be.enabled');
  } else {
    cy.get('button.btn-primary').should('be.disabled');
  }
}
