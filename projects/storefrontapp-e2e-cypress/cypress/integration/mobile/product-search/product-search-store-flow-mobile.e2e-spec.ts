import { clickSearchIcon } from '../../../helpers/product-search';
import * as productSearchStoreFlow from '../../../helpers/product-search-store-flow';
import { formats } from '../../../sample-data/viewports';

context(
  `${formats.mobile.width}p resolution - Product search store flow`,
  {
    viewportWidth: formats.mobile.width,
    viewportHeight: formats.mobile.height,
  },
  () => {
    before(() => {
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search with store filtering', () => {
        clickSearchIcon();
        productSearchStoreFlow.productStoreFlow();
      });
    });
  }
);
