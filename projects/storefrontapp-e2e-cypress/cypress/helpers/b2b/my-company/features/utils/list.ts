/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DEFAULT_SORT_LABEL,
  MAX_PAGES,
  MyCompanyConfig,
  MyCompanyRowConfig,
  TestListOptions,
} from '../../models';
import { waitForData } from '../../my-company.utils';

let requestData: any;

export function testList(
  config: MyCompanyConfig,
  options?: TestListOptions,
  suffix: string = ''
): void {
  cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
    `getData${suffix}`
  );
  if (options.trigger) {
    waitForData(
      suffix,
      (data) => {
        const requestData = data;
        validateList(requestData);
      },
      options.trigger
    );
  } else {
    validateList(requestData);
  }

  function validateList(data) {
    let listData = getListRowsFromBody(data, config.objectType, config.rows);

    if (options?.nested?.expandAll) {
      listData = getNestedRowsFromBody(data, config);
      cy.get('cx-org-list div.header button').contains('Expand all').click();
    }

    if (options?.nested?.collapseAll) {
      listData = getRootRowsFromBody(data, config);
      cy.get('cx-org-list div.header button').contains('Collapse all').click();
    }

    verifyList(listData, config.rows);
    testPaginationIfValid(data);
  }

  function testPaginationIfValid(data: any) {
    if (
      data.pagination?.currentPage < data.pagination?.totalPages - 1 &&
      data.pagination?.currentPage < MAX_PAGES
    ) {
      const NEXT_PAGE = data.pagination.currentPage + 2;
      testList(
        config,
        {
          trigger: () => {
            cy.get(`cx-pagination a.page`).contains(NEXT_PAGE).click();
          },
        },
        NEXT_PAGE
      );
    }
  }
}

export function testListSorting(config: MyCompanyConfig): void {
  config.rows.forEach((row) => {
    if (row.sortLabel && row?.sortLabel !== DEFAULT_SORT_LABEL) {
      it(`should sort table data by ${row.sortLabel}`, () => {
        cy.intercept({ method: 'GET', path: `**${config.apiEndpoint}**` }).as(
          `getData${row.sortLabel}`
        );
        waitForData(
          row.sortLabel,
          (data) => {
            verifyList(
              getListRowsFromBody(data, config.objectType, config.rows),
              config.rows
            );
          },
          () => ngSelect(row.sortLabel)
        );
      });
    }
  });
}

function ngSelect(sortKey: string): void {
  cy.get(`ng-select`).click();
  cy.wait(2000);
  cy.get('div.ng-option')
    .contains(sortKey, { matchCase: false })
    .click({ force: true });
}

/**
 * Assert table headers are correctly labelled.
 * @param configs Row configurations containing header labels.
 */
export function checkRowHeaders(configs: MyCompanyRowConfig[]): void {
  configs.forEach((config) => {
    if (config.showInTable) {
      cy.get('cx-table th').should('contain.text', config.label);
    }
  });
}

export function checkRows(rows): void {
  let rowIndex = 1;
  rows.forEach((row: any) => {
    if (row.text.length) {
      for (let columnIndex = 0; columnIndex < row.text.length; columnIndex++) {
        if (row.text[columnIndex]) {
          if (Array.isArray(row.text[columnIndex])) {
            const ROLES = {
              b2bcustomergroup: 'Customer',
              b2bmanagergroup: 'Manager',
              b2bapprovergroup: 'Approver',
              b2badmingroup: 'Admin',
            };

            // should to be filtered out, as we don't show them
            const RIGHTS = ['unitorderviewergroup'];

            // Used in user roles and rights array
            // Because we can't use translate pipe, have to check per case
            row.text[columnIndex]
              .filter((text: string) => !RIGHTS.includes(text))
              .forEach((text) => {
                cy.get(
                  `cx-table tr:eq(${rowIndex}) td:eq(${columnIndex})`
                ).should('include.text', ROLES[text]);
              });
          } else {
            cy.get(`cx-table tr:eq(${rowIndex}) td:eq(${columnIndex})`).should(
              'include.text',
              row.text[columnIndex]
            );
          }
        }
      }
      rowIndex++;
    }
  });
}

export function getListRowsFromBody(
  body: any,
  objectType: string,
  rows: MyCompanyRowConfig[]
) {
  return body[objectType].map((data) => {
    const table = { text: [] };
    rows.map((row) => {
      if (row.showInTable) {
        if (Array.isArray(row.variableName)) {
          row.variableName.forEach((variable) => {
            // TODO: Think of a way to use some sort of tranformation function/config
            /**
             * TODO: There is a disrepency between local and server time which can cause failure when testing dates locally.
             * We could take this into account somehow in our tests or simply keep it in mind when backend is in another timezone.
             */
            if (variable === 'startDate') {
              let foundText = getVariableFromName(variable, data);
              if (row.useDatePipe) {
                const foundDate = new Date(foundText);
                foundText = getFormattedDate(foundDate);
              }
              table.text.push(foundText);
            }
          });
        } else {
          const foundText = getVariableFromName(row.variableName, data);
          table.text.push(foundText);
        }
      }
    });
    return table;
  });
}

/**
 * When getting the rows from a body with children, return body with child rows
 *
 * @param body
 * @param config
 */
export function getNestedRowsFromBody(body: any, config: MyCompanyConfig) {
  if (Array.isArray(body)) {
    const tableRows = [];
    body.map((data) => {
      const table = { text: [] };
      config.rows.map((row) => {
        table.text.push(getVariableFromName(<string>row.variableName, data));
      });

      tableRows.push(table);
      if (data.children.length) {
        tableRows.push(...getNestedRowsFromBody(data.children, config));
      }
    });

    return tableRows;
  } else {
    const table = [{ text: [] }];
    config.rows.map((row) => {
      table[0].text.push(getVariableFromName(<string>row.variableName, body));
    });
    if (body.children.length) {
      table.push(...getNestedRowsFromBody(body.children, config));
    }

    return table;
  }
}

/**
 * When getting the rows from a body with children, only return the body row
 *
 * @param body
 * @param config
 */
export function getRootRowsFromBody(body: any, config: MyCompanyConfig) {
  if (Array.isArray(body)) {
    const tableRows = [];
    body.map((data) => {
      const table = { text: [] };
      config.rows.map((row) => {
        table.text.push(getVariableFromName(<string>row.variableName, data));
      });

      tableRows.push(table);
    });

    return tableRows;
  } else {
    const table = [{ text: [] }];
    config.rows.map((row) => {
      table[0].text.push(getVariableFromName(<string>row.variableName, body));
    });

    return table;
  }
}

export function verifyList(rows, rowConfig): void {
  checkRowHeaders(rowConfig);
  checkRows(rows);
}

function getVariableFromName(name: string, dataset: any) {
  return name.split('.').reduce((p, c) => (p && p[c]) || null, dataset);
}

function getMonthPartFromDate(date: Date): string {
  return date.toString().slice(4, 7);
}

function getFormattedDate(date: Date): string {
  return `${getMonthPartFromDate(
    date
  )} ${date.getDate()}, ${date.getFullYear()}`;
}
