import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { generateMail, randomString } from './user';

export const CLOSE_ACCOUNT = '/my-account/close-account';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.visit('/');
}
export function accessPageAsAnonymous() {
  cy.visit(CLOSE_ACCOUNT);
  cy.location('pathname').should('contain', '/login');
}

export function accessCloseAccountPage() {
  cy.get('cx-page-layout cx-login')
    .getByText('My Account')
    .click({ force: true });
  cy.get('nav')
    .getByText('Close Account')
    .click({ force: true });
}
export function cancelCloseAccountAction() {
  cy.get('cx-close-account a').click({ force: true });
  cy.location('pathname').should('contain', '/');
}

export function closeAccount() {
  cy.server();
  cy.route('DELETE', '/rest/v2/electronics-spa/users/*').as('deleteQuery');
  accessCloseAccountPage();
  cy.location('pathname').should('contain', CLOSE_ACCOUNT);

  cy.get('cx-close-account button').click({ force: true });

  cy.get('cx-close-account-modal .cx-btn-group button:first-of-type').click();

  cy.wait('@deleteQuery');

  cy.location('pathname').should('contain', '/');

  alerts.getSuccessAlert().should('contain', 'Account closed with success');
}

export function verifyAccountClosed() {
  cy.visit('/login');
  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );

  cy.location('pathname').should('contain', '/login');
  alerts.getErrorAlert().should('contain', 'User is disabled');
}

export function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

export function closeAccountTest() {
  it('should register and login a user', () => {
    registerAndLogin();
  });

  it('should be able to go to Close Account Page', () => {
    accessCloseAccountPage();
  });
  it('should be able to cancel and go back to home', () => {
    cancelCloseAccountAction();
  });

  it('should be able to close account', () => {
    closeAccount();
  });

  it('should not allow login on closed account', () => {
    verifyAccountClosed();
  });
}
