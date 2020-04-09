import { checkAllElements, TabElement } from '../tabbing-order';
import { formats } from '../../../sample-data/viewports';

export function myAccountTabbingOrder(
  config: TabElement[],
  mobile: boolean = false
) {
  cy.visit('/');

  if (mobile) {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  }

  cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor (#6743)
  if (mobile) {
    cy.get('cx-hamburger-menu button').first().click().focus();
  }

  cy.get('cx-navigation-ui.accNavComponent')
    .should('contain.text', 'My Account')
    .and('be.visible');

  cy.get('cx-navigation-ui.accNavComponent nav span').first().focus();
  cy.focused().trigger('keydown', {
    key: ' ',
    code: 'Space',
    force: true,
  });
  cy.get('cx-generic-link').contains('Order History').should('be.visible');
  cy.pressTab();

  checkAllElements(config);
}
