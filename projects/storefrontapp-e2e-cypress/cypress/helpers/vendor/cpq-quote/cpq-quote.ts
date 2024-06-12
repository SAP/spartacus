/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Registers read vendor quote route.
 */

export const READ_VENDOR_QUOTE = '@READ_VENDOR_QUOTE';
export const READ_QUOTE = '@READ_QUOTE';

const SHOP_NAME = Cypress.env('BASE_SITE'); //Powertools-spa
const QUOTE_LIST_PATH = `${SHOP_NAME}/en/USD/my-account/quotes`;
const listComponentSelector = 'cx-quote-list';

export function registerReadVendorQuoteRoute() {
  log('Registers read vendor quote route.', registerReadVendorQuoteRoute.name);
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes*`,
  }).as(READ_VENDOR_QUOTE.substring(1)); // strip the '@'
}

/**
 * Navigates to the quote list.
 */
export function navigateQuoteList() {
  log('Navigates to the quote list', navigateQuoteList.name);
  cy.visit(QUOTE_LIST_PATH).then(() => {
    cy.location('pathname').should('contain', QUOTE_LIST_PATH);
    checkQuoteListDisplayed();
  });
}
/**
 * Verifies whether the quote list page is displayed.
 */
export function checkQuoteListDisplayed() {
  log(
    'Verifies whether the quote list page is displayed',
    checkQuoteListDisplayed.name
  );
  cy.get(listComponentSelector).should('be.visible');
}

/**
 * Display "Item Price" in Quote Heading.
 */
export function checkDiscountDisplayed() {
  log('Discount Percentage Heading', checkDiscountDisplayed.name);
  cy.get('.cx-item-list-discount')
    .should('contain.text', 'Item Price')
    .and('be.visible');
}

/**
 * Display Discount Percentage Row visible.
 */
export function checkDiscountDisplayedrow() {
  log('Discount Percentage Row', checkDiscountDisplayedrow.name);

  cy.get('cx-cart-item-list') // Locate the parent element containing the rows
    .find('tr[cx-cart-item-list-row]')
    .find('cx-cpq-quote')
    .first()
    .should('be.visible');
  cy.get('.cx-discount').should('be.visible');
  cy.get('.cx-formatted-value')
    .should('be.visible')
    .should('not.have.text', '');
}
/**
 * Display Discount Percentage Column visible for Offer Label.
 */
export function checkDiscountDisplayedOffer() {
  log('Discount Percentage Row', checkDiscountDisplayedOffer.name);

  cy.get('cx-cart-item-list') // Locate the parent element containing the rows
    .find('tr[cx-cart-item-list-row]')
    .find('cx-cpq-quote-offer')
    .first()
    .should('be.visible');
  cy.get('.cx-offer');
}

export function registerReadQuoteRoute() {
  log('Registers read quote route.', registerReadQuoteRoute.name);
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes/*`,
  }).as(READ_QUOTE.substring(1)); // strip the '@'
}
/**
 * Navigates to the quote with status as Vendor Quote.
 */

export function navigateToVendorQuote() {
  log(
    'Navigates to the quote with status as Vendor Quote',
    navigateToVendorQuote.name
  );
  cy.get('.cx-status .quote-offer')
    .should('contain.text', 'Vendor Quote')
    .first()
    .and('be.visible')
    .click()
    .then(() => {
      cy.wait(READ_QUOTE);
      cy.get('h1').should('contain.text', 'Quote Details');
    });
}

/**
 * Creates a simple log with ##### comment <functionName> ######
 *
 * @param comment Could be the description of the function
 * @param functionName Name of the called function
 */
function log(comment: string, functionName: string) {
  cy.log(`##### ${comment} <${functionName}> #####`);
}
