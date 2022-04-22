import {
  INPUT_TYPE,
  MyCompanyConfig,
  MyCompanyRowConfig,
} from '../../models/index';
import { ignoreCaseSensivity } from '../../my-company.utils';

export enum FormType {
  CREATE = 'create',
  UPDATE = 'update',
}

/**
 * Returns the key of the MyCompanyRowConfig for the item value.
 *
 * Depending on the form type, it returns the key for creating OR updating value.
 */
export function getValueKey(formType: FormType): 'createValue' | 'updateValue' {
  switch (formType) {
    case FormType.CREATE:
      return 'createValue';
    case FormType.UPDATE:
      return 'updateValue';
  }
}

export function completeForm(
  rowConfigs: MyCompanyRowConfig[],
  formType: FormType
) {
  const valueKey = getValueKey(formType);
  rowConfigs.forEach((input) => {
    if (input.formLabel) {
      getFieldByLabel(input).then((el) => {
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

  function getFieldByLabel(input: MyCompanyRowConfig) {
    return input.inputType === INPUT_TYPE.CHECKBOX
      ? cy.get('cx-org-card fieldset legend').contains(input.formLabel).parent()
      : cy.get('cx-org-card label span').contains(input.formLabel).parent();
  }

  // For situations where more than one control exists in form with the same label.
  function getFieldBySelector(selector: string) {
    return cy.get(selector);
  }

  function fillTextInput(input: MyCompanyRowConfig): void {
    if (input.selector) {
      getFieldBySelector(input.selector).clear().type(input[valueKey]);
    } else {
      getFieldByLabel(input).within(() => {
        cy.get(`input`).clear().type(input[valueKey]);
      });
    }
  }

  function fillDateTimePicker(input: MyCompanyRowConfig) {
    if (input.selector) {
      getFieldBySelector(input.selector).clear().type(input[valueKey]);
    } else {
      getFieldByLabel(input).within(() => {
        cy.get(`cx-org-card cx-date-time-picker input`)
          .clear()
          .type(input[valueKey]);
      });
    }
  }

  function fillNgSelect(input: MyCompanyRowConfig) {
    // First check if `valueKey` is defined. For example select should be omitted if `updateValue` is empty.
    if (input[valueKey]) {
      getFieldByLabel(input).within(() => {
        cy.get(`ng-select`).click();
      });
      cy.wait(1000); // Allow time for options to draw
      cy.get('ng-dropdown-panel')
        .contains(input[valueKey])
        .click({ force: true });
    }
  }

  function selectCheckbox(input) {
    getFieldByLabel(input).within(() => {
      cy.get('input[type="checkbox"]').check(input[valueKey]);
    });
  }
}

export function verifyDetails(config: MyCompanyConfig, formType: FormType) {
  const valueKey = getValueKey(formType);

  const codeRow = config.rows?.find((row) => row.useInUrl);
  const headerRows = config.rows?.filter((row) => row.useInHeader);

  if (codeRow) {
    cy.url().should('contain', `${config.baseUrl}/${codeRow[valueKey]}`);
  }

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

      const link = getLink(rowConfig);
      if (link) {
        // TODO: spike todo get context from variables
        cy.get('div.property a').should(
          'have.attr',
          'href',
          `/powertools-spa/en/USD${link}`
        );
      }
    }
  });

  /**
   * Returns the link for the given row.
   *
   * - For FormType.CREATE, it returns `link`
   * - For FormType.UPDATE, it returns `updatedLink` or `link` (if `updatedLink` is not present)
   */
  function getLink(rowConfig: MyCompanyRowConfig): string | undefined {
    if (rowConfig.updatedLink && formType === FormType.UPDATE) {
      return rowConfig.updatedLink;
    }
    return rowConfig.link;
  }
}
