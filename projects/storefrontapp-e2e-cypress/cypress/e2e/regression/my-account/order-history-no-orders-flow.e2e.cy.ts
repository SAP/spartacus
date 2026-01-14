/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkBanner } from '../../../helpers/homepage';
import { waitForPage } from '../../../helpers/navigation';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Order History with no orders', () => {
  viewportContext(['mobile', 'desktop'], () => {
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

      it('should display order history page and should be able to start shopping', () => {
        const homePage = waitForPage('homepage', 'getHomePage');
        cy.get('.cx-order-history-header h2').should(
          'contain',
          'Order history'
        );
        cy.get('.cx-order-history-no-order').should('exist');

        cy.get('.btn.btn-primary.btn-block.active')
          .findByText('Start Shopping')
          .click();

        cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
        checkBanner();
      });
    });
  });
});
