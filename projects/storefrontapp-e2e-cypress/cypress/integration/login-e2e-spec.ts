import { user } from '../sample-data/big-happy-path';
import { register, login } from '../helpers/auth-forms';

describe('Login', () => {
  before(() => {
    // Go to Home
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');

    // Register a new user.
    cy.get('cx-login [role="link"]').click();
    cy.get('cx-page-layout')
      .getByText('Register')
      .click();
    register(user);

    // check if the the user exist in the dom
    cy.get('cx-login .cx-login-status__greet').should('exist');
    cy.get('cx-login .cx-login-status__greet').should('contain', user.fullName);

    // sign out by going through the dropdown
    cy.selectUserMenuOption('Sign Out');

    // check if the user no long exist in the dom
    cy.get('cx-login .cx-login-status__greet').should('not.exist');
  });

  it('should login successfully with correct credentials', () => {
    // Login again
    cy.get('cx-login [role="link"]').click();
    login(user.email, user.password);

    // check if the the username exist in the dom
    cy.get('cx-login .cx-login-status__greet').should('exist');
    cy.get('cx-login .cx-login-status__greet').should('contain', user.fullName);

    // sign out by going through the dropdown
    cy.selectUserMenuOption('Sign Out');

    // check if the user no long exist in the dom
    cy.get('cx-login .cx-login-status__greet').should('not.exist');
  });

  it('login should fail if password is wrong', () => {
    // click sign in
    cy.get('cx-login [role="link"]').click();

    // input false password
    login(user.email, 'Password321');

    // check if user no longer exist in the dom
    cy.get('cx-login .cx-login-status__greet').should('not.exist');

    cy.get('cx-global-message .alert-danger').should(
      'contain',
      'Bad credentials. Please login again'
    );
  });
});
