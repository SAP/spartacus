/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quoteHelper from '../../../helpers/b2b/b2b-quote';
import * as quote from '../../../helpers/vendor/cpq/quote-download';

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
      features: {
        showDownloadProposalButton: true,
      },
    };
    cy.cxConfig(globalMessageSettings);
    cy.visit('/');
    quoteHelper.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.registerReadVendorQuoteRoute();
    quoteHelper.registerReadQuoteRoute();
    quote.registerDownloadAttachmentRoute();
  });

  it('should download proposal document', () => {
    quoteHelper.navigateToQuotesList();
    quote.navigateToVendorQuote();
    quoteHelper.defineQuoteIdAlias();
    quote.downloadVendorQuoteAttachment();
    quoteHelper.logout();
  });
});
