import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

const productId = '266685';

describe('Added to cart toast - Anonymous user', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
      cy.cxConfig({
        addedToCartToast: {
          enabled: true,
          timeout: 5000,
        },
      });
    });

    it('should add product to cart', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();
      cy.get('cx-added-to-cart-toast').within(() => {
        cy.get('.added-to-cart-toast-title').should('contain', '1 item');
        // check action buttons/links
        cy.get('button').should('contain.text', 'Continue Shopping');
        cy.get('.btn-primary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/cart');
          });
      });
    });

    it('should dismiss the toast', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();
      // cy.get('.added-to-cart-toast-content > .link').click();
      cy.get('cx-added-to-cart-toast').within(() => {
        cy.get('button').click();
      });
      cy.get('cx-added-to-cart-toast').should('be.empty');
    });

    it('should redirect to the cart page', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();
      cy.get('cx-added-to-cart-toast').within(() => {
        cy.get('.btn-primary')
          .click()
          .then(() => {
            cy.location('pathname').should('contain', '/cart');
          });
      });
    });
  });
});
