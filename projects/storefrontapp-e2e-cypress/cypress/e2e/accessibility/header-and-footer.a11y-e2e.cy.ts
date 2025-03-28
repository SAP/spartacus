/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../../sample-data/shared-users';

describe('Header and Footer Continuum tests', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/');
    cy.get('[section="header"]').as('header');
    cy.get('[section="footer"]').as('footer');
  });
  context('Header', () => {
    it('Main header body', () => {
      cy.get('@header').get('a').contains('Brands');
      cy.get('@header').a11yRunContinuumTest();
    });

    it('My Account dropdown', () => {
      cy.requireLoggedIn(standardUser);
      cy.reload();
      cy.get('@header')
        .get('nav[aria-label="My Account"]')
        .a11yRunContinuumTest();
    });
  });

  context('Footer', () => {
    it('Main footer body', () => {
      cy.get('@footer').a11yRunContinuumTest();
    });

    it('Consent Management dialog', () => {
      cy.get('@footer').get('button').contains(' Consent Management').click();
      cy.get('.modal-dialog').contains(' Select all ').click();
      cy.get('.modal-dialog').a11yRunContinuumTest();
    });
  });
});
