/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

describe('Header and Footer Continuum tests', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  context('Footer', () => {
    it('Main footer body', () => {
      cy.visit('/');
      cy.get('footer a');
      cy.get('footer').a11yRunContinuumTest();
    });

    it('Consent Management dialog', () => {
      cy.get('footer').get('button').contains(' Consent Management').click();
      cy.get('.modal-dialog').contains(' Select all ').click();
      cy.get('.modal-dialog').a11yRunContinuumTest();
      cy.get('.close').first().click();
    });
  });

  context('Header', () => {
    it('Main header body', () => {
      cy.get('header').get('nav button[aria-label="Brands"]').click();
      cy.get('header').get('a').contains('Canon');
      cy.get('header').a11yRunContinuumTest();
    });

    it('My Account dropdown', () => {
      cy.requireLoggedIn(standardUser);
      cy.reload();
      cy.get('header').get('.accNavComponent button').click();
      cy.get('nav a').contains(' Order History ');
      cy.get('nav[aria-label="My Account"]').a11yRunContinuumTest();
    });

    viewportContext(['mobile'], () => {
      it('Hamburger menu', () => {
        cy.get('cx-hamburger-menu button').click();
        cy.get('.navigation a').contains('Brands');
        cy.get('header').a11yRunContinuumTest();

        cy.get('.navigation button[aria-label="Brands"]').click();
        cy.get('.navigation button').contains('Cameras');
        cy.get(
          '.navigation nav[aria-label="Category menu"]'
        ).a11yRunContinuumTest();

        cy.get('.navigation button').contains('Cameras').click();
        cy.get('.navigation a').contains('Canon');
        cy.get(
          '.navigation nav[aria-label="Category menu"]'
        ).a11yRunContinuumTest();
      });
    });
  });
});
