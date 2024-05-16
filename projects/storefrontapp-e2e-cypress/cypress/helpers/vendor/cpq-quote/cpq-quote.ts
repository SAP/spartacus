/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-License-Identifier: Apache-2.0
 */

export function DiscountPercentageQuote() {
  log('Discount Percentage Heading', DiscountPercentageQuote.name);
  cy.get('#cx-item-list-discount')
    .should('contain.text', 'Discount Percentage')
    .and('be.visible');
}

export function DiscountPercentageQuoterow() {
  log('Discount Percentage Row', DiscountPercentageQuoterow.name);

  cy.get('cx-cart-item-list') // Locate the parent element containing the rows
    .find('tr[cx-cart-item-list-row]')
    .find('cx-cpq-quote')
    .first()
    .should('be.visible')
    .should('not.have.text', '');
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
