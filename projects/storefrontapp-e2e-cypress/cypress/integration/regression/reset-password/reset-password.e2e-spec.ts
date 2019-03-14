context('Reset Password Page', () => {
  beforeEach(() => {
    // Clear the session to make sure no user is authenticated.
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/login/pw/change');
  });

  it('should not submit an empty form', () => {
    // Submitting an empty form should not procede. Detailed form validation cases are covered by unit tests.
    cy.get('cx-global-message .alert').should('not.exist');

    cy.get('cx-reset-password-form form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login\/pw\/change$/);
    cy.get('cx-global-message .alert').should('not.exist');
  });

  it('should invalid token result in server error', () => {
    // The form is submited without any a change password token. An error message should appear and the page should not change.
    cy.get('cx-global-message .alert-danger').should('not.exist');
    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login\/pw\/change$/);
    cy.get('cx-global-message .alert-danger').should('exist');
  });

  it('should react as expected on password change success.', () => {
    // We use a mock because the change password token required is only available from a reset password email.
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/resetpassword*',
      status: 202,
      response: {}
    }).as('postResetPassword');
    cy.get('cx-global-message .alert-info').should('not.exist');

    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login$/);
    cy.get('cx-global-message .alert-info').should(
      'contain',
      'Success! You can now login using your new password.'
    );
  });
});
