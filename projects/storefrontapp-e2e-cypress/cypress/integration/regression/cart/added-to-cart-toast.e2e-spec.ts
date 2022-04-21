import { clickAddToCart, verifyAddedToCartToast } from '../../../helpers/cart';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

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
      cy.visit('/');
    });

    it('should add a product from a PDP to cart', () => {
      const quantity = 4;

      cy.get('cx-carousel').within(() => {
        cy.get('a').first().click();
      });

      const productNameEl = cy.get('h1');

      cy.get('cx-item-counter input').type(`{selectall}${quantity}`);

      clickAddToCart();
      verifyAddedToCartToast(quantity, productNameEl);
    });

    it('should add a product from a PLP to cart', () => {
      cy.get('header').within(() => {
        cy.get('cx-navigation-ui')
          .contains('Digital Cameras')
          .click({ force: true });
      });

      cy.get('a.cx-product-name > h2')
        .first()
        .then((productName) => {
          cy.wrap(productName).as('productName');
        });

      const productNameEl = cy.get('a.cx-product-name > h2').first();

      clickAddToCart();
      verifyAddedToCartToast(1, productNameEl);
    });

    it('should dismiss the toast', () => {
      cy.get('cx-carousel').within(() => {
        cy.get('a').first().click();
      });

      clickAddToCart();
      cy.get('cx-added-to-cart-toast').within(() => {
        cy.get('button').click();
      });
      cy.get('cx-added-to-cart-toast').should('be.empty');
    });

    it('should redirect to the cart page', () => {
      cy.get('cx-carousel').within(() => {
        cy.get('a').first().click();
      });

      clickAddToCart();
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
