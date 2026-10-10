/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fillLoginForm } from '../../../helpers/auth-forms';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

describe(
  'My Account Version-2 Order History and Order Details',
  { testIsolation: false },
  () => {
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

      // Tests navigating to the Order History page and verifies that at least one order is displayed.
      // The final check verifies that the total count of orders displayed is at least 1.
      it('should navigate to Order History page', () => {
        let totalCount;
        cy.get('[aria-label="My Account"]').click();
        cy.get('.wrapper').contains('Order History').click();
        cy.get('h2').contains('All Orders');
        cy.get('.cx-my-account-v2-order-history-body > .cx-each-order').then(
          (value) => {
            totalCount = Cypress.$(value).length;
            expect(totalCount).to.be.at.least(1);
          }
        );
      });

      // Tests viewing the details of the first order and opening the Download Invoices modal.
      // The final check verifies that clicking close on the modal dismisses it successfully.
      it('should navigate to view details of first order', () => {
        cy.get('.cx-my-account-v2-order-history-code > a').first().click();
        cy.get('cx-media > img').should('exist');
        cy.findByText(/Download Invoices/i).click();
        cy.get('.cx-modal-content').contains('Download Invoices');
        cy.get('.close').click();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  }
);
