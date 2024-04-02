/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForProductPage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

const productId = '1990255';

describe('Image zoom', { testIsolation: false }, () => {
  viewportContext(['desktop'], () => {
    let hasGallery = false;
    isolateTests();
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      const productPage = waitForProductPage(productId, 'getProductPage');
      cy.visit(`/product/${productId}`);
      cy.intercept(
        'GET',
        `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/products/${productId}?fields=*stock(DEFAULT)*&lang=en&curr=USD`
      ).as('getProductDetails');

      cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
      cy.wait('@getProductDetails').then((xhr) => {
        expect(xhr.response.statusCode).to.equal(200);

        // Checking if product has more than 1 image to show gallery
        hasGallery = xhr.response?.body?.images
          ?.filter((image) => image.imageType === 'GALLERY')
          .some((image) => image.galleryIndex > 0);
      });
    });

    it('should display image zoom trigger', () => {
      cy.get('cx-product-image-zoom-trigger').should('be.visible');
    });

    it('should have correct label text', () => {
      cy.get('cx-product-image-zoom-trigger').should('contain', 'Expand image');
    });

    it('should open modal window with image', () => {
      cy.get('cx-product-image-zoom-trigger').click();

      cy.get('cx-product-image-zoom-dialog').should('be.visible');
    });

    it('main image should be visible', () => {
      cy.get('cx-product-image-zoom-view').should('be.visible');
      cy.get('cx-media.cx-default-image-zoom').should('be.visible');
    });

    it('clicking on main image should zoom in image', () => {
      cy.get('cx-media.cx-default-image-zoom').click();

      cy.get('cx-media.cx-image-zoomed').should('be.visible');
    });

    it('clicking on zoomed image should zoom out image', () => {
      cy.get('cx-media.cx-image-zoomed').click();

      cy.get('cx-media.cx-default-image-zoom').should('be.visible');
    });

    it('thumbnails should be visible', () => {
      if (hasGallery) {
        cy.get('cx-product-image-zoom-thumbnails').should('be.visible');
      } else {
        cy.log('Product has only 1 image, not possible to run this test.');
      }
    });

    it('clicking on thumbnail should open corresponding main image', () => {
      if (hasGallery) {
        cy.get('cx-carousel cx-media img')
          .eq(1)
          .invoke('prop', 'src')
          .as('thumbnail1');

        cy.get('cx-carousel cx-media img').eq(1).click();

        cy.get('cx-media.cx-default-image-zoom img')
          .invoke('prop', 'src')
          .as('main1');

        cy.get('@thumbnail1').then((thumb1) => {
          cy.get('@main1').then((main1) => {
            expect(main1).to.equal(thumb1);
          });
        });
      } else {
        cy.log('Product has only 1 image, not possible to run this test.');
      }
    });

    it('clicking on navigation arrow should change main image', () => {
      if (hasGallery) {
        cy.get('cx-media.cx-default-image-zoom img')
          .invoke('prop', 'src')
          .as('mainInitial');

        cy.get('@mainInitial').then((mainInitial) => {
          cy.get('cx-icon.fa-angle-right').first().click();

          cy.get('cx-media.cx-default-image-zoom img')
            .invoke('prop', 'src')
            .as('mainAfter');

          cy.get('@mainAfter').then((mainAfter) => {
            expect(mainInitial).not.to.equal(mainAfter);
            cy.get('cx-icon.fa-angle-left').eq(1).click();
          });
        });
      } else {
        cy.log('Product has only 1 image, not possible to run this test.');
      }
    });
  });
});
