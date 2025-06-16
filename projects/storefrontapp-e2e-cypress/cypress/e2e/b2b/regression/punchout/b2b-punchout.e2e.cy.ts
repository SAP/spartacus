/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addProductAndClickCheckout,
  createPunchoutRequisitionIntercept,
  createPunchoutUser,
  deleteStaleCart,
  mockPunchoutSession,
  openPunchoutSession,
  punchoutUser,
  verifyBackToAriba,
} from '../../../../helpers/b2b/b2b-punchout';

describe('STORE level and CREATE operation', () => {
  let localPunchoutSession: any;

  afterEach(() => {
    if (localPunchoutSession) {
      deleteStaleCart({ ...localPunchoutSession });
      localPunchoutSession = null;
    }
  });

  it('should land on home page and close session', () => {
    createPunchoutUser(punchoutUser).then(({ username, password }) => {
      console.log('xxx', username, password);
      return openPunchoutSession({
        ...mockPunchoutSession,
        token: { ...mockPunchoutSession.token },
        customerId: username,
        password,
        punchOutLevel: 'STORE',
        punchOutOperation: 'CREATE',
      }).then((punchoutSession) => {
        localPunchoutSession = { ...punchoutSession };
        cy.get('.cx-login-greet').should('contain', 'Hi, PunchOut Customer');
        cy.get('.accNavComponent').should('not.exist');
        cy.get('cx-page-slot.SiteLogo').should('be.not.visible');
        createPunchoutRequisitionIntercept();
        cy.get('cx-punchout-close-session').should('be.visible').click();

        verifyBackToAriba(true);
      });
    });
  });
});

xdescribe('PRODUCT level and CREATE operation', () => {
  let localPunchoutSession: any;

  afterEach(() => {
    if (localPunchoutSession) {
      deleteStaleCart({ ...localPunchoutSession });
      localPunchoutSession = null;
    }
  });

  it('should land on PDP, block navigation to checkout page and Cancel', () => {
    const productId = '3880500';
    openPunchoutSession({
      ...mockPunchoutSession,
      token: { ...mockPunchoutSession.token },
      punchOutLevel: 'PRODUCT',
      punchOutOperation: 'CREATE',
      selectedItem: productId,
    }).then((punchoutSession) => {
      localPunchoutSession = { ...punchoutSession };
      addProductAndClickCheckout(productId);
      cy.get('cx-global-message').should(
        'contain',
        'No sufficient permissions to access this page'
      );
      cy.location('pathname').should(
        'eq',
        `/${Cypress.env('BASE_SITE')}/en/USD/`
      );
      cy.get('cx-mini-cart').click();
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-buttons button')
        .contains(' Cancel ')
        .should('be.visible')
        .click();
      verifyBackToAriba(true);
    });
  });
});

xdescribe('STORE level and EDIT operation', () => {
  let localPunchoutSessionTest1: any;
  let localPunchoutSessionTest2: any;

  afterEach(() => {
    if (localPunchoutSessionTest1) {
      deleteStaleCart({ ...localPunchoutSessionTest1 });
      localPunchoutSessionTest1 = null;
    }
    if (localPunchoutSessionTest2) {
      deleteStaleCart({ ...localPunchoutSessionTest2 });
      localPunchoutSessionTest2 = null;
    }
  });
  it('should land on cart page and Cancel session', () => {
    const productId = '3880500';
    createPunchoutRequisitionIntercept();
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        token: { ...mockPunchoutSession.token },
        punchOutLevel: 'STORE',
        punchOutOperation: 'EDIT',
        selectedItem: productId,
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSessionTest1 = { ...punchoutSession };
      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/cart`
      );
      cy.get('cx-cart-item-list table tbody.cx-item-list-items > tr').should(
        'have.length',
        1
      );
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-buttons button')
        .contains(' Cancel ')
        .should('be.visible')
        .click();
      verifyBackToAriba();
    });
  });

  it('should land on cart page and Back to requisition', () => {
    const productId = '3880500';
    createPunchoutRequisitionIntercept();
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        token: { ...mockPunchoutSession.token },
        punchOutLevel: 'STORE',
        punchOutOperation: 'EDIT',
        selectedItem: productId,
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSessionTest2 = { ...punchoutSession };
      cy.location('pathname').should(
        'contain',
        `/${Cypress.env('BASE_SITE')}/en/USD/cart`
      );
      createPunchoutRequisitionIntercept();
      cy.get('cx-punchout-buttons button')
        .contains(' Back to requisition ')
        .should('be.visible')
        .click();
      verifyBackToAriba();
    });
  });
});

xdescribe('INSPECT operation', () => {
  let localPunchoutSession: any;

  afterEach(() => {
    if (localPunchoutSession?.cartId) {
      deleteStaleCart({ ...localPunchoutSession });
      localPunchoutSession = null;
    }
  });
  it('should land on InspectCart page and Return to requisition', () => {
    openPunchoutSession(
      {
        ...mockPunchoutSession,
        token: { ...mockPunchoutSession.token },
        punchOutLevel: 'STORE',
        punchOutOperation: 'INSPECT',
        selectedItem: 'storeItem',
      },
      true
    ).then((punchoutSession) => {
      localPunchoutSession = { ...punchoutSession };
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
    });
  });
});
