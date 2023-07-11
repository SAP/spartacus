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
  let configUISettings: any;
  beforeEach(() => {
    configUISettings = {
      globalMessages: {
        [MSG_TYPE_WARNING]: {
          timeout: 10000,
        },
      },
    };
    cy.cxConfig(configUISettings);
    cy.visit('/');
    quote.login(EMAIL, PASSWORD, USER);
  });

  describe('Request quote process', () => {
    it('should display a message and disable submit button if threshold is not met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '1');
      quote.checkGlobalMessageDisplayed(true);
      quote.checkSubmitButton(false);
    });

    it('should display no message and enable submit button if threshold is met', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '30');
      quote.checkGlobalMessageDisplayed(false);
      quote.checkSubmitButton(true);
    });

    it('should result in a quote in draft state', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '30');
      cy.get('.cx-quote-details-header-status').should('contain.text', 'Draft');
    });

    it('should display quote entry details like product ID', () => {
      quote.requestQuote(POWERTOOLS, testProductHammerDrilling, '30');
      cy.get('.cx-code').should('contain.text', testProductHammerDrilling);
    });
  });
});
