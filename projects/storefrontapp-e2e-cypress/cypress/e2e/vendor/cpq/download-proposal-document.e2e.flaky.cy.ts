/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quote from '../../../helpers/b2b/b2b-quote';

const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';

context('Download proposal document', () => {
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
    quote.registerDownloadAttachmentRoute();
  });

  it('should download proposal document', () => {
    quote.navigateToVendorQuoteListFromMyAccount();
    quote.checkQuoteListDisplayed();
    quote.navigateToVendorQuote();
    quote.downloadVendorQuoteAttachment();
    quote.logout();
  });
});
