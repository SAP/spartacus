import { MyCompanyConfig, MyCompanyRowConfig } from './models/index';
import { loginAsMyCompanyAdmin } from './my-company';

export function testCreateUpdateFromConfig(config: MyCompanyConfig) {
  describe(`${config.name} Create / Update`, () => {
    let entityUId: string;

    beforeEach(() => {
      loginAsMyCompanyAdmin();
      cy.visit(`${config.baseUrl}`);
    });

    after(() => {
      entityUId = undefined;
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

      cy.route('POST', `**${config.apiEndpoint}**`).as('getEntityData');
      cy.get('div.header button').contains('Save').click();
      cy.wait('@getEntityData').then((xhr) => {
        entityUId = xhr.response.body[config.entityIdField];

        verifyDetails(config, 'createValue');
        cy.get('cx-organization-card cx-icon[type="CLOSE"]').click();
      });
    });

    it(`should update`, () => {
      const entityId =
        entityUId ?? config.rows?.find((row) => row.useInUrl).createValue;

      cy.wait(2000);
      cy.visit(`${config.baseUrl}/${entityId}`);
      cy.url().should('contain', `${config.baseUrl}/${entityId}`);

      cy.get(`cx-organization-card a.link`).contains('Edit').click();
      cy.url().should('contain', `${config.baseUrl}/${entityId}/edit`);

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
        case 'checkbox':
          return selectCheckbox(input);
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

  function selectCheckbox(input) {
    getFieldByLabel(input.formLabel).within(() => {
      cy.get('[type="checkbox"]').check(input[valueKey]);
    });
  }
}

function verifyDetails(config: MyCompanyConfig, valueKey: string) {
  const codeRow = config.rows?.find((row) => row.useInUrl);
  const headerRows = config.rows?.filter((row) => row.useInHeader);

  if (codeRow) {
    cy.url().should('contain', `${config.baseUrl}/${codeRow[valueKey]}`);
  }

  cy.wait(2000);
  cy.get(
    'cx-organization-card div.header h3'
  ).contains(`${config.name} Details`, { matchCase: false });

  headerRows.forEach((hRow) => {
    cy.get('cx-organization-card div.header h4').contains(hRow[valueKey], {
      matchCase: false,
    });
  });

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
