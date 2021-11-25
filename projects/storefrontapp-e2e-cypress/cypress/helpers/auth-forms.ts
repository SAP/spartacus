/* Use this methods if you need to test UI for login/register (eg. form validation).
 If you only need to be logged in to check other feature use `requireLoggedIn` command */

import { SampleUser } from '../sample-data/checkout-flow';

export interface LoginUser {
  username: string;
  password: string;
}

export function fillRegistrationForm(
  { firstName, lastName, email, password }: SampleUser,
  giveRegistrationConsent,
  hiddenConsent?
) {
  cy.log(`🛒 Registering user ${email} from the registration page`);
  cy.get('cx-register form').should('be.visible');
  cy.get('cx-register form').within(() => {
    cy.get('[formcontrolname="titleCode"]').select('mr');
    cy.get('[formcontrolname="firstName"]').type(firstName);
    cy.get('[formcontrolname="lastName"]').type(lastName);
    cy.get('[formcontrolname="email"]').type(email);
    cy.get('[formcontrolname="password"]').type(password);
    cy.get('[formcontrolname="passwordconf"]').type(password);
    if (giveRegistrationConsent) {
      cy.get('[formcontrolname="newsletter"]').check();
      if (hiddenConsent) {
        cy.get('[formcontrolname="newsletter"]')
          .siblings('.form-check-label')
          .should('contain', hiddenConsent);
      }
    }
    cy.get('[formcontrolname="termsandconditions"]').check();
  });
}

export function fillLoginForm({ username, password }: LoginUser) {
  cy.log(`🛒 Logging in user ${username} from the login form`);
  cy.get('cx-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(username);
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}

export function register(
  user: SampleUser,
  giveRegistrationConsent = false,
  hiddenConsent?
) {
  fillRegistrationForm(user, giveRegistrationConsent, hiddenConsent);
  cy.get('cx-register form').within(() => {
    cy.get('button[type="submit"]').click();
  });
}

export function login(username: string, password: string) {
  fillLoginForm({ username, password });
}
