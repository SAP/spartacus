/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const testProductHammerDrillingId = '3887130';
const testProductHammerDrillingName = 'DH40MR';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
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
    quote.log(`login as ${USER}`, 'beforeEach');
    quote.login(EMAIL, PASSWORD, USER);
    quote.log('registerGetQuoteRoute', 'beforeEach');
    quote.registerGetQuoteRoute(POWERTOOLS);
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      quote.log('requestQuote', getTestTitle());
      quote.requestQuote(POWERTOOLS, testProductHammerDrillingId, '1');
      quote.log('checkQuoteInDraftState', getTestTitle());
      quote.checkQuoteInDraftState(false, testProductHammerDrillingId);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.log('requestQuote', getTestTitle());
      quote.requestQuote(POWERTOOLS, testProductHammerDrillingId, '30');
      //Save quote url as alias
      cy.url().as('quoteURL');
      // //take the alias for the quote url and visit the page
      // cy.get<string>('@quoteURL').then(cy.visit);
      quote.log('checkQuoteInDraftState', getTestTitle());
      quote.checkQuoteInDraftState(true, testProductHammerDrillingId);
      quote.log('addCommentAndWait', getTestTitle());
      quote.addCommentAndWait(
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.log('checkComment', getTestTitle());
      quote.checkComment(
        1,
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.log('addItemCommentAndWait', getTestTitle());
      quote.addItemCommentAndWait(
        testProductHammerDrillingName,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.log('checkItemComment', getTestTitle());
      quote.checkItemComment(
        2,
        testProductHammerDrillingName,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.log('clickItemLinkInComment', getTestTitle());
      quote.clickItemLinkInComment(2, testProductHammerDrillingName);
      quote.log('checkLinkedItemInViewport', getTestTitle());
      quote.checkLinkedItemInViewport(1);
      quote.log('submitQuote', getTestTitle());
      quote.submitQuote();
      quote.log('checkQuoteState Submitted', getTestTitle());
      quote.checkQuoteState(quote.STATUS_SUBMITTED);
      quote.log('checkCommentsNotEditable', getTestTitle());
      quote.checkCommentsNotEditable();
    });
  });

  // these tests should be removed, as soon as the quote list navigation is part of the above process tests
  describe('Quote list', () => {
    it('should be accessible from My Account', () => {
      quote.navigateToQuoteListFromMyAccount();
      quote.checkQuoteListPresent();
    });

    it('should be accessible from quote details', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrillingId, '1');
      quote.navigateToQuoteListFromQuoteDetails();
      quote.checkQuoteListPresent();
    });
  });
});
