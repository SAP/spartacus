import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { checkBanner } from './homepage';
import { signOut } from './register';
import { generateMail, randomString } from './user';
export const UPDATE_EMAIL = '/my-account/update-email';
export const password = 'Password123.';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.visit('/');
}

export function accessPageAsAnonymous() {
  cy.visit(UPDATE_EMAIL);
  cy.location('pathname').should('contain', '/login');
}

export function accessUpdateEmailPage() {
  cy.get('cx-page-layout cx-login')
    .getByText('My Account')
    .click({ force: true });
  cy.get('nav')
    .getByText('Email Address')
    .click({ force: true });
}

export function cancelUpdateEmailAction() {
  cy.get('cx-update-email-form button[type="button"]').click();
  checkBanner();

  cy.location('pathname').should('contain', '/');
}

export function updateEmail() {
  const newUid = generateMail(randomString(), true);
  accessUpdateEmailPage();
  cy.get('cx-update-email-form [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email-form [formcontrolname="password"]').type(password);

  cy.get('cx-update-email-form button[type="submit"]').click();

  cy.get('cx-login-form').should('exist');

  alerts
    .getSuccessAlert()
    .should('contain', `Success. Please sign in with ${newUid}`);

  // verify you can login with the new email address
  login(newUid, password);
  // TODO: uncomment below component and remove update-email assertion when #1957 is implemented
  cy.get('cx-update-email').should('exist');
  // checkBanner();
  signOut();
}

export function verifyOldEmailInvalid() {
  cy.visit('/login');
  login(
    standardUser.registrationData.email,
    standardUser.registrationData.password
  );
  alerts.getErrorAlert().should('contain', 'Bad credentials');
}

export function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

export function updateEmailTest() {
  it('should register and login a user', () => {
    registerAndLogin();
  });

  it('should be able to go to Update Email Page', () => {
    accessUpdateEmailPage();
  });

  it('should be able to cancel and go back to home', () => {
    cancelUpdateEmailAction();
  });

  it('should be able to update the email address and login with it', () => {
    updateEmail();
  });

  it('should not allow login with old email address', () => {
    verifyOldEmailInvalid();
  });
}
