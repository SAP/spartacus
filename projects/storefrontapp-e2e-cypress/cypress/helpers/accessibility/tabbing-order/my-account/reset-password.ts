import { baseEndpoint } from '../../../constants/backend';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.LoginPageTemplate';

export function forgotPasswordTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(`${baseEndpoint}/cms/components*`).as('getComponents');
  cy.visit('/login/forgot-password');
  cy.wait('@getComponents');

  verifyTabbingOrder(containerSelector, config);
}
