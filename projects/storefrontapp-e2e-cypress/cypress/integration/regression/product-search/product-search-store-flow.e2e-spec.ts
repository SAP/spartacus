import { PRODUCT_LISTING } from '../../../helpers/data-configuration';
import {
  assertNumberOfProducts,
  clearSelectedFacet,
  clickFacet,
  clickSearchIcon,
  createProductQuery,
  createProductSortQuery,
  QUERY_ALIAS,
  searchUrlPrefix,
  verifyProductSearch,
} from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product search store flow', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    describe('Product search', () => {
      it('should be able to search with store filtering', () => {
        const category = 'canon';
        cy.onMobile(() => {
          clickSearchIcon();
        });

        // createProductQuery(queries.q1);
        createProductQuery(
          QUERY_ALIAS.CANON,
          category,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE
        );
        createProductQuery(
          QUERY_ALIAS.FIRST_PAGE,
          category,
          PRODUCT_LISTING.PRODUCTS_PER_PAGE,
          `1`
        );
        createProductSortQuery('name-desc', QUERY_ALIAS.NAME_DSC_FILTER);

        cy.get('cx-searchbox input').type('canon{enter}');

        cy.wait(`@${QUERY_ALIAS.CANON}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertNumberOfProducts(`@${QUERY_ALIAS.CANON}`, `"${category}"`);

        verifyProductSearch(
          QUERY_ALIAS.FIRST_PAGE,
          QUERY_ALIAS.NAME_DSC_FILTER,
          PRODUCT_LISTING.SORTING_TYPES.BY_NAME_DESC
        );
        cy.intercept({ method: 'GET', path: `${searchUrlPrefix}?fields=*` }).as(
          'facets'
        );

        clickFacet('Stores');

        cy.wait(`@facets`).its('response.statusCode').should('eq', 200);

        assertNumberOfProducts(`@facets`, `"${category}"`);

        clearSelectedFacet();

        cy.wait(`@facets`).its('response.statusCode').should('eq', 200);

        assertNumberOfProducts(`@facets`, `"${category}"`);

        // Add product to cart from search listing page
        cy.get('cx-add-to-cart:first button').click({ force: true });
        cy.get('cx-added-to-cart-dialog .cx-dialog-title').should(
          'contain',
          'Item(s) added to your cart'
        );
        cy.get('.cx-dialog-header .close').click();
        cy.get('cx-mini-cart .count').should('contain', '1');
      });
    });
  });
});
