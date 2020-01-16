import { checkAllElements, TabElement } from '../tabbing-order';

export function consentManagementTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/consents');

  cy.get('.cx-consent-action-links a.cx-action-link')
    .contains('Clear all')
    .first()
    .focus(); // focus the first element

  cy.get('cx-consent-management-form'); // wait for the form to render

  checkAllElements(config);
}
