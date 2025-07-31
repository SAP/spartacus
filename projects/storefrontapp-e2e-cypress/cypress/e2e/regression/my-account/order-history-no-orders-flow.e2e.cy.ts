/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as userAccountHelpers from '../../../helpers/login';
import { clickHamburger } from '../../../helpers/navigation';
import { orderHistoryTest } from '../../../helpers/order-history';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('Order History with no orders', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    before(() => {
      clearAllStorage();
      cy.visit('/');
      clickHamburger();
      userAccountHelpers.registerUser();
      verifyGlobalMessageAfterRegistration();
    });

    orderHistoryTest.checkRedirectNotLoggedInUser();
    orderHistoryTest.checkRedirectLoggedInUser();
    orderHistoryTest.checkStartShoppingButton();
  });
});
