/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const PRODUCT_AMOUNT_30: number = 30;

context('Quote', () => {
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

  describe('Save active cart - create a new cart after submitting a quote (CXSPA-4141)', () => {
    beforeEach(() => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.clearSavedCarts();
    });

    it('should become a saved cart after editing the submitted quote', () => {
      quote.prepareSavedCartTemplate(TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.enableEditQuoteMode(true, quote.STATUS_DRAFT);
      cy.wait(1000); // wait for the saved cart to be created in the back-end
      quote.checkNumberOfSavedCarts(1);
    });

    it('should become a saved cart after canceling the quote and requesting a new quote', () => {
      quote.prepareSavedCartTemplate(TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.cancelQuote(quote.STATUS_BUYER_CANCEL, false);
      quote.goToQuoteOverviewPage();
      quote.requestNewQuote(quote.STATUS_DRAFT);
      cy.wait(1000); // wait for the saved cart to be created in the back-end
      quote.checkNumberOfSavedCarts(1);
    });

    it('should become a saved cart after accepting and checking out the quote', () => {
      quote.prepareQuoteForCheckout(
        BUYER_EMAIL,
        BUYER_PASSWORD,
        BUYER_USER,
        SALESREP_EMAIL,
        SALESREP_PASSWORD
      );
      quote.prepareSavedCartTemplate(TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.submitQuote(quote.STATUS_BUYER_CHECKOUT);
      quote.checkNumberOfSavedCarts(1);
    });
  });
});
