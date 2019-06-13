declare namespace Cypress {
  interface Chainable {
    /**
       * Select user menu option
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.selectUserMenuOption({
          option: 'Sign out'
        })
        ```
       */
    selectUserMenuOption: ({
      option,
      isMobile,
    }: {
      option: string;
      isMobile?: boolean;
    }) => void;
  }
}

Cypress.Commands.add(
  'selectUserMenuOption',
  ({ isMobile, option }: { option: string; isMobile?: boolean }) => {
    if (isMobile) {
      // below click is exactly the same as clickHamburger() but we cannot import it here
      cy.get('cx-hamburger-menu [aria-label="Menu"]').click({ force: true });
    }
    const userMenu = cy.get('[position="HeaderLinks"] cx-navigation-ui > nav');

    userMenu.within(() => {
      cy.get('h5').click({
        force: true,
      });
      cy.getByText(new RegExp(option, 'i')).click({ force: true });
    });
  }
);
