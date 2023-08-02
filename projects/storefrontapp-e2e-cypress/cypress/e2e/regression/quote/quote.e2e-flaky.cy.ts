/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const testProductHammerDrillingId = '3887130';
const testProductHammerDrillingName = 'DH40MR';
const EMAIL = 'gi.sun@pronto-hw.com';
const PASSWORD = '12341234';
const USER = 'Gi Sun';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';

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
    quote.login(EMAIL, PASSWORD, USER);
    quote.registerGetQuoteRoute(POWERTOOLS);
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrillingId, '1');
      quote.checkQuoteInDraftState(false, testProductHammerDrillingId);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrillingId, '30');
      quote.checkQuoteInDraftState(true, testProductHammerDrillingId);
      quote.addCommentAndWait(
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.checkComment(
        1,
        'Can you please make me a good offer for this large volume of goods?'
      );
      quote.addItemCommentAndWait(
        testProductHammerDrillingName,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.checkItemComment(
        2,
        testProductHammerDrillingName,
        'since there is a newer model out, is it possible to get a discount for this item?'
      );
      quote.clickItemLinkInComment(2, testProductHammerDrillingName);
      quote.checkLinkedItemInViewport(1);
      quote.submitQuote();
      quote.checkQuoteState('Submitted');
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
