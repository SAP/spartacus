/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SSR_E2E_PLP_SCENARIOS } from '../../helpers/ssr/product-listing-page';

/**
 * This tests all the scenarios where SSR should render the page
 *
 * Note: When in development, restarting the dev ssr server (npm run dev:ssr) may be required
 * to clear the rendering cache.
 */

const SEARCH_REQUEST_URL = '**/products/search?**';
const scenarios = SSR_E2E_PLP_SCENARIOS;

describe('SSR - Product Listing Page', () => {
  describe('search request should only be made once and NOT on page reload', () => {
    for (let scenario of scenarios) {
      it(scenario.case, () => {
        cy.intercept(SEARCH_REQUEST_URL).as('search-init');
        cy.visit(scenario.url);
        cy.wait('@search-init');

        cy.intercept(SEARCH_REQUEST_URL, cy.spy().as('search-2nd'));
        cy.reload();
        cy.get('cx-product-list');
        cy.get('@search-2nd').should('not.have.been.called');
      });
    }
  });

  describe(
    'should be able to navigate through all scenarios and trigger requests for each case',
    { testIsolation: false },
    () => {
      before(() => {
        // Begin at first scenario url
        cy.visit(scenarios[0].url);
      });

      for (let scenario of scenarios) {
        it(scenario.case, () => {
          cy.get('cx-product-list');
          cy.url().should('contain', scenario.url);
          cy.intercept(SEARCH_REQUEST_URL).as('search');
          scenario.navigateToNext();
          cy.wait('@search');
        });
      }
    }
  );
});
