/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as orderCancellationReturn from '../../../helpers/order-cancellations-returns';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('Order Cancellations and Returns', { testIsolation: false }, () => {
  isolateTests();
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
