/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';

const TEST_PRODUCT_HAMMER_DRILLING_ID = 'TG11';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const PRODUCT_AMOUNT_30: number = 30;

context('Quote Checkout - PO Number field behavior (CXSPA-10956)', () => {
  // before all tests - ensure that cart is empty
  before(() => {
    // add a product - so that it is guaranteed that clear cart link is available
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.addProductToCart(TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
    cart.clearActiveCart();
    cart.validateEmptyCart();
    quote.logout();
  });

  let globalMessageSettings: any;
  beforeEach(() => {
    globalMessageSettings = {
      globalMessages: {
        [MSG_TYPE_WARNING]: {
          timeout: 10000,
        },
      },
    };
    cy.cxConfig(globalMessageSettings);
    cy.visit('/');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.registerReadQuoteRoute();
    quote.registerPerformQuoteActionRoute();
  });

  describe('Save active cart - create a new cart after submitting a quote', () => {
    beforeEach(() => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should edit name and description of the quote while in buyer draft', () => {
      const QUOTE_NAME = 'Quote name test';
      const QUOTE_DESCRIPTION = 'Quote description for the test';
      const QUOTE_PO_NUMBER = 'PO-12345';
      quote.checkQuoteHeaderOverviewCardState(false);
      quote.clickEditPencil();
      quote.editQuoteInformationCard(
        QUOTE_NAME,
        QUOTE_DESCRIPTION,
        QUOTE_PO_NUMBER
      );
      quote.saveEditedData();
      quote.checkQuoteHeaderOverviewCardState(false);
      quote.checkQuoteHeaderOverviewCardContent(QUOTE_NAME);
      quote.checkQuoteHeaderOverviewCardContent(QUOTE_DESCRIPTION);
      quote.checkQuoteHeaderOverviewCardContent(QUOTE_PO_NUMBER);
    });

    it('should checkout to payment page and check the PO number input to be populated same as Quote PO number', () => {
      quote.prepareQuoteForCheckout(
        BUYER_EMAIL,
        BUYER_PASSWORD,
        BUYER_USER,
        SALESREP_EMAIL,
        SALESREP_PASSWORD
      );
      cy.contains('button', 'Accept and Checkout').click();
      cy.wait(1000);
      cy.contains('.cx-modal-content button', 'Yes').click();
      cy.wait(1000);
      cy.get('#poNumberInput').should('not.have.attr', 'readonly');
      cy.get('#poNumberInput').should('have.value', 'PO-12345');
    });
  });
});
