export function getErrorAlert() {
  return cy.get('cx-global-message .alert-danger');
}

export function getSuccessAlert() {
  return cy.get('cx-global-message .alert-success');
}

export function getWarningAlert() {
  return cy.get('cx-global-message .alert-warning');
}

export function getAlert() {
  return cy.get('cx-global-message .alert');
}
