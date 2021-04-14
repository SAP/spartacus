import * as alerts from './global-message';
import { checkBanner } from './homepage';

export const newTitle = 'dr';
export const newFirstName = 'N';
export const newLastName = 'Z';

export function updateProfile() {
  cy.get('cx-update-profile').within(() => {
    cy.get('[formcontrolname="titleCode"]').select(newTitle);
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
