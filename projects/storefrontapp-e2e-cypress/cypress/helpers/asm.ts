/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as addressBook from '../helpers/address-book';
import * as asm from '../helpers/asm';
import * as checkout from '../helpers/checkout-flow';
import { fillShippingAddress } from '../helpers/checkout-forms';
import * as consent from '../helpers/consent-management';
import * as profile from '../helpers/update-profile';
import { SampleUser } from '../sample-data/checkout-flow';
import {
  interceptGet,
  interceptPatch,
  interceptPost,
} from '../support/utils/intercept';
import { login } from './auth-forms';
import * as loginHelper from './login';
import {
  navigateToAMyAccountPage,
  navigateToCategory,
  waitForPage,
} from './navigation';

export function listenForAuthenticationRequest(): string {
  return interceptPost(
    'csAgentAuthentication',
    '/authorizationserver/oauth/token',
    false
  );
}

export function listenForCustomerSearchRequest(): string {
  return interceptGet(
    'customerSearch',
    '/assistedservicewebservices/customers/search?*',
    false
  );
}

export function listenForCustomerListsRequest(): string {
  return interceptGet(
    'customerLists',
    '/assistedservicewebservices/customerlists?*',
    false
  );
}

export function listenForUserDetailsRequest(b2b = false): string {
  if (b2b) {
    return interceptGet('userDetails', '/orgUsers/*');
  } else {
    return interceptGet('userDetails', '/users/*');
  }
}

export function listenForCartBindingRequest(): string {
  return interceptPost(
    'cartBinding',
    '/assistedservicewebservices/bind-cart?*',
    false
  );
}

export function listenForCartSaveRequest(options?: { cartId: string }): string {
  const cartId = options?.cartId ?? '*';
  return interceptPatch('cartSaving', `/users/*/carts/${cartId}/save?*`, true);
}

export function listenForListOfAddressesRequest(): string {
  return interceptGet('addresses', '/users/**/addresses?*');
}

export function agentLogin(): void {
  const authRequest = listenForAuthenticationRequest();
  cy.get('cx-storefront').within(() => {
    cy.get('cx-csagent-login-form').should('exist');
    cy.get('cx-customer-selection').should('not.exist');
    cy.get('cx-csagent-login-form form').within(() => {
      cy.get('[formcontrolname="userId"]')
        .should('not.be.disabled')
        .type('asagent');
      cy.get('[formcontrolname="password"]')
        .should('not.be.disabled')
        .type('pw4all');
      cy.get('button[type="submit"]').click();
    });
  });

  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
}

export function asmOpenCustomerList(): void {
  cy.get('cx-asm-main-ui div.cx-asm-customer-list a').click();
  cy.get('cx-customer-list').should('exist');
  cy.get('cx-customer-list h2').should('exist');
}

export function asmCustomerLists(): void {
  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();
  const userDetailsRequestAlias = listenForUserDetailsRequest();

  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();

  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list table').should('exist');

  cy.log('--> checking customer list pagination');
  cy.get('cx-customer-list .cx-btn-previous').should('be.disabled');
  cy.get('cx-customer-list .cx-btn-next').then((button) => {
    cy.wrap(button).click();
    cy.wait(customerSearchRequestAlias)
      .its('response.statusCode')
      .should('eq', 200);
  });
  cy.get('cx-customer-list .cx-btn-previous').should('not.be.disabled');
  cy.get('cx-customer-list .cx-btn-previous').then((button) => {
    cy.wrap(button).click();
    cy.wait(customerSearchRequestAlias)
      .its('response.statusCode')
      .should('eq', 200);
  });

  cy.log('--> checking customer list sorting');
  cy.get('cx-customer-list .sort-selector').then((selects) => {
    let select = selects[0];
    cy.wrap(select)
      .click()
      .get('ng-dropdown-panel')
      .get('.ng-option')
      .eq(1)
      .then((item) => {
        cy.wrap(item).click();
        cy.wait(customerSearchRequestAlias)
          .its('response.statusCode')
          .should('eq', 200);
      });
  });
  cy.log('--> checking customer list group');
  cy.get('cx-customer-list ng-select.customer-list-selector').then(
    (selects) => {
      let select = selects[0];
      cy.wrap(select)
        .click()
        .get('ng-dropdown-panel')
        .get('.ng-option')
        .eq(1)
        .then((item) => {
          cy.wrap(item).click();
          cy.wait(customerSearchRequestAlias)
            .its('response.statusCode')
            .should('eq', 200);
        });
    }
  );

  cy.get('cx-customer-list button.close').click();
  cy.get('cx-customer-list').should('not.exist');

  cy.log('--> start emulation by click name');
  asm.asmOpenCustomerList();

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list')
    .find('.cx-btn-cell')
    .not('[aria-label="Order"]')
    .then(($rows) => {
      expect($rows.length).to.eq(5);
      cy.wrap($rows[0]).click();
      cy.get('cx-customer-list').should('not.exist');
    });
  cy.wait(userDetailsRequestAlias);

  cy.get('cx-customer-emulation').should('exist');

  cy.log('--> start emulation by click order');
  asm.asmOpenCustomerList();
  cy.get('cx-customer-list')
    .find('.cx-btn-cell')
    .filter('[aria-label="Order"]')
    .then(($rows) => {
      expect($rows.length).to.eq(5);
      cy.wrap($rows[0]).click();
      cy.get('cx-customer-list').should('not.exist');
      cy.get('cx-order-history').should('exist');
    });
}

export function startCustomerEmulation(customer, b2b = false): void {
  const customerSearchRequestAlias = listenForCustomerSearchRequest();
  const userDetailsRequestAlias = listenForUserDetailsRequest(b2b);

  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchTerm"]')
      .should('not.be.disabled')
      .type(customer.email);
    cy.get('[formcontrolname="searchTerm"]').should(
      'have.value',
      `${customer.email}`
    );
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('cx-customer-selection button[type="submit"]').click();

  cy.wait(userDetailsRequestAlias).its('response.statusCode').should('eq', 200);
  cy.get('cx-customer-emulation .cx-asm-customerInfo label.cx-asm-name').should(
    'contain',
    customer.fullName
  );
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-customer-emulation').should('be.visible');
}

export function loginCustomerInStorefront(customer) {
  const authRequest = listenForAuthenticationRequest();

  login(customer.email, customer.password);
  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
}

export function agentSignOut() {
  const tokenRevocationAlias = loginHelper.listenForTokenRevocationRequest();
  cy.get('button[title="Sign Out"]').click();
  // When the agent signs out, there are two revocations made simultaneously - the second one occasionally fails, though it is not necessary. We therefore are not interested in the status code of the second one.
  cy.wait(tokenRevocationAlias);
  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
}

export function assertCustomerIsSignedIn() {
  cy.get('cx-login div.cx-login-greet').should('exist');
}

export function testCustomerEmulation() {
  let customer: SampleUser;

  it('should test customer emulation', () => {
    checkout.visitHomePage();

    customer = checkout.registerUser(false);

    // storefront should have ASM UI disabled by default
    cy.get('cx-asm-main-ui').should('not.exist');

    cy.log('--> Agent logging in');
    checkout.visitHomePage('asm=true');
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('be.visible');

    asm.agentLogin();

    cy.log('--> Starting customer emulation');
    asm.startCustomerEmulation(customer);

    cy.log('--> Update personal details');
    navigateToAMyAccountPage(
      'Personal Details',
      '/my-account/update-profile',
      'updateProfilePage'
    );

    profile.updateProfile(customer);
    customer.firstName = profile.newFirstName;
    customer.lastName = profile.newLastName;
    customer.fullName = `${profile.newFirstName} ${profile.newLastName}`;
    customer.titleCode = profile.newTitle;

    cy.log('--> Create new address');

    navigateToAMyAccountPage(
      'Address Book',
      '/my-account/address-book',
      'addressBookPage'
    );

    cy.get('cx-address-book').should('be.visible');
    cy.get('cx-card').should('not.exist');

    const getListOfAddressesRequestAlias = listenForListOfAddressesRequest();
    fillShippingAddress(addressBook.newAddress);
    cy.wait(getListOfAddressesRequestAlias)
      .its('response.statusCode')
      .should('eq', 200);

    addressBook.verifyNewAddress();

    cy.log('--> Add a consent');

    navigateToAMyAccountPage(
      'Consent Management',
      '/my-account/consents',
      'consentManagementPage'
    );

    consent.giveConsent();

    cy.log('--> Stop customer emulation');
    cy.get('cx-customer-emulation')
      .findByText(/End Session/i)
      .click();
    cy.get('cx-csagent-login-form').should('not.exist');
    cy.get('cx-customer-selection').should('be.visible');

    // Make sure homepage is visible
    cy.wait(`@getHomePage`).its('response.statusCode').should('eq', 200);
    cy.get('cx-global-message div').should(
      'contain',
      'You have successfully signed out.'
    );
    cy.get('cx-page-slot.Section1 cx-banner').first().should('be.visible');

    // Without this wait, the test fails b/c the customer search box is disabled
    cy.wait(1000);

    cy.log('--> Start another emulation session');
    asm.startCustomerEmulation(customer);

    cy.log(
      '--> Stop customer emulation using the end session button in the ASM UI'
    );
    cy.get('cx-customer-emulation')
      .findByText(/End Session/i)
      .click();
    cy.get('cx-customer-emulation').should('not.exist');
    cy.get('cx-customer-selection').should('be.visible');

    cy.log('--> sign out and close ASM UI');
    asm.agentSignOut();

    cy.get('button[title="Close ASM"]').click();
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('not.be.visible');

    // CXSPA-301/GH-14914
    // Must ensure that site is still functional after service agent logout
    checkout.visitHomePage();
    cy.get('cx-storefront.stop-navigating').should('exist');
    navigateToCategory('Brands', 'brands', false);
    cy.get('cx-product-list-item').should('exist');
  });

  it('should verify data changed by the agent as a customer', () => {
    cy.log('--> customer sign in');

    const loginPage = waitForPage('/login', 'getLoginPage');
    cy.visit('/login');
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

    asm.loginCustomerInStorefront(customer);
    asm.assertCustomerIsSignedIn();

    cy.log('Check personal details updated by the agent');

    navigateToAMyAccountPage(
      'Personal Details',
      '/my-account/update-profile',
      'updateProfilePage'
    );
    profile.verifyUpdatedProfile();

    cy.log('--> check address created by the agent');

    navigateToAMyAccountPage(
      'Address Book',
      '/my-account/address-book',
      'addressBookPage'
    );

    cy.get('cx-card').should('be.visible');
    addressBook.verifyNewAddress();

    cy.log('--> Check consent given by agent');

    navigateToAMyAccountPage(
      'Consent Management',
      '/my-account/consents',
      'consentManagementPage'
    );
    cy.get('input[type="checkbox"]').first().should('be.checked');

    checkout.signOutUser();
  });
}

export function bindCart(options?: {
  dialogAction?: 'replace' | 'cancel';
  previousCart?: string;
}) {
  const bindingRequest = listenForCartBindingRequest();
  const saveCartRequest = listenForCartSaveRequest({
    cartId: options?.previousCart,
  });

  //click button
  cy.findByText(/Assign Cart to Customer/i).click();

  if (options?.dialogAction) {
    // click dialog button
    cy.get('.cx-asm-bind-cart-dialog')
      .findByText(new RegExp(options.dialogAction, 'i'), { selector: 'button' })
      .click();

    // verify action
    if (options.dialogAction !== 'cancel') {
      if (options.dialogAction === 'replace' && options?.previousCart) {
        cy.wait(saveCartRequest).its('response.statusCode').should('eq', 200);
      }

      //make call
      cy.wait(bindingRequest).its('response.statusCode').should('eq', 200);
    }
  } else {
    //make call
    cy.wait(bindingRequest).its('response.statusCode').should('eq', 200);
  }
}
