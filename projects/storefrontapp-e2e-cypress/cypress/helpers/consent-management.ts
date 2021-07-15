import * as alerts from './global-message';

export function giveConsent() {
  cy.get('input[type="checkbox"]').first().should('not.be.checked');
  cy.get('input[type="checkbox"]').first().check();
  cy.get('input[type="checkbox"]').first().should('be.checked');

  alerts.getSuccessAlert().should('contain', 'Consent successfully given');
}
