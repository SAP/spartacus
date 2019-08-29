import * as alerts from './global-message';

export function submitInvalidForm() {
  cy.get('cx-forgot-password form').within(() => {
    cy.get('button[type="submit"]').click();
  });
  // Submitting an invalid form should not move on to the next page.
  // Form validations are covered by unit tests.
  cy.url().should('match', /\/forgot-password/);
}

export function cancelForgotPasswordAction() {
    // Click 'Cancel'
    cy.get('cx-forgot-password a')
      .contains('Cancel')
      .click();
    // After requesting a reset password email, we should be taken back to the login page
    cy.url().should('match', /\/login/);
}

export function submitForgotPassword() {
  cy.get('cx-forgot-password form').within(() => {
    cy.get('[formcontrolname="userEmail"]').type(getRandomEmailAddress());
    cy.get('button[type="submit"]').click();
  });
  // After requesting a reset password email, we should be taken back to the login page
  cy.url().should('match', /\/login/);
  // ... and display a success message.
  alerts
    .getSuccessAlert()
    .should(
      'contain',
      'An email has been sent to you with information on how to reset your password.'
    );
}

function getRandomEmailAddress() {
  return Math.random().toString(36) + '@e2e-test.com';
}

export function forgotPasswordTest() {
  it('should not submit an invalid form', () => {
    submitInvalidForm();
  });

  it('should go back to the login page on cancel.', () => {
    cancelForgotPasswordAction();
  });

  it('should request password reset email on submit', () => {
    submitForgotPassword();
  });
}