import * as productSearchTypeFlow from '../../../helpers/product-search-product-type-flow';
import { formats } from '../../../sample-data/viewports';

function clickSearchIcon() {
  cy.get('cx-searchbox [aria-label="Search "]').click();
}

context(
  `${formats.mobile.width + 1}p resolution - Product search product type flow`,
  () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search with specific product type', () => {
        // Search for a product
        clickSearchIcon();
        productSearchTypeFlow.productTypeFlow('.cx-facet-mobile');
      });
    });
  }
);
