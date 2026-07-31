/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cmsEndpoints } from './cms-endpoints';

export const navigation = {
  visitHomePage({
    queryStringParams,
    options,
  }: {
    queryStringParams?: string;
    options?: Partial<Cypress.VisitOptions>;
  }): Cypress.Chainable<Window> {
    queryStringParams =
      !queryStringParams || queryStringParams.indexOf('?') !== -1
        ? queryStringParams
        : `?${queryStringParams}`;
    return cy.visit(`/${queryStringParams ? queryStringParams : ''}`, options);
  },
  requestsCount: (alias) =>
    (<any>cy).state('requests')
      ? (<any>cy).state('requests').filter((a) => a.alias === alias).length
      : 0,
};

/**
 * Creates a routing alias for a given page
 * @param page Suffix of the url (page) to wait for
 * @param alias Name of the routing alias to obtain
 * @returns a Routing alias
 */
export function waitForPage(page: string, alias: string): string {
  // homepage is not explicitly being asked as it's driven by the backend.
  // Use a glob on the path-only portion (no query string) so the intercept
  // is robust to query-parameter ordering.  Angular serialises HttpParams by
  // iterating over the merged OCC config object; adding new endpoint configs
  // (e.g. B2bUnitSelectionOccModule) changes the key-iteration order and can
  // flip ?lang=en&curr=USD to ?curr=USD&lang=en.  Matching path + query string
  // via a single `path` glob would require listing both orderings.
  //
  // The `*` in `users/*/cms/pages` is a minimatch single-segment wildcard that
  // matches the user identifier (`current`, `anonymous`, or a numeric id).
  const route =
    page === 'homepage'
      ? {
          method: 'GET',
          // Match on path only, no query-string suffix, so any parameter order
          // is accepted.  We rely on the fact that only the homepage CMS request
          // omits a pageLabelOrId query parameter.
          path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/${cmsEndpoints.pages}*`,
        }
      : {
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/${cmsEndpoints.pages}`,
          query: {
            pageLabelOrId: page,
          },
        };
  cy.intercept(route).as(alias);
  return alias;
}

export function waitForCategoryPage(
  categoryCode: string,
  alias: string
): string {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/${cmsEndpoints.pages}`,
    query: {
      pageType: 'CategoryPage',
      code: categoryCode,
    },
  }).as(alias);
  return alias;
}

export function navigateToHomepage(): void {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.get('cx-page-slot.SiteLogo').click();
  cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);
}

export function navigateToCategory(
  categoryName: string,
  categoryCode: string,
  force: boolean = true
): void {
  const categoryPage = waitForCategoryPage(categoryCode, 'getCategory');
  cy.get('cx-category-navigation cx-generic-link a')
    .contains(categoryName)
    .click({ force });
  cy.whenJDK17(() => {
    cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);
  });
}

export function navigateToAMyAccountPage(
  myAccountOptionText: string,
  page: string,
  alias: string
) {
  const pageAlias = waitForPage(page, alias);

  cy.selectUserMenuOption({
    option: myAccountOptionText,
  });
  cy.whenJDK17(() => {
    cy.wait(`@${pageAlias}`).its('response.statusCode').should('eq', 200);
  });
}

/**
 * When on mobile, will click the hamburger menu button.
 */
export function clickHamburger() {
  cy.onMobile(() => {
    cy.get('cx-hamburger-menu button', { timeout: 15000 }).click();
  });
}
