import { register } from './auth-forms';
import * as alerts from './global-message';

export const loginLink = 'cx-login [role="link"]';

export function registerUser(user) {
  cy.getByText(/Sign in \/ Register/i).click();
  cy.get('cx-page-layout').getByText('Register').click({ force: true });
  register(user);
}

export function navigateToTermsAndConditions() {
  const termsLink = '/electronics-spa/en/USD/terms-and-conditions';
  cy.visit('/login/register');
  cy.getByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'href', termsLink);
  cy.visit(termsLink);
  checkTermsAndConditions();
}

export function checkTermsAndConditions() {
  cy.get('.title_holder h2').should('contain', 'Terms and Conditions');
}

export function signOut() {
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/cms/pages?*/logout*').as('logOut');
  cy.selectUserMenuOption({
    option: 'Sign Out',
  });
  cy.wait('@logOut');
  cy.visit('/');
}

export function verifyFailedRegistration() {
  alerts
    .getErrorAlert()
    .should('contain', 'Bad credentials. Please login again.');
  cy.url().should('match', /\/login\/register/);
}

export function verifyGlobalMessageAfterRegistration() {
  const alert = alerts.getSuccessAlert();

  alert.should('contain', 'Please log in with provided credentials.');
  cy.url().should('match', /\/login/);
}
