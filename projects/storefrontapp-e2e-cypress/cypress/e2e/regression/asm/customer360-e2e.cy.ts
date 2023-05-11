/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as customer360 from '../../../helpers/customer360';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import * as checkout from '../../../helpers/checkout-flow';
import { waitForPage } from '../../../helpers/navigation';

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
    customer360.setup();
    cy.saveLocalStorage();
  });

  describe('Activity List', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Activity').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should contain all activities (CXSPA-700)', () => {
      cy.get('.cx-asm-customer-table').contains('Cart');
      cy.get('.cx-asm-customer-table').contains('Order');
      cy.get('.cx-asm-customer-table').contains('Ticket');
      cy.get('.cx-asm-customer-table').contains('Saved Cart');
    });

    it('should redirect to the cart page (CXSPA-700)', () => {
      const cartPage = waitForPage('/cart', 'getCartPage');
      customer360.redirect('Cart');
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Your Shopping Cart');
    });

    it('should redirect to the order details page (CXSPA-700)', () => {
      const orderPage = waitForPage('/my-account/order/*', 'getOrderPage');
      customer360.redirect('Order');
      cy.wait(`@${orderPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Order Details');
    });

    it('should redirect to the saved cart page (CXSPA-700)', () => {
      const savedCartPage = waitForPage(
        '/my-account/saved-cart/*',
        'getSavedCartPage'
      );
      customer360.redirect('Saved Cart');
      cy.wait(`@${savedCartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Saved Cart Details');
    });

    it('should redirect to the support tickets page (CXSPA-700)', () => {
      const supportTicketsPage = waitForPage(
        '/my-account/support-ticket/*',
        'getSupportTicketsPage'
      );
      customer360.redirect('Ticket');
      cy.wait(`@${supportTicketsPage}`)
        .its('response.statusCode')
        .should('eq', 200);
      cy.get('h1').contains('Entering a subject');
    });
  });

  describe('Profile', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
      checkout.visitHomePage('asm=true');
      cy.get('button.cx-360-button').click();
      cy.get('button.cx-tab-header').contains('Profile').click();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it('should redirect to the support tickets page (CXSPA-700)', () => {
      const user = customer360.getUser();
      cy.get('.cx-asm-customer-profile').within(() => {
        cy.get('.address-line1').should('contain', user.address.line1);
        cy.get('.profile-phone1').should('contain', user.phone);
        cy.get('cx-card').should('contain', user.payment.expires.year);
      });
    });
  });
});
