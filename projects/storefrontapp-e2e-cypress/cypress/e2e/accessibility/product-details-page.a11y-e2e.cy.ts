/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as siteContextSelector from '../../helpers/site-context-selector';

/**
 * This test checks accessibility concerns on the PDP page using Access Continuum
 */
describe('Product Details Page Accessibility', { testIsolation: false }, () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
    cy.visit(siteContextSelector.PRODUCT_PATH_2);
  });

  it('PDP with Product Details', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(1)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-details-tab .container'
    );
    cy.get('main').a11yRunContinuumTest();
  });

  it('PDP with Reviews', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(3)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-reviews .container .header'
    );
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-reviews .container .review'
    );
    cy.get('main').a11yRunContinuumTest();
  });

  it('PDP with Spec', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(2)').click();
    cy.get(
      'cx-tab-panel [role="tabpanel"].active cx-product-attributes .container'
    );
    cy.get('main').a11yRunContinuumTest();
  });

  it('PDP with Shipping', () => {
    cy.get('cx-page-slot[position="Tabs"] .tab button:nth-child(4)').click();
    cy.get('cx-tab-panel [role="tabpanel"].active cx-paragraph');
    cy.get('main').a11yRunContinuumTest();
  });
});
