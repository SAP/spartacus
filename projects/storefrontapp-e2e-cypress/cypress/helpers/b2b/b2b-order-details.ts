/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../sample-data/b2b-order-details';
import { unitLevelOrder } from '../../sample-data/b2b-order-details';
import { waitForPage } from '../checkout-flow';

export function visitOrderApprovalListPage() {
  const alias = waitForPage(
    '/my-account/approval-dashboard',
    'approvalListPage'
  );

  cy.visit(`/my-account/approval-dashboard`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function loginB2bUnitOrderViewer() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccount);
}

export function loginB2bCommonUser() {
  cy.requireLoggedIn(sampleData.b2bUserAccount);
}

export function getStubbedUnitLevelOrderDetails() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/orgUsers/current/orgUnits/orders/*`,
    },
    { body: unitLevelOrder }
  );
}
