import * as productSearchStoreFlow from '../../../helpers/product-search-store-flow';
import { clickSearchIcon } from '../../../helpers/product-search';
import { formats } from '../../../sample-data/viewports';

context(
  `${formats.mobile.width + 1}p resolution - Product search store flow`,
  () => {
    before(() => {
      cy.visit('/');
    });

    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
    });

    describe('Product search', () => {
      it('should be able to search with store filtering', () => {
        clickSearchIcon();
        productSearchStoreFlow.productStoreFlow('.cx-facet-mobile');
      });
    });
  }
);
