/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../support/utils/test-isolation';

context('Cms navigation', { testIsolation: false }, () => {
  isolateTests();
  it('should not go into infinite loop of loading cms components data, when some details of some component are missing', () => {
    /**
     * Circuit breaker, just in case if the infinite loop would happen. However, in a successful test pass, infinite loop should not happen.
     */
    let circuitBreakerCounter = 20;
    function shouldSimulateMissingData(): boolean {
      return circuitBreakerCounter-- >= 0;
    }

    // We want to intercept the HTTP response from `/cms/components` endpoint and simulate missing details of one random CMS component.
    // This endpoint is expected to be called a few times, but not infinite number of times.
    // Just in case we would go into infinite loop, we have circuit breaker.
    cy.intercept('GET', `**/cms/components*`, (req) => {
      req.reply((res) => {
        if (shouldSimulateMissingData()) {
          res.body.component.pop();
        }
        return res;
      });
    }).as('getComponents');

    cy.visit('/');
    cy.wait('@getComponents');
    cy.get('cx-category-navigation cx-generic-link').should('exist');

    // `/cms/components` endpoint is called for each different Navigation components (e.g. header and footer)
    const EXPECTED_MAX_COUNT_LOADING_CMS_COMPONENTS = 4;

    // Our heuristic to assert that there is no infinite loop of calling `/cms/components` endpoint
    // is to check whether this endpoint was called not too many times during 1st second after the page is rendered.
    cy.wait(1_000);
    cy.get('@getComponents.all', { timeout: 0 }).should(
      'have.length.at.most',
      EXPECTED_MAX_COUNT_LOADING_CMS_COMPONENTS
    );
  });
});
