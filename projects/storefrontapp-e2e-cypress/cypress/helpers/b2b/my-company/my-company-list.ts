import { DEFAULT_SORT_LABEL, MAX_PAGES, MyCompanyConfig } from './models/index';
import {
  loginAsMyCompanyAdmin,
  waitForData,
  verifyList,
  getListRowsFromBody,
} from './my-company.utils';

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

    testListSorting(config);
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

    if (
      data.pagination.currentPage < data.pagination.totalPages - 1 &&
      data.pagination.currentPage < MAX_PAGES
    ) {
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
    if (row.sortLabel && row?.sortLabel !== DEFAULT_SORT_LABEL) {
      it(`should sort table data by ${row.sortLabel}`, () => {
        cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
        waitForData((data) => {
          verifyList(
            getListRowsFromBody(data, config.objectType, config.rows),
            config.rows
          );
        }, ngSelect(`Sort by ${row.sortLabel}`));
      });
    }
  });
}

function ngSelect(sortKey: string): void {
  cy.get(`ng-select`).click();
  cy.wait(1000);
  cy.get('div.ng-option').contains(sortKey).click({ force: true });
}
