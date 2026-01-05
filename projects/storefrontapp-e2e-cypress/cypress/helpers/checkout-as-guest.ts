/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSampleUser, SampleUser, user } from '../sample-data/checkout-flow';
import { assertAddressForm } from './address-book';
import * as checkout from './checkout-flow';
import { AddressData } from './checkout-forms';
import { waitForPage } from './navigation';
import { validateUpdateProfileForm } from './update-profile';

export let guestUser;

export function generateGuestUser() {
  guestUser = getSampleUser();
}

export function loginAsGuest(sampleUser: SampleUser = user) {
  const guestLoginPage = waitForPage('/checkout-login', 'getGuestLoginPage');
  cy.get('.register')
    .findByText(/Guest Checkout/i)
    .click();
  cy.wait(`@${guestLoginPage}`).its('response.statusCode').should('eq', 200);

  const deliveryAddressPage = waitForPage(
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
    checkout.verifyDeliveryOptions();
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
      } as AddressData,
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

function fillGuestRegistrationForm(password: string) {
  cy.get('cx-guest-register-form').within(() => {
    cy.get('[formcontrolname="password"]').clear().type(password);
    cy.get('[formcontrolname="passwordconf"]').clear().type(password);
    cy.get('button[type=submit]').click();
  });
}

export function createAccountFromGuest(password: string, email?: string) {
  cy.whenJDK17(() => {
    const homePage = waitForPage('homepage', 'getHomePage');
    fillGuestRegistrationForm(password);
    cy.wait(`@${homePage}`);
    cy.get('cx-page-slot.Section1 cx-banner');
  });

  cy.whenJDK21(() => {
    const loginPage = waitForPage('/login', 'getLoginPage');
    fillGuestRegistrationForm(password);
    cy.wait(`@${loginPage}`);
    cy.location('pathname').should('include', '/login');
    cy.get('cx-login-form').within(() => {
      cy.get('input[name="username"]')
        .clear()
        .type(guestUser?.email ?? email);
      cy.get('input[name="password"]').clear().type(password);
      cy.get('button[type="submit"]').click();
    });
  });
}
