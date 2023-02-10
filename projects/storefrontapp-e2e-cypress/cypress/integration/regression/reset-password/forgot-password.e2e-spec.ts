import * as alerts from '../../../helpers/global-message';

context('Forgot Password Page', () => {
  beforeEach(() => {
    // Clear the session to make sure no user is athenticated.
    cy.window().then((win) => win.sessionStorage.clear());
    cy.visit('/login/forgot-password');
  });

  it('should request password reset email on submit', () => {
    cy.get('cx-forgot-password form').within(() => {
      cy.get('[formcontrolname="userEmail"]').type(getRandomEmailAddress());
      cy.get('button').click();
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
  });

  it('should not submit an invalid form', () => {
    cy.get('cx-forgot-password form').within(() => {
      cy.get('button').click();
    });
    // Submitting an invalid form should not move on to the next page.
    // Form validations are covered by unit tests.
    cy.url().should('match', /\/forgot-password/);
  });

  it('should go back to the login page on cancel.', () => {
    // Click 'Cancel'
    cy.get('cx-forgot-password a').contains('Cancel').click();
    // After requesting a reset password email, we should be taken back to the login page
    cy.url().should('match', /\/login/);
  });

  function getRandomEmailAddress() {
    return Math.random().toString(36) + '@e2e-test.com';
  }
});
