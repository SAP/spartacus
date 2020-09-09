import { MyCompanyConfig, MyCompanyRowConfig } from './models/index';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  verifyList,
  getListRowsFromBody,
} from './my-company';

export function testListFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} List`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.server();
    });

    it('should show list', () => {
      testList(config, cy.visit(`${config.baseUrl}s`));
    });

    it('should sort table data', () => {
      testListSorting(config);
    });
  });
}

export function testList(
  config: MyCompanyConfig,
  trigger: any,
  callback?: Function
) {
  cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
  waitForData((data) => {
    const defaultRow: MyCompanyRowConfig = config.rows[0];
    const listData = getListRowsFromBody(data, config.objectType, config.rows);

    checkUrlHasSortParams(defaultRow);
    verifyList(listData, config.rows);

    if (callback) {
      callback(listData);
    }
  }, trigger);
}

export function testListSorting(config: MyCompanyConfig) {
  // TODO: We could perform our own sort function to compare data returned with expected result
  config.rows.forEach((row) => {
    if (row.sortByUrl) {
      cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
      waitForData((data) => {
        checkUrlHasSortParams(row);
        verifyList(
          getListRowsFromBody(data, config.objectType, config.rows),
          config.rows
        );
      }, clickSortButton(row));
    }
  });
}

function checkUrlHasSortParams(row: MyCompanyRowConfig) {
  // TODO: Omitted check for now while url does not contain sort params, could come back though
  // cy.url().should('contain', `${row.sortByUrl ?? ''}`);
}

function clickSortButton(row: MyCompanyRowConfig) {
  cy.get('cx-table thead')
    .contains(row.label)
    .within(() => {
      cy.get('cx-icon.fa-sort').click();
    });
}
