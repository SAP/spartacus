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

    it('should add a product from a PDP to cart', () => {
      const quantity = 4;

      cy.visit(`/product/${productId}`);
      cy.get('cx-item-counter input').type(`{selectall}${quantity.toString()}`);
      cy.get('cx-add-to-cart button[type=submit]').click();

      cy.get('cx-added-to-cart-toast').within(() => {
        cy.get('.added-to-cart-toast-title').should(
          'contain',
          `${quantity} items`
        );
        // check action buttons/links
        cy.get('button').should('contain.text', 'Continue Shopping');
        cy.get('.btn-primary')
          .should('have.attr', 'href')
          .then(($href) => {
            expect($href).contain('/cart');
          });
      });
    });

    it('should add a product from a PLP to cart', () => {
      cy.visit('/');

      cy.get('header').within(() => {
        cy.get('cx-navigation-ui')
          .contains('Digital Cameras')
          .click({ force: true });
        cy.get('.childs cx-generic-link')
          .contains('Compact Cameras')
          .click({ force: true });
      });

      cy.get('cx-add-to-cart button[type=submit]').first().click();

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
      cy.wait(500);
      cy.get('cx-added-to-cart-toast').should('be.empty');
    });

    it('should dismiss the toast', () => {
      cy.visit(`/product/${productId}`);
      cy.get('cx-add-to-cart button[type=submit]').click();
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
