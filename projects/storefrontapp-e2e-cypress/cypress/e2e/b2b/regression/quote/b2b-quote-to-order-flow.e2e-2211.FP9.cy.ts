/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderConfig } from '@spartacus/core';
import * as order from '../../../../helpers/b2b/b2b-order-details';
import * as quote from '../../../../helpers/b2b/b2b-quote';
import { CURRENCY_USD } from '../../../../helpers/site-context-selector';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
const BUYER_EMAIL = 'james.weber@harvestlive.inc';
const BUYER_PASSWORD = 'welcome';
const BUYER_USER = 'James Weber';
describe('Navigate from Quote to Order and vice-versa (CXSPA-7795, CXSPA-9270) ', () => {
  beforeEach(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    Cypress.env('BASE_CURRENCY', CURRENCY_USD);
    cy.cxConfig({
      showOrderQuoteLink: true,
    } as OrderConfig);
    cy.visit('/');
  });
  it('should navigate from Quote to Order and vice-versa', () => {
    quote.login(BUYER_EMAIL, BUYER_PASSWORD, BUYER_USER);
    quote.goToQuoteListPage();
    quote.openQuoteInQuoteList(quote.STATUS_ORDERED);
    quote.goToOrderDetail();
    order.goToQuoteDetail();
    quote.logout();
  });
});
