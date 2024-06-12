/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Commonquote from '../../../helpers/b2b/b2b-quote';
import * as cpqQuote from '../../../helpers/vendor/cpq-quote/cpq-quote';

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
    Commonquote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    cpqQuote.registerReadVendorQuoteRoute();
    cpqQuote.registerReadQuoteRoute();
  });

  it('should display CPQ Discount Percentage ', () => {
    cpqQuote.navigateQuoteList();
    cpqQuote.checkQuoteListDisplayed();
    Commonquote.navigateToQuotesList();
    cpqQuote.checkDiscountDisplayed();
    cpqQuote.checkDiscountDisplayedrow();
    cpqQuote.checkDiscountDisplayedOffer();
  });
});
