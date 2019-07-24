import { register } from './auth-forms';

export const loginLink = 'cx-login [role="link"]';

export function registerUser(user) {
  cy.get(loginLink).click();
  cy.get('cx-page-layout')
    .getByText('Register')
    .click();
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
  cy.get('cx-global-message .alert-danger').should(
    'contain',
    'Bad credentials. Please login again.'
  );
  cy.url().should('match', /\/login\/register/);
}

export function verifyGlobalMessageAfterRegistration() {
  cy.get('cx-global-message .alert-warning').should(
    'contain',
    'Please log in with your new credentials.'
  );
  cy.url().should('match', /\/login/);
}
