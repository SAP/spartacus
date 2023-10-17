/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

    it('should navigate to login page and SignIn with user details', () => {
      cy.findByText(/Sign in \/ Register/i).click();
      fillLoginForm({ username: 'cdp.user@sap.com', password: 'Test@1' });
    });

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

    it('should navigate to Customer Service Requests', () => {
      cy.get('cx-my-account-v2-navigation')
        .findByText(/Requests/i)
        .click();
      cy.get('cx-breadcrumb').contains('Customer Service');
      cy.go(-1);
    });

    it('should navigate to Personal Details', () => {
      cy.get('cx-my-account-v2-navigation')
        .findByText(/Personal Details/i)
        .click();
      cy.get('cx-breadcrumb').contains('Update Personal Details');
      cy.go(-1);
    });

    it('should navigate to Order History on click of Show More', () => {
      cy.get('.cx-my-account-view-show-more').click();
      cy.get('cx-breadcrumb').contains('Order History');
      cy.go(-1);
    });

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
