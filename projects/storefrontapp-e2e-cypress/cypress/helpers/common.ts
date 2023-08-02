/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
