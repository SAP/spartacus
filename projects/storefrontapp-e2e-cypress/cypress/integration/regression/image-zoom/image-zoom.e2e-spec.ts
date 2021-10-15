import { viewportContext } from '../../../helpers/viewport-context';

const productId = '1990255';
// const productName = 'DSC-HX1';

describe('Image zoom', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit(`/product/${productId}`);
    });

		it('should display image zoom trigger', () => {
			cy.get('cx-image-zoom-trigger')
			.should('be.visible')
			// .should('contain', 'Expand image')
		});
		it('should open modal window with image', () => {
			cy.get('cx-image-zoom-trigger')
			.click();

			cy.get('cx-image-zoom-dialog')
			.should('be.visible');
			// .should('contain', 'Expand image')
		});

		it('main image should be visible', () => {
			cy.get('cx-image-zoom-view')
			.should('be.visible');
			cy.get('cx-media.cx-default-image-zoom')
			.should('be.visible');	
		});

		it('thumbnails should be visible', () => {
			cy.get('cx-image-zoom-thumbnails')
			.should('be.visible');
		});

		it('clicking main image should zoom image ', () => {
			cy.get('cx-media.cx-default-image-zoom')
			.click();

			cy.get('cx-media.cx-image-zoomed')
			.should('be.visible');
		});
	})
});
