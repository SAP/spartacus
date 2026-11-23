/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForCategoryPage } from '../../../helpers/navigation';
import * as productSearchFlow from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

context('Product search', { testIsolation: false }, () => {
  viewportContext(['mobile', 'desktop'], () => {
    isolateTests();
    before(() => {
      cy.visit('/');
    });

    describe('Search results', () => {
      it('should be able to search and get results', () => {
        productSearchFlow.searchResult();
      });
    });

    describe('Pagination', () => {
      it('should test pagination and display results', () => {
        cy.log('NAVIGATE TO NEXT PAGE AND DISPLAY RESULTS:');
        productSearchFlow.verifyNextPage(2);

        cy.log('NAVIGATE TO A SPECIFIED PAGE AND DISPLAY RESULTS:');
        productSearchFlow.verifyChoosePage(3);

        cy.log('NAVIGATE TO PREVIOUS PAGE AND DISPLAY RESULTS:');
        productSearchFlow.verifyPreviousPage(2);
      });
    });

    describe('Product list view mode', () => {
      it('should be able to switch to grid mode', () => {
        productSearchFlow.viewMode();
      });
    });

    describe('Facets', () => {
      it('should filter results using facet filtering and clear active facet', () => {
        cy.log('FILTER RESULTS USING FACET FILTERING:');
        productSearchFlow.filterUsingFacetFiltering();

        cy.log('CLEAR ACTIVE FACET:');
        productSearchFlow.clearActiveFacet();
      });

      it('should filter results using facet filtering and clear active facets', () => {
        const categoryPage = waitForCategoryPage('575', 'getCategoryPage');
        cy.visit('/c/575');
        cy.wait(`@${categoryPage}`)
          .its('response.statusCode')
          .should('eq', 200);

        // Apply first filter for Stores
        cy.intercept({
          method: 'GET',
          path: `${productSearchFlow.searchUrlPrefix}?fields=*`,
        }).as('facets');
        productSearchFlow.clickFacet('Stores'); // a facet that exists on this category
        cy.wait('@facets').its('response.statusCode').should('eq', 200);
        // Ensure the clear all button is present after applying one filter
        cy.get('a.cx-clear-all-facets').should('be.visible');
        // Apply first filter for Price
        productSearchFlow.clickFacet('Price', true); // a facet that exists on this category

        cy.get('a.cx-clear-all-facets').click();
        // After clearing all facets, the clear-all link should no longer render
        cy.get('a.cx-clear-all-facets').should('not.exist');
        // Verify no filter is currently applied
        cy.get('#cx-active-facets-groupName').should('not.exist');
        cy.get('cx-active-facets a:not(.cx-clear-all-facets)').should(
          'not.exist'
        );
        // Clearing resets the route, so the filter query should be gone
        cy.url().should('not.include', 'availableInStores');
      });
    });

    describe('Sorting', () => {
      before(() => {
        cy.visit('/');
      });

      it('should be able to sort by different sort options', () => {
        cy.log('SORT BY LOWEST PRICE:');
        productSearchFlow.sortByLowestPrice();

        cy.log('SORT BY HIGHEST PRICE:');
        productSearchFlow.sortByHighestPrice();

        cy.log('SORT BY NAME ASCENDING:');
        productSearchFlow.sortByNameAscending();

        cy.log('SORT BY NAME DESCENDING:');
        productSearchFlow.sortByNameDescending();

        cy.log('SORT BY RELEVANCE:');
        productSearchFlow.sortByRelevance();

        cy.log('SORT BY TOP RATED:');
        productSearchFlow.sortByTopRated();
      });
    });
  });
});
