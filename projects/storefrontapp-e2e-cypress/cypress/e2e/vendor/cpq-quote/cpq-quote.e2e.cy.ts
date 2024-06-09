/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/b2b/b2b-quote';
import * as quoteq from '../../../helpers/vendor/cpq-quote/cpq-quote';

const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';

context('CPQ Discount Percentage ', () => {
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
    quote.registerReadVendorQuoteRoute();
    quote.registerReadQuoteRoute();
  });

  it('should display CPQ Discount Percentage ', () => {
    quote.navigateToVendorQuoteListFromMyAccount();
    quote.checkQuoteListDisplayed();
    quote.navigateToVendorQuote();
    quoteq.DiscountPercentageQuote();
    quoteq.DiscountPercentageQuoterow();
    quoteq.DiscountQuoterow();

    // quote.logout();
  });
});
