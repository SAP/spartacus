import { user } from '../sample-data/big-happy-path';
import { register, login } from './auth-forms';

export const userGreetSelector = 'cx-login .cx-login-status__greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export function registerUser() {
  cy.get(loginLinkSelector).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click();
  register(user);
  cy.get(userGreetSelector).should('contain', user.fullName);
}

export function signOutUser() {
  cy.selectUserMenuOption('Sign Out');

  cy.get(userGreetSelector).should('not.exist');
}

export function loginUser() {
  cy.get(loginLinkSelector).click();
  login(user.email, user.password);
}

export function loginWithBathCredentials() {
  cy.get(loginLinkSelector).click();

  login(user.email, 'Password321');

  cy.get(userGreetSelector).should('not.exist');

  cy.get('cx-global-message .alert-danger').should(
    'contain',
    'Bad credentials. Please login again'
  );
}
