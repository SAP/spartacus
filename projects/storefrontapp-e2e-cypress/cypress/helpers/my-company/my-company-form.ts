import { MyCompanyConfig, MyCompanySelectorSuffixes } from './models/index';
import { loginAsMyCompanyAdmin, ngSelect } from './my-company';

export function testCreateUpdateFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Create / Update`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.visit(`${config.baseUrl}`);
    });

    it(`should create`, () => {
      cy.get(`cx-organization-list button`).contains('Add').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get(`cx-organization-form`).within(() => {
        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `Create ${config.name}`);
        });
      });

      // TODO: Check validation/messages
      // TODO: Check Cancel
      // TODO: Check Save
      config.rows.forEach((input) => {
        if (input.formControlName) {
          switch (input.inputType) {
            case 'text':
              cy.get(`input[formcontrolname="${input.formControlName}"]`).type(
                input.createValue
              );
              break;
            case 'datetime':
              cy.get(
                `cx-date-time-picker[formcontrolname="${input.formControlName}"] input`
              ).type(input.createValue);
              break;
            case 'ngSelect':
              ngSelect(input.formControlName, input.createValue);
              break;
          }
        }
      });

      cy.get('div.header button').contains('Save').click();

      const codeRow = config.rows.find((row) => row.formControlName === 'code');
      const nameRow = config.rows.find((row) => row.formControlName === 'name');

      cy.url().should('contain', `${config.baseUrl}/${codeRow.createValue}`);

      cy.get(`cx-organization-card`).within(() => {
        const inputs = config.rows;

        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `${config.name} Details`);
          cy.get('h4').should(
            'contain.text',
            `${config.name}: ${nameRow.createValue}`
          );
        });

        // TODO: We should check labels are correct for property values
        inputs.forEach((rowConfig) => {
          if (rowConfig.showInDetails) {
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
          }
        });

        cy.get('cx-icon[type="CLOSE"]').click();
      });
    });

    it(`should update`, () => {
      cy.get('cx-organization-list a')
        .contains(`${config.rows[0].createValue}`)
        .click({ force: true });

      cy.url().should('contain', `${config.rows[1].createValue}`);

      cy.get(`cx-organization-card a.link`).contains('Edit').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get(`cx-organization-form`).within(() => {
        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `Create ${config.name}`);
        });
      });

      // TODO: Check validation/messages
      // TODO: Check Cancel
      // TODO: Check Save
      config.rows.forEach((input) => {
        if (input.formControlName) {
          switch (input.inputType) {
            case 'text':
              cy.get(`input[formcontrolname="${input.formControlName}"]`).type(
                input.createValue
              );
              break;
            case 'datetime':
              cy.get(
                `cx-date-time-picker[formcontrolname="${input.formControlName}"] input`
              ).type(input.createValue);
              break;
            case 'ngSelect':
              ngSelect(input.formControlName, input.createValue);
              break;
          }
        }
      });

      const codeRow = config.rows.find((row) => row.formControlName === 'code');
      const nameRow = config.rows.find((row) => row.formControlName === 'name');

      cy.url().should('contain', `${config.baseUrl}/${codeRow}`);

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
    )}/users/current/${config.apiEndpoint}/${id}`,
    headers: {
      Authorization: `bearer ${userToken}`,
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 400]);
  });
}
