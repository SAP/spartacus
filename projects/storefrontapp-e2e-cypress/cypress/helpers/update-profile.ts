/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as login from '../helpers/login';
import { SampleUser } from '../sample-data/checkout-flow';
import { isolateTests } from '../support/utils/test-isolation';
import * as alerts from './global-message';
import { checkBanner } from './homepage';

export const newTitle = 'Dr.';
export const newFirstName = 'N';
export const newLastName = 'Z';
export const UPDATE_PROFILE_URL = '/my-account/update-profile';

export function updateProfile(user?: SampleUser) {
  if (Cypress.env('CX_MY_ACCOUNT_V2') === true) {
    cy.get('.editButton').click();
  }
  if (user) {
    cy.get('[formcontrolname="firstName"]').should(
      'have.value',
      user.firstName
    );
    cy.get('[formcontrolname="lastName"]').should('have.value', user.lastName);
  }
  cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
    cy.get('[formcontrolname="titleCode"]').ngSelect(newTitle);
    cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
    cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
    cy.get('button.btn-primary').click();
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
  cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
    cy.get('[formcontrolname="titleCode"] .ng-value-label').should(
      'have.text',
      title
    );
    cy.get('[formcontrolname="firstName"]').should('have.value', firstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', lastName);
  });
}

export function verifyUpdatedProfile() {
  // check where the user's details updated in the previous test
  if (Cypress.env('CX_MY_ACCOUNT_V2') === true) {
    cy.get('.editButton').click();
  }
  cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
    cy.get('[formcontrolname="titleCode"] .ng-value-label').should(
      'have.text',
      newTitle
    );
    cy.get('[formcontrolname="firstName"]').should('have.value', newFirstName);
    cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
  });
}

export function testUpdateProfileDetails() {
  it('should be able to update profile details', () => {
    if (Cypress.env('CX_MY_ACCOUNT_V2') === true) {
      cy.get('.editButton').click();
    }
    cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
      cy.get('[formcontrolname="titleCode"]').ngSelect(newTitle);
      cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
      cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
      cy.get('button.btn-primary').click();
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
    if (Cypress.env('CX_MY_ACCOUNT_V2') === true) {
      cy.get('.editButton').click();
    }
    // check where the user's details updated in the previous test
    cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
      cy.get('[formcontrolname="titleCode"] .ng-value-label').should(
        'have.text',
        newTitle
      );
      cy.get('[formcontrolname="firstName"]').should(
        'have.value',
        newFirstName
      );
      cy.get('[formcontrolname="lastName"]').should('have.value', newLastName);
    });
  });
}

export function testUpdateProfileLoggedInUser() {
  describe(
    'update profile test for logged in user',
    { testIsolation: false },
    () => {
      isolateTests();
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
    }
  );
}
