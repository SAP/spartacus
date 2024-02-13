/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillLoginForm } from '../../../helpers/auth-forms';
import {
  logoutUser,
  waitForCmsComponentsToLoad,
} from '../../../helpers/vendor/cdc/cdc';
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
const cdpUser = {
  userId: 'cdptester@cdp.com',
  password: 'Password123.',
  fullName: 'cdp tester',
};
export const ELECTRONICS_BASESITE = 'electronics-spa';
describe('Customer Data Platform (CDP) Integration', () => {
  before(() => {
    Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
  });

  it('should navigate to Customer Service List to check if service requests are un-editable', () => {
    cy.intercept('GET', '**/tickets?**').as('getTickets');
    cy.visit('/login');
    fillLoginForm({ username: cdpUser.userId, password: cdpUser.password });
    waitForCmsComponentsToLoad('electronics-spa');
    cy.get('cx-login .cx-login-greet').contains(`Hi, ${cdpUser.fullName}`);
    customerTicketing.clickMyAccountMenuOption();
    customerTicketing.clickCustomerSupportMenuOption();

    cy.wait('@getTickets').then(() => {
      customerTicketing.verifyTicketListingPageVisit();
    });
    // validating a closed ticket, for reopen button
    customerTicketing.clickTicketInRow(customerTicketing.FIRST_ROW_TICKET_LIST);
    customerTicketing.verifyStatusOfTicketInDetailsPage(
      customerTicketing.TestStatus.closed
    );
    cy.get('cx-customer-ticketing-reopen button').should('not.exist');
    customerTicketing.navigateBackToPreviousPage();

    // validating an open ticket, for add new message and close button
    customerTicketing.clickTicketInRow(
      customerTicketing.SECOND_ROW_TICKET_LIST
    );
    customerTicketing.verifyStatusOfTicketInDetailsPage(
      customerTicketing.TestStatus.open
    );
    customerTicketing.verifyMessageBoxIsDisabled();
    cy.get('cx-customer-ticketing-close button').should('not.exist');
    customerTicketing.navigateBackToPreviousPage();
    logoutUser();
  });
});
