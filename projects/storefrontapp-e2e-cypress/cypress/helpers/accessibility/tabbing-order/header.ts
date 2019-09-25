import { checkAllElements, TabElement } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';

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

export function headerMobileTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  cy.viewport(formats.mobile.width, formats.mobile.height);

  cy.get('header cx-hamburger button')
    .first()
    .focus();

  checkAllElements(config);
}
