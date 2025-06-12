/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../../support/utils/test-isolation';
import {
  goToPunchoutCart,
  mockPunchoutSession,
  openPunchoutSession,
  verifyBackToAriba,
} from '../../../../helpers/b2b/b2b-punchout';

describe('B2B Punchout', () => {
  isolateTests();

  it('should open and close session', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
    }).then(() => {
      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      cy.get('.accNavComponent').should('not.exist');
      cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
      cy.get('cx-punchout-close-session').should('be.visible').click();
      verifyBackToAriba();
    });
  });

  describe('Product level and Create operation', () => {
    it('should go to cart and Back to requisition', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.get('cx-punchout-buttons button')
          .contains(' Back to requisition ')
          .should('be.visible')
          .click();
        verifyBackToAriba();
      });
    });

    it('should go to cart and Cancel', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.get('cx-punchout-buttons button')
          .contains(' Cancel ')
          .should('be.visible')
          .click();
        verifyBackToAriba();
      });
    });

    it('should disallow for checkout', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.visit('/checkout');
        cy.get('cx-global-message').should(
          'contain',
          'No sufficient permissions to access this page'
        );
        cy.location('pathname').should(
          'contain',
          `/${Cypress.env('BASE_SITE')}/en/USD/`
        );
        //TODO
        cy.location('pathname').should(
          'contain',
          `/${Cypress.env('BASE_SITE')}/en/USD/punchout/cxml/error`
        );
      });
    });
  });

  describe('Product level and Edit operation', () => {
    it('should go to cart and Back to requisition', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        cy.visit('/');
        openPunchoutSession({
          ...mockPunchoutSession,
          punchOutLevel: 'CART',
          punchOutOperation: 'EDIT',
        }).then(() => {
          cy.location('pathname').should(
            'contain',
            `/${Cypress.env('BASE_SITE')}/en/USD/cart`
          );
          // TODO: should see not empty cart here
        });
      });
    });
  });

  describe('Cart level and Inspect operation', () => {
    it('should see empty inspect page', () => {
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'CART',
        punchOutOperation: 'INSPECT',
      }).then(() => {
        cy.location('pathname').should(
          'contain',
          `/${Cypress.env('BASE_SITE')}/en/USD/punchout/cxml/inspect`
        );
        cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      });
    });

    it('should see product in inspect page', () => {
      const productId = '3880500';
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'PRODUCT',
        punchOutOperation: 'CREATE',
        selectedItem: productId,
      }).then(() => {
        goToPunchoutCart(productId);
        openPunchoutSession({
          ...mockPunchoutSession,
          punchOutLevel: 'CART',
          punchOutOperation: 'INSPECT',
        }).then(() => {
          cy.location('pathname').should(
            'contain',
            `/${Cypress.env('BASE_SITE')}/en/USD/punchout/cxml/inspect`
          );
          cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
          cy.get(
            'cx-page-slot.SiteContext>cx-site-context-selector+cx-site-theme-switcher'
          ).should('exist');
          cy.get(
            'cx-punchout-inspect-cart > .punchoutStartSection > cx-cart-item-list table tbody.cx-item-list-items > tr'
          ).should('have.length', 1);
          cy.get(
            'cx-punchout-inspect-cart > div.punchoutStartSection > cx-cart-item-list > table > tbody >  tr:nth-of-type(1) > td.cx-quantity > .cx-value.readonly-value > cx-item-counter > input'
          ).should('be.disabled');
          cy.get(
            'cx-punchout-inspect-cart > .punchoutEndSection > cx-order-summary .cx-summary-row.cx-summary-total > .cx-summary-amount'
          ).should('not.be.empty');
          cy.get(
            'cx-punchout-inspect-cart > div.punchoutEndSection > cx-punchout-buttons > button'
          )
            .should('have.text', ' Back to requisition ')
            .click();
          verifyBackToAriba();
        });
      });
    });
  });
});
