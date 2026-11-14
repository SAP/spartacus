/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillLoginForm } from '../../../helpers/auth-forms';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('My Account Version-2 Landing Page', { testIsolation: false }, () => {
  viewportContext(['desktop'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    // Tests the login flow by navigating to the login page and signing in with user credentials.
    // The final check verifies that the login form is filled and submitted successfully.
    it('should navigate to login page and SignIn with user details', () => {
      cy.getLoginRegisterLink().click();
      fillLoginForm({ username: 'cdp.user@sap.com', password: 'Test@1' });
    });

    // Tests navigation to the My Account landing page and verifies all main sections are displayed.
    // The final check verifies that both "Orders And Returns" and "Customer Service" sections are visible on the page.
    it('should navigate to My Account Landing page', () => {
      cy.get('[aria-label="My Account"]').click();
      cy.get('.wrapper').contains('My Account').click();
      cy.get('cx-my-account-v2-navigation').contains('Customer Service');
      cy.get('cx-my-account-v2-navigation').contains('Order Information');
      cy.get('cx-my-account-v2-navigation').contains('Account Information');
      cy.get('cx-my-account-v2-orders').contains('Orders And Returns');
      cy.get('cx-my-account-v2-customer-ticketing').contains(
        'Customer Service'
      );
    });

    // Tests navigation to the Customer Service Requests page from the My Account navigation.
    // The final check verifies that the breadcrumb displays 'Customer Service' and the user can navigate back.
    it('should navigate to Customer Service Requests', () => {
      cy.get('cx-my-account-v2-navigation')
        .findByText(/Requests/i)
        .click();
      cy.get('cx-breadcrumb').contains('Customer Service');
      cy.go(-1);
    });

    // Tests navigation to the Personal Details page from the My Account navigation.
    // The final check verifies that the breadcrumb displays 'Update Personal Details' and the user can navigate back.
    it('should navigate to Personal Details', () => {
      cy.get('cx-my-account-v2-navigation')
        .findByText(/Personal Details/i)
        .click();
      cy.get('cx-breadcrumb').contains('Update Personal Details');
      cy.go(-1);
    });

    // Tests clicking the "Show More" link in the orders section to navigate to the full Order History page.
    // The final check verifies that the breadcrumb displays 'Order History' and the user can navigate back.
    it('should navigate to Order History on click of Show More', () => {
      cy.get('.cx-my-account-view-show-more').click();
      cy.get('cx-breadcrumb').contains('Order History');
      cy.go(-1);
    });

    // Tests clicking the "Show More" link in the customer service section to navigate to the full Customer Service page.
    // The final check verifies that the breadcrumb displays 'Customer Service' and the user can navigate back.
    it('should navigate to Customer Service on click of Show More', () => {
      cy.get('.cx-my-account-customer-ticket-show-more').click();
      cy.get('cx-breadcrumb').contains('Customer Service');
      cy.go(-1);
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });
});
