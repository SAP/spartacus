import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
import {
  assertNumberOfProducts,
  clearSelectedFacet,
  clickFacet,
  clickSearchIcon,
  createProductFacetQuery,
  createProductQuery,
  QUERY_ALIAS,
} from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product search product type flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search with specific product type', () => {
        const category = 'sony';

        createProductQuery(
          QUERY_ALIAS.SONY,
          category,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );
        createProductFacetQuery('brand', category, QUERY_ALIAS.BRAND_PAGE);
        createProductQuery(
          QUERY_ALIAS.SONY_CLEAR_FACET,
          `${category}:relevance`,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );
        createProductFacetQuery(
          'price',
          category,
          QUERY_ALIAS.PRICE_DSC_FILTER
        );
        createProductFacetQuery(
          'category',
          category,
          QUERY_ALIAS.CATEGORY_FILTER
        );
        createProductFacetQuery('Colour', category, QUERY_ALIAS.COLOR_FILTER);

        clickSearchIcon();

        cy.get('cx-searchbox input[aria-label="Search"]').type(
          `${category}{enter}`
        );

        cy.wait(`@${QUERY_ALIAS.SONY}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.SONY}`, `"${category}"`);

        // Filter by brand
        clickFacet('Brand');

        cy.wait(`@${QUERY_ALIAS.BRAND_PAGE}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.BRAND_PAGE}`, `"${category}"`);

        clearSelectedFacet();

        cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.SONY}`, `"${category}"`);

        // Filter by price
        clickFacet('Price');

        cy.wait(`@${QUERY_ALIAS.PRICE_DSC_FILTER}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(
          `@${QUERY_ALIAS.PRICE_DSC_FILTER}`,
          `"${category}"`
        );

        clearSelectedFacet();

        cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(
          `@${QUERY_ALIAS.SONY_CLEAR_FACET}`,
          `"${category}"`
        );

        // Filter by category
        clickFacet('Category');

        cy.wait(`@${QUERY_ALIAS.CATEGORY_FILTER}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(
          `@${QUERY_ALIAS.CATEGORY_FILTER}`,
          `"${category}"`
        );

        clearSelectedFacet();

        cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(
          `@${QUERY_ALIAS.SONY_CLEAR_FACET}`,
          `"${category}"`
        );

        clickFacet('Color');

        cy.wait(`@${QUERY_ALIAS.COLOR_FILTER}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.COLOR_FILTER}`, `"${category}"`);

        clearSelectedFacet();

        cy.wait(`@${QUERY_ALIAS.SONY_CLEAR_FACET}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(
          `@${QUERY_ALIAS.SONY_CLEAR_FACET}`,
          `"${category}"`
        );
      });
    });
  });
});
