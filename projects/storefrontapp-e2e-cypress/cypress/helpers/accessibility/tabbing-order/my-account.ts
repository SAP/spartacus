import { formats } from '../../../sample-data/viewports';
import { TabElement } from '../tabbing-order.model';
import { verifyTabbingOrder } from '../tabbing-order';

const containerSelector = 'cx-navigation-ui.accNavComponent';

export function myAccountTabbingOrder(
  config: TabElement[],
  mobile: boolean = false
) {
  cy.visit('/');

  if (mobile) {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  }

  if (mobile) {
    cy.get('cx-hamburger-menu button').first().click().focus();
  }

  cy.get('cx-navigation-ui.accNavComponent nav h5').first().focus();
  cy.focused().trigger('keydown', {
    key: ' ',
    code: 'Space',
    force: true,
  });
  cy.get('cx-generic-link').contains('Order History').should('be.visible');

  verifyTabbingOrder(containerSelector, config);
}
