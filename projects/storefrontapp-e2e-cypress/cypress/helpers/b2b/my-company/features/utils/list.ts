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
      testList(
        config,
        {
          trigger: () =>
            cy
              .get(`cx-pagination a.page`)
              .contains(data.pagination.currentPage + 2)
              .click(),
        },
        data.pagination.currentPage + 2
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
  cy.wait(1000);
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
      cy.get('th').should('contain.text', config.label);
    }
  });
}

export function checkRows(rows): void {
  let j = 1; // Skip header table row at 0
  rows.forEach((row: any) => {
    if (row.text.length) {
      cy.get('tr')
        .eq(j)
        .within(() => {
          for (let i = 0; i < row.text.length; i++) {
            if (row.text[i]) {
              if (Array.isArray(row.text[i])) {
                // Used in user roles array
                // Because we can't use translate pipe, have to check per case
                row.text[i].forEach((text) => {
                  switch (text) {
                    case 'b2bcustomergroup':
                      return cy.get('td').eq(i).contains('Customer');
                    case 'b2bmanagergroup':
                      return cy.get('td').eq(i).contains('Manager');
                    case 'b2bapprovergroup':
                      return cy.get('td').eq(i).contains('Approver');
                    case 'b2badmingroup':
                      return cy.get('td').eq(i).contains('Admin');
                  }
                });
              } else {
                cy.get('td').eq(i).contains(row.text[i]);
              }
            }
          }
        });
      j++;
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
  cy.get('cx-table').within(() => {
    checkRowHeaders(rowConfig);
    checkRows(rows);
  });
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
