/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as orderCancellationReturn from '../../../helpers/order-cancellations-returns';
import { clearCacheTestIsolation } from '../../../helpers/utils-cypress-legacy';

describe('Order Cancellations and Returns', { testIsolation: false }, () => {
  clearCacheTestIsolation();
  before(() => {
    cy.requireLoggedIn();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  orderCancellationReturn.testCancelOrder();

  orderCancellationReturn.testReturnOrder();
});
