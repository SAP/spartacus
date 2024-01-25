/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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

      it('should navigate to login page and SignIn with user details', () => {
        cy.findByText(/Sign in \/ Register/i).click();
        fillLoginForm({ username: 'cdp.user@sap.com', password: 'Test@1' });
      });

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
