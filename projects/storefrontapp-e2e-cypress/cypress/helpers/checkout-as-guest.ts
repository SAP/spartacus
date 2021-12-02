import { SampleUser, user } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';
import { assertAddressForm } from './address-book';
import { validateUpdateProfileForm } from './update-profile';

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

export function testCheckoutAsGuest(){
  it('should perform checkout as guest and create a user account', () => {
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndProceedToCheckout();

    cy.get('.register').findByText(/Guest Checkout/i);

    loginAsGuest(user);

    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.placeOrderWithCheapProduct();
    checkout.verifyOrderConfirmationPageWithCheapProduct();

    createAccountFromGuest(user.password);

    cy.selectUserMenuOption({
      option: 'Address Book',
    });

    assertAddressForm(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: '',
        address: user.address,
      },
      'US-CA'
    );

    cy.selectUserMenuOption({
      option: 'Payment Details',
    });

    cy.get('.cx-payment .cx-body').then(() => {
      cy.get('cx-card').should('exist');
    });

    cy.selectUserMenuOption({
      option: 'Personal Details',
    });

    validateUpdateProfileForm('mr', user.firstName, user.lastName);
    checkout.signOut();
  });
}
