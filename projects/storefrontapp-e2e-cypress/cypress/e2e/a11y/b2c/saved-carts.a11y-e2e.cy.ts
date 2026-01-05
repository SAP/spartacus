/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Saved carts Continuum tests', { testIsolation: false }, () => {
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('Saved Carts, empty list', () => {
    cy.visit('/my-account/saved-carts');
    cy.get('.cx-saved-cart-list-no-saved-carts');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Save for later modal', () => {
    const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
    cy.addToCart('779841', 1, auth.token.access_token);
    cy.visit('/cart');
    cy.get('button').contains('Save cart for later').click();
    cy.get('.modal-dialog input').type('Test saved cart');
    cy.get('.modal-dialog textarea').type('Test saved cart description');
    cy.get('.modal-dialog').a11yRunContinuumTest();
    cy.get('button').contains(' Save ').click();
  });

  it('Saved Carts, main body', () => {
    cy.visit('/my-account/saved-carts');
    cy.get('.cx-saved-cart-list-cart-name');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Import products - modal', () => {
    cy.get('button').contains(' Import Products').click();
    cy.get('.modal-dialog .cx-import-entries-row');
    cy.get('.modal-dialog').a11yRunContinuumTest();
    cy.get('.close').click();
  });

  it('Saved cart details', () => {
    cy.get('.cx-saved-cart-list-cart-name a').click();
    cy.get('.cx-table-item-container');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Delete saved cart modal', () => {
    cy.get('button').contains(' Delete Saved Cart ').click();
    cy.get('.modal-dialog .cx-saved-cart-value');
    cy.get('.modal-dialog').a11yRunContinuumTest();
    cy.get('.close').click();
  });

  it('Restore saved cart modal', () => {
    cy.get('button').contains(' Make cart active ').click();
    cy.get('.modal-dialog .cx-saved-cart-value');
    cy.get('.modal-dialog').a11yRunContinuumTest();
  });
});
