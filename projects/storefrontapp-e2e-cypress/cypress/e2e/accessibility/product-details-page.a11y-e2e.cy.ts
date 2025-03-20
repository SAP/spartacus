/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as siteContextSelector from '../../helpers/site-context-selector';
import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
/**
 * This test checks accessibility concerns on the PDP page using Access Continuum
 */
context('Product Details Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup('cypress/continuum.conf.ts');
  });

  describe('PDP with Product Details', () => {
    before(() => {
      const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
      cy.visit(productDetailsPath).wait(3000);
      cy.get('cx-breadcrumb h1').should(
        'contain',
        'Remote Control Tripod VCT-80AV'
      );
      cy.get('cx-page-slot[position="Tabs"] cx-tab-panel > div.active').should(
        'contain',
        'High-performance tripod with pan handle / remote commander.'
      );
    });

    // Run accessibility tests but don't fail the test if concerns are found
    checkA11yConcerns();
  });

  describe('PDP with Reviews', () => {
    before(() => {
      const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
      cy.visit(productDetailsPath).wait(3000);
      cy.get('cx-breadcrumb h1').should(
        'contain',
        'Remote Control Tripod VCT-80AV '
      );
      cy.get('cx-product-intro > .rating button').click();
      cy.get('cx-page-slot[position="Tabs"] cx-tab-panel > div.active').should(
        'contain',
        'Reviews (6)'
      );
    });

    // Run accessibility tests but don't fail the test if concerns are found
    checkA11yConcerns();
  });
});
