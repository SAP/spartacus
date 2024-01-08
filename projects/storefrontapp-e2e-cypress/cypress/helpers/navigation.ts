/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  const route =
    page === 'homepage'
      ? {
          method: 'GET',
          path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/cms/pages?lang=en&curr=*`,
        }
      : {
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/cms/pages`,
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
    )}/cms/pages`,
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
  cy.wait(`@${categoryPage}`).its('response.statusCode').should('eq', 200);
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
  cy.wait(`@${pageAlias}`).its('response.statusCode').should('eq', 200);
}
