/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as unitLevelOrderDetails from '../../../helpers/b2b/b2b-order-details';
import { doPlaceOrder } from '../../../helpers/order-history';
import * as sampleData from '../../../sample-data/b2b-order-details';

export const UNIT_LEVEL_ORDERS_URL = '/my-account/unitLevelOrderDetails';

context('B2B - Unit Level Order', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    unitLevelOrderDetails.loginB2bUnitOrderViewer();
    cy.visit(UNIT_LEVEL_ORDERS_URL);
  });

  it('initial empty page load', () => {
    cy.get('main .cx-summary-heading');
    cy.get('main').a11yRunContinuumTest();
  });

  it('non-empty page load', () => {
    unitLevelOrderDetails.getStubbedUnitLevelOrderDetails();
    // doPlaceOrder().then((orderData: any) => {
    //   cy.waitForOrderToBePlacedRequest(
    //     undefined,
    //     undefined,
    //     orderData.body.code
    //   );
    //   cy.visit('/my-account/unitLevelOrderDetails');
    // });
    // cy.visit(`/my-account/unitLevelOrderDetails/${sampleData.ORDER_CODE}`);
    cy.get('main .cx-summary-heading');
    cy.get('main').a11yRunContinuumTest();
  });


});
