import { TabbingOrderTypes } from './tabbing-order.config';

export function checkElement(value: string, type: TabbingOrderTypes) {
  if (!(value && value.length)) {
    return;
  }

  switch (type) {
    case TabbingOrderTypes.FORM_FIELD: {
      cy.focused().should('have.attr', 'formcontrolname', value);
      break;
    }
    case TabbingOrderTypes.LINK: {
      cy.focused().should('contain', value);
      break;
    }
    case TabbingOrderTypes.BUTTON: {
      cy.focused().should('contain', value);
      break;
    }
  }

  cy.tab(); // after the above check, tab to the next element
}

export function getFormFieldByValue(value: string) {
  return cy.get(`[formcontrolname="${value}"]`);
}
