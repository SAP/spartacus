/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/quote';

const POWERTOOLS = 'powertools-spa';
const testProductHammerDrilling = '3887130';
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
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '1');
      quote.checkQuoteInDraftState(false, testProductHammerDrilling);
    });

    it('should be possible(submit) if threshold is met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '30');
      quote.checkQuoteInDraftState(true, testProductHammerDrilling);

      // add comment
      // check comment displayed

      // submit

      // check comment not editable
    });
  });

  describe('Quote list', () => {
    it('should be accessible from My Account', () => {
      quote.navigateToQuoteListFromMyAccount();
      quote.checkQuoteListPresent();
    });

    it('should be accessible from quote details', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '1');
      quote.navigateToQuoteListFromQuoteDetails();
      quote.checkQuoteListPresent();
    });
  });
});
