import * as productSearchFlow from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';

context('Product search', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.visit('/');
    });

    describe('Search results', () => {
      it(['product_search','smoke_b2c'],'should be able to search and get results', () => {
        productSearchFlow.searchResult();
      });
    });

    describe('Pagination', () => {
      it(['product_search','smoke_b2c'], 'should navigate to the next page and display results', () => {
        productSearchFlow.verifyNextPage(2);
      });

      it(['product_search'], 'should be able navigate to the specified page number and display results', () => {
        productSearchFlow.verifyChoosePage(3);
      });

      it(['product_search'], 'should navigate to the previous page and display results', () => {
        productSearchFlow.verifyPreviousPage(2);
      });
    });

    describe('product list view mode', () => {
      it(['product_search','smoke_b2c'],'should be able to switch to grid mode', () => {
        productSearchFlow.viewMode();
      });
    });

    describe('Facets', () => {
      it(['product_search'],'should filter results using facet filtering', () => {
        productSearchFlow.filterUsingFacetFiltering();
      });

      it(['product_search'],'should be able to clear active facet', () => {
        productSearchFlow.clearActiveFacet();
      });
    });

    describe('Sorting', () => {
      before(() => {
        cy.visit('/');
      });

      it(['product_search','smoke_b2c'],'should be able to sort by lowest price', () => {
        productSearchFlow.sortByLowestPrice();
      });

      it(['product_search','smoke_b2c'], 'should be able to sort by highest price', () => {
        productSearchFlow.sortByHighestPrice();
      });

      it(['product_search'],'should be able to sort by name ascending', () => {
        productSearchFlow.sortByNameAscending();
      });

      it(['product_search'],'should be able to sort by name descending', () => {
        productSearchFlow.sortByNameDescending();
      });

      it(['product_search'],'should be able to sort by relevance', () => {
        productSearchFlow.sortByRelevance();
      });

      it(['product_search'],'should be able to sort by top rated', () => {
        productSearchFlow.sortByTopRated();
      });
    });
  });
});
