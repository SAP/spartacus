import { isMobile } from '../helpers/viewport-context';

declare global {
  namespace Cypress {
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
      selectUserMenuOption: ({ option }: { option: string }) => void;
    }
  }
}

Cypress.Commands.add(
  'selectUserMenuOption',
  ({ option }: { option: string }) => {
    if (isMobile()) {
      // below click is exactly the same as clickHamburger() but we cannot import it here
      cy.get('cx-hamburger-menu [aria-label="Menu"]').click({ force: true });
      cy.contains('button', 'My Account').click({ force: true });
    }

    cy.get(
      'cx-login > cx-page-slot > cx-navigation > cx-navigation-ui > nav > ul > li > div > ul'
    )
      .findByText(new RegExp(option, 'i'))
      .click({ force: true });
  }
);
