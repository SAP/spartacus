import { user } from '../sample-data/big-happy-path';
import { register, login } from './auth-forms';

export const userGreetSelector = 'cx-login .cx-login-status__greet';
export const loginLinkSelector = 'cx-login [role="link"]';

export function loginPageAndRegister() {
  cy.get(loginLinkSelector).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click();
  register(user);
}

export function verifyUser() {
  cy.get(userGreetSelector).should('contain', user.fullName);

  cy.selectUserMenuOption('Sign Out');

  cy.get(userGreetSelector).should('not.exist');
}

export function loginPageAndLogin() {
  cy.get(loginLinkSelector).click();
  login(user.email, user.password);
}

export function verifyFakeLogin() {
  cy.get(loginLinkSelector).click();

  login(user.email, 'Password321');

  cy.get(userGreetSelector).should('not.exist');

  cy.get('cx-global-message .alert-danger').should(
    'contain',
    'Bad credentials. Please login again'
  );
}
