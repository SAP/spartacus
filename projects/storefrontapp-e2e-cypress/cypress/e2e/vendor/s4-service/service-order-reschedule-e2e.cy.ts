/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginUser, signOutUser } from '../../../helpers/checkout-flow';
import {
  interceptOrderList,
  interceptRescheduleServiceOrder,
  interceptOrderDetails,
  serviceUser,
} from '../../../helpers/vendor/s4-service/s4-service';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import {
  CANCELLED_ORDER_DETAILS,
  CANCELLED_ORDER_LIST,
  ORDER_CODE,
  RESCHEDULED_DATE,
  SERVICABLE_ORDER_DETAILS,
  SERVICABLE_ORDER_IN_24HRS_DETAILS,
  SERVICABLE_ORDER_LIST,
} from '../../../sample-data/service-order';

const orderListAlias = 'orderList';
const orderDetailsAlias = 'orderDetails';
const rescheduleOrderAlias = 'rescheduleOrder';

describe('Reschedule Service Order Flow ', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.visit('/powertools-spa/en/USD/login');
    loginUser(serviceUser);
    cy.get('button').contains('Allow All').click();
  });

  it('should reschedule a servicable order', () => {
    interceptOrderList(orderListAlias, SERVICABLE_ORDER_LIST);
    interceptOrderDetails(orderDetailsAlias, SERVICABLE_ORDER_DETAILS);
    interceptRescheduleServiceOrder(rescheduleOrderAlias);
    cy.visit('/powertools-spa/en/USD/my-account/orders');
    cy.wait(`@${orderListAlias}`).its('response.statusCode').should('eq', 200);
    cy.contains(ORDER_CODE).scrollIntoView().click();
    cy.wait(`@${orderDetailsAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.contains('Reschedule Service').scrollIntoView().click();
    cy.get('button[type="submit"]')
      .contains('Submit Request')
      .scrollIntoView()
      .should('be.disabled');
    cy.get('input[type="date"]')
      .scrollIntoView()
      .clear()
      .type(RESCHEDULED_DATE);
    cy.get('button[type="submit"]')
      .contains('Submit Request')
      .should('be.enabled')
      .click();
    cy.wait(`@${orderDetailsAlias}`);
    cy.contains(
      'The service date and time has been changed successfully.'
    ).should('exist');
  });

  it('should not allow to reschedule a cancelled order', () => {
    interceptOrderList(orderListAlias, CANCELLED_ORDER_LIST);
    interceptOrderDetails(orderDetailsAlias, CANCELLED_ORDER_DETAILS);
    cy.visit('/powertools-spa/en/USD/my-account/orders');
    cy.wait(`@${orderListAlias}`).its('response.statusCode').should('eq', 200);
    cy.contains(ORDER_CODE).scrollIntoView().click();
    cy.wait(`@${orderDetailsAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.contains('Reschedule Service').should('not.exist');
  });

  it('should not allow to reschedule a service order scheduled within 24 hours', () => {
    interceptOrderList(orderListAlias, SERVICABLE_ORDER_LIST);
    interceptOrderDetails(orderDetailsAlias, SERVICABLE_ORDER_IN_24HRS_DETAILS);
    cy.visit('/powertools-spa/en/USD/my-account/orders');
    cy.wait(`@${orderListAlias}`).its('response.statusCode').should('eq', 200);
    cy.contains(ORDER_CODE).scrollIntoView().click();
    cy.wait(`@${orderDetailsAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.contains(
      'The service cannot be cancelled or rescheduled less than 24 hours before the scheduled date.'
    ).should('exist');
    cy.contains('Reschedule Service').should('not.exist');
  });

  afterEach(() => {
    signOutUser();
  });
});
