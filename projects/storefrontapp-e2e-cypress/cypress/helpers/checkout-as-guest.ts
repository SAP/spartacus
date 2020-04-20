import { SampleUser, user } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';
import { ELECTRONICS_BASESITE } from './checkout-flow';

export function loginAsGuest(
  baseSite: string = ELECTRONICS_BASESITE,
  sampleUser: SampleUser = user
) {
  const guestLoginPage = checkout.waitForPage(
    '/checkout-login',
    'getguestLoginPage',
    baseSite
  );
  cy.get('.register')
    .getByText(/Guest Checkout/i)
    .click();
  cy.wait(`@${guestLoginPage}`).its('status').should('eq', 200);
  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]').clear().type(sampleUser.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(sampleUser.email);
    cy.get('button[type=submit]').click();
  });
  const shippingPage = checkout.waitForPage(
    '/checkout/shipping-address',
    'getShippingPage',
    baseSite
  );
  cy.wait(`@${shippingPage}`).its('status').should('eq', 200);
}

export function createAccountFromGuest(
  password: string,
  baseSite: string = ELECTRONICS_BASESITE
) {
  const homePage = checkout.waitForPage('homepage', 'getHomePage', baseSite);

  cy.get('cx-guest-register-form').within(() => {
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('[formcontrolname="passwordconf"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
  cy.wait(`@${homePage}`).its('status').should('eq', 200);
}
