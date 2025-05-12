/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureProductWithVariants } from '../../helpers/variants/apparel-checkout-flow';

describe('Variants Accessibility test', { testIsolation: false }, () => {
  before(() => {
    configureProductWithVariants();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
    cy.a11yContinuumSetup();
    cy.requireLoggedIn();
  });

  it('Homepage', () => {
    cy.visit('/');
    cy.get('cx-banner cx-generic-link').first();
    cy.get('main').a11yRunContinuumTest();
  });

  it('Product Details', () => {
    cy.get('.Section4 cx-banner cx-generic-link a')
      .first()
      .scrollIntoView()
      .click();
    cy.get('cx-product-summary .price');
    cy.get('main').a11yRunContinuumTest();
  });
});
