/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import {
  interceptOrderList,
  interceptCancelOrder,
  interceptOrderDetails,
  serviceUser,
} from '../../../helpers/vendor/s4-service/s4-service-cancel';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import {
  CANCELLED_ORDER_DETAILS,
  CANCELLED_ORDER_LIST,
  ORDER_CODE,
  SERVICABLE_ORDER_DETAILS,
  SERVICABLE_ORDER_LIST,
} from '../../../sample-data/service-order';

const orderListAlias = 'orderList';
const orderDetailsAlias = 'orderDetails';
const cancelOrderAlias = 'cancelOrder';

describe('Cancel Service Order Flow ', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(serviceUser);
    cy.get('button').contains('Allow All').click();
  });

  it('should Cancel a servicable order', () => {
    interceptOrderList(orderListAlias, SERVICABLE_ORDER_LIST);
    interceptOrderDetails(orderDetailsAlias, SERVICABLE_ORDER_DETAILS);
    interceptCancelOrder(cancelOrderAlias);
    cy.visit('/powertools-spa/en/USD/my-account/orders');
    cy.wait(`@${orderListAlias}`).its('response.statusCode').should('eq', 200);
    cy.contains(ORDER_CODE).scrollIntoView().click();
    cy.wait(`@${orderDetailsAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.contains('Cancel Service').scrollIntoView().click();
    // cy.get('input[type="date"]').scrollIntoView().clear().type(RESCHEDULED_DATE);
    cy.get('textarea[formControlName="cancelReason"]').type('Check');
    cy.get('button[type="submit"]').click();
    cy.wait(`@${orderDetailsAlias}`);
    cy.contains('The service has been cancelled sucessfully').should('exist');
  });

  it('should not allow to cancel a cancelled order', () => {
    interceptOrderList(orderListAlias, CANCELLED_ORDER_LIST);
    interceptOrderDetails(orderDetailsAlias, CANCELLED_ORDER_DETAILS);
    cy.visit('/powertools-spa/en/USD/my-account/orders');
    cy.wait(`@${orderListAlias}`).its('response.statusCode').should('eq', 200);
    cy.contains(ORDER_CODE).scrollIntoView().click();
    cy.wait(`@${orderDetailsAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.contains('Cancel Service').should('not.exist');
  });

  afterEach(() => {
    signOutUser();
  });
});
