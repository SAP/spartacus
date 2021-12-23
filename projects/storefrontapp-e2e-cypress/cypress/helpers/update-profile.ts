import * as alerts from './global-message';
import { checkBanner } from './homepage';
import * as login from '../helpers/login';

export const newTitle = 'dr';
export const newFirstName = 'N';
export const newLastName = 'Z';
export const UPDATE_PROFILE_URL = '/my-account/update-profile';

export function updateProfile() {
  cy.get('cx-update-profile').within(() => {
    cy.get('[formcontrolname="titleCode"]').select(newTitle, { force: true });
    cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
    cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
    cy.get('button').click();
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

export function validateUpdateProfileForm(
  title: string,
  firstName: string,
  lastName: string
) {
  cy.get('cx-update-profile').within(() => {
    cy.get('[formcontrolname="titleCode"]')
      .find(':selected')
      .should('have.value', title);
    cy.get('[formcontrolname="firstName"]').should('have.value', firstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', lastName);
  });
}

export function verifyUpdatedProfile() {
  // check where the user's details updated in the previous test
  cy.get('cx-update-profile').within(() => {
    cy.get('[formcontrolname="titleCode"]')
      .find(':selected')
      .should('have.value', newTitle);
    cy.get('[formcontrolname="firstName"]').should('have.value', newFirstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
  });
}

export function testUpdateProfileDetails() {
  it('should be able to update profile details', () => {
    cy.get('cx-update-profile').within(() => {
      cy.get('[formcontrolname="titleCode"]').select(newTitle, { force: true });
      cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
      cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
      cy.get('button').click();
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
  });
}

export function testSeeNewProfileInfo() {
  it('should be able to see the new profile info', () => {
    // check where the user's details updated in the previous test
    cy.get('cx-update-profile').within(() => {
      cy.get('[formcontrolname="titleCode"]')
        .find(':selected')
        .should('have.value', newTitle);
      cy.get('[formcontrolname="firstName"]').should(
        'have.value',
        newFirstName
      );
      cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
    });
  });
}

export function testUpdateProfileLoggedInUser() {
  describe('update profile test for logged in user', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.visit('/');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });
    });

    testUpdateProfileDetails();
    testSeeNewProfileInfo();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
}
