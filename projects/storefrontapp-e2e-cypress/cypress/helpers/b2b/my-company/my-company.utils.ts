import { ENTITY_UID_COOKIE_KEY, MyCompanyConfig } from './models/index';
import { testListFromConfig } from './my-company-list';
import { testCreateUpdateFromConfig } from './my-company-form';
import { testAssignmentFromConfig } from './my-company-assign';
import { nextPage } from '../../product-search';
import { POWERTOOLS_BASESITE } from '../../../sample-data/b2b-checkout';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';

export function testMyCompanyFeatureFromConfig(config: MyCompanyConfig) {
  describe(`My Company - ${config.name}${config.nameSuffix || ''}`, () => {
    before(() => {
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    });

    beforeEach(() => {
      if (config.preserveCookies) {
        Cypress.Cookies.preserveOnce(ENTITY_UID_COOKIE_KEY);
      }
    });

    testListFromConfig(config);
    testCreateUpdateFromConfig(config);
    testAssignmentFromConfig(config);
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

export function scanTablePagesForText(
  text: string,
  config: MyCompanyConfig
): void {
  cy.get('cx-table').then(($table) => {
    // For table in tree mode expand all elements first and find editable one.
    if (config.nestedTableRows) {
      cy.get('cx-organization-list div.header button')
        .contains('Expand all')
        .click();
    }

    if ($table.text().indexOf(text) === -1) {
      cy.server();
      cy.route('GET', `**/${config.apiEndpoint}**`).as('getData');
      // Do not use pagination check for tables in tree mode.
      if (!config.nestedTableRows) {
        nextPage();
        cy.wait('@getData');
        scanTablePagesForText(text, config);
      }
    }
  });
}

/**
 * Converts string value to RegExp ignoring case sensivity.
 */
export function ignoreCaseSensivity(base: string): RegExp {
  return new RegExp(base, 'i');
}
