import { baseEndpoint } from '../../constants/backend';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

const containerSelector = 'cx-footer-navigation';

export function footerTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(`${baseEndpoint}/cms/components*`).as('getComponents');

  cy.visit('/login');
  cy.wait('@getComponents');

  verifyTabbingOrder(containerSelector, config);
}
