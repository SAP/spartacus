/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addProductAndClickCheckout,
  createPunchoutRequisitionIntercept,
  deleteStaleCart,
  goToPunchoutCart,
  mockPunchoutSession,
  openPunchoutSession,
  verifyBackToAriba,
} from '../../../../helpers/b2b/b2b-punchout';
import { isolateTests } from '../../../../support/utils/test-isolation';

describe('B2B Punchout', () => {
  isolateTests();

  it('should open and close session', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
    }).then((punchoutSession) => {
      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      cy.get('.accNavComponent').should('not.exist');
      cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-close-session').should('be.visible').click();
      verifyBackToAriba(true);
      deleteStaleCart(punchoutSession);
    });
  });
});

describe('Product level and Create operation', () => {
  it('should go to cart and Back to requisition', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then((punchoutSession) => {
      goToPunchoutCart(productId);
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-buttons button')
        .contains(' Back to requisition ')
        .should('be.visible')
        .click();
      verifyBackToAriba();
      deleteStaleCart(punchoutSession);
    });
  });

  it('should go to cart and Cancel', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then((punchoutSession) => {
      goToPunchoutCart(productId);
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-buttons button')
        .contains(' Cancel ')
        .should('be.visible')
        .click();
      verifyBackToAriba(true);
      deleteStaleCart(punchoutSession);
    });
  });

  it('should disallow for checkout', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then((punchoutSession) => {
      addProductAndClickCheckout(productId);
      cy.get('cx-global-message').should(
        'contain',
        'No sufficient permissions to access this page'
      );
      cy.location('pathname').should(
        'eq',
        `/${Cypress.env('BASE_SITE')}/en/USD/`
      );
      deleteStaleCart(punchoutSession);
    });
  });
});

describe('Product level and Edit operation', () => {
  it('should be redirected to cart', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then(() => {
      goToPunchoutCart(productId);
      cy.get('cx-breadcrumb > nav > ol > li > a')
        .should('contain', 'Home')
        .click();
      openPunchoutSession({
        ...mockPunchoutSession,
        token: { ...mockPunchoutSession.token },
        punchOutLevel: 'CART',
        punchOutOperation: 'EDIT',
      }).then((punchoutSession) => {
        cy.location('pathname').should(
          'contain',
          `/${Cypress.env('BASE_SITE')}/en/USD/cart`
        );
        // TODO: should see not empty cart here
        // deleteStaleCart(punchoutSession);
      });
    });
  });
});

describe('Cart level and Inspect operation', () => {
  it('should see empty inspect page', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'CART',
      punchOutOperation: 'INSPECT',
    }).then((punchoutSession) => {
      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/punchout/cxml/inspect`
      );
      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      deleteStaleCart(punchoutSession);
    });
  });

  it('should see product in inspect page', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then(() => {
      goToPunchoutCart(productId);
      openPunchoutSession({
        ...mockPunchoutSession,
        punchOutLevel: 'CART',
        punchOutOperation: 'INSPECT',
      }).then((punchoutSession) => {
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
        createPunchoutRequisitionIntercept();
        cy.get(
          'cx-punchout-inspect-cart > div.punchoutEndSection > cx-punchout-buttons > button'
        )
          .should('have.text', ' Back to requisition ')
          .click();
        verifyBackToAriba();
        deleteStaleCart(punchoutSession);
      });
    });
  });
});
