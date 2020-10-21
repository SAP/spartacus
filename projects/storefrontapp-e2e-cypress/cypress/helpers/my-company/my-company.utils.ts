import { MyCompanyRowConfig, MyCompanyConfig } from './models/index';
import { testListFromConfig } from './my-company-list';
import { testCreateUpdateFromConfig } from './my-company-form';
import { nextPage } from '../product-search';
import { testAssignmentFromConfig } from './my-company-assign';

export function testMyCompanyFeatureFromConfig(config: MyCompanyConfig) {
  describe(`My Company - ${config.name}`, () => {
    testListFromConfig(config);
    testCreateUpdateFromConfig(config);
    testAssignmentFromConfig(config);
  });
}

/**
 * Assert table headers are correctly labelled.
 * @param configs Row configurations containing header labels.
 */
export function checkRowHeaders(configs: MyCompanyRowConfig[]): void {
  configs.forEach((config: any) => {
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
            // TODO: Improper imp.
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

export function verifyList(rows, rowConfig): void {
  cy.get('cx-table').within(() => {
    checkRowHeaders(rowConfig);
    checkRows(rows);
  });
}

/**
 * Login as user with organization administration powers.
 */
export function loginAsMyCompanyAdmin(): void {
  cy.requireLoggedIn({
    user: 'linda.wolf@rustic-hw.com',
    registrationData: {
      firstName: 'Linda',
      lastName: 'Wolf',
      titleCode: '',
      password: '12341234',
      email: 'linda.wolf@rustic-hw.com',
    },
  });
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
