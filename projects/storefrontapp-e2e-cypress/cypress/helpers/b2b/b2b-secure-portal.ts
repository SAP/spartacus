import { baseSitesConfig } from "./my-company/config/basesites.config";

export function getStubbedBasesites() {
    cy.intercept(
      {
        method: 'GET',
        pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/basesites`,
      },
      { body: baseSitesConfig }
    ).as('basesites');
  }
