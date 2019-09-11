declare namespace Cypress {
  interface Chainable {
    /**
         * checks if element is in view
         *
         * @memberof Cypress.Chainable
         *
         * @example
          ```
          cy.get('cx-footer-navigation .notice').isInViewPort()
          ```
         */
    isInViewport: () => any;
  }
}

// Cypress.Commands.add('isInViewport', element => {
//   cy.get(element).then($el => {
//     const bottom = $el;
//     const rect = $el[0].getBoundingClientRect();

//     expect(rect.top).not.to.be.greaterThan(bottom);
//     expect(rect.bottom).not.to.be.greaterThan(bottom);
//     expect(rect.top).not.to.be.greaterThan(bottom);
//     expect(rect.bottom).not.to.be.greaterThan(bottom);
//   });
// });
