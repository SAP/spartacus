/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createOauthRevokeIntercept,
  createPunchoutRequisitionIntercept,
  deleteStaleCart,
  hackAddToCartModalStyleAndGoToCheckout,
  hardCopyPunchoutSession,
  mockPunchoutSession,
  openPunchoutSession,
  verifyBackToAriba,
} from '../../../../helpers/b2b/b2b-punchout';

let localPunchoutSession: any;

beforeEach(() => {
  createPunchoutRequisitionIntercept();
  createOauthRevokeIntercept();
});

afterEach(() => {
  if (localPunchoutSession) {
    deleteStaleCart(hardCopyPunchoutSession(localPunchoutSession));
    localPunchoutSession = null;
  }
});

describe('STORE level and CREATE operation', () => {
  it('should land on home page and close session', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'STORE',
      punchOutOperation: 'CREATE',
    }).then((punchoutSession) => {
      localPunchoutSession = hardCopyPunchoutSession(punchoutSession);

      cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
      cy.get('.accNavComponent').should('not.exist');
      cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
      cy.get('cx-punchout-close-session').should('be.visible').click();

      verifyBackToAriba(true);
    });
  });
});

describe('PRODUCT level and CREATE operation', () => {
  it('should land on PDP, block navigation to checkout page and Cancel', () => {
    openPunchoutSession({
      ...mockPunchoutSession,
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
    }).then((punchoutSession) => {
      localPunchoutSession = hardCopyPunchoutSession(punchoutSession);

      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/product/${punchoutSession.selectedItem}`
      );
      cy.get('cx-add-to-cart')
        .findByText(/Add To Cart/i)
        .click();
      cy.get('.cx-dialog-buttons').within(() => {
        cy.get('button').contains(' view cart ').should('be.visible');
        cy.get('button')
          .contains(' proceed to checkout ')
          .should('not.be.visible');
      });

      hackAddToCartModalStyleAndGoToCheckout();
      cy.get('cx-global-message').should(
        'contain',
        'No sufficient permissions to access this page'
      );
      cy.location('pathname').should(
        'eq',
        `/${Cypress.env('BASE_SITE')}/en/USD/`
      );
      cy.get('cx-mini-cart').click();
      cy.get('cx-cart-proceed-to-checkout button').should('not.exist');
      cy.get('cx-punchout-buttons button')
        .contains(' Cancel ')
        .should('be.visible')
        .click();

      verifyBackToAriba(true);
    });
  });
});

describe('STORE level and EDIT operation', () => {
  it('should land on cart page and Cancel session', () => {
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        punchOutLevel: 'STORE',
        punchOutOperation: 'EDIT',
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSession = hardCopyPunchoutSession(punchoutSession);

      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/cart`
      );
      cy.get('cx-cart-item-list table tbody.cx-item-list-items > tr').should(
        'have.length',
        1
      );
      cy.get('cx-cart-proceed-to-checkout button').should('not.exist');
      cy.get('cx-punchout-buttons button')
        .contains(' Cancel ')
        .should('be.visible')
        .click();

      verifyBackToAriba();
    });
  });

  it('should land on cart page and Back to requisition', () => {
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        punchOutLevel: 'STORE',
        punchOutOperation: 'EDIT',
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSession = hardCopyPunchoutSession(punchoutSession);

      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/cart`
      );
      cy.get('cx-punchout-buttons button')
        .contains(' Back to requisition ')
        .should('be.visible')
        .click();

      verifyBackToAriba();
    });
  });
});

describe('INSPECT operation', () => {
  it('should land on InspectCart page and Return to requisition', () => {
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        punchOutLevel: 'STORE',
        punchOutOperation: 'INSPECT',
        selectedItem: 'storeItem',
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSession = hardCopyPunchoutSession(punchoutSession);

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
