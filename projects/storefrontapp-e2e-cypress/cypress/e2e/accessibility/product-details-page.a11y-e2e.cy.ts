/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as siteContextSelector from '../../helpers/site-context-selector';

/**
 * This test checks accessibility concerns on the PDP page using Access Continuum
 */
describe('Product Details Page Accessibility', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit(siteContextSelector.PRODUCT_PATH_2);
  });

  context('PDP main section', () => {
    it('should pass a11y check', () => {
      cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(1)')
        .click()
        .wait(1000);
      cy.get('main').a11yRunContinuumTest();
    });
  });

  context('PDP with Reviews', () => {
    it('should pass a11y check', () => {
      cy.get('cx-product-intro > .rating button').click().wait(1000);
      cy.get('main').a11yRunContinuumTest();
    });
  });

  context('PDP with Spec', () => {
    it('should pass a11y check', () => {
      cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(2)')
        .click()
        .wait(1000);
      cy.get('main').a11yRunContinuumTest();
    });
  });

  context('PDP with Shipping', () => {
    it('should pass a11y check', () => {
      cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(4)')
        .click()
        .wait(1000);
      cy.get('main').a11yRunContinuumTest();
    });
  });
});
