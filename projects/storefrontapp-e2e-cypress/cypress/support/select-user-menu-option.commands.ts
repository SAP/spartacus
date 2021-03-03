declare namespace Cypress {
  interface Chainable {
    /**
       * Selects an option from the user menu (top navigation)
       * This command is Viewport aware (desktop and mobile)
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

// test

Cypress.Commands.add(
  'selectUserMenuOption',
  ({ isMobile, option }: { option: string; isMobile?: boolean }) => {
    if (isMobile) {
      // below click is exactly the same as clickHamburger() but we cannot import it here
      cy.get('cx-hamburger-menu [aria-label="Menu"]').click({ force: true });
    }

    cy.get(
      'cx-login > cx-page-slot > cx-navigation > cx-navigation-ui > nav > div > div'
    )
      .findByText(new RegExp(option, 'i'))
      .click({ force: true });
  }
);
