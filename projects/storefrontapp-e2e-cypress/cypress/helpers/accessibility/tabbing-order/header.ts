import { checkAllElements, TabElement } from '../tabbing-order';

export function headerDesktopTabbingOrder(config: TabElement[]) {
  cy.visit('/');

  // Ensures components are loaded before tabbing
  cy.get('cx-navigation-ui').should('be.visible');
  cy.get('.SiteContext')
    .find('cx-site-context-selector')
    .should('have.length', 2);

  cy.get('header cx-site-context-selector select')
    .first()
    .focus();

  checkAllElements(config);
}
