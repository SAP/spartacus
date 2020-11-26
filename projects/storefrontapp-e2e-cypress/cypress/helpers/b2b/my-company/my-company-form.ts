import {
  ENTITY_UID_COOKIE_KEY,
  INPUT_TYPE,
  MyCompanyConfig,
  MyCompanyRowConfig,
} from './models/index';
import { ignoreCaseSensivity, loginAsMyCompanyAdmin } from './my-company.utils';

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
      cy.get(`cx-org-list a`).contains('Add').click();

      cy.url().should('contain', `${config.baseUrl}/create`);

      cy.get('cx-org-form div.header h3').contains(
        ignoreCaseSensivity(`Create ${config.name}`)
      );

      completeForm(config.rows, 'createValue');

      cy.route('POST', `**${config.apiEndpoint}**`).as('getEntityData');
      cy.get('div.header button').contains('Save').click();
      cy.wait('@getEntityData').then((xhr) => {
        entityUId = xhr.response.body[config.entityIdField];

        verifyDetails(config, 'createValue');
        cy.get('cx-org-card cx-icon[type="CLOSE"]').click();
      });
    });

    it(`should update`, () => {
      const entityId =
        entityUId ?? config.rows?.find((row) => row.useInUrl).createValue;

      if (config.preserveCookies) {
        cy.setCookie(ENTITY_UID_COOKIE_KEY, entityUId);
      }

      cy.wait(2000);
      cy.visit(`${config.baseUrl}/${entityId}`);
      cy.url().should('contain', `${config.baseUrl}/${entityId}`);

      cy.get(`cx-org-card a.link`).contains('Edit').click();
      cy.url().should('contain', `${config.baseUrl}/${entityId}/edit`);

      cy.get('cx-org-form div.header h3').contains(
        ignoreCaseSensivity(`Edit ${config.name}`)
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
    if (input.formLabel) {
      getFieldByLabel(input.formLabel).then((el) => {
        if (!el.html().includes('disabled')) {
          switch (input.inputType) {
            case INPUT_TYPE.TEXT:
              return fillTextInput(input);
            case INPUT_TYPE.DATE_TIME:
              return fillDateTimePicker(input);
            case INPUT_TYPE.DATE:
              return fillTextInput(input);
            case INPUT_TYPE.NG_SELECT:
              return fillNgSelect(input);
            case INPUT_TYPE.CHECKBOX:
              return selectCheckbox(input);
          }
        }
      });
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
  cy.get('cx-org-card div.header h3').contains(
    ignoreCaseSensivity(`${config.name} Details`)
  );

  headerRows.forEach((hRow) => {
    cy.get('cx-org-card div.header h4').contains(
      ignoreCaseSensivity(hRow[valueKey])
    );
  });

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
