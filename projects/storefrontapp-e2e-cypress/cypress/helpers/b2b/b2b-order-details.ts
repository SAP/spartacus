/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as sampleData from '../../sample-data/b2b-order-details';
import {unitLevelOrder} from '../../sample-data/b2b-order-details';
import { waitForPage } from '../checkout-flow';
import * as quickOrder from "./b2b-quick-order";





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

export function loginB2bUnitOrderViewerAdmin() {
  cy.requireLoggedIn(sampleData.b2bUnitOrderViewerAccountAdmin);
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
      )}/users/current/orders/*`,
    },
    { body: unitLevelOrder }
  );
}

export function addorder() {
  quickOrder.visitQuickOrderPage();
  quickOrder.addProductToTheList('3881074');
  quickOrder.addToCart();
  cy.visit(`/powertools-spa/en/USD/cart`);
  cy.contains('Proceed to Checkout').should('be.visible').click({force:true});
  cy.get('input[id="paymentType-ACCOUNT"]').click({force:true});
  cy.wait(100);
  cy.contains('Continue').should('be.visible').click({force:true});
  cy.wait(100);
  cy.wait(1000);
  cy.contains('Continue').should('be.visible').click({force:true});
  cy.wait(100);
  cy.get('div.col-md-12>button').eq(1).should('be.visible').click();
  cy.wait(1000);
  cy.get('input[ng-reflect-name=termsAndConditions]').should('be.visible').click({force:true});
  cy.wait(100);
  cy.get('form.cx-place-order-form>button').should('be.visible').click({force:true});
  cy.wait(100);
}
