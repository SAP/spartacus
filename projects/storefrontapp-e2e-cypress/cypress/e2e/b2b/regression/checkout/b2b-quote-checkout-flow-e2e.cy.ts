/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
const PRODUCT_AMOUNT_30 = 3000;

context('Checkout - PO Number field behavior (CXSPA-10956)', () => {
  before(() => {
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    cart.clearActiveCart();
    quote.logout();
  });

  beforeEach(() => {
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
  });

  it('should make PO Number field non-editable if quote already has a PO Number', () => {
    quote.prepareQuote(
      TEST_PRODUCT_HAMMER_DRILLING_ID,
      PRODUCT_AMOUNT_30,
      true
    );

    cy.intercept('GET', '**/quotes/**', {
      statusCode: 200,
      body: {
        code: 'quote-123',
        purchaseOrderNumber: 'TEST-PO',
      },
    }).as('getQuoteWithPO');

    cy.visit('/checkout');
    cy.wait('@getQuoteWithPO');

    cy.get('#poNumberInput').should('have.attr', 'readonly');
  });

  it('should make PO Number field editable if quote has no PO Number', () => {
    quote.prepareQuote(
      TEST_PRODUCT_HAMMER_DRILLING_ID,
      PRODUCT_AMOUNT_30,
      true
    );

    cy.intercept('GET', '**/quotes/**', {
      statusCode: 200,
      body: {
        code: 'quote-456',
        purchaseOrderNumber: null,
      },
    }).as('getQuoteWithoutPO');

    cy.visit('/checkout');
    cy.wait('@getQuoteWithoutPO');

    cy.get('#poNumberInput').should('not.have.attr', 'readonly');
  });
});
