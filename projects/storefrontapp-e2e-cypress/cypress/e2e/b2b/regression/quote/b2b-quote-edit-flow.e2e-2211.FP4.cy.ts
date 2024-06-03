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
    quote.registerUpdateQuoteItemRoute();
    quote.registerUpdateCartItemRoute();
    quote.registerDeleteQuoteItemRoute();
  });

  describe('Edit quote process - buyer perspective', () => {
    beforeEach(() => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should edit quantity of items within a buyer quote draft (CXSPA-3852)', () => {
      let itemIndex = 1;
      quote.checkItemVisible(itemIndex, TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.checkItemQuantity(itemIndex, PRODUCT_AMOUNT_30.toString());
      quote.changeItemQuantityByStepper(itemIndex, '+');
      quote.checkItemQuantity(itemIndex, (PRODUCT_AMOUNT_30 + 1).toString());
      quote.changeItemQuantityByStepper(itemIndex, '-');
      quote.checkItemQuantity(itemIndex, PRODUCT_AMOUNT_30.toString());
      quote.changeItemQuantityByCounter(itemIndex, '1');
      quote.checkItemQuantity(itemIndex, '1');
      quote.checkSubmitBtn(false);
      quote.checkItemVisible(itemIndex, TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.removeItem(itemIndex);
      quote.checkQuoteCartIsEmpty();
    });

    it('should edit name and description of the quote while in buyer draft (CXSPA-3852)', () => {
      const QUOTE_NAME = 'Quote name test';
      const QUOTE_DESCRIPTION = 'Quote description for the test';
      quote.checkQuoteHeaderOverviewCardState(false);
      quote.clickEditPencil();
      quote.editQuoteInformationCard(QUOTE_NAME, QUOTE_DESCRIPTION);
      quote.saveEditedData();
      quote.checkQuoteHeaderOverviewCardState(false);
      quote.checkQuoteHeaderOverviewCardContent(QUOTE_NAME);
      quote.checkQuoteHeaderOverviewCardContent(QUOTE_DESCRIPTION);
    });
  });

  describe('Edit quote process - seller (sales assistant) perspective (CXSPA-4235)', () => {
    it('should set an expiry date, give a discount and submit the quote', () => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.prepareSellerQuote(
        SALESREP_EMAIL,
        SALESREP_PASSWORD,
        BUYER_USER,
        BUYER_EMAIL
      );
      quote.enableEditQuoteMode();
      quote.setExpiryDate();
      quote.checkTotalEstimatedPrice('$26,160.00');
      quote.setDiscount('10%');
      quote.checkTotalEstimatedPrice('$23,544.00');
      quote.submitQuote(quote.STATUS_SALES_REPORTER_SUBMIT);
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
    });
  });
});
