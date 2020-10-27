import { MyCompanyConfig } from './models/index';
import { testListFromConfig } from './my-company-list';
import { testCreateUpdateFromConfig } from './my-company-form';
import { testAssignmentFromConfig } from './my-company-assign';
import { nextPage } from '../../product-search';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';

export const IGNORE_CASE = {
  matchCase: false,
};

export function testMyCompanyFeatureFromConfig(config: MyCompanyConfig) {
  describe(`My Company - ${config.name}${config.nameSuffix || ''}`, () => {
    before(() => {
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    });

    testListFromConfig(config);
    // testCreateUpdateFromConfig(config);
    // testAssignmentFromConfig(config);
  });
}

export function waitForData(thenCommand, waitForCommand?): void {
  waitForCommand;
  cy.wait('@getData').then((xhr: any) => {
    if (xhr.aborted) {
      waitForData(thenCommand);
    } else {
      thenCommand(xhr?.response?.body);
    }
  });
}

/**
 * Login as user with organization administration powers.
 */
export function loginAsMyCompanyAdmin(): void {
  cy.requireLoggedIn(myCompanyAdminUser);
}

export function scanTablePagesForText(text: string, config): void {
  cy.get('cx-table').then(($table) => {
    if ($table.text().indexOf(text) === -1) {
      cy.server();
      cy.route('GET', `**/${config.apiEndpoint}**`).as('getData');
      nextPage();
      cy.wait('@getData');
      scanTablePagesForText(text, config);
    }
  });
}
