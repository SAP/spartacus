/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as logger from '../../../../helpers/logging';
import * as quote from '../../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const TESTPRODUCTHAMMERDRILLINGID = '3887130';
const TESTPRODUCTHAMMERDRILLINGNAME = 'DH40MR';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';

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
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      logger.log('STEP 1) Create a request for quote NOT matching threshold');
      quote.requestQuote(POWERTOOLS, TESTPRODUCTHAMMERDRILLINGID, '1');
      quote.checkQuoteInDraftState(false, TESTPRODUCTHAMMERDRILLINGID);
    });

    it('should be possible(submit) if threshold is met', () => {
      logger.log('STEP 1) Create a request for quote matching threshold');
      quote.requestQuote(POWERTOOLS, TESTPRODUCTHAMMERDRILLINGID, '30');
      cy.url().as('quoteURL');
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      logger.log('STEP 2) Check Comments');
      quote.addCommentAndWait(
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.checkComment(
        1,
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.addItemCommentAndWait(
        TESTPRODUCTHAMMERDRILLINGNAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.checkItemComment(
        2,
        TESTPRODUCTHAMMERDRILLINGNAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.clickItemLinkInComment(2, TESTPRODUCTHAMMERDRILLINGNAME);

      quote.checkLinkedItemInViewport(1);
      logger.log('STEP 3) Submit');
      quote.submitQuote();
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
      quote.checkCommentsNotEditable();
    });
  });

  describe('Edit quote process - buyer perspective', () => {
    it('should edit quantity of items within a buyer quote draft (CXSPA-3852)', () => {
      logger.log('STEP 1) Create a Request for Quote');
      const PRODUCT_AMOUNT: number = 30;
      quote.requestQuote(
        POWERTOOLS,
        TESTPRODUCTHAMMERDRILLINGID,
        PRODUCT_AMOUNT.toString()
      );
      cy.url().as('quoteURL');
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      let itemIndex = 1;
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        true
      );
      logger.log('STEP 2) decrease / increase item quantity');
      quote.validateItemQuantity(itemIndex, PRODUCT_AMOUNT.toString());
      quote.changeItemQuantityOnClick(itemIndex, '+');
      quote.validateItemQuantity(itemIndex, (PRODUCT_AMOUNT + 1).toString());
      quote.changeItemQuantityOnClick(itemIndex, '-');
      quote.validateItemQuantity(itemIndex, PRODUCT_AMOUNT.toString());
      quote.changeItemQuantityWithInputField(1, '1');
      quote.validateItemQuantity(itemIndex, '1');
      quote.checkSubmitButton(false);
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        true
      );
      logger.log('STEP 3) remove item');
      quote.removeItemOnClick(itemIndex);
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        false
      );
    });

    it('should edit name and description of the quote while in buyer draft (CXSPA-3852)', () => {
      logger.log('STEP 1) Create a request for quote');
      const PRODUCT_AMOUNT: number = 30;
      const QUOTENAME = 'Quote name test';
      const QUOTEDESCRIPTION = 'Quote description for the test';
      quote.requestQuote(
        POWERTOOLS,
        TESTPRODUCTHAMMERDRILLINGID,
        PRODUCT_AMOUNT.toString()
      );
      cy.url().as('quoteURL');
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      logger.log('STEP 2) Edit Quote Details');
      quote.verifyQuoteInformationCardInEditMode(
        CARD_TITLE_QUOTE_INFORMATION,
        false
      );
      quote.clickEditOnQuoteInformationCard(CARD_TITLE_QUOTE_INFORMATION);
      quote.changeQuoteSummaryCardEntries(
        CARD_TITLE_QUOTE_INFORMATION,
        QUOTENAME,
        QUOTEDESCRIPTION
      );
      quote.clickSaveOnQuoteSummaryCard(CARD_TITLE_QUOTE_INFORMATION);
      quote.verifyQuoteInformationCardInEditMode(
        CARD_TITLE_QUOTE_INFORMATION,
        false
      );
      quote.verifyQuoteInformationContent(QUOTENAME);
      quote.verifyQuoteInformationContent(QUOTEDESCRIPTION);
    });
  });

  // these tests should be removed, as soon as the quote list navigation is part of the above process tests
  describe('Quote list', () => {
    it('should be accessible from My Account', () => {
      quote.navigateToQuoteListFromMyAccount();
      quote.checkQuoteListPresent();
    });

    it('should be accessible from quote details', () => {
      quote.requestQuote(POWERTOOLS, TESTPRODUCTHAMMERDRILLINGID, '1');
      quote.navigateToQuoteListFromQuoteDetails();
      quote.checkQuoteListPresent();
    });
  });
});
