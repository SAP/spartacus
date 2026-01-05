/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as b2bQuote from '../../../../helpers/b2b/b2b-quote';
import * as cpqQuoteDownload from '../../../../helpers/vendor/cpq/cpq-quote-download';
import * as cpqQuoteDiscount from '../../../../helpers/vendor/cpq/cpq-quote-discount';

const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';

context('CPQ quote discount', () => {
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
    b2bQuote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    cpqQuoteDownload.registerReadVendorQuoteRoute();
    b2bQuote.registerReadQuoteRoute();
  });

  it('should display CPQ discount', () => {
    b2bQuote.navigateToQuotesList();
    cpqQuoteDownload.navigateToVendorQuote();
    cpqQuoteDiscount.checkDiscountDisplayed();
    cpqQuoteDiscount.checkDiscountFormattedValueDisplayed();
    cpqQuoteDiscount.checkDiscountOfferDisplayed();
    b2bQuote.logout();
  });
});
