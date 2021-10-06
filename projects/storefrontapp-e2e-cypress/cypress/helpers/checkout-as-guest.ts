import { SampleUser, user } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';

export function loginAsGuest(sampleUser: SampleUser = user) {
  const guestLoginPage = checkout.waitForPage(
    '/checkout-login',
    'getGuestLoginPage'
  );
  cy.get('.register')
    .findByText(/Guest Checkout/i)
    .click();
  cy.wait(`@${guestLoginPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]').clear().type(sampleUser.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(sampleUser.email);
    cy.get('button[type=submit]').click();
  });
  const shippingPage = checkout.waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );
  cy.wait(`@${shippingPage}`).its('response.statusCode').should('eq', 200);
}

export function createAccountFromGuest(password: string) {
  cy.get('cx-guest-register-form').within(() => {
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('[formcontrolname="passwordconf"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}
