import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function consentManagementTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(`${Cypress.env('BASE_ENDPOINT')}/cms/components*`).as(
    'getComponents'
  );
  cy.visit('/my-account/consents');

  cy.wait('@getComponents');

  verifyTabbingOrder(containerSelector, config);
}
