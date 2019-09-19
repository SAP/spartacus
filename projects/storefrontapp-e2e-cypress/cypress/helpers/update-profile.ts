import { standardUser } from '../sample-data/shared-users';
import * as alerts from './global-message';
import { checkBanner } from './homepage';
import { signOut } from './register';
import { generateMail, randomString } from './user';
export const UPDATE_PROFILE_URL = '/my-account/update-profile';
export const newTitle = 'dr';
export const newFirstName = 'N';
export const newLastName = 'Z';

export function registerAndLogin() {
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.visit('/');
}

export function accessPageAsAnonymous() {
  cy.visit(UPDATE_PROFILE_URL);
  cy.location('pathname').should('contain', '/login');
}

export function accessUpdateProfilePage() {
  cy.get('cx-page-layout cx-login')
    .getByText('My Account')
    .click({ force: true });
  cy.get('nav')
    .getByText('Personal Details')
    .click({ force: true });
}

export function cancelUpdateProfileAction() {
  cy.get('cx-update-profile-form').within(() => {
    cy.get('button[type="button"]').click();
  });
  checkBanner();

  cy.location('pathname').should('contain', '/');
}

export function updateProfile() {
  accessUpdateProfilePage();
  cy.get('cx-update-profile-form').within(() => {
    cy.get('[formcontrolname="titleCode"]').select(newTitle);
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(newFirstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(newLastName);
    cy.get('button[type="submit"]').click();
  });

  // check for the global message and home screen
  alerts
    .getSuccessAlert()
    .should('contain', 'Personal details successfully updated');
  checkBanner();

  // check is the new name displayed in the upper right corner
  cy.get('.cx-login-greet').should(
    'contain',
    `Hi, ${newFirstName} ${newLastName}`
  );
}

export function verifyUpdatedProfile() {
  // check where the user's details updated in the previous test
  accessUpdateProfilePage();
  cy.get('cx-update-profile-form').within(() => {
    cy.get('[formcontrolname="titleCode"]')
      .find(':selected')
      .should('have.value', newTitle);
    cy.get('[formcontrolname="firstName"]').should('have.value', newFirstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
  });
  signOut();
}

export function verifyAsAnonymous() {
  it('should redirect to login page for anonymous user', () => {
    accessPageAsAnonymous();
  });
}

export function validateUpdateProfileForm(
  title: string,
  firstName: string,
  lastName: string
) {
  cy.get('cx-update-profile-form').within(() => {
    cy.get('[formcontrolname="titleCode"]')
      .find(':selected')
      .should('have.value', title);
    cy.get('[formcontrolname="firstName"]').should('have.value', firstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', lastName);
  });
}

export function updateProfileTest() {
  it('should register and login a user', () => {
    registerAndLogin();
  });

  it('should be able to go to Update Email Page', () => {
    accessUpdateProfilePage();
  });

  it('should be able to cancel and go back to home', () => {
    cancelUpdateProfileAction();
  });

  it('should be able to update profile details', () => {
    updateProfile();
  });

  it('should be able to see the new profile info', () => {
    verifyUpdatedProfile();
  });
}
