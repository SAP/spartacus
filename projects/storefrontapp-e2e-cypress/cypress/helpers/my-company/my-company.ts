import { CONTEXT_URL_EN_USD } from '../site-context-selector';
import { nextPage } from '../product-search';
import {
  MyCompanyRowConfig,
  MyCompanyConfig,
  MyCompanySelectorSuffixes,
} from './models/index';

export function testMyCompanyFeatureFromConfig(config: MyCompanyConfig) {
  const defaultRow = config.rows[0];
  const apiEndpoint = config.apiEndpoint;
  const objectType = config.objectType;

  describe(`My Company - ${config.name}`, () => {
    testListFromConfig();
    testDetailsFromConfig();
    testCreateUpdateFromConfig();
    testAssignmentFromConfig();
  });

  function testListFromConfig() {
    // TODO: We should perform our own sort function to compare data returned with expected result
    describe(`${config.name} List`, () => {
      beforeEach(() => {
        loginAsAdmin();
        cy.server();
      });

      it('should show list', () => {
        cy.route('GET', `**${apiEndpoint}**`).as('getData');
        waitForData((data) => {
          checkUrlHasSortParams(defaultRow);
          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
            () => {
              // cy.get('h3').should('contain.text', config.name);
              verifyList(
                getListRowsFromBody(data, objectType, config.rows),
                config.rows
              );
            }
          );
        }, cy.visit(`${config.baseUrl}s`));
      });

      it('should sort table data', () => {
        config.rows.forEach((row) => {
          cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
          waitForData((data) => {
            // TODO: Should be checked but sort param in url not currently implemented. Uncomment once it is.
            // checkUrlHasSortParams(row);

            cy.get(
              `${config.selector}-${MyCompanySelectorSuffixes.LIST}`
            ).within(() => {
              verifyList(
                getListRowsFromBody(data, objectType, config.rows),
                config.rows
              );
            });
          }, clickSortButton(row));
        });
      });
    });

    function checkUrlHasSortParams(row: MyCompanyRowConfig) {
      cy.url().should('contain', `${config.baseUrl}s${row.sortByUrl ?? ''}`);
    }

    function clickSortButton(row: MyCompanyRowConfig) {
      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`)
        .contains(row.header)
        .within(() => {
          cy.get('cx-icon[class^="cx-icon fas fa-sort"]').click();
        });
    }
  }

  function testDetailsFromConfig() {
    describe(`${config.name} Details`, () => {
      beforeEach(() => {
        loginAsAdmin();
        cy.visit(`${config.baseUrl}s`);
      });

      it('should show details', () => {
        let firstRow;

        cy.route('GET', `**${apiEndpoint}**`).as('getData');
        waitForData((data) => {
          const rows = getListRowsFromBody(data, objectType, config.rows);
          firstRow = rows[0];

          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
            () => {
              cy.get('a')
                .contains(`${firstRow.text[0]}`)
                .click({ force: true });
            }
          );

          cy.url().should('contain', `${firstRow.links[0]}`);
        }, cy.visit(`${config.baseUrl}s`));

        cy.get(
          `${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`
        ).within(() => {
          // Check details exist on menu
          cy.get('h3').should('contain.text', firstRow.text[0]);

          // TODO: We should check labels are correct for property values
          config.rows.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.header
            );
          });
          firstRow.text.forEach((row) => {
            cy.get('div.property').should('contain.text', row);
          });

          // TODO: Need to check links but not the link to itself
          // console.log(firstRow.links);
          // firstRow.links.forEach((link) => {
          //   cy.get('div.property a').should('contain.html', link);
          // });

          // Close details
          cy.get('cx-icon[type="CARET_LEFT"]').click();
        });

        cy.url().should('contain', `${config.baseUrl}s`);
        cy.get(
          `${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`
        ).should('not.exist');
      });
    });
  }

  function testCreateUpdateFromConfig() {
    describe(`${config.name} Create / Update`, () => {
      beforeEach(() => {
        loginAsAdmin();
        cy.visit(`${config.baseUrl}s`);
      });

      it(`should create`, () => {
        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
          () => {
            cy.get('cx-icon[type="EXPAND"]').click();
          }
        );

        cy.url().should('contain', `${config.baseUrl}s/create`);

        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.CREATE}`).within(
          () => {
            cy.get('h3').should('contain.text', 'Create');

            cy.get(
              `${config.selector}-${MyCompanySelectorSuffixes.FORM}`
            ).within(() => {
              cy.get('label').should('have.length', config.form.inputs.length);

              config.form.inputs.forEach((input) => {
                cy.get('label')
                  .contains(input.label)
                  .parent()
                  .within(() => {
                    switch (input.type) {
                      case 'text':
                        cy.get('input[type="text"]').type(input.value);
                        break;
                      case 'ngSelect':
                        ngSelect(input.value);
                        break;
                    }
                  });
              });
            });
            cy.get('button').contains('Save').click();
          }
        );

        cy.url().should(
          'contain',
          `${config.baseUrl}s/${config.form.inputs[0].value}`
        );

        cy.get(
          `${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`
        ).within(() => {
          const inputs = config.form.inputs;
          // TODO: This is not the best way to get the row with the name
          const rowWithName = inputs[1];

          // Check details exist on menu
          cy.get('h3').should('contain.text', rowWithName.value);

          // TODO: We should check labels are correct for property values
          inputs.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.label
            );
            cy.get('div.property').should('contain.text', rowConfig.value);
            // if (rowConfig.link) {
            //   cy.get('div.property a').should('contain.html', rowConfig.link);
            // }
          });

          // TODO: Need to check links but not the link to itself
          // console.log(firstRow.links);
          // firstRow.links.forEach((link) => {
          //   cy.get('div.property a').should('contain.html', link);
          // });

          // Close details
          cy.get('cx-icon[type="CARET_LEFT"]').click();
        });
      });

      it(`should update`, () => {
        cy.route('GET', `**${apiEndpoint}**`).as('getData');
        waitForData(() => {
          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
            () => {
              cy.get('a')
                .contains(`${config.form.inputs[1].value}`)
                .click({ force: true });
            }
          );

          cy.url().should('contain', `${config.form.inputs[0].value}`);
        }, cy.visit(`${config.baseUrl}s`));

        cy.get(
          `${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`
        ).within(() => {
          cy.get('a.link').contains('Edit details').click();
        });

        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.EDIT}`).within(
          () => {
            cy.get('h3').should('contain.text', 'Edit details');

            cy.get(
              `${config.selector}-${MyCompanySelectorSuffixes.FORM}`
            ).within(() => {
              cy.get('label').should(
                'have.length',
                config.form.edit.inputs.length
              );

              config.form.edit.inputs.forEach((input) => {
                cy.get('label')
                  .contains(input.label)
                  .parent()
                  .within(() => {
                    switch (input.type) {
                      case 'text':
                        cy.get('input[type="text"]').clear().type(input.value);
                        break;
                      case 'ngSelect':
                        ngSelect(input.value);
                        break;
                    }
                  });
              });
            });

            cy.get('button').contains('Save').click();
          }
        );

        cy.url().should(
          'contain',
          `${config.baseUrl}s/${config.form.edit.inputs[0].value}`
        );

        cy.get(
          `${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`
        ).within(() => {
          const inputs = config.form.edit.inputs;
          // TODO: This is not the best way to get the row with the name
          const rowWithName = inputs[1];

          // Check details exist on menu
          cy.get('h3').should('contain.text', rowWithName.value);

          // TODO: We should check labels are correct for property values
          inputs.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.label
            );
            cy.get('div.property').should('contain.text', rowConfig.value);
            // if (rowConfig.link) {
            //   cy.get('div.property a').should('contain.html', rowConfig.link);
            // }
          });

          // TODO: Need to check links but not the link to itself
          // firstRow.links.forEach((link) => {
          //   cy.get('div.property a').should('contain.html', link);
          // });

          // Close details
          cy.get('cx-icon[type="CARET_LEFT"]').click();
        });
      });

      after(() => {
        // Clean up any newly created data
        deleteEntity(config.form.inputs[0].value, config);
        deleteEntity(config.form.edit.inputs[0].value, config);
      });
    });
  }

  function testAssignmentFromConfig() {
    config.tabs.forEach((tab) => {
      let assignmentRows;
      let firstRow;

      describe(`${config.name} Assignment - ${tab.name}`, () => {
        before(() => {
          loginAsAdmin();
          cy.visit(`${config.baseUrl}s`);
        });

        it('should show list', () => {
          cy.route('GET', `**${apiEndpoint}**`).as('getData');
          waitForData((data) => {
            const rows = getListRowsFromBody(data, objectType, config.rows);
            firstRow = rows[0];

            cy.get(
              `${config.selector}-${MyCompanySelectorSuffixes.LIST}`
            ).within(() => {
              cy.get('a')
                .contains(`${firstRow.text[0]}`)
                .click({ force: true });
            });

            cy.url().should('contain', `${firstRow.links[0]}`);
          }, cy.visit(`${config.baseUrl}s`));

          cy.route('GET', `${tab.availableEndpoint}`).as('getData');
          waitForData((data) => {
            cy.url().should(
              'contain',
              `${config.baseUrl}s/${firstRow.text[1]}${tab.link}`
            );

            // TODO: Verify list is correct
            // cy.get('a').contains('Assign').click();
            // cy.wait(5000);
            // verifyList(
            //   config,
            //   getListRowsFromBody(data, tab.objectType, tab.rows),
            //   tab.rows
            // );
          }, cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST} a`).contains(tab.name).click({ force: true }));
        });

        // TODO: Fails because assignment details do not align
        it('should show assignments list', () => {
          cy.server();

          cy.route('GET', `${tab.availableEndpoint}`).as('getData');
          waitForData((data) => {
            // const assignmentRowHeaders = tab.rowHeaders.splice(0, 0, 'Assign');
            // tab.dataConfig.rowConfig = tab.dataConfig.rowConfig.splice(0, 0, {
            //   text: '',
            // });
            // verifyList(
            //   config,
            //   getListRowsFromBody(data, tab.objectType, tab.rows),
            //   tab.rows
            // );
          }, cy.get('a').contains('Assign').click());

          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.link}/assign`
          );
          cy.get(tab.manageSelector).within(() => {
            cy.get('h3').should(
              'contain.text',
              `Assign ${tab.label.toLowerCase()}`
            );
          });
        });

        xit('should sort assignments table data', () => {
          cy.server();
          tab.sorts?.forEach((sort) => {
            cy.route('GET', `${tab.availableEndpoint}`).as('getData');
            waitForData((data) => {
              const assignmentRowHeaders = tab.rowHeaders.splice(
                0,
                0,
                'Assign'
              );
              tab.dataConfig.rowConfig = tab.dataConfig.rowConfig.splice(0, 0, {
                text: '',
              });
              // TODO: Currently fails due to
              // verifyList(
              //   config,
              //   getListRowsFromBody(data, tab.objectType, tab.rows),
              //   assignmentRowHeaders
              // );
            }, ngSelect(sort.value));
          });
        });

        it(`should assign and validate`, () => {
          cy.server();
          cy.get('cx-table').within(() => {
            // cy.route('POST', `**/${tab.dataConfig.type}**`).as('getData');
            cy.route('POST', `**`).as('getData');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@getData');
            cy.get('tr input[type="checkbox"]').eq(1).should('be.checked');
          });
          cy.get(`${tab.manageSelector} cx-icon[type="CARET_LEFT"]`).click();
          cy.get(tab.listSelector).within(() => {
            cy.get('cx-table').within(() => {
              // cy.get('tr').should('have.length', 3);
            });
            // cy.get('a').contains('Manage').click();
          });
          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.link}`
          );
          // cy.get(tab.manageSelector).within(() => {
          //   cy.get('h3').should('contain.text', 'Manage');
          // });
        });

        it(`should unassign and validate`, () => {
          cy.server();

          cy.get('a').contains('Assign').click();
          cy.get('cx-table').within(() => {
            cy.route('DELETE', `**`).as('delete');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@delete');
            cy.get('tr input[type="checkbox"]').eq(1).should('not.be.checked');
          });
          cy.get(`${tab.manageSelector} cx-icon[type="CARET_LEFT"]`).click();
          cy.get(tab.listSelector).within(() => {
            cy.get('cx-table').within(() => {
              // cy.get('tr').should('have.length', 2);
            });
            // cy.get('a').contains('Manage').click();
          });
          cy.url().should(
            'contain',
            `${config.baseUrl}s/${firstRow.text[1]}${tab.link}`
          );
          // cy.get(tab.manageSelector).within(() => {
          //   cy.get('h3').should('contain.text', 'Manage');
          // });
        });

        if (tab.canUnassignAll) {
          it(`should unassign all and validate`, () => {
            cy.server();

            cy.get('a').contains('Assign').click();

            cy.route('DELETE', `**`).as('getData');
            // cy.route('DELETE', `**/${config.apiEndpoint}**`).as('getData');
            cy.get(`a`).contains('Unassign All').click();
            cy.wait('@getData');

            cy.get(tab.manageSelector).within(() => {
              cy.get('cx-table').within(() => {
                cy.get('tr input[type="checkbox"]').should('not.be.checked');
              });
            });
            cy.get(`${tab.manageSelector} cx-icon[type="CARET_LEFT"]`).click();

            cy.get(`${tab.listSelector}`).should(
              'contain.text',
              'The list is empty'
            );

            cy.url().should(
              'contain',
              `${config.baseUrl}s/${firstRow.text[1]}${tab.link}`
            );
            // cy.get(`${tab.manageSelector} h3`).should('contain.text', 'Manage');
          });

          it(`should reassign all and validate`, () => {
            cy.get('a').contains('Assign').click();
            scanTablePagesForText(tab.rows[0].text[0], config);
            cy.get(tab.manageSelector).within(() => {
              cy.get('cx-table').within(() => {
                cy.get('tr')
                  .contains(tab.rows[0].text[0])
                  .parent()
                  .within(() => {
                    cy.server();
                    cy.route('POST', `**`).as('getData');
                    cy.get('input[type="checkbox"]').click({ force: true });
                    cy.wait('@getData');
                  });
              });
            });
            cy.wait(2000);
            cy.get(tab.manageSelector).within(() => {
              cy.get('cx-table').within(() => {
                cy.get('tr')
                  .contains(tab.rows[0].text[0])
                  .parent()
                  .within(() => {
                    cy.get('input[type="checkbox"]').should('be.checked');
                  });
              });
            });
            cy.get(`${tab.manageSelector} cx-icon[type="CARET_LEFT"]`).click();

            cy.url().should(
              'contain',
              `${config.baseUrl}s/${firstRow.text[1]}${tab.link}`
            );
            // cy.get(tab.manageSelector).within(() => {
            //   cy.get('h3').should('contain.text', 'Manage');
            // });
          });
        }

        it('should go back to main menu', () => {
          cy.wait(1000);
          cy.get(`${tab.listSelector} cx-icon[type="CARET_LEFT"]`).click();
          cy.url().should('contain', config.baseUrl);
        });
      });
    });
  }
}

function checkRowHeaders(rowConfigs: any): void {
  rowConfigs.forEach((config: any) => {
    cy.get('th').should('contain.text', config.header);
  });
}

function checkRows(rows): void {
  let j = 1; // Skip header table row at 0
  rows.forEach((row: any) => {
    if (row.text.length) {
      cy.get('tr')
        .eq(j)
        .within(() => {
          for (let i = 0; i < row.text.length; i++) {
            if (row.text[i]) {
              cy.get('td').eq(i).should('contain.text', row.text[i]);
              if (row.links && row.links[i]) {
                cy.get('td')
                  .eq(i)
                  .should(
                    'contain.html',
                    `href="${CONTEXT_URL_EN_USD}${row.links[i]}`
                  );
              }
            }
          }
        });
      j++;
    }
  });
}

function ngSelect(sortKey: string): void {
  cy.get('.ng-select').click();
  cy.get('.ng-select .ng-dropdown-panel-items')
    .contains(new RegExp(`^${sortKey}$`, 'g'))
    .click({ force: true });
}

function scanTablePagesForText(text: string, config): void {
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

function deleteEntity(id: string, config): void {
  const userToken = `${
    JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
      .token.access_token
  }`;
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/${config.apiEndpoint}s/${id}`,
    headers: {
      Authorization: `bearer ${userToken}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 400]);
  });
}

function getListRowsFromBody(body, objectType, rows: MyCompanyRowConfig[]) {
  return body[objectType].map((data) => {
    const table = { text: [], links: [] };
    rows.map((row) => {
      // if (!data.hasOwnProperty('selected') || data.selected) {
      const foundText = row.text
        .split('.')
        .reduce((p, c) => (p && p[c]) || null, data);
      table.text.push(foundText);
      table.links.push(row.link ? row.link : null);
      // }
    });
    return table;
  });
}

function waitForData(thenCommand, waitForCommand?): void {
  waitForCommand;
  cy.wait('@getData').then((xhr: any) => {
    if (xhr.aborted) {
      waitForData(thenCommand);
    } else {
      thenCommand(xhr?.response?.body);
    }
  });
}

function verifyList(rows, rowConfig): void {
  cy.get('cx-table').within(() => {
    checkRowHeaders(rowConfig);
    checkRows(rows);
  });
}

function loginAsAdmin(): void {
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
