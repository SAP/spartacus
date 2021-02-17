import * as productSearchTypeFlow from '../../../helpers/product-search-product-type-flow';
import { formats } from '../../../sample-data/viewports';

context(
  `${formats.mobile.width}p resolution - Product search product type flow`,
  {
    viewportHeight: formats.mobile.height,
    viewportWidth: formats.mobile.width,
  },
  () => {
    before(() => {
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search with specific product type', () => {
        productSearchTypeFlow.productTypeFlow();
      });
    });
  }
);
