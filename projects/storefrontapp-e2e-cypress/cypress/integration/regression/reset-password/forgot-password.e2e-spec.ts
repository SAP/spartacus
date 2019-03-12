context('Forgot Password Page', () => {
  before(() => {
    cy.visit('/forgot-password');
  });

  it('should request password reset email', () => {
    cy.get('cx-forgot-password form').within(() => {
      cy.get('[formcontrolname="userEmail"]').type('test@test.com');
      cy.get('button[type="submit"]').click();
    });
    // After requesting a reset password email, we should be taken back to the login page
    cy.url().should('match', /\/login/);
    // ... and display a success message.
    cy.get('cx-global-message .alert-info').should(
      'contain',
      'An email has been sent to you with information on how to reset your password.'
    );
  });
});
