/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import * as common from '../../../../helpers/common';
import * as quote from '../../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const PRODUCT_AMOUNT_30: number = 30;
const buyer = {
  fullName: BUYER_USER,
  email: BUYER_EMAIL,
};

context('Quote', () => {
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
    quote.registerGetQuoteRoute(POWERTOOLS);
    quote.registerCommentsPostQuoteRoute(POWERTOOLS);
    quote.registerActionsPostQuoteRoute(POWERTOOLS);
    quote.registerPatchQuoteRoute(POWERTOOLS);
    quote.registerPatchCartRoute(POWERTOOLS);
    quote.registerDeleteQuoteRoute(POWERTOOLS);
  });

  describe('Request quote process', () => {
    it('should display a global message and disable submit button if threshold is not met', () => {
      quote.prepareQuote(POWERTOOLS, TEST_PRODUCT_HAMMER_DRILLING_ID, 1, false);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.prepareQuote(
        POWERTOOLS,
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

  describe('Edit quote process - buyer perspective', () => {
    beforeEach(() => {
      quote.prepareQuote(
        POWERTOOLS,
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
      quote.checkItemExists(itemIndex, TEST_PRODUCT_HAMMER_DRILLING_ID);
    });

    it('should edit name and description of the quote while in buyer draft (CXSPA-3852)', () => {
      const QUOTE_NAME = 'Quote name test';
      const QUOTE_DESCRIPTION = 'Quote description for the test';
      quote.checkQuoteInformationCard(false);
      quote.clickEditPencil();
      quote.editQuoteInformationCard(QUOTE_NAME, QUOTE_DESCRIPTION);
      quote.saveEditedData();
      quote.checkQuoteInformationCard(false);
      quote.checkQuoteInformationCardContent(QUOTE_NAME);
      quote.checkQuoteInformationCardContent(QUOTE_DESCRIPTION);
    });
  });

  describe('Navigate to quote list', () => {
    it('should be accessible from My Account', () => {
      quote.requestQuote(POWERTOOLS, TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
      quote.navigateToQuoteListFromMyAccount();
      quote.checkQuoteListDisplayed();
    });

    it('should be accessible from the quote details', () => {
      quote.requestQuote(POWERTOOLS, TEST_PRODUCT_HAMMER_DRILLING_ID, '1');
      quote.navigateToQuoteListFromQuoteDetails();
      quote.checkQuoteListDisplayed();
    });

    it('should cancel a quote and be redirected back to the quote list (CXSPA-4035)', () => {
      quote.prepareQuote(
        POWERTOOLS,
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.cancelQuote(quote.STATUS_BUYER_CANCEL);
      quote.checkQuoteListDisplayed();
      quote.gotToQuoteOverviewPage();
      quote.checkQuoteState(quote.STATUS_CANCELED);
    });
  });

  describe('Edit quote process - seller (sales assistant) perspective (CXSPA-4235)', () => {
    it('should set an expiry date, give a discount and submit the quote', () => {
      quote.prepareQuote(
        POWERTOOLS,
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
      quote.prepareSellerQuote(
        POWERTOOLS,
        SALESREP_EMAIL,
        SALESREP_PASSWORD,
        buyer
      );
      quote.enableEditQuoteMode();
      quote.setExpiryDate();
      quote.checkTotalEstimatedPrice('$26,160.00');
      quote.setDiscount('100');
      quote.checkTotalEstimatedPrice('$26,060.00');
      quote.submitQuote(quote.STATUS_SALES_REPORTER_SUBMIT);
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
    });
  });

  describe('Quote cart support (CXSPA-4036)', () => {
    beforeEach(() => {
      quote.prepareQuote(
        POWERTOOLS,
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should request a quote and add several items to the same quote', () => {
      quote.checkItemQuantity(1, '30');
      common.goToPDPage(POWERTOOLS, TEST_PRODUCT_HAMMER_DRILLING_ID);
      quote.setQuantity(PRODUCT_AMOUNT_30.toString());
      common.clickOnAddToCartBtnOnPD();
      quote.clickOnViewCartBtnOnPD();
      quote.checkItemQuantity(1, '60');
    });

    it('should submit a quote and not be able to add any further items to the quote in checkout', () => {
      quote.prepareSellerQuote(
        POWERTOOLS,
        SALESREP_EMAIL,
        SALESREP_PASSWORD,
        buyer
      );
      quote.checkQuoteState(quote.STATUS_REQUESTED);
      quote.submitQuote(quote.STATUS_SALES_REPORTER_SUBMIT);
      asm.agentSignOut();
      quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
      quote.gotToQuoteOverviewPage();
      quote.submitQuote(quote.STATUS_BUYER_CHECKOUT, POWERTOOLS);
      quote.addProductAndCheckForGlobalMessage(
        TEST_PRODUCT_HAMMER_DRILLING_NAME,
        'Not possible to do changes to cart entries. Proceed to checkout',
      );
    });
  });
});
