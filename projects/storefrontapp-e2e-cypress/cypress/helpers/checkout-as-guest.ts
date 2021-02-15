import { SampleUser, user } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';
import { CMS_SHIPPING_ADDRESS_PAGE } from './interceptors';

export function loginAsGuest(sampleUser: SampleUser = user) {
  const guestLoginPage = checkout.waitForPage(
    '/checkout-login',
    'getguestLoginPage'
  );
  cy.get('.register')
    .findByText(/Guest Checkout/i)
    .click();
  cy.wait(guestLoginPage).its('response.statusCode').should('eq', 200);
  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]').clear().type(sampleUser.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(sampleUser.email);
    cy.get('button[type=submit]').click();
  });
  cy.wait(CMS_SHIPPING_ADDRESS_PAGE)
    .its('response.statusCode')
    .should('eq', 200);
}

export function createAccountFromGuest(password: string) {
  cy.get('cx-guest-register-form').within(() => {
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('[formcontrolname="passwordconf"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}
