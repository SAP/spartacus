import * as productSearchTypeFlow from '../../../helpers/product-search-product-type-flow';
import { formats } from '../../../sample-data/viewports';

context(
  `${formats.mobile.width + 1}p resolution - Product search product type flow`,
  () => {
    before(() => {
      cy.visit('/');
    });

    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search with specific product type', () => {
        productSearchTypeFlow.productTypeFlow('.cx-facet-mobile');
      });
    });
  }
);
