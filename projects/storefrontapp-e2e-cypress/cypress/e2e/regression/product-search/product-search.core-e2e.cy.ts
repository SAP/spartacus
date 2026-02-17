/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as productSearchFlow from '../../../helpers/product-search';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

context('Product search', { testIsolation: false }, () => {
  viewportContext(['mobile'/*, 'desktop'*/], () => {
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
