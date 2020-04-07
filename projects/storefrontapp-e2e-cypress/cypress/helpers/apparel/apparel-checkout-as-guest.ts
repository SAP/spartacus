import { variantUser } from '../../sample-data/apparel-checkout-flow';

export function loginAsGuest() {
  cy.get('.register').getByText(/Guest Checkout/i);
  cy.get('.register')
    .getByText(/Guest Checkout/i)
    .click();
  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]')
      .clear()
      .type(variantUser.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(variantUser.email);
    cy.get('button[type=submit]').click();
  });
}
