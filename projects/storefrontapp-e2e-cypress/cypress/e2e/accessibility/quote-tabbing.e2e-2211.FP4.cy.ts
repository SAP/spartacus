/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig } from '../../helpers/accessibility/b2b/tabbing-order.config';
import { verifyTabbingOrder } from '../../helpers/accessibility/tabbing-order';
import { clickAllowAllFromBanner } from '../../helpers/anonymous-consents';
import * as quote from '../../helpers/b2b/b2b-quote';

const containerSelectorQuoteDetails = 'main';
const TEST_PRODUCT_HAMMER_DRILLING_ID = '3887130';
const BUYER_EMAIL = 'gi.sun@pronto-hw.com';
const BUYER_PASSWORD = '12341234';
const BUYER_USER = 'Gi Sun';
const MSG_TYPE_WARNING = '[GlobalMessage] Warning';
const PRODUCT_AMOUNT_30: number = 30;

describe('Tabbing order for Quote', () => {
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
      clickAllowAllFromBanner();
      quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
      quote.registerReadQuoteRoute();
      quote.prepareQuote(
        TEST_PRODUCT_HAMMER_DRILLING_ID,
        PRODUCT_AMOUNT_30,
        true
      );
    });

    it('should allow to navigate with tab key within the quote details page', () => {
      verifyTabbingOrder(
        containerSelectorQuoteDetails,
        tabbingOrderConfig.quoteDetailsPage
      );
    });
  });
});
