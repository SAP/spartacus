/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as orderCancellationReturn from '../../../helpers/order-cancellations-returns';
import { clearCacheCy12 } from '../../../helpers/utils-cypress12';

describe('Order Cancellations and Returns', { testIsolation: false }, () => {
  clearCacheCy12();
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
