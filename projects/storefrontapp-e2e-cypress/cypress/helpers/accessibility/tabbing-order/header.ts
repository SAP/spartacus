import { checkAllElements } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';
import { TabElement } from '../tabbing-order.model';

export function headerTabbingOrder(
  config: TabElement[],
  mobile: boolean = false,
  loggedIn: boolean = false
) {
  cy.visit('/');

  if (mobile) {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  }

  // Ensures components are loaded before tabbing
  cy.get('.SiteContext')
    .find('cx-site-context-selector select')
    .should('have.length', 2);

  // Load differing amounts of nav nodes depending on if logged in or not
  const navLength: number = loggedIn ? 43 : 30;
  cy.get('header cx-navigation-ui')
    .find('nav')
    .should('have.length', navLength);

  if (!mobile) {
    cy.get('header cx-site-context-selector select')
      .first()
      .focus();
  } else {
    cy.get('header cx-hamburger-menu button')
      .first()
      .click()
      .focus();
  }

  checkAllElements(config);
}
