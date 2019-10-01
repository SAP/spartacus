import * as alerts from './global-message';
import { checkBanner } from './homepage';
export const UPDATE_PROFILE_URL = '/my-account/update-profile';
export const newTitle = 'dr';
export const newFirstName = 'N';
export const newLastName = 'Z';

export function accessPageAsAnonymous() {
  cy.visit(UPDATE_PROFILE_URL);
  cy.location('pathname').should('contain', '/login');
}

export function cancelUpdateProfileAction() {
  cy.get('cx-update-profile-form').within(() => {
    cy.get('button[type="button"]').click();
  });
  checkBanner();

  cy.location('pathname').should('contain', '/');
}

export function updateProfile() {
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
  cy.get('cx-update-profile-form').within(() => {
    cy.get('[formcontrolname="titleCode"]')
      .find(':selected')
      .should('have.value', newTitle);
    cy.get('[formcontrolname="firstName"]').should('have.value', newFirstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
  });
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
