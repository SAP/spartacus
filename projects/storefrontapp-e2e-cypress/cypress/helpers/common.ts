/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const addToCartDialog = 'cx-added-to-cart-dialog';

/**
 * Clicks on 'Add to cart' on the product details page.
 */
export function clickOnAddToCartBtnOnPD(): void {
  cy.get('cx-add-to-cart button.btn-primary')
    .contains('Add to cart')
    .click()
    .then(() => {
      cy.get(addToCartDialog).should('be.visible');
      cy.get('div.cx-dialog-body').should('be.visible');
      cy.get('div.cx-dialog-buttons button.btn-primary')
        .contains('view cart')
        .should('be.visible');
      cy.get('div.cx-dialog-buttons button.btn-secondary')
        .contains('proceed to checkout')
        .should('be.visible');
    });
}

/**
 * Clicks on 'View Cart' on the product details page.
 */
export function clickOnViewCartBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons button.btn-primary')
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

/**
 * Clicks on 'Edit Configuration' or 'Display Configuration' link in the add-to-cart dialog.
 *
 * @param isReadOnly - if 'isReadOnly' is false then 'Edit Configuration' link is displayed, otherwise 'Display Configuration' link.
 */
export function clickOnConfigurationLink(isReadOnly = false): void {
  let linkText = isReadOnly ? 'Display' : 'Edit';

  cy.get(addToCartDialog).within(() => {
    cy.get('cx-configurator-cart-entry-info').within(() => {
      cy.get('cx-configure-cart-entry')
        .find(`a:contains(${linkText})`)
        .click()
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
  });
}

/**
 * Clicks on 'Resolve Issues' link in the add-to-cart dialog.
 */
export function clickOnResolveIssuesLink(): void {
  cy.get(addToCartDialog).within(() => {
    cy.get('cx-configurator-issues-notification').within(() => {
      cy.get('cx-configure-cart-entry')
        .find('a:contains("Resolve")')
        .click()
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
  });
}
