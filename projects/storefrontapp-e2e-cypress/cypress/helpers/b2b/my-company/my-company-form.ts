import {
  INPUT_TYPE,
  MyCompanyConfig,
  MyCompanyRowConfig,
} from './models/index';
import {
  IGNORE_CASE,
  loginAsMyCompanyAdmin,
  scanTablePagesForText,
} from './my-company.utils';

export function testCreateUpdateFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Create / Update`, () => {
    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.visit(`${config.baseUrl}`);
    });

    it(`should create`, () => {
      cy.get(`cx-organization-list a`).contains('Add').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get('cx-organization-form div.header h3').contains(
        `Create ${config.name}`,
        IGNORE_CASE
      );

      completeForm(config.rows, 'createValue');
      cy.get('div.header button').contains('Save').click();

      verifyDetails(config, 'createValue');

      cy.get('cx-organization-card cx-icon[type="CLOSE"]').click();
    });

    it(`should update`, () => {
      const codeRow = config.rows?.find((row) => row.useInUrl);
      const nameRow = config.rows?.find((row) => row.sortLabel === 'name');

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

      cy.get('cx-organization-form div.header h3').contains(
        `Edit ${config.name}`,
        IGNORE_CASE
      );

      completeForm(config.rows, 'updateValue');
      cy.get('div.header button').contains('Save').click();

      verifyDetails(config, 'updateValue');

      cy.get('cx-icon[type="CLOSE"]').click();
    });
  });
}

export function completeForm(
  rowConfigs: MyCompanyRowConfig[],
  valueKey: string
) {
  rowConfigs.forEach((input) => {
    if (input.formLabel && !input.skipInSubCategory) {
      switch (input.inputType) {
        case INPUT_TYPE.TEXT:
          return fillTextInput(input);
        case INPUT_TYPE.DATE_TIME:
          return fillDateTimePicker(input);
        case INPUT_TYPE.NG_SELECT:
          return fillNgSelect(input);
      }
    }
  });

  function getFieldByLabel(label: string) {
    return cy.get('label span').contains(label).parent();
  }

  // For situations where more than one control exists in form with the same label.
  function getFieldBySelector(selector: string) {
    return cy.get(selector);
  }

  function fillTextInput(input: MyCompanyRowConfig): void {
    if (input.selector) {
      getFieldBySelector(input.selector).clear().type(input[valueKey]);
    } else {
      getFieldByLabel(input.formLabel).within(() => {
        cy.get(`input`).clear().type(input[valueKey]);
      });
    }
  }

  function fillDateTimePicker(input: MyCompanyRowConfig) {
    if (input.selector) {
      getFieldBySelector(input.selector).clear().type(input[valueKey]);
    } else {
      getFieldByLabel(input.formLabel).within(() => {
        cy.get(`cx-date-time-picker input`).clear().type(input[valueKey]);
      });
    }
  }

  function fillNgSelect(input: MyCompanyRowConfig) {
    // First check if `valueKey` is defined. For example select should be omitted if `updateValue` is empty.
    if (input[valueKey]) {
      getFieldByLabel(input.formLabel).within(() => {
        cy.get(`ng-select`).click();
      });
      cy.wait(1000); // Allow time for options to draw
      cy.get('div.ng-option').contains(input[valueKey]).click({ force: true });
    }
  }
}

function verifyDetails(config: MyCompanyConfig, valueKey: string) {
  const codeRow = config.rows?.find((row) => row.useInUrl);
  const nameRow = config.rows?.find((row) => row.sortLabel === 'name');

  cy.url().should('contain', `${config.baseUrl}/${codeRow[valueKey]}`);

  cy.wait(1000);
  cy.get('cx-organization-card div.header h3').contains(
    `${config.name} Details`,
    IGNORE_CASE
  );
  cy.get('cx-organization-card div.header h4').contains(
    `${config.name}: ${nameRow[valueKey]}`,
    IGNORE_CASE
  );

  config.rows.forEach((rowConfig) => {
    if (rowConfig.showInDetails) {
      const label = rowConfig.detailsLabel || rowConfig.label;

      cy.get('div.property label').should('contain.text', label);
      cy.get('div.property').should(
        'contain.text',
        rowConfig[valueKey] || label
      );
      // TODO: Check property links
      // if (rowConfig.link) {
      //   cy.get('div.property a').should('contain.html', rowConfig.link);
      // }
    }
  });
}
