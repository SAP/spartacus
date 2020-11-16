import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import { checkBanner } from './homepage';
import { generateMail, randomString } from './user';
import { signOut } from './register';
export const UPDATE_EMAIL = '/my-account/update-email';
export const password = 'Password123.';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function accessPageAsAnonymous() {
  cy.visit(UPDATE_EMAIL);
  cy.location('pathname').should('contain', '/login');
}

export function cancelUpdateEmailAction() {
  cy.get('cx-update-email button[type="button"]').click();
  checkBanner();

  cy.location('pathname').should('contain', '/');
}

export function updateEmail() {
  const newUid = generateMail(randomString(), true);
  cy.get('cx-update-email [formcontrolname="email"]').type(newUid);
  cy.get('cx-update-email [formcontrolname="confirmEmail"]').type(newUid);
  cy.get('cx-update-email [formcontrolname="password"]').type(password);

  cy.get('cx-update-email button[type="submit"]').click();

  cy.get('cx-login-form').should('exist');

  alerts
    .getSuccessAlert()
    .should('contain', `Success. Please sign in with ${newUid}`);

  // verify you can login with the new email address
  login(newUid, password);
  // TODO: uncomment below component and remove update-email assertion when #1957 is implemented
  cy.get('cx-update-email').should('exist');
  // checkBanner();
}

export function verifyOldEmailInvalid() {
  signOut();
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
