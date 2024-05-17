/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
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
    quote.registerAddQuoteCommentRoute();
    quote.registerPerformQuoteActionRoute();
  });

  describe('Request quote process', () => {
    it('should display a global message and disable submit button if threshold is not met', () => {
      quote.prepareQuote(TEST_PRODUCT_HAMMER_DRILLING_ID, 1, false);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.checkQuoteInDraftState(true, TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.addHeaderComment(
        'Can you please make me a good offer for this large volume of goods?'
      );

      quote.checkComment(
        1,
        'Can you please make me a good offer for this large volume of goods?'
      );

      quote.addItemComment(
        TEST_PRODUCT_HAMMER_DRILLING_NAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );

      quote.checkItemComment(
        2,
        TEST_PRODUCT_HAMMER_DRILLING_NAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );

      quote.clickItemLinkInComment(2, TEST_PRODUCT_HAMMER_DRILLING_NAME);
      quote.checkLinkedItemInViewport(1);
      quote.submitQuote(quote.STATUS_BUYER_SUBMIT);
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
      quote.checkCommentsNotEditable();
    });
  });

  describe('Navigate to quote list', () => {
    it('should be accessible from My Account', () => {
      quote.requestQuote(TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
      quote.navigateToQuoteListFromMyAccount();
      quote.checkQuoteListDisplayed();
    });

    it('should be accessible from the quote details', () => {
      quote.requestQuote(TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
      quote.navigateToQuoteListFromQuoteDetails();
      quote.checkQuoteListDisplayed();
    });

    it('should cancel a quote and be redirected back to the quote list (CXSPA-4035)', () => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.cancelQuote(quote.STATUS_BUYER_CANCEL, true);
      quote.checkQuoteListDisplayed();
      quote.goToQuoteOverviewPage();
      quote.checkQuoteState(quote.STATUS_CANCELED);
    });
  });
});
