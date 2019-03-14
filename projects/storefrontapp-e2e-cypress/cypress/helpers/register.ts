import { user } from '../sample-data/big-happy-path';
import { register } from './auth-forms';

export const loginLink = 'cx-login [role="link"]';

export function loginPageAndRegister() {
  cy.get(loginLink).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click();
  register(user);
}

export function signOut() {
  cy.selectUserMenuOption('Sign Out');

  // attempt to register the same user again
  cy.visit('/');
}

export function verifyFailedRegistration() {
  cy.get('cx-global-message .alert-danger').should('contain', user.email);

  // the url should be still the same
  cy.url().should('match', /\/register/);
}
