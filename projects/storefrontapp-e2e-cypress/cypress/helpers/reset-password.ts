import * as alerts from './global-message';

export function submitEmptyForm() {
    // Submitting an empty form should not proceed. Detailed form validation cases are covered by unit tests.
    alerts.getAlert().should('not.exist');

    cy.get('cx-reset-password-form form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login\/pw\/change$/);
    alerts.getAlert().should('not.exist');
}

export function submitWithoutToken() {
    // The form is submited without a change password token. An error message should appear and the page should not change.
    alerts.getErrorAlert().should('not.exist');
    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login\/pw\/change$/);
    alerts.getErrorAlert().should('exist');
}

export function resetPassword() {
    // We use a mock because the change password token required is only available from a reset password email.
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/resetpassword*',
      status: 202,
      response: {},
    }).as('postResetPassword');
    alerts.getSuccessAlert().should('not.exist');

    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login$/);
    alerts
      .getSuccessAlert()
      .should('contain', 'Success! You can now login using your new password.');
}

export function resetPasswordTest() {
  it('should not submit an empty form', () => {
    submitEmptyForm();
  });

  it('should invalid token result in server error', () => {
    submitWithoutToken();
  });

  it('should react as expected on password change success.', () => {
    resetPassword();
  });
}