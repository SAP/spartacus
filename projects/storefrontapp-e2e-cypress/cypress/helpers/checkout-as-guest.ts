/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSampleUser, SampleUser, user } from '../sample-data/checkout-flow';
import { assertAddressForm } from './address-book';
import * as checkout from './checkout-flow';
import { waitForPage } from './checkout-flow';
import { validateUpdateProfileForm } from './update-profile';

export let guestUser;

export function generateGuestUser() {
  guestUser = getSampleUser();
}

export function loginAsGuest(sampleUser: SampleUser = user) {
  const guestLoginPage = checkout.waitForPage(
    '/checkout-login',
    'getGuestLoginPage'
  );
  cy.get('.register')
    .findByText(/Guest Checkout/i)
    .click();
  cy.wait(`@${guestLoginPage}`).its('response.statusCode').should('eq', 200);

  const deliveryAddressPage = checkout.waitForPage(
    '/checkout/delivery-address',
    'getDeliveryAddressPage'
  );

  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]').clear().type(sampleUser.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(sampleUser.email);
    cy.get('button[type=submit]').click();
  });
  cy.wait(`@${deliveryAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function testCheckoutAsGuest() {
  it('should perform checkout as guest and create a user account', () => {
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndProceedToCheckout();

    cy.get('.register').findByText(/Guest Checkout/i);

    loginAsGuest(guestUser);

    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.placeOrderWithCheapProduct();
    checkout.verifyOrderConfirmationPageWithCheapProduct();

    createAccountFromGuest(guestUser.password);

    cy.selectUserMenuOption({
      option: 'Address Book',
    });

    assertAddressForm(
      {
        firstName: guestUser.firstName,
        lastName: guestUser.lastName,
        phone: '',
        address: guestUser.address,
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

    validateUpdateProfileForm('Mr.', guestUser.firstName, guestUser.lastName);
    checkout.signOut();
  });
}

export function createAccountFromGuest(password: string) {
  const homePage = waitForPage('homepage', 'getHomePage');
  cy.get('cx-guest-register-form').within(() => {
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('[formcontrolname="passwordconf"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });

  cy.wait(`@${homePage}`);
  cy.get('cx-page-slot.Section1 cx-banner');
}
