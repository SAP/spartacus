import { TabbingOrderTypes } from './tabbing-order.config';

export interface TabElement {
  value: string;
  type: TabbingOrderTypes;
}

export function checkElement(tabElement: TabElement, pressTab: boolean) {
  if (!(tabElement.value && tabElement.value.length)) {
    return;
  }

  switch (tabElement.type) {
    case TabbingOrderTypes.FORM_FIELD: {
      cy.focused().should('have.attr', 'formcontrolname', tabElement.value);
      break;
    }
    case TabbingOrderTypes.LINK: {
      cy.focused().should('contain', tabElement.value);
      break;
    }
    case TabbingOrderTypes.BUTTON: {
      cy.focused().should('contain', tabElement.value);
      break;
    }
  }

  if (pressTab) {
    cy.tab(); // after the above check, tab to the next element
  }
}

export function checkAllElements(tabElements: TabElement[]) {
  it('should focus elements in correct order when pressing tab key', () => {
    tabElements.forEach(el => {
      if (tabElements[tabElements.length - 1] === el) {
        checkElement(el, false);
      } else {
        checkElement(el, true);
      }
    });
  });
}

export function getFormFieldByValue(value: string) {
  return cy.get(`[formcontrolname="${value}"]`);
}
