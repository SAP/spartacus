import { viewportContext } from '../../../helpers/viewport-context';

const productId = '1990255';

describe('Image zoom', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
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

    it('thumbnails should be visible', () => {
      cy.get('cx-product-image-zoom-thumbnails').should('be.visible');
    });

    it('clicking on main image should zoom in image', () => {
      cy.get('cx-media.cx-default-image-zoom').click();

      cy.get('cx-media.cx-image-zoomed').should('be.visible');
    });

    it('clicking on zoomed image should zoom out image', () => {
      cy.get('cx-media.cx-image-zoomed').click();

      cy.get('cx-media.cx-default-image-zoom').should('be.visible');
    });

    it('clicking on thumbnail should open corresponding main image', () => {
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
    });

    it('clicking on navigation arrow should change main image', () => {
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
    });
  });
});
