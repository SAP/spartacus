import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
import {
  assertNumberOfProducts,
  createProductQuery,
  createProductSortQuery,
  QUERY_ALIAS,
  verifyProductSearch,
} from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product search pricing flow', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search product and sort by price', () => {
        const categoryId = '576';
        const category = 'Digital Compacts';
        createProductQuery(
          QUERY_ALIAS.FIRST_PAGE,
          `:relevance:allCategories:${categoryId}`,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE,
          `1`
        );
        createProductSortQuery('price-asc', QUERY_ALIAS.PRICE_ASC_FILTER);

        createProductQuery(
          QUERY_ALIAS.CATEGORY_PAGE,
          `:relevance:allCategories:${categoryId}`,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );

        // Click on a Category
        cy.get('header').within(() => {
          cy.get('cx-navigation-ui')
            .contains('Digital Cameras')
            .click({ force: true });
          cy.get('.childs cx-generic-link')
            .contains('Compact Cameras')
            .click({ force: true });
        });

        cy.wait(`@${QUERY_ALIAS.CATEGORY_PAGE}`);

        assertNumberOfProducts(`@${QUERY_ALIAS.CATEGORY_PAGE}`, category);

        verifyProductSearch(
          QUERY_ALIAS.FIRST_PAGE,
          QUERY_ALIAS.PRICE_ASC_FILTER,
          PRODUCT_LISTING.SORTING_TYPES.BY_PRICE_ASC
        );
      });
    });
  });
});
