import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
import {
  assertFirstProduct,
  assertNumberOfProducts,
  clearSelectedFacet,
  clickFacet,
  clickSearchIcon,
  createProductQuery,
  createProductSortQuery,
  pageLinkSelector,
  previousPage,
  QUERY_ALIAS,
  searchUrlPrefix,
  verifyProductSearch,
} from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';

// * This test supports both desktop and mobile viewport
context('Product search rating flow', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search and show product rating', () => {
        const productName = 'DSC-N1';

        createProductQuery(
          QUERY_ALIAS.FIRST_PAGE,
          productName,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE,
          `1`
        );
        createProductQuery(
          QUERY_ALIAS.DSC_N1,
          productName,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );
        createProductSortQuery('topRated', QUERY_ALIAS.TOP_RATED_FILTER);

        clickSearchIcon();

        cy.get('cx-searchbox input').type(`${productName}{enter}`);

        cy.wait(`@${QUERY_ALIAS.DSC_N1}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.DSC_N1}`, `"${productName}"`);

        verifyProductSearch(
          QUERY_ALIAS.FIRST_PAGE,
          QUERY_ALIAS.TOP_RATED_FILTER,
          PRODUCT_LISTING.SORTING_TYPES.BY_TOP_RATED
        );

        // Navigate to previous page
        previousPage();
        cy.wait(`@${QUERY_ALIAS.TOP_RATED_FILTER}`)
          .its('response.statusCode')
          .should('eq', 200);

        // active paginated number
        cy.get(pageLinkSelector).should('contain', `1`);

        assertFirstProduct();

        // Filter by category
        cy.intercept({ method: 'GET', path: `${searchUrlPrefix}?fields=*` }).as(
          'facets'
        );
        clickFacet('Category');

        cy.wait(`@facets`).its('response.statusCode').should('eq', 200);

        assertNumberOfProducts(`@facets`, `"${productName}"`);

        assertFirstProduct();

        clearSelectedFacet();

        cy.intercept({ method: 'GET', path: `${searchUrlPrefix}?fields=*` }).as(
          'facets'
        );

        cy.wait(`@facets`).its('response.statusCode').should('eq', 200);

        assertNumberOfProducts(`@facets`, `"${productName}"`);

        // Select product and read all the tabs on product details page
        const tabsHeaderList = 'cx-tab-paragraph-container > button';

        cy.get('cx-product-list-item:first .cx-product-name').click();
        cy.get(tabsHeaderList).eq(0).should('contain', 'Product Details');
        cy.get(tabsHeaderList).eq(1).should('contain', 'Specs');
        cy.get(tabsHeaderList).eq(2).should('contain', 'Reviews');
        cy.get(tabsHeaderList).eq(3).should('contain', 'Shipping');
      });
    });
  });
});
