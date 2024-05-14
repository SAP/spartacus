/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/b2b/b2b-quote';
import * as cart from '../../../helpers/cart';
import * as common from '../../../helpers/common';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3881061';
const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
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
    // cart.validateEmptyCart();
    // quote.logout();
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
    // quote.registerReadQuoteRoute();
    // quote.registerAddQuoteCommentRoute();
    // quote.registerPerformQuoteActionRoute();
    // quote.registerUpdateQuoteItemRoute();
    // quote.registerUpdateCartItemRoute();
    // quote.registerDeleteQuoteItemRoute();
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


    });
  });

 
 

 
 
