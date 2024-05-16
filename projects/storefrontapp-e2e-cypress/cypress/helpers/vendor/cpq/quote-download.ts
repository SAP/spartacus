/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const READ_QUOTE = '@READ_QUOTE';
export const READ_VENDOR_QUOTE = '@READ_VENDOR_QUOTE';
export const DOWNLOAD_ATTACHMENT = '@DOWNLOAD_ATTACHMENT';
const SHOP_NAME = Cypress.env('BASE_SITE'); //Powertools-spa

/**
 * Navigates to the vendor quote list via my account.
 */
export function navigateToVendorQuoteListFromMyAccount() {
  cy.get('.accNavComponent')
    .should('contain.text', 'My Account')
    .and('be.visible')
    .within(() => {
      cy.get('nav > ul > li > button').first().focus().trigger('keydown', {
        key: ' ',
        code: 'Space',
        force: true,
      });
      cy.get('cx-generic-link')
        .contains('Quotes')
        .should('be.visible')
        .click()
        .then(() => {
          cy.wait(READ_VENDOR_QUOTE);
          cy.url().should('include', 'quotes');
        });
    });
}

/**
 * Navigates to the quote with status as Vendor Quote.
 */
export function navigateToVendorQuote() {
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
 * Downloads the proposal document attached to the quote.
 */
export function downloadVendorQuoteAttachment() {
  cy.get('cx-quote-summary-actions section button.btn.btn-primary')
    .should('contain.text', 'Download Proposal').first()
    .scrollIntoView()
    .and('be.visible')
    .click()
    .then(() => {
      cy.wait(DOWNLOAD_ATTACHMENT).its('response.statusCode').should('eq', 200);
    });
}

/**
 * Registers read vendor quote route.
 */
export function registerReadVendorQuoteRoute() {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes*`,
  }).as(READ_VENDOR_QUOTE.substring(1)); // strip the '@'
}

/**
 * Registers download attachment route.
 */
export function registerDownloadAttachmentRoute() {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env(
      'OCC_PREFIX'
    )}/${SHOP_NAME}/users/*/quotes/*/attachments/*`,
  }).as(DOWNLOAD_ATTACHMENT.substring(1)); // strip the '@'
}
