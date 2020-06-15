import { CONTEXT_URL_EN_USD } from './site-context-selector';
import { nextPage, choosePage } from './product-search';

export function testListFromConfig(config) {
  context(`${config.navLink} List`, () => {
    it('should show list', () => {
      cy.get(config.listSelector).within(() => {
        const defaultSort = config.sorts.find((sort) => sort.default);
        cy.url().should('contain', `${config.url}s${defaultSort.urlParams}`);
        cy.get('h3').should('contain.text', config.pageTitle);
        cy.get('a')
          .contains(config.createBtn.text)
          .parent()
          .should(
            'contain.html',
            `href="${config.url}s${config.createBtn.link}"`
          );
        cy.get('cx-sorting .ng-select').should(
          'contain.text',
          defaultSort.value
        );
        cy.get('cx-table').within(() => {
          checkRowHeaders(config.rowHeaders);
          checkRows(config.rows, defaultSort.rowOrder);
        });
      });
    });

    it('should sort table data', () => {
      cy.get(config.listSelector).within(() => {
        config.sorts.forEach((sort) => {
          ngSelect(sort.value);
          cy.url().should('contain', `${config.url}s${sort.urlParams}`);
          cy.get('cx-table').within(() => {
            checkRowHeaders(config.rowHeaders);
            checkRows(config.rows, sort.rowOrder);
          });
        });
      });
    });
  });
}

export function testDetailsFromConfig(config) {
  context(`${config.navLink} Details`, () => {
    it('should show details', () => {
      cy.get(config.listSelector).within(() => {
        cy.get('a')
          .contains(`${config.details.entity.id}`)
          .click({ force: true });
      });

      cy.url().should('contain', `${config.url}/${config.details.entity.id}`);

      cy.get(config.detailsSelector).within(() => {
        cy.get('h3').should(
          'contain.text',
          `Details for ${config.details.entity.id}`
        );
        cy.get('div.row')
          .should('contain.text', 'ID')
          .and('contain.text', config.details.entity.id);
        if (config.details.entity.parentUnit) {
          cy.get('div.row')
            .should('contain.text', 'Parent Unit')
            .and('contain.text', config.details.entity.parentUnit)
            .and(
              'contain.html',
              `href="${CONTEXT_URL_EN_USD}/organization/unit/${config.details.entity.parentUnit}"`
            );
        }
        cy.get('div.row')
          .should('contain.text', 'Name')
          .and('contain.text', config.details.entity.name);

        cy.get('a')
          .contains(config.details.editBtn.text)
          .parent()
          .should(
            'contain.html',
            `href="${config.url}${config.details.editBtn.link}"`
          );

        cy.get('a')
          .contains('Back to list')
          .parent()
          .should('contain.html', `href="${config.url}s"`);

        cy.get('cx-fake-tabs-desktop').within(() => {
          config.details.tabs.forEach((tab) => {
            cy.get('a')
              .contains(tab.label)
              .parent()
              .and('contain.html', `href="${config.url}${tab.link}"`);
          });
        });
      });
    });
  });
}

export function testCreateUpdateFromConfig(config) {
  context(`${config.navLink} Create / Update`, () => {
    it(`should create`, () => {
      cy.get(config.listSelector).within(() => {
        cy.get('a').contains(config.createBtn.text).click();
      });

      cy.url().should('contain', `${config.url}s/create`);

      cy.get(config.create.selector).within(() => {
        cy.get('h3').should('contain.text', config.create.header);

        cy.get(config.form.selector).within(() => {
          cy.get('label').should('have.length', config.form.inputs.length);

          // cy.get('cx-form-errors')
          //   .contains('This field is required')
          //   .should('not.be.visible');
          // cy.get('button').contains(config.create.header).click();
          // cy.get('cx-form-errors')
          //   .should('contain.text', 'This field is required')
          //   .and('be.visible')
          //   .and('have.length', config.form.inputs.length);

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

          cy.get('button').contains(config.create.header).click();
        });
      });

      cy.url().should(
        'contain',
        `${config.url}/${config.form.inputs[0].value}`
      );

      cy.get(config.detailsSelector).within(() => {
        cy.get('h3').should(
          'contain.text',
          `Details for ${config.form.inputs[0].value}`
        );

        if (config.details.entity.parentUnit) {
          cy.get('div.row')
            .should('contain.text', 'Parent Unit')
            .and('contain.text', config.form.inputs[2].value)
            .and(
              'contain.html',
              `href="${CONTEXT_URL_EN_USD}/organization/unit/${config.form.inputs[2].link}"`
            );
        }
        cy.get('div.row')
          .should('contain.text', 'Name')
          .and('contain.text', config.form.inputs[1].value);

        cy.get('a')
          .contains(config.details.editBtn.text)
          .parent()
          .should(
            'contain.html',
            `href="${config.url}/edit/${config.form.inputs[0].value}"`
          );

        cy.get('a')
          .contains('Back to list')
          .parent()
          .should('contain.html', `href="${config.url}s"`)
          .click();
      });

      cy.url().should('contain', `${config.url}`);

      cy.get(config.listSelector).within(() => {
        // const defaultSort = config.sorts.find((sort) => sort.default);
        cy.get('h3').should('contain.text', config.pageTitle);
        cy.get('cx-table').within(() => {
          cy.get('tr').should('have.length', 4);
          const rowsWithNewEntity = [
            ...config.rows,
            {
              text: ['test-user-group', 'Test User Group', 'Custom Retail'],
              links: [
                '/organization/user-group/test-user-group',
                null,
                '/organization/unit/Custom%20Retail',
              ],
            },
          ];
          const newOrder = [0, 1, 2, 3];
          checkRowHeaders(config.rowHeaders);
          checkRows(rowsWithNewEntity, newOrder);
        });
      });
    });

    it(`should update`, () => {
      cy.get(config.listSelector).within(() => {
        cy.get('a')
          .contains(`${config.form.inputs[0].value}`)
          .click({ force: true });
      });

      cy.url().should(
        'contain',
        `${config.url}/${config.form.inputs[0].value}`
      );

      cy.get(config.detailsSelector).within(() => {
        cy.get('h3').should(
          'contain.text',
          `Details for ${config.form.inputs[0].value}`
        );

        cy.get('a').contains(config.details.editBtn.text).click();
      });

      cy.get(config.edit.selector).within(() => {
        cy.get('h3').should('contain.text', config.edit.header);

        cy.get(config.form.selector).within(() => {
          cy.get('label').should('have.length', config.edit.inputs.length);

          // cy.get('cx-form-errors')
          //   .contains('This field is required')
          //   .should('not.be.visible');
          // cy.get('button').contains(config.create.header).click();
          // cy.get('cx-form-errors')
          //   .should('contain.text', 'This field is required')
          //   .and('be.visible')
          //   .and('have.length', config.form.inputs.length);

          config.edit.inputs.forEach((input) => {
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

          cy.get('button').contains(config.edit.btn).click();
        });
      });

      cy.url().should(
        'contain',
        `${config.url}/${config.edit.inputs[0].value}`
      );

      cy.get(config.detailsSelector).within(() => {
        cy.get('h3').should(
          'contain.text',
          `Details for ${config.edit.inputs[0].value}`
        );

        cy.get('div.row')
          .should('contain.text', 'ID')
          .and('contain.text', config.edit.inputs[0].value);

        if (config.details.entity.parentUnit) {
          cy.get('div.row')
            .should('contain.text', 'Parent Unit')
            .and('contain.text', config.edit.inputs[2].value)
            .and(
              'contain.html',
              `href="${CONTEXT_URL_EN_USD}/organization/unit/${config.edit.inputs[2].link}"`
            );
        }
        cy.get('div.row')
          .should('contain.text', 'Name')
          .and('contain.text', config.edit.inputs[1].value);

        cy.get('a')
          .contains(config.details.editBtn.text)
          .parent()
          .should(
            'contain.html',
            `href="${config.url}/edit/${config.edit.inputs[0].value}"`
          );

        cy.get('a')
          .contains('Back to list')
          .parent()
          .should('contain.html', `href="${config.url}s"`)
          .click();
      });

      cy.url().should('contain', `${config.url}s`);

      cy.get(config.listSelector).within(() => {
        // const defaultSort = config.sorts.find((sort) => sort.default);
        cy.get('h3').should('contain.text', config.pageTitle);
        cy.get('cx-table').within(() => {
          cy.get('tr').should('have.length', 4);
          const rowsWithNewEntity = [
            ...config.rows,
            {
              text: [
                config.edit.inputs[0].value,
                config.edit.inputs[1].value,
                config.edit.inputs[2].value,
              ],
              links: [
                `/organization/user-group/{${config.edit.inputs[0].value}`,
                null,
                config.edit.inputs[2].link,
              ],
            },
          ];
          const newOrder = [0, 1, 2, 3];
          checkRowHeaders(config.rowHeaders);
          checkRows(rowsWithNewEntity, newOrder);
        });
      });
    });

    after(() => {
      cleanUp(config);
    });
  });
}

export function testAssignmentFromConfig(config) {
  let data;

  config.details.tabs.forEach((tab) => {
    describe(`${config.navLink} Assignment - ${tab.label}`, () => {
      before(() => {
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
        cy.visit(`${config.url}s`);
      });

      it(`should navigate to tab menu`, () => {
        cy.get(config.listSelector).within(() => {
          cy.get('a')
            .contains(`${config.details.entity.id}`)
            .click({ force: true });
        });

        cy.get('cx-fake-tabs').within(() => {
          cy.get('a').contains(tab.label).click({ force: true });
        });

        cy.url().should('contain', tab.link);
      });

      it('should show list', () => {
        cy.get(tab.selector).within(() => {
          if (tab.sorts) {
            const defaultSort = tab.sorts.find((sort) => sort.default);
            cy.url().should('contain', `${tab.link}${defaultSort.urlParams}`);
            cy.get('h3').should('contain.text', tab.label);
            cy.get('cx-sorting .ng-select').should(
              'contain.text',
              defaultSort.value
            );
            cy.get('cx-table').within(() => {
              checkRowHeaders(tab.rowHeaders);
              checkRows(tab.rows, defaultSort.rowOrder);
            });
          }
        });
      });

      it('should sort table data', () => {
        cy.get(tab.selector).within(() => {
          tab.sorts?.forEach((sort) => {
            ngSelect(sort.value);
            cy.url().should('contain', `${tab.link}${sort.urlParams}`);
            cy.get('cx-table').within(() => {
              checkRowHeaders(tab.rowHeaders);
              checkRows(tab.rows, sort.rowOrder);
            });
          });
        });
      });

      if (tab.manageLink && tab.manageSelector) {
        let available: any;

        it('should navigate to management menu', () => {
          cy.server();
          cy.route('GET', `${tab.availableEndpoint}`).as('getData');
          cy.get('a').contains('Manage').click();
          cy.wait('@getData').then((xhr) => {
            available = xhr?.response?.body[tab.availableParam];
            console.log(xhr?.response?.body, available);
          });
          cy.url().should('contain', `${config.url}${tab.manageLink}`);
          cy.get(tab.manageSelector).within(() => {
            cy.get('h3').should('contain.text', 'Manage');
          });
        });

        it('should show assignments list', () => {
          cy.get('cx-table').within(() => {
            const assignmentRowHeaders = tab.rowHeaders.splice(0, 0, 'Assign');
            checkRowHeaders(assignmentRowHeaders);
            const rows = available.map((row) => ({
              text: [row.email, row.name, row.orgUnit.name],
              links: [`/${row.customerId}`, null, `/${row.orgUnit.uid}`],
            }));
            checkRows(rows, []);
          });
        });

        xit('should sort assignments table data', () => {});

        it(`should assign and validate`, () => {
          cy.get('cx-table').within(() => {
            cy.server();
            cy.route('POST', '**/orgUnitUserGroups/**').as('getData');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@getData');
            cy.get('tr input[type="checkbox"]').eq(1).should('be.checked');
          });
          cy.get('a').contains('Close').click();
          cy.get(tab.selector).within(() => {
            cy.get('cx-table').within(() => {
              cy.get('tr').should('have.length', 3);
            });
            cy.get('a').contains('Manage').click();
          });
          cy.url().should('contain', `${config.url}${tab.manageLink}`);
          cy.get(tab.manageSelector).within(() => {
            cy.get('h3').should('contain.text', 'Manage');
          });
        });

        it(`should unassign and validate`, () => {
          cy.get('cx-table').within(() => {
            cy.server();
            cy.route('DELETE', '**/orgUnitUserGroups/**').as('getData');
            cy.get('tr input[type="checkbox"]').eq(1).click({ force: true });
            cy.wait('@getData');
            cy.get('tr input[type="checkbox"]').eq(1).should('not.be.checked');
          });
          cy.get('a').contains('Close').click();
          cy.get(tab.selector).within(() => {
            cy.get('cx-table').within(() => {
              cy.get('tr').should('have.length', 2);
            });
            cy.get('a').contains('Manage').click();
          });
          cy.url().should('contain', `${config.url}${tab.manageLink}`);
          cy.get(tab.manageSelector).within(() => {
            cy.get('h3').should('contain.text', 'Manage');
          });
        });

        if (tab.unassignAll) {
          it(`should unassign all and validate`, () => {
            cy.get(tab.manageSelector).within(() => {
              cy.server();
              cy.route('DELETE', '**/orgUnitUserGroups/**').as('getData');
              cy.get('button').contains('Unassign All').click();
              cy.wait('@getData');
            });

            cy.get(tab.manageSelector).within(() => {
              cy.get('cx-table').within(() => {
                cy.get('tr input[type="checkbox"]').should('not.be.checked');
              });
              cy.get('a').contains('Close').click();
            });
            cy.get(tab.selector).within(() => {
              cy.get('div').should('contain.text', 'No data.');
              cy.get('a').contains('Manage').click();
            });
            cy.url().should('contain', `${config.url}${tab.manageLink}`);
            cy.get(tab.manageSelector).within(() => {
              cy.get('h3').should('contain.text', 'Manage');
            });
          });

          it(`should reassign all and validate`, () => {
            tab.rows.forEach((row) => {
              scanTablePagesForText(row.text[0]);
              cy.get(tab.manageSelector).within(() => {
                cy.get('cx-table').within(() => {
                  cy.get('tr')
                    .contains(row.text[0])
                    .parent()
                    .parent()
                    .within(() => {
                      cy.server();
                      cy.route('POST', '**/orgUnitUserGroups/**').as('getData');
                      cy.get('input[type="checkbox"]').click({ force: true });
                      cy.wait('@getData');
                    });
                });
              });
              cy.get(tab.manageSelector).within(() => {
                cy.get('cx-table').within(() => {
                  cy.get('tr')
                    .contains(row.text[0])
                    .parent()
                    .parent()
                    .within(() => {
                      cy.get('input[type="checkbox"]').should('be.checked');
                    });
                });
              });
            });
            cy.get('a').contains('Close').click();
            cy.get(tab.selector).within(() => {
              cy.get('cx-table').within(() => {
                cy.get('tr').should('have.length', 2);
              });
              cy.get('a').contains('Manage').click();
            });
            cy.url().should('contain', `${config.url}${tab.manageLink}`);
            cy.get(tab.manageSelector).within(() => {
              cy.get('h3').should('contain.text', 'Manage');
            });
          });
        }

        it('should close', () => {
          cy.get(tab.manageSelector).within(() => {
            cy.get('a').contains('Close').click();
          });
          cy.url().should('contain', `${tab.link}`);
          cy.get('h3').should('contain.text', tab.label);
        });
      }

      it('should go back to main menu', () => {
        cy.get('a').contains('Back to list').click();
        cy.url().should('contain', config.url);
      });
    });
  });
}

function checkRowHeaders(headers: string[]): void {
  headers.forEach((header: string) => {
    cy.get('th').should('contain.text', header);
  });
}

function checkRows(rows, order: number[]): void {
  let j = 0;
  order.forEach((rowNo: number) => {
    const row = rows[rowNo];
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
                  `href="${CONTEXT_URL_EN_USD}${row.links[i]}"`
                );
            }
          }
        }
      });
    j++;
  });
}

function ngSelect(sortKey: string): void {
  cy.get('.ng-select').click();
  cy.get('.ng-select .ng-dropdown-panel-items')
    .contains(new RegExp(`^${sortKey}$`, 'g'))
    .click({ force: true });
  cy.wait(1000);
}

function cleanUp(config) {
  const userToken = `${
    JSON.parse(localStorage.getItem('spartacus-local-data')).auth.userToken
      .token.access_token
  }`;
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orgUnitUserGroups/${config.edit.inputs[0].value}`,
    headers: {
      Authorization: `bearer ${userToken}`,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
}

function scanTablePagesForText(text: string) {
  // cy.get('cx-pagination').contains('«').first().click({ force: true });
  cy.get('cx-table').then(($table) => {
    if ($table.text().indexOf(text) === -1) {
      cy.server();
      cy.route('GET', '**/orgUnitUserGroups/**').as('getData');
      nextPage();
      cy.wait('@getData');
      scanTablePagesForText(text);
    }
  });
}
