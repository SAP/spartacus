context('Reset Password Page', () => {
  beforeEach(() => {
    // Clear the session to make sure no user is athenticated.
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/login/pw/change');
  });

  it('should not submit an empty form', () => {
    cy.get('cx-reset-password-form form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    // Submitting an empty form should not move on to the next page.
    // Form validations are covered by unit tests.
    cy.url().should('match', /\/login\/pw\/change$/);
    // No global messages should appear.
    cy.get('cx-global-message .alert').should('not.exist');
  });

  it('should an invalid token result in server error', () => {
    // Assert there are no error messages already.
    cy.get('cx-global-message .alert-danger').should('not.exist');
    // The form is submited without any a change password token,
    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    cy.url().should('match', /\/login\/pw\/change$/);
    // A global error message should appear.
    cy.get('cx-global-message .alert-danger').should('exist');
  });

  it('should react as expected on password change success.', () => {
    // We use a mock a success response to th resetpassword request because the
    // change password token required is only available from a reset password email.
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/resetpassword*',
      status: 202,
      response: {}
    }).as('postResetPassword');
    // Assert there are no messages already.
    cy.get('cx-global-message div.alert').should('not.exist');
    // The form is submitted to the Cypress mock endpoint.
    cy.get('cx-reset-password-form form').within(() => {
      cy.get('[formcontrolname="password"]').type('N3wPassword!');
      cy.get('[formcontrolname="repassword"]').type('N3wPassword!');
      cy.get('button[type="submit"]').click();
    });
    // The app should go back to the login page.
    cy.url().should('match', /\/login$/);
    // A global success message should appear.
    cy.get('cx-global-message .alert-info').should(
      'contain',
      'Success! You can now login using your new password.'
    );
  });
});
