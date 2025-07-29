/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkBanner } from '../../../helpers/homepage';
import { waitForPage } from '../../../helpers/navigation';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';


describe('Order History with no orders', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

     describe('Order History for anonymous user', () => {
      it('should redirect to login page for anonymous user', () => {
        cy.visit('/my-account/orders');
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Order History for logged in user', () => {
      before(() => {
        cy.visit('/');
        cy.requireLoggedIn();
        cy.reload();
        cy.visit('/');
        cy.selectUserMenuOption({
          option: 'Order History',
        });
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      it('should display order history page', () => {
         cy.get('.cx-order-history-header h2').should('contain','Order history');
        cy.get('.cx-order-history-no-order').should('exist');
      });

      it('should be able to start shopping from an empty Order History', () => {
        const homePage = waitForPage('homepage', 'getHomePage');
        
        cy.get('.btn.btn-primary.btn-block.active')
          .findByText('Start Shopping')
          .click();
        
        cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
        checkBanner();
        });
      });
  });
});
