/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { orderHistoryTest } from '../../../helpers/order-history';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History with orders', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    orderHistoryTest.checkIfOrderIsDisplayed();
    orderHistoryTest.checkSortingByCode();
    orderHistoryTest.checkCorrectDateFormat();
  });
});

describe('Order details page', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.requireLoggedIn();
    });

    orderHistoryTest.checkOrderDetailsUnconsignedEntries();
  });
});
