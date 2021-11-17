declare namespace Cypress {
  interface Chainable {
    /**
       * Run commands only in mobile view
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.onMobile(() => {
          cy.get('something')
        })
        ```
       */
    onMobile: (cb: () => unknown) => void;
    /**
       * Run commands only in desktop view
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.onDesktop(() => {
          cy.get('something')
        })
        ```
       */
    onDesktop: (cb: () => unknown) => void;
  }
}

const mobileBreakpoint = 992;

Cypress.Commands.add('onMobile', (cb: () => unknown) => {
  const viewportWidth = Cypress.config('viewportWidth');
  if (viewportWidth < mobileBreakpoint) {
    cb();
  }
});

Cypress.Commands.add('onDesktop', (cb: () => unknown) => {
  const viewportWidth = Cypress.config('viewportWidth');
  if (viewportWidth >= mobileBreakpoint) {
    cb();
  }
});
