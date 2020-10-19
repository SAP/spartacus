import { MyCompanyConfig, MyCompanyRowConfig } from './models/index';
import { loginAsMyCompanyAdmin, scanTablePagesForText } from './my-company';

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

      completeForm(config.rows, 'createValue');
      cy.get('div.header button').contains('Save').click();

      verifyDetails(config, 'createValue');

      cy.get('cx-organization-card cx-icon[type="CLOSE"]').click();
    });

    it(`should update`, () => {
      const codeRow = config.rows?.find((row) => row.useInUrl);
      const nameRow = config.rows?.find((row) => row.sortLabel === 'name');

      cy.wait(3000);
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
          cy.get('h3').contains(`Edit ${config.name}`, {
            matchCase: false,
          });
        });
      });

      completeForm(config.rows, 'updateValue');
      cy.get('div.header button').contains('Save').click();

      verifyDetails(config, 'updateValue');

      cy.get('cx-icon[type="CLOSE"]').click();
    });
  });
}

function completeForm(rowConfigs: MyCompanyRowConfig[], valueKey: string) {
  rowConfigs.forEach((input) => {
    if (input.formLabel) {
      switch (input.inputType) {
        case 'text':
          return fillTextInput(input);
        case 'datetime':
          return fillDateTimePicker(input);
        case 'ngSelect':
          return fillNgSelect(input);
      }
    }
  });

  function getFieldByLabel(label: string) {
    return cy.get('label span').contains(label).parent();
  }
  function fillTextInput(input): void {
    getFieldByLabel(input.formLabel).within(() => {
      cy.get(`input`).clear().type(input[valueKey]);
    });
  }

  function fillDateTimePicker(input) {
    getFieldByLabel(input.formLabel).within(() => {
      cy.get(`cx-date-time-picker input`).clear().type(input[valueKey]);
    });
  }

  function fillNgSelect(input) {
    getFieldByLabel(input.formLabel).within(() => {
      cy.get(`ng-select`).click();
    });
    cy.wait(1000);
    cy.get('div.ng-option').contains(input[valueKey]).click({ force: true });
  }
}

function verifyDetails(config: MyCompanyConfig, valueKey: string) {
  const codeRow = config.rows?.find((row) => row.useInUrl);
  const nameRow = config.rows?.find((row) => row.sortLabel === 'name');

  cy.url().should('contain', `${config.baseUrl}/${codeRow[valueKey]}`);

  cy.wait(3000);
  cy.get(
    'cx-organization-card div.header h3'
  ).contains(`${config.name} Details`, { matchCase: false });
  cy.get('cx-organization-card div.header h4').contains(
    `${config.name}: ${nameRow[valueKey]}`,
    {
      matchCase: false,
    }
  );

  config.rows.forEach((rowConfig) => {
    if (rowConfig.showInDetails) {
      cy.get('div.property label').should('contain.text', rowConfig.label);
      cy.get('div.property').should('contain.text', rowConfig[valueKey]);
      // TODO: Check property links
      // if (rowConfig.link) {
      //   cy.get('div.property a').should('contain.html', rowConfig.link);
      // }
    }
  });
}
