import * as productSearchRatingFlow from '../../../helpers/product-search-rating-flow';
import { formats } from '../../../sample-data/viewports';

function clickSearchIcon() {
  cy.get('cx-searchbox [aria-label="Search "]').click();
}

context(
  `${formats.mobile.width + 1}p resolution - Product search rating flow`,
  () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search and show product rating', () => {
        clickSearchIcon();
        productSearchRatingFlow.productRatingFlow('.cx-facet-mobile');
      });
    });
  }
);
