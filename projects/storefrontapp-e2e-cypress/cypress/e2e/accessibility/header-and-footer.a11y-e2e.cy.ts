/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { viewportContext } from '../../helpers/viewport-context';
import { standardUser } from '../../sample-data/shared-users';

describe('Header and Footer Continuum tests', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit('/');
  });
  context('Header', () => {
    it('Main header body', () => {
      cy.get('header').get('a').contains('Brands');
      cy.get('header').get('nav button[aria-label="Brands"]').click();
      cy.get('header').a11yRunContinuumTest();
    });

    it('My Account dropdown', () => {
      cy.requireLoggedIn(standardUser);
      cy.reload();
      cy.get('header').get('.accNavComponent button').click();
      cy.get('header')
        .get('nav[aria-label="My Account"]')
        .a11yRunContinuumTest();
    });
  });

  context('Footer', () => {
    it('Main footer body', () => {
      cy.get('footer').a11yRunContinuumTest();
    });

    it('Consent Management dialog', () => {
      cy.get('footer').get('button').contains(' Consent Management').click();
      cy.get('.modal-dialog').contains(' Select all ').click();
      cy.get('.modal-dialog').a11yRunContinuumTest();
    });
  });

  viewportContext(['mobile'], () => {
    it('Hamburger menu', () => {
      cy.get('cx-hamburger-menu button').click();
      cy.get('a').contains('Brands');
      cy.get('header').a11yRunContinuumTest();

      cy.get('button[aria-label="Brands"]').click();
      cy.get('button').contains('Cameras');
      cy.get('nav[aria-label="Category menu"]').a11yRunContinuumTest();

      cy.get('button').contains('Cameras').click();
      cy.get('a').contains('Canon');
      cy.get('nav[aria-label="Category menu"]').a11yRunContinuumTest();
    });
  });
});
