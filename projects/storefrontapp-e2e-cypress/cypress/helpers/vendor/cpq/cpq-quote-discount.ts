/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Verifies whether "Item Price" in Quote Heading is displayed.
 */
export function checkDiscountDisplayed() {
  cy.get('.cx-item-list-discount')
    .should('contain.text', 'Item Price')
    .and('be.visible');
}

/**
 * Verifies whether the discount formatted value is displayed.
 */
export function checkDiscountFormattedValueDisplayed() {
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
 * Verifies whether the discount offer is displayed.
 */
export function checkDiscountOfferDisplayed() {
  cy.get('cx-cart-item-list') // Locate the parent element containing the rows
    .find('tr[cx-cart-item-list-row]')
    .find('cx-cpq-quote-offer')
    .first()
    .should('be.visible');
  cy.get('.cx-offer');
}
