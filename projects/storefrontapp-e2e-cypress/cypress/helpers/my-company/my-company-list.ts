import { MyCompanyConfig } from './models/index';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  verifyList,
  getListRowsFromBody,
  ngSelect,
} from './my-company';

export function testListFromConfig(config: MyCompanyConfig): void {
  describe(`${config.name} List`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.server();
    });

    it('should show and paginate list', () => {
      cy.visit(`/organization`);
      testList(
        config,
        cy.get(`cx-page-slot.BodyContent a`).contains(config.name).click()
      );
    });

    it('should sort table data', () => {
      ngSelect(`Sort by code`); // Changes default sort selection
      testListSorting(config);
    });
  });
}

export function testList(
  config: MyCompanyConfig,
  trigger: any,
  callback?: Function
): void {
  cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
  waitForData((data) => {
    const listData = getListRowsFromBody(data, config.objectType, config.rows);
    verifyList(listData, config.rows);

    if (data.pagination.currentPage < data.pagination.totalPages - 1) {
      testPagination(data);
    }

    if (callback) {
      callback(listData);
    }
  }, trigger);

  function testPagination(data: any) {
    testList(
      config,
      cy
        .get(`cx-pagination a.page`)
        .contains(data.pagination.currentPage + 2)
        .click()
    );
  }
}

export function testListSorting(config: MyCompanyConfig): void {
  config.rows.forEach((row) => {
    if (row.sortLabel) {
      cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
      waitForData((data) => {
        verifyList(
          getListRowsFromBody(data, config.objectType, config.rows),
          config.rows
        );
      }, ngSelect(`Sort by ${row.sortLabel}`));
    }
  });
}
