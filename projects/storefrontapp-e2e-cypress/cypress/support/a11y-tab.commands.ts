import {
  focusableSelectors,
  getNextFocusableElement,
  getPreviousFocusableElement,
} from './utils/a11y-tab';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Tab through the app
       *
       * @memberof Cypress.Chainable
       *
       * @param shiftModifier When true, simulates the shift key being held (which reverses the focus movement direction).
       *
       * @example
        ```
        cy.pressTab()
        ```
       */
      pressTab: (shiftModifier?: boolean) => void;
    }
  }
}

Cypress.Commands.add('pressTab', (shiftModifier?: boolean) => {
  cy.document().then((document) => {
    const elements = Array.from(
      <NodeListOf<HTMLElement>>(
        document.querySelectorAll(focusableSelectors.join(','))
      )
    ).filter((element) => element.offsetParent !== null);

    const activeElementIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (shiftModifier === true) {
      getPreviousFocusableElement(elements, activeElementIndex).focus();
    } else {
      getNextFocusableElement(elements, activeElementIndex).focus();
    }
  });
});
