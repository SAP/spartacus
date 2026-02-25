/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SSR_E2E_PLP_SCENARIOS } from '../../helpers/ssr/product-listing-page';

const SEARCH_REQUEST_URL = '**/products/search?**';
const scenarios = SSR_E2E_PLP_SCENARIOS;

describe('SSR - Product Listing Page', () => {
  /**
   * This tests all the scenarios where SSR should render the page but the search request is
   * only made on the initial page load. The server should have rendered the page and return
   * the cached page that does NOT need to request the search api again on reload.
   *
   * Note: When in development, restarting the dev ssr server (npm run dev:ssr) may be required
   * to clear the rendering cache.
   */

  /**
   * This tests that search request should only be made once and NOT on page reload and
   * navigation has not broken when navigating options such as paginations and sorts.
   */
  describe(
    'search request should only be made once and should be able to navigate through all scenarios',
    { testIsolation: false },
    () => {
      for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        const previous = scenarios[i - 1];
        it(scenario.case, () => {
          // Visit whenever no next step from previous scenario to begin with new search type.
          if (!previous?.navigateToNext) {
            cy.intercept(SEARCH_REQUEST_URL).as('search-init');
            cy.visit(scenarios[i].url);
            cy.wait('@search-init');
          }
          cy.intercept(SEARCH_REQUEST_URL, cy.spy().as('search-2nd'));
          cy.reload();

          cy.get('cx-product-list');
          cy.get('@search-2nd').should('not.have.been.called');
          cy.url().should('contain', scenario.url);

          // Make sure navigation has happened successfully by checking a search request was made.
          if (scenario.navigateToNext) {
            cy.intercept(SEARCH_REQUEST_URL).as('search');
            scenario.navigateToNext();
            cy.wait('@search');
          }
        });
      }
    }
  );
});
