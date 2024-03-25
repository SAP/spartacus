/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/b2b/b2b-quote';
import * as cart from '../../../../helpers/cart';
import * as common from '../../../../helpers/common';

const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const TEST_PRODUCT_HAMMER_DRILLING_NAME = 'DH40MR';
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
    quote.registerAddQuoteCommentRoute();
    quote.registerPerformQuoteActionRoute();
    quote.registerUpdateQuoteItemRoute();
    quote.registerUpdateCartItemRoute();
    quote.registerDeleteQuoteItemRoute();
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

  describe('Quote cart support (CXSPA-4036)', () => {
    beforeEach(() => {
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should request a quote and add several items to the same quote', () => {
      quote.checkItemQuantity(1, '30');
      common.goToPDPage(
        Cypress.env('BASE_SITE'),
        TEST_PRODUCT_HAMMER_DRILLING_ID
      );
      quote.setAddToCartQuantity(PRODUCT_AMOUNT_30.toString());
      common.clickOnAddToCartBtnOnPD();
      quote.clickOnViewCartBtnOnPD();
      quote.checkItemQuantity(1, '60');
    });

    it('should submit a quote and not be able to add any further items to the quote in checkout', () => {
      quote.prepareQuoteForCheckout(
        BUYER_EMAIL,
        BUYER_PASSWORD,
        BUYER_USER,
        SALESREP_EMAIL,
        SALESREP_PASSWORD
      );
      quote.submitQuote(quote.STATUS_BUYER_CHECKOUT);
      quote.addProductAndCheckForGlobalMessage(
        TEST_PRODUCT_HAMMER_DRILLING_NAME,
        'Not possible to do changes to cart entries. Proceed to checkout'
      );
    });
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
