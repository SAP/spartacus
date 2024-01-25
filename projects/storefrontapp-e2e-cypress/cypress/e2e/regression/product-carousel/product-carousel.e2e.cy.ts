/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyHttpMessages } from 'cypress/types/net-stubbing';

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

        function secureDigitalCardRequestHandler(
          request: CyHttpMessages.IncomingHttpRequest
        ): void {
          request.continue((res: CyHttpMessages.IncomingHttpResponse) => {
            const body = res.body;

            body.stock = {
              ...body.stock,
              stockLevelStatus: 'outOfStock',
              stockLevel: 0,
            };

            res.send(body);
          });
        }

        visitHomepage();

        cy.intercept(
          {
            method: 'GET',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/cms/pages`,
          },
          pageRequestHandler
        );

        cy.intercept(
          {
            method: 'GET',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/products/${secureDigitalCard2gb}`,
          },
          secureDigitalCardRequestHandler
        );

        function clickNextButton(): void {
          const cypressButton = cy.get(
            'cx-product-carousel:first-of-type button.next'
          );

          cypressButton.then((button) => {
            if (!button.is(':disabled')) {
              cypressButton.click();
              clickNextButton();
            }
          });
        }

        // Continue clicking next in the carousel until we are at the last slide.
        clickNextButton();

        const lastSlide = cy
          .get('cx-product-carousel:first-of-type cx-product-carousel-item')
          .last();
        lastSlide.find('cx-add-to-cart button').should('not.exist');
      });
    });
  });

  function visitHomepage(): void {
    cy.visit('/');
  }
});
