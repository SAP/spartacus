import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';
import * as cart from '../../helpers/cart';
/**
 * This test checks accessibility concerns on the cart page using Access Continuum
 */
context('Cart Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('Empty Cart', () => {
    before(() => {
      cy.visit('/cart');
      cart.validateEmptyCart();
    });

    checkA11yConcerns();
  });

  describe('Cart with Products', () => {
    before(() => {
      cart.addProducts();
      cy.visit('/cart').wait(3000);
      cy.get('cx-breadcrumb h1').should('contain', 'Your Shopping Cart');
    });

    // Run accessibility tests but don't fail the test if concerns are found
    checkA11yConcerns(false);
  });
});
