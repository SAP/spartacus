import { viewportContext } from '../../../helpers/viewport-context';
const productId = '266685';

describe('Added to cart modal - Anonymous user', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
    });

    it('Should add products to cart', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog').within(() => {
        //check for initial default values
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '1');
        cy.get('.cx-dialog-total').should('contain', '1 item');
        cy.get('[aria-label="Close Modal"]').click();
      });

      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-dialog').within(() => {
        cy.get('.cx-quantity cx-item-counter input').should('have.value', '2');
        cy.get('.cx-dialog-total').should('contain', '2 items');

        // check action button links
        cy.get('.btn-primary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/cart');
          });
        cy.get('.btn-secondary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/checkout');
          });

        cy.get('[aria-label="Close Modal"]').click();
        // Removed non-core validation. Longer test in added-to-cart-modal spec file.
      });
    });
  });
});
