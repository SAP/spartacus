import { user } from '../../../sample-data/checkout-flow';
const UPDATED_NAME = ' updated';
export function registerUser() {
  cy.findByText("Don't have an account yet?").click();
  cy.wait(2000);
  register();
}

export function register() {
  fillAndSubmitRegistrationForm();
}

export function fillAndSubmitRegistrationForm() {
  cy.get('[id="register-site-login"]').within(() => {
    cy.get('[placeholder="Email *"]').type(user.email);
    cy.get('[placeholder="First name"]').type(user.firstName);
    cy.get('[placeholder="Last name"]').type(user.lastName);
    cy.get('[placeholder="Password *"]').type(user.password);
    cy.get('[placeholder="Confirm password *"]').type(user.password);
    cy.get(
      '[data-gigya-name="preferences.terms.test.terms.of.use.isConsentGranted"]'
    ).check();
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function login() {
  cy.get('[id="gigya-login-form"]').within(() => {
    cy.get('[placeholder="Email *"]').type(user.email);
    cy.get('[placeholder="Password *"]').type(user.password);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function verifyLoginOrRegistrationSuccess() {
  cy.get('[class="cx-login-greet"]').should('contain', user.fullName);
}

export function updateUserProfile() {
  cy.get('[id="gigya-profile-form"]').within(() => {
    cy.get('[name="profile.lastName"]').type(UPDATED_NAME);
    cy.get('[class="gigya-input-submit"]').click();
  });
}

export function verifyProfileUpdateSuccess() {
  cy.get('[class="cx-login-greet"]').should(
    'contain',
    user.fullName + UPDATED_NAME
  );
}
