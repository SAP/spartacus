import { MyCompanyConfig, MyCompanyRowConfig } from './models/index';
import {
  loginAsMyCompanyAdmin,
  ngSelect,
  scanTablePagesForText,
} from './my-company';

export function testCreateUpdateFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Create / Update`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.visit(`${config.baseUrl}`);
    });

    it(`should create`, () => {
      cy.get(`cx-organization-list a`).contains('Add').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get(`cx-organization-form div.header`).within(() => {
        cy.get('h3').contains(`Create ${config.name}`, {
          matchCase: false,
        });
      });

      // TODO: Check validation/messages
      // TODO: Check Cancel
      // TODO: Check Save
      completeForm(config.rows, 'createValue');
      cy.get('div.header button').contains('Save').click();

      const codeRow = config.rows?.find((row) => row.sortLabel === 'code');
      const nameRow = config.rows?.find((row) => row.sortLabel === 'name');

      cy.url().should('contain', `${config.baseUrl}/${codeRow.createValue}`);

      cy.wait(3000);
      // cy.get(`cx-organization-card`).within(() => {
        cy.get('div.header h3').contains(`${config.name} Details`);
        cy.get('div.header h4').contains(
          `${config.name}: ${nameRow.createValue}`
        );

        verifyDetails(config.rows, 'createValue');

        cy.get('cx-icon[type="CLOSE"]').click();
      // });
    });

    it(`should update`, () => {
      const codeRow = config.rows.find((row) => row.formControlName === 'code');
      const nameRow = config.rows.find((row) => row.formControlName === 'name');

      scanTablePagesForText(nameRow.createValue, config);
      cy.get('cx-organization-list a')
        .contains(`${nameRow.createValue}`)
        .click({ force: true });

      cy.url().should('contain', `${config.baseUrl}/${codeRow.createValue}`);
      cy.get(`cx-organization-card a.link`).contains('Edit').click();
      cy.url().should(
        'contain',
        `${config.baseUrl}/${codeRow.createValue}/edit`
      );

      cy.get(`cx-organization-form`).within(() => {
        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `Edit ${config.name}`);
        });
      });

      // TODO: Check validation/messages
      // TODO: Check Cancel
      // TODO: Check Save
      completeForm(config.rows, 'updateValue');
      cy.get('div.header button').contains('Save').click();

      cy.url().should('contain', `${config.baseUrl}/${codeRow.updateValue}`);

      cy.get(`cx-organization-card`).within(() => {
        cy.get('div.header').within(() => {
          cy.get('h3').should('contain.text', `${config.name} Details`);
          cy.get('h4').should(
            'contain.text',
            `${config.name}: ${nameRow.updateValue}`
          );
        });

        verifyDetails(config.rows, 'updateValue');

        cy.get('cx-icon[type="CLOSE"]').click();
      });
    });
  });
}

function completeForm(rowConfigs: MyCompanyRowConfig[], valueKey: string) {
  rowConfigs.forEach((input) => {
    if (input.formControlName) {
      switch (input.inputType) {
        case 'text':
          cy.get(`input[formcontrolname="${input.formControlName}"]`)
            .clear()
            .type(input[valueKey]);
          break;
        case 'datetime':
          cy.get(
            `cx-date-time-picker[formcontrolname="${input.formControlName}"] input`
          )
            .clear()
            .type(input[valueKey]);
          break;
        case 'ngSelect':
          ngSelect(input.formControlName, input[valueKey]);
          break;
      }
    }
  });
}

function verifyDetails(rowConfigs: MyCompanyRowConfig[], valueKey: string) {
  // TODO: We should check labels are correct for property values
  rowConfigs.forEach((rowConfig) => {
    if (rowConfig.showInDetails) {
      cy.get('div.property label').should('contain.text', rowConfig.label);
      cy.get('div.property').should('contain.text', rowConfig[valueKey]);
      // if (rowConfig.link) {
      //   cy.get('div.property a').should('contain.html', rowConfig.link);
      // }
    }
  });
}
