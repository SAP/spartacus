/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as siteContextSelector from '../../../helpers/site-context-selector';

/**
 * This test checks accessibility concerns on the add to cart modal (PLP Page) using Access Continuum
 */
describe('Add to Cart Modal Accessibility', () => {
  beforeEach(() => {
    cy.a11yContinuumSetup();
  });

  context('Add to Cart (PDP)', () => {
    it('Item Added to Cart Dialog', () => {
      cy.visit(siteContextSelector.PRODUCT_PATH_2);
      cy.get('cx-add-to-cart button[type=submit]').click();
      cy.get('cx-added-to-cart-dialog .cx-modal-content cx-cart-item');
      cy.get('cx-added-to-cart-dialog').a11yRunContinuumTest();
    });
  });
});
