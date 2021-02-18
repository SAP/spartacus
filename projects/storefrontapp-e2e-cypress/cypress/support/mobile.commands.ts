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
  }
}

Cypress.Commands.add('onMobile', (cb: () => unknown) => {
  const viewportWidth = Cypress.config('viewportWidth');
  console.log(viewportWidth);
  if (viewportWidth < 992) {
    cb();
  }
});
