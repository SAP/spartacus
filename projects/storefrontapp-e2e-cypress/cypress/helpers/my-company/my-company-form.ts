import { MyCompanyConfig, MyCompanySelectorSuffixes } from './models/index';
import { loginAsMyCompanyAdmin, ngSelect, waitForData } from './my-company';

export function testCreateUpdateFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Create / Update`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
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

          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.FORM}`).within(
            () => {
              cy.get('label').should('have.length', config.rows.length);

              config.rows.forEach((input) => {
                cy.get('label')
                  .contains(input.label)
                  .parent()
                  .within(() => {
                    switch (input.inputType) {
                      case 'text':
                        cy.get('input[type="text"]').type(input.createValue);
                        break;
                      case 'ngSelect':
                        ngSelect(input.createValue);
                        break;
                    }
                  });
              });
            }
          );
          cy.get('button').contains('Save').click();
        }
      );

      cy.url().should(
        'contain',
        `${config.baseUrl}s/${config.rows[1].createValue}`
      );

      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).within(
        () => {
          const inputs = config.rows;
          // TODO: This is not the best way to get the row with the name
          const rowWithName = inputs[0];

          // Check details exist on menu
          cy.get('h3').should('contain.text', rowWithName.createValue);

          // TODO: We should check labels are correct for property values
          inputs.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.label
            );
            cy.get('div.property').should(
              'contain.text',
              rowConfig.createValue
            );
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
        }
      );
    });

    it(`should update`, () => {
      cy.route('GET', `**${config.apiEndpoint}**`).as('getData');
      waitForData(() => {
        cy.get(`${config.selector}-${MyCompanySelectorSuffixes.LIST}`).within(
          () => {
            cy.get('a')
              .contains(`${config.rows[0].createValue}`)
              .click({ force: true });
          }
        );

        cy.url().should('contain', `${config.rows[1].createValue}`);
      }, cy.visit(`${config.baseUrl}s`));

      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).within(
        () => {
          cy.get('a.link').contains('Edit details').click();
        }
      );

      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.EDIT}`).within(
        () => {
          cy.get('h3').should('contain.text', 'Edit details');

          cy.get(`${config.selector}-${MyCompanySelectorSuffixes.FORM}`).within(
            () => {
              cy.get('label').should('have.length', config.rows.length);

              config.rows.forEach((input) => {
                cy.get('label')
                  .contains(input.label)
                  .parent()
                  .within(() => {
                    switch (input.inputType) {
                      case 'text':
                        cy.get('input[type="text"]')
                          .clear()
                          .type(input.updateValue);
                        break;
                      case 'ngSelect':
                        ngSelect(input.updateValue);
                        break;
                    }
                  });
              });
            }
          );

          cy.get('button').contains('Save').click();
        }
      );

      cy.url().should(
        'contain',
        `${config.baseUrl}s/${config.rows[1].updateValue}`
      );

      cy.get(`${config.selector}-${MyCompanySelectorSuffixes.DETAILS}`).within(
        () => {
          const inputs = config.rows;
          // TODO: This is not the best way to get the row with the name
          const rowWithName = inputs[0];

          // Check details exist on menu
          cy.get('h3').should('contain.text', rowWithName.updateValue);

          // TODO: We should check labels are correct for property values
          inputs.forEach((rowConfig) => {
            cy.get('div.property label').should(
              'contain.text',
              rowConfig.label
            );
            cy.get('div.property').should(
              'contain.text',
              rowConfig.updateValue
            );
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
        }
      );
    });

    after(() => {
      // Clean up any newly created data
      deleteEntity(config.rows[1].createValue, config);
      deleteEntity(config.rows[1].updateValue, config);
    });
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
