/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyHttpMessages } from 'cypress/types/net-stubbing';

import * as cart from '../../../helpers/cart';
import { viewportContext } from '../../../helpers/viewport-context';
import { cmsEndpoints } from '../../../helpers/cms-endpoints';

context('Product carousel', () => {
  viewportContext(['mobile'/*, 'desktop'*/], () => {
    beforeEach(() => {
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
    });

    describe('Add to Cart', () => {
      it('should add a product to cart', () => {
        visitHomepage();

        const addToCart = cy
          .get('cx-product-carousel cx-product-carousel-item cx-add-to-cart')
          .first();
        addToCart.should('be.visible');

        const addToCartButton = addToCart.find('button');

        addToCartButton.click({ force: true });

        cart.checkAddedToCartDialog();
      });

      it('should not show for out-of-stock products', () => {
        const secureDigitalCard2gb = '872912';

        function pageRequestHandler(
          request: CyHttpMessages.IncomingHttpRequest
        ): void {
          request.continue((res: CyHttpMessages.IncomingHttpResponse) => {
            const body = res.body;
            const slot = body.contentSlots.contentSlot.find(
              (contentSlot) => contentSlot.slotId === 'Section3Slot-Homepage'
            );

            const component = slot.components.component.find(
              (cmp) => cmp.uid === 'ElectronicsHomepageProductCarouselComponent'
            );

            component.productCodes = `${component.productCodes} ${secureDigitalCard2gb}`;

            res.send(body);
          });
        }

        function searchRequestHandler(
          request: CyHttpMessages.IncomingHttpRequest
        ): void {
          request.continue((res: CyHttpMessages.IncomingHttpResponse) => {
            const body = res.body;
            body.products = body.products.map((product) => {
              if (product.code === secureDigitalCard2gb) {
                return {
                  ...product,
                  stock: {
                    ...product.stock,
                    stockLevelStatus: 'outOfStock',
                  },
                };
              }
              return product;
            });

            res.send(body);
          });
        }

        cy.intercept(
          {
            method: 'GET',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/${cmsEndpoints.pages}`,
          },
          pageRequestHandler
        );

        cy.intercept(
          {
            method: 'GET',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/products/search`,
          },
          searchRequestHandler
        ).as('searchProducts');

        visitHomepage();

        cy.wait('@searchProducts'); // Verify the call was made

        // Verify that the Add to Cart button is visible at least for the first item
        const firstItemAddToCartButton = cy
          .get('cx-product-carousel:first-of-type cx-product-carousel-item')
          .first()
          .find('cx-add-to-cart button');
        firstItemAddToCartButton.should('be.visible');

        // Verify that the Add to Cart button is not visible for the item that is out of stock (the last item):
        const lastItemAddToCartButton = cy
          .get('cx-product-carousel:first-of-type cx-product-carousel-item')
          .last()
          .find('cx-add-to-cart button');
        lastItemAddToCartButton.should('not.exist');
      });
    });
  });

  function visitHomepage(): void {
    cy.visit('/');
  }
});
