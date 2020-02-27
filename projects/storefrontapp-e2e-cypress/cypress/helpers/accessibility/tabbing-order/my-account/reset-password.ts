import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.LoginPageTemplate';

export function forgotPasswordTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
  ).as('getComponents');
  cy.visit('/login/forgot-password');
  cy.wait('@getComponents');

  verifyTabbingOrder(containerSelector, config);
}
