export function getErrorAlert() {
  return cy.get('cx-global-message .alert-danger');
}

export function getSuccessAlert() {
  return cy.get('cx-global-message .alert-success');
}
