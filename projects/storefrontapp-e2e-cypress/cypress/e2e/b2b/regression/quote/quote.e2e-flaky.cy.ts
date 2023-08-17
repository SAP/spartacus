/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const TESTPRODUCTHAMMERDRILLINGID = '3887130';
const TESTPRODUCTHAMMERDRILLINGNAME = 'DH40MR';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const SALESREP_EMAIL = 'darrin.hesser@acme.com';
const SALESREP_PASSWORD = '12341234';
const SALESREP_USER = 'Darrin  Hesser';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';
const getTestTitle = (
  test: Mocha.Suite = (Cypress as any).mocha.getRunner().suite.ctx.test
): string =>
  test.parent?.title
    ? `${getTestTitle(test.parent)} -- ${test.title}`
    : test.title;

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
    quote.log('visit default url', 'beforeEach');
    cy.visit('/');
    quote.log(`login as ${BUYER_USER}`, 'beforeEach');
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.log('registerGetQuoteRoute', 'beforeEach');
    quote.registerGetQuoteRoute(POWERTOOLS);
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      quote.log('request a quote', getTestTitle());
      quote.requestQuote(POWERTOOLS, TESTPRODUCTHAMMERDRILLINGID, '1');
      quote.log('check if the quote is in draft state', getTestTitle());
      quote.checkQuoteInDraftState(false, TESTPRODUCTHAMMERDRILLINGID);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.log('request a quote', getTestTitle());
      quote.requestQuote(POWERTOOLS, TESTPRODUCTHAMMERDRILLINGID, '30');
      cy.url().as('quoteURL');
      quote.log('check if the quote is in "draft" state', getTestTitle());
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      quote.log('add a comment', getTestTitle());
      quote.addCommentAndWait(
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.log('check if the comment exists', getTestTitle());
      quote.checkComment(
        1,
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.log('add an comment with a linked item', getTestTitle());
      quote.addItemCommentAndWait(
        TESTPRODUCTHAMMERDRILLINGNAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.log('check if the comment with the item exists', getTestTitle());
      quote.checkItemComment(
        2,
        TESTPRODUCTHAMMERDRILLINGNAME,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.log('click on the link in within the comment', getTestTitle());
      quote.clickItemLinkInComment(2, TESTPRODUCTHAMMERDRILLINGNAME);
      quote.log(
        'Check if the linked item is within the viewport',
        getTestTitle()
      );
      quote.checkLinkedItemInViewport(1);
      quote.log('Submit the quote', getTestTitle());
      quote.submitQuote();
      quote.log('check if quote state is "Submitted"', getTestTitle());
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
      quote.log('check if comments are not editable', getTestTitle());
      quote.checkCommentsNotEditable();
    });
  });

  describe('Edit quote process - buyer perspective', () => {
    it('should edit quantity of items within a buyer quote draft (CXSPA-3852)', () => {
      quote.log('requestQuote', getTestTitle());
      const PRODUCT_AMOUNT: number = 30;
      quote.requestQuote(
        POWERTOOLS,
        TESTPRODUCTHAMMERDRILLINGID,
        PRODUCT_AMOUNT.toString()
      );
      cy.url().as('quoteURL');
      quote.log('checkQuoteInDraftState', getTestTitle());
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      let itemIndex = 1;
      quote.log(
        `Check if the item exists at Index ${itemIndex}`,
        getTestTitle()
      );
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        true
      );
      quote.log(
        `validate the item quantity at index ${itemIndex} equals ${PRODUCT_AMOUNT}`,
        getTestTitle()
      );
      quote.validateItemQuantity(itemIndex, PRODUCT_AMOUNT.toString());
      quote.log('increase the item  quantity by 1', getTestTitle());
      quote.changeItemQuantityOnClick(itemIndex, '+');
      quote.log(
        `validate the item quantity at index ${itemIndex} equals ${
          PRODUCT_AMOUNT + 1
        }`,
        getTestTitle()
      );
      quote.validateItemQuantity(itemIndex, (PRODUCT_AMOUNT + 1).toString());
      quote.log('decrease the item quantity by 1', getTestTitle());
      quote.changeItemQuantityOnClick(itemIndex, '-');
      quote.log(
        `validate the item quantity at index ${itemIndex} equals ${PRODUCT_AMOUNT}`,
        getTestTitle()
      );
      quote.validateItemQuantity(itemIndex, PRODUCT_AMOUNT.toString());
      quote.log('change the item  quantity to 1', getTestTitle());
      quote.changeItemQuantityWithInputField(1, '1');
      quote.log(
        `validate the item quantity at index ${itemIndex} equals 1`,
        getTestTitle()
      );
      quote.validateItemQuantity(itemIndex, '1');
      quote.log(
        'check the "Submit Quote" button is not clickable since the threshold is not met',
        getTestTitle()
      );
      quote.checkSubmitButton(false);
      quote.log(`verify the item exists at index ${itemIndex}`, getTestTitle());
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        true
      );
      quote.log(`remove the item at index ${itemIndex}`, getTestTitle());
      quote.removeItemOnClick(itemIndex);
      quote.log(
        `verify the item got removed and does not exist at index ${itemIndex}`,
        getTestTitle()
      );
      quote.checkItemAtIndexExists(
        itemIndex,
        TESTPRODUCTHAMMERDRILLINGID,
        false
      );
    });

    it('should edit name and description of the quote while in buyer draft (CXSPA-3852)', () => {
      quote.log('requestQuote', getTestTitle());
      const PRODUCT_AMOUNT: number = 30;
      const QUOTENAME = 'Quote name test';
      const QUOTEDESCRIPTION = 'Quote description for the test';
      quote.requestQuote(
        POWERTOOLS,
        TESTPRODUCTHAMMERDRILLINGID,
        PRODUCT_AMOUNT.toString()
      );
      cy.url().as('quoteURL');
      quote.log('checkQuoteInDraftState', getTestTitle());
      quote.checkQuoteInDraftState(true, TESTPRODUCTHAMMERDRILLINGID);
      quote.log(
        'verify the "Quote Information" card is not in edit mode',
        getTestTitle()
      );
      quote.verifyQuoteInformationCardInEditMode(
        CARD_TITLE_QUOTE_INFORMATION,
        false
      );
      quote.log('click on edit button in quote summary card', getTestTitle());
      quote.clickEditOnQuoteInformationCard(CARD_TITLE_QUOTE_INFORMATION);
      quote.log('change the quote name and description text', getTestTitle());
      quote.changeQuoteSummaryCardEntries(
        CARD_TITLE_QUOTE_INFORMATION,
        QUOTENAME,
        QUOTEDESCRIPTION
      );
      quote.log('click on save within the quote summary card', getTestTitle());
      quote.clickSaveOnQuoteSummaryCard(CARD_TITLE_QUOTE_INFORMATION);
      quote.log(
        'verify the quote summary card is not in edit mode',
        getTestTitle()
      );
      quote.verifyQuoteInformationCardInEditMode(
        CARD_TITLE_QUOTE_INFORMATION,
        false
      );
      quote.log(
        'verify the quote name and description texts are updated',
        getTestTitle()
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
