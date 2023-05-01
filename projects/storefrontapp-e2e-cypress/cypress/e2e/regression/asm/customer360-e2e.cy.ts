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

    it('should contain all activities ', () => {
      cy.get('.cx-asm-customer-table').contains('Cart');
      cy.get('.cx-asm-customer-table').contains('Order');
      cy.get('.cx-asm-customer-table').contains('Ticket');
      cy.get('.cx-asm-customer-table').contains('Saved Cart');
    });

    it('should redirect to the cart page', () => {
      const cartPage = waitForPage('/cart', 'getCartPage');
      customer360.redirect('Cart');
      cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Your Shopping Cart');
    });

    it('should redirect to the order details page', () => {
      const orderPage = waitForPage('/my-account/order/*', 'getOrderPage');
      customer360.redirect('Order');
      cy.wait(`@${orderPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Order Details');
    });

    it('should redirect to the saved cart page', () => {
      const savedCartPage = waitForPage(
        '/my-account/saved-cart/*',
        'getSavedCartPage'
      );
      customer360.redirect('Saved Cart');
      cy.wait(`@${savedCartPage}`).its('response.statusCode').should('eq', 200);
      cy.get('h1').contains('Saved Cart Details');
    });

    it('should redirect to the support tickets page', () => {
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
});
