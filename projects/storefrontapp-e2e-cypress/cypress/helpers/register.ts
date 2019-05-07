import { user } from '../sample-data/checkout-flow';
import { register } from './auth-forms';

export const loginLink = 'cx-login [role="link"]';

export function registerUser() {
  cy.get(loginLink).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click();
  register(user);
}

export function checkTermsAndConditions() {
  const termsLink = '/electronics-spa/en/USD/termsAndConditions';
  cy.visit('/register');
  cy.getByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'href', termsLink);
  cy.visit(termsLink);
  cy.get('.title_holder h2').should('contain', 'Terms and Conditions');
}

export function signOut() {
  cy.selectUserMenuOption('Sign Out');
  cy.visit('/');
}

export function verifyFailedRegistration() {
  cy.get('cx-global-message .alert-danger').should('contain', user.email);
  cy.url().should('match', /\/register/);
}
