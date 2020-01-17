import { checkAllElements, TabElement } from '../tabbing-order';

export function consentManagementTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route(
    `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
  ).as('getComponents');
  cy.visit('/my-account/consents');

  cy.wait('@getComponents');

  cy.get('.cx-consent-action-links a.cx-action-link')
    .contains('Clear all')
    .first()
    .focus(); // focus the first element

  checkAllElements(config);
}
