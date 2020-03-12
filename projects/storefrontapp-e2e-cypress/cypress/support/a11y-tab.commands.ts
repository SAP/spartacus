import { focusableSelectors, getNextFocusableElement } from './utils/a11y-tab';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Tab through the app
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.pressTab()
        ```
       */
      pressTab: () => void;
    }
  }
}

Cypress.Commands.add('pressTab', () => {
  cy.document().then(document => {
    const elements = Array.from(
      <NodeListOf<HTMLElement>>(
        document.querySelectorAll(focusableSelectors.join(','))
      )
    ).filter(element => element.offsetParent !== null);

    const activeElementIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    getNextFocusableElement(elements, activeElementIndex).focus();
  });
});
