import * as cart from '../../../helpers/cart';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product carousel', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      // Configure ProductCarouselComponent to render Add To Cart buttons for each slide.
      cy.cxConfig({
        cmsComponents: {
          ProductCarouselComponent: {
            data: {
              composition: {
                inner: ['ProductAddToCartComponent'],
              },
            },
          },
        },
      });

      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Add to Cart', () => {
      it('should add a product to cart', () => {
        const addToCart = cy
          .get('cx-product-carousel cx-product-carousel-item cx-add-to-cart')
          .first();
        addToCart.should('be.visible');

        const addToCartButton = addToCart.find('button');

        addToCartButton.click({ force: true });

        cart.checkAddedToCartDialog();
      });
    });
  });
});
