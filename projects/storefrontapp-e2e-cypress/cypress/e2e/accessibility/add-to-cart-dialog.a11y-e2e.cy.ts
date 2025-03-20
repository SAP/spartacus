/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
import * as siteContextSelector from '../../helpers/site-context-selector';

/**
 * This test checks accessibility concerns on the add to cart modal (PLP Page) using Access Continuum
 */
context('Add to Cart Modal Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('Add to Cart', () => {
    before(() => {
      const productDetailsPath = siteContextSelector.PRODUCT_PATH_2;
      cy.visit(productDetailsPath);
      cy.get('cx-add-to-cart button[type=submit]').click().wait(3000);
      cy.get('cx-added-to-cart-dialog').within(() => {
        //check for initial default values
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '1');
        cy.get('.cx-dialog-total').should('contain', '1 item');
        // cy.get('[aria-label="Close Modal"]').click();
      });
    });

    checkA11yConcerns();
  });

  // describe('Cart with Products', () => {
  //   before(() => {
  //     cart.addProducts();
  //     cy.visit('/cart').wait(3000);
  //     cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
  //   });

  //   // Run accessibility tests but don't fail the test if concerns are found
  //   checkA11yConcerns(false);
  // });
});
