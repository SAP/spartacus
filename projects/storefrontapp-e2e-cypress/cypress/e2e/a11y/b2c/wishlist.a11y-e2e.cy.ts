/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTestsBefore } from '../../../support/utils/test-isolation';

describe('Wishlist page accessibility', { testIsolation: false }, () => {
  isolateTestsBefore();
  before(() => {
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('Empty page', () => {
    cy.visit('my-account/wishlist');
    cy.get('.cx-empty-wish-list');
    cy.get('main').a11yRunContinuumTest();
  });

  it('Page with items', () => {
    cy.visit('/');
    cy.get('cx-product-carousel-item').first().click();
    cy.get('cx-add-to-wishlist button').click();
    cy.visit('my-account/wishlist');
    cy.get('cx-wish-list table');
    cy.get('main').a11yRunContinuumTest();
  });
});
