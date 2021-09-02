import * as alerts from '../../../helpers/global-message';

context('Reset Password Page', () => {
  beforeEach(() => {
    // Clear the session to make sure no user is authenticated.
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/login/pw/change?token=123');
  });

  it('should not submit an empty form', () => {
    // Submitting an empty form should not procede. Detailed form validation cases are covered by unit tests.
    alerts.getAlert().should('not.exist');

    cy.get('cx-reset-password form button').click();
    cy.url().should('match', /\/login\/pw\/change\?token\=123$/);
    alerts.getAlert().should('not.exist');
  });

  it('should invalid token result in server error', () => {
    // The form is submitted without a change password token. An error message should appear and the page should not change.
    alerts.getErrorAlert().should('not.exist');
    cy.get('cx-reset-password form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="passwordConfirm"]').type('N3wPassword!');
      cy.get('button').click();
    });
    cy.url().should('match', /\/login\/pw\/change\?token\=123$/);
    alerts.getErrorAlert().should('exist');
  });

  it('should react as expected on password change success.', () => {
    // We use a mock because the change password token required is only available from a reset password email.
    cy.intercept(
      {
        method: 'POST',
        url: '**/resetpassword*',
      },
      {
        body: {},
        statusCode: 202,
      }
    ).as('postResetPassword');
    alerts.getSuccessAlert().should('not.exist');

    cy.get('cx-reset-password form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="passwordConfirm"]').type('N3wPassword!');
      cy.get('button').click();
    });
    cy.url().should('match', /\/login$/);
    alerts
      .getSuccessAlert()
      .should('contain', 'Success! You can now login using your new password.');
  });
});
