import { standardUser } from '../sample-data/shared-users';
import { login } from './auth-forms';
import * as alerts from './global-message';
import * as helper from './login';
import { generateMail, randomString } from './user';
export const password = 'Password123.';
export const PAGE_TITLE_UPDATE_PASSWORD = 'Update Password';
export const PAGE_TITLE_HOME = 'Homepage';
export const PAGE_URL_UPDATE_PASSWORD = '/my-account/update-password';
export const PAGE_URL_LOGIN = '/login';
export const newPassword = 'newPassword123!';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
}

export function accessPageAsAnonymous() {
  cy.visit(PAGE_URL_UPDATE_PASSWORD);
  cy.url().should('contain', PAGE_URL_LOGIN);
}

export function cancelUpdatePasswordAction() {
  cy.get('cx-update-password button[type="button"]').click();
  cy.title().should('eq', PAGE_TITLE_HOME);
  alerts.getAlert().should('not.exist');
}

export function updatePasswordInvalidPassword() {
  alerts.getErrorAlert().should('not.exist');
  cy.get('[formcontrolname="oldPassword"]').type('wrongpassword');
  cy.get('[formcontrolname="newPassword"]').type(newPassword);
  cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
  cy.get('cx-update-password button[type="submit"]').click();
  cy.url().should('contain', PAGE_URL_UPDATE_PASSWORD);
  alerts.getErrorAlert().should('exist');
}

export function updatePassword() {
  alerts.getSuccessAlert().should('not.exist');
  cy.get('[formcontrolname="oldPassword"]').type(
    standardUser.registrationData.password
  );
  cy.get('[formcontrolname="newPassword"]').type(newPassword);
  cy.get('[formcontrolname="newPasswordConfirm"]').type(newPassword);
  cy.get('cx-update-password button[type="submit"]').click();
  cy.title().should('eq', PAGE_TITLE_HOME);
  alerts.getSuccessAlert().should('exist');

  helper.signOutUser();
  cy.visit('/login');
  login(standardUser.registrationData.email, newPassword);
  cy.get(helper.userGreetSelector).should('exist');
}

export function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

export function updatePasswordTest() {
  it('should be able to cancel and go back to home', () => {
    cancelUpdatePasswordAction();
  });

  it('should display server error if old password is wrong', () => {
    updatePasswordInvalidPassword();
  });

  it('should update the password with success', () => {
    updatePassword();
  });
}
