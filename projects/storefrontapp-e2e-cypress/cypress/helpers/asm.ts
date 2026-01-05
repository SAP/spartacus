/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as addressBook from '../helpers/address-book';
import * as asm from '../helpers/asm';
import * as checkout from '../helpers/checkout-flow';
import { fillShippingAddress } from '../helpers/checkout-forms';
import * as consent from '../helpers/consent-management';
import * as profile from '../helpers/update-profile';
import {
  getASMB2BCustomer2,
  getASMB2CCustomer,
  getB2CAgent,
} from '../sample-data/asm-flow';
import { getSampleUser, SampleUser } from '../sample-data/checkout-flow';
import {
  addToCartWithProducts,
  createCart,
  createInactiveCart,
} from '../support/utils/cart';
import { login as fetchingToken, visitLoginPage } from '../support/utils/login';

import { clearAllStorage } from '../support/utils/clear-all-storage';
import {
  interceptGet,
  interceptPatch,
  interceptPost,
} from '../support/utils/intercept';
import { agentLoginForJDK21, login } from './auth-forms';
import * as loginHelper from './login';
import {
  navigateToAMyAccountPage,
  navigateToCategory,
  waitForPage,
} from './navigation';
import { generateMail, randomString } from './user';

export const invalidUser: SampleUser = {
  firstName:
    'JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn',
  lastName:
    'SmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmithSmith',
  email:
    'john.smith.john.smith.john.smith.john.smith.john.smith.john.smith.john.smith.john.smith.john.smith@test.com',
};

const asmForB2CCustomer = getASMB2CCustomer().email;
const asmForB2BCustomerFullName = getASMB2BCustomer2().fullName;
const b2cAgent = getB2CAgent();

export function placeOrderForB2CCustomer(
  customer: string,
  pwd: string,
  productCode: string
): void {
  cy.whenJDK17(() => {
    cy.login(customer, pwd).then(() => {
      const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      console.info(auth);
      cy.addToCart(productCode, 1, auth.token.access_token).then((cartId) => {
        cy.requireDeliveryAddressAdded(
          getSampleUser().address,
          auth.token,
          cartId
        );
        cy.requireDeliveryMethodSelected(auth.token, cartId);
        cy.requirePaymentMethodAdded(cartId);
        cy.requirePlacedOrder(auth.token, cartId);
      });
    });
  });

  cy.whenJDK21(() => {
    cy.visit('/');

    cy.contains('a[role="link"]', 'Sign In / Register').should('be.visible');

    cy.contains('a[role="link"]', 'Sign In / Register').click();
    cy.get('input[name="username"]').clear().type(customer);
    cy.get('input[name="password"]').clear().type(pwd);
    cy.contains('button.btn-primary', 'Sign In').should('be.visible');
    cy.intercept('POST', '/authorizationserver/oauth/token').as(
      'tokenResponse'
    );
    cy.contains('button.btn-primary', 'Sign In').click();

    cy.wait('@tokenResponse').then((interception) => {
      const response = interception.response.body;
      cy.wrap(response.access_token).as('token');
      cy.addToCart(productCode, 1, response.access_token).then((cartId) => {
        cy.requireDeliveryAddressAddedForJDK21(
          getSampleUser().address,
          response.access_token,
          cartId
        );
        cy.requireDeliveryMethodSelectedForJDK21(response.access_token, cartId);
        cy.requirePaymentMethodAdded(cartId);
        cy.requirePlacedOrderForJDK21(response.access_token, cartId);
      });
    });
  });
}

export function doPlaceOrderForB2CCustomer(
  customer: string,
  pwd: string,
  productCode: string
): Cypress.Chainable<any> {
  // Start the Cypress chain inside the condition
  return cy.whenJDK17(() => {
    return cy.login(customer, pwd).then(() => {
      const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
      console.info(auth);
      return cy
        .addToCart(productCode, 1, auth.token.access_token)
        .then((cartId) => {
          cy.requireDeliveryAddressAdded(
            getSampleUser().address,
            auth.token,
            cartId
          );
          cy.requireDeliveryMethodSelected(auth.token, cartId);
          cy.requirePaymentMethodAdded(cartId);
          return cy.requirePlacedOrder(auth.token, cartId); // Return promise
        });
    });
  });
}

export function doPlaceOrderForB2CCustomerForJDK21(
  customer: string,
  pwd: string,
  productCode: string
): Cypress.Chainable<any> {
  return cy.whenJDK21(() => {
    cy.visit('/');
    cy.contains('a[role="link"]', 'Sign In / Register').should(
      'have.attr',
      'href',
      '/electronics-spa/en/USD/sign-in'
    );

    cy.contains('a[role="link"]', 'Sign In / Register').click();
    cy.get('input[name="username"]').clear().type(customer);
    cy.get('input[name="password"]').clear().type(pwd);
    cy.contains('button.btn-primary', 'Sign In').should('be.visible');
    cy.intercept('POST', '/authorizationserver/oauth/token').as(
      'tokenResponse'
    );
    cy.contains('button.btn-primary', 'Sign In').click();

    return cy.wait('@tokenResponse').then((interception) => {
      const response = interception.response.body;
      cy.wrap(response.access_token).as('token');
      return cy
        .addToCart(productCode, 1, response.access_token)
        .then((cartId) => {
          cy.requireDeliveryAddressAddedForJDK21(
            getSampleUser().address,
            response.access_token,
            cartId
          );
          cy.requireDeliveryMethodSelectedForJDK21(
            response.access_token,
            cartId
          );
          cy.requirePaymentMethodAdded(cartId);
          return cy.requirePlacedOrderForJDK21(response.access_token, cartId); // Return promise for JDK21
          cy.log(
            'aaaa=',
            cy.requirePlacedOrderForJDK21(response.access_token, cartId)
          );
          cy.pause();
        });
    });
  });
}

export function addProductToB2CCart(
  customer: string,
  pwd: string,
  productCode: string
): void {
  cy.login(customer, pwd).then(() => {
    const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
    cy.addToCart(productCode, 1, auth.token.access_token);
  });
}

export function addProductToB2BCart(
  customer: string,
  pwd: string,
  productCode: string
): void {
  cy.login(customer, pwd).then(() => {
    const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
    cy.addProductToB2BCart(productCode, 1, auth.token.access_token);
  });
}

export function listenForAuthenticationRequest(): string {
  return interceptPost(
    'csAgentAuthentication',
    '/authorizationserver/oauth/token',
    false
  );
}

export function listenForCustomerSearchRequest(): string {
  return interceptPost(
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

export function listenForCustomerCreateRequest(): string {
  return interceptPost(
    'customerCreating',
    '/assistedservicewebservices/customers?*',
    false
  );
}

export function removeCustomerCouponFoJDK21(
  customer: string,
  pwd: string,
  couponCode: string
): void {
  let token;
  cy.visit('/?am=true');
  cy.get('button.logout').should('exist').and('be.visible').click();
  cy.get('button.close[title="Close ASM"]').should('be.visible').click();
  cy.visit('/');
  cy.log('Customer login in');
  cy.contains('a[role="link"]', 'Sign In / Register')
    .should('have.attr', 'href', '/powertools-spa/en/USD/sign-in')
    .click();

  cy.get('input[name="username"]').clear().type(customer);
  cy.get('input[name="password"]').clear().type(pwd);
  cy.contains('button.btn-primary', 'Sign In').should('be.visible');
  cy.intercept('POST', '/authorizationserver/oauth/token').as('tokenResponse');
  cy.contains('button.btn-primary', 'Sign In').click();

  cy.get('cx-login .cx-login-greet').should('be.visible');

  cy.wait('@tokenResponse').then((interception) => {
    const response = interception.response.body;
    cy.wrap(response.access_token).as('token');
    // remove customer coupon
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/customercoupons/${couponCode}/claim`,
      headers: {
        Authorization: `bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function removeCustomerCoupon(
  customer: string,
  pwd: string,
  couponCode: string
): void {
  cy.login(customer, pwd).then(() => {
    const auth = JSON.parse(localStorage.getItem('spartacus⚿⚿auth'));
    // remove customer coupon
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/customercoupons/${couponCode}/claim`,
      headers: {
        Authorization: `bearer ${auth.token.access_token}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function agentLogin(user, pwd): void {
  cy.get('cx-storefront cx-csagent-login-form').then(($element) => {
    if ($element.length > 0) {
      const authRequest = listenForAuthenticationRequest();
      cy.get('cx-storefront').within(() => {
        cy.get('cx-csagent-login-form').should('exist');
        cy.get('cx-customer-selection').should('not.exist');
        cy.get('cx-csagent-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]')
            .clear()
            .type(user, { force: true })
            .should('have.value', user);
          cy.get('[formcontrolname="password"]')
            .clear()
            .type(pwd, { force: true })
            .should('have.value', pwd);
          cy.get('button[type="submit"]').click();
        });
      });

      cy.wait(authRequest).its('response.statusCode').should('eq', 200);
      cy.get('cx-csagent-login-form').should('not.exist');
      cy.get('cx-customer-selection').should('exist');
    }
  });
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
  const customerId = asmForB2CCustomer;

  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();

  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list table').should('exist');
  cy.get('cx-customer-list table').should('contain', 'Cart');
  cy.get('cx-customer-list table').should('contain', 'Order');
  cy.get('cx-customer-list table').should('not.contain', 'Account');

  cy.log('--> checking customer number');
  cy.get('cx-customer-list .cx-total')
    .should('exist')
    .should('contain', 'Customers');

  cy.log('--> checking customer Id search');
  cy.get('cx-customer-list .cx-header-actions .search-wrapper input')
    .should('exist')
    .should('not.be.disabled')
    .type(`${customerId}{enter}`);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

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

  cy.get('cx-customer-list table').should('not.contain', 'Account');

  cy.get('cx-customer-list button.cx-asm-customer-list-btn-cancel').click();
  cy.get('cx-customer-list').should('not.exist');

  cy.log('--> start emulation by click name');
  asm.asmOpenCustomerList();

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list')
    .find('.cx-btn-cell')
    .not('[aria-label="View Orders"]')
    .not('[aria-label="View Active Cart"]')
    .not('[aria-label="View Customer 360°"]')
    .then(($rows) => {
      expect($rows.length).to.eq(5);
      cy.wrap($rows[0]).click();
      cy.get('cx-customer-list').should('not.exist');
    });
  cy.wait(userDetailsRequestAlias);

  cy.get('cx-customer-emulation').should('exist');

  cy.log('--> start emulation by click order');
  asm.asmOpenCustomerList();
  cy.get('cx-customer-list .cx-header-actions .search-wrapper input')
    .should('exist')
    .should('not.be.disabled')
    .type(`${asmForB2CCustomer}{enter}`);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list table')
    .contains('tbody tr', asmForB2CCustomer)
    .closest('tbody tr')
    .find('td:nth-child(6)')
    .then(($order) => {
      cy.wrap($order).click();
      cy.get('cx-customer-list').should('not.exist');
      cy.get('cx-order-history').should('exist');
    });
}

export function asmB2bCustomerLists(): void {
  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();

  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();

  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list table').should('exist');
  cy.get('cx-customer-list table').should('not.contain', 'Account');

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
  cy.get('cx-customer-list table').contains('Account');
  cy.get('cx-customer-list button.cx-asm-customer-list-btn-cancel').click();
  cy.get('cx-customer-list').should('not.exist');

  cy.log('--> start emulation by click cart');
  asm.asmOpenCustomerList();
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

  cy.log('--> click cart to jump to the cart view page.');
  cy.get('cx-customer-list .cx-header-actions .search-wrapper input')
    .should('exist')
    .should('not.be.disabled')
    .type(`${asmForB2BCustomerFullName}{enter}`);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-list')
    .find('.cx-btn-cell')
    .find('.fa-shopping-cart')
    .then(($cart) => {
      cy.wrap($cart).click();
      cy.get('cx-customer-list').should('not.exist');
      cy.get('cx-add-to-saved-cart').should('exist');
    });
}

export function asmB2bCustomerListPagination(): void {
  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();

  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();

  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-pagination').should('not.be.visible');

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
  cy.get('cx-pagination').should('be.visible');
  cy.get('button').contains('Cancel').click();
}

export function asmCustomerListPagination(): void {
  const customerListsRequestAlias = asm.listenForCustomerListsRequest();
  const customerSearchRequestAlias = asm.listenForCustomerSearchRequest();

  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();

  cy.wait(customerListsRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-pagination').should('be.visible');
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
  cy.get('cx-pagination').should('not.be.visible');
  cy.get('button').contains('Cancel').click();
}

export function asmCustomerListC360Link(): void {
  cy.log('--> Starting customer list');
  asm.asmOpenCustomerList();
  cy.get('cx-customer-list table').should('exist');

  cy.log('--> click 360 view link');
  cy.get('cx-customer-list')
    .find('.cx-btn-cell')
    .find('.fa-circle-user')
    .then(($rows) => {
      cy.wrap($rows[0]).click();
      cy.get('.cx-asm-customer-360').should('exist');
      cy.get('.header-profile-details-log').should('exist');
      cy.get('.cx-asm-customer-email').invoke('text').should('not.be.empty');
    });
}

export function startCustomerEmulation(customer, b2b = false): void {
  const customerSearchRequestAlias = listenForCustomerSearchRequest();
  const userDetailsRequestAlias = listenForUserDetailsRequest(b2b);

  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
  cy.get('cx-customer-selection form').within(() => {
    cy.whenJDK17(() => {
      cy.get('[formcontrolname="searchTerm"]')
        .should('not.be.disabled')
        .type(customer.email);
    });
    cy.whenJDK21(() => {
      cy.get('[formcontrolname="searchTerm"]')
        .should('exist')
        .and('be.visible')
        .and('not.be.disabled')
        .then(($input) => {
          cy.wrap($input).clear({ force: true });
          cy.wrap($input).type(customer.email, { delay: 100 });
        });
      cy.get('[formcontrolname="searchTerm"]').should(
        'have.value',
        `${customer.email}`
      );
    });
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('cx-customer-selection button[type="submit"]').click();

  cy.whenJDK17(() => {
    cy.wait(userDetailsRequestAlias)
      .its('response.statusCode')
      .should('eq', 200);
  });
  cy.get('cx-customer-emulation .cx-asm-customerInfo label.cx-asm-name').should(
    'contain',
    customer.fullName
  );
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-customer-emulation').should('be.visible');
}

export function startCustomerEmulationWithOrderID(order, customer): void {
  const customerSearchRequestAlias = listenForCustomerSearchRequest();

  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchOrder"]')
      .should('not.be.disabled')
      .focus()
      .type(order);
    cy.get('[formcontrolname="searchOrder"]').should('have.value', `${order}`);
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('cx-customer-selection button[type="submit"]').click();

  cy.get('cx-customer-emulation .cx-asm-customerInfo label.cx-asm-name').should(
    'contain',
    customer.fullName
  );
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-customer-emulation').should('be.visible');
  cy.get('cx-breadcrumb').contains('Order Details');
}

export function loginCustomerInStorefront(customer) {
  const authRequest = listenForAuthenticationRequest();

  login(customer.email, customer.password);
  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
}

export function loginCustomerWithNameAndPassword(
  name: string,
  password: string
) {
  const authRequest = listenForAuthenticationRequest();
  login(name, password);
  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
}

// It is not recommended to use agentSignOut as it can cause failure in E2E tests related to ASM in the pipeline
export function agentSignOut() {
  const tokenRevocationAlias = loginHelper.listenForTokenRevocationRequest();
  cy.get('button[title="Sign Out"]').click();
  // When the agent signs out, there are two revocations made simultaneously - the second one occasionally fails, though it is not necessary. We therefore are not interested in the status code of the second one.
  cy.wait(tokenRevocationAlias);
  cy.whenJDK17(() => {
    cy.get('cx-csagent-login-form').should('exist');
  });
  cy.get('cx-customer-selection').should('not.exist');
}

export function assertCustomerIsSignedIn() {
  cy.get('cx-login div.cx-login-greet').should('exist');
}

export function testCustomerEmulation() {
  let customer;

  it('should test customer emulation', () => {
    checkout.visitHomePage();

    customer = getSampleUser();

    checkout.registerUser(false, customer);

    // storefront should have ASM UI disabled by default
    cy.get('cx-asm-main-ui').should('not.exist');

    cy.log('--> Agent logging in');
    checkout.visitHomePage('asm=true');
    cy.get('cx-asm-main-ui').should('exist');
    cy.get('cx-asm-main-ui').should('be.visible');

    cy.whenJDK17(() => {
      asm.agentLogin(b2cAgent.userName, b2cAgent.password);
    });

    cy.whenJDK21(() => {
      cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
      agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
    });

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
    cy.get('cx-address-book cx-card').should('not.exist');

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
    const homePage = waitForPage('homepage', 'getHomePage');
    cy.wait(`@${homePage}`).its('response.statusCode').should('eq', 200);

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
      '--> Stop customer emulation using the end emulation button in the ASM UI'
    );
    cy.get('cx-customer-emulation')
      .findByText(/End Session/i)
      .click();
    cy.get('cx-customer-emulation').should('not.exist');
    cy.get('cx-customer-selection').should('be.visible');

    cy.log('--> sign out and close ASM UI');

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
    cy.whenJDK21(() => {
      checkout.visitHomePage('asm=true');
      cy.get('button.close[title="Close ASM"]').click();
      cy.get('a[role="link"]').contains('Sign In / Register').click();
    });
    cy.whenJDK17(() => {
      visitLoginPage();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
    });

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

    cy.get('cx-address-book cx-card').should('be.visible');
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
  /** Providing an action expects dialog to appear */
  dialogAction?: 'replace' | 'cancel';
  /** Expected cart ID for save request */
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

export function asmOpenCreateCustomerDialogOnCustomerListDialog(): void {
  asm.asmOpenCustomerList();
  cy.get('cx-customer-list div.cx-dialog-header button').click();
  cy.get('cx-asm-create-customer-form').should('exist');
  cy.get('cx-asm-create-customer-form form').should('exist');
}

export function asmOpenCreateCustomerDialogOnCustomerSelectionDropdown(): void {
  const customerSearchRequestAlias = listenForCustomerSearchRequest();
  cy.get('cx-customer-selection').should('exist');
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchTerm"]')
      .should('not.be.disabled')
      .type(generateMail(randomString(), true));
  });
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-selection span.linkStyleLabel').should('exist');
  cy.get('cx-customer-selection span.linkStyleLabel').click();
  cy.get('cx-asm-create-customer-form').should('exist');
  cy.get('cx-asm-create-customer-form form').should('exist');
}

export function asmCloseCreateCustomerDialog(): void {
  cy.get(
    'cx-asm-create-customer-form div.modal-footer button.cx-asm-create-customer-btn-cancel'
  ).click();
  cy.get('cx-asm-create-customer-form').should('not.exist');
}

/**
 * Method submits prefiled form and by default waits till registration request will be completed.
 *
 * @param {boolean} [waitForRequestCompletion=true]
 * specifies if cypress should wait till registration request be completed.
 */
export function submitCreateCustomerForm(
  waitForRequestCompletion: boolean = true
) {
  const customerCreateRequestAlias = asm.listenForCustomerCreateRequest();

  cy.get('cx-asm-create-customer-form').within(() => {
    cy.get('button[type=submit]').click();
  });

  if (waitForRequestCompletion) {
    return cy.wait(customerCreateRequestAlias);
  } else {
    return null;
  }
}

export function fillCreateCustomerForm({
  firstName,
  lastName,
  email,
}: SampleUser) {
  cy.get('cx-asm-create-customer-form').should('be.visible');
  cy.get('cx-asm-create-customer-form').within(() => {
    cy.get('[formcontrolname="firstName"]').clear().type(firstName);
    cy.get('[formcontrolname="lastName"]').clear().type(lastName);
    cy.get('[formcontrolname="email"]').clear().type(email);
  });
}

export function verifyFormErrors() {
  const requiredFieldMessage = 'Field is required';
  const notValidEmailMessage =
    'Field  has not a valid email format. Match pattern: example@yourdomain.com';

  cy.get('cx-asm-create-customer-form').within(() => {
    cy.get('[formcontrolname="firstName"] + cx-form-errors').contains(
      requiredFieldMessage
    );
    cy.get('[formcontrolname="lastName"] + cx-form-errors').contains(
      requiredFieldMessage
    );
    cy.get('[formcontrolname="email"] + cx-form-errors').contains(
      requiredFieldMessage
    );

    cy.get('[formcontrolname="email"] + cx-form-errors').within(() => {
      cy.get('p').contains(requiredFieldMessage);
      cy.get('p+p').should('contain', notValidEmailMessage);
    });

    cy.get('cx-form-errors p').should('have.length', 4);
  });
}

export function emulateCustomerPrepare(agentToken, agentPwd) {
  const customer = getSampleUser();
  cy.log('--> Register new user');
  cy.visit('/?asm=true');
  checkout.registerUser(false, customer);
  cy.whenJDK17(() => {
    asm.agentLogin(agentToken, agentPwd);
  });

  cy.whenJDK21(() => {
    cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
    agentLoginForJDK21(agentToken, agentPwd);
  });
  return customer;
}

export function emulateExistedCustomerPrepare(agentToken, agentPwd) {
  const customer = getASMB2CCustomer();
  cy.log('--> login in user');
  cy.visit('/?asm=true');

  cy.whenJDK17(() => {
    asm.agentLogin(agentToken, agentPwd);
  });

  cy.whenJDK21(() => {
    cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
    agentLoginForJDK21(agentToken, agentPwd);
  });
  return customer;
}

export function getCustomerId(
  agentUserName,
  agentPwd,
  customerUid
): Promise<string> {
  return new Promise((resolve) => {
    fetchingToken(agentUserName, agentPwd, false).then((res) => {
      getCustomerIdWithAgentToken(res.body.access_token, customerUid).then(
        resolve
      );
    });
  });
}

export function getCustomerIdForJDK21(
  agentUserName,
  agentPwd,
  customerUid
): Promise<string> {
  cy.visit('/?asm=true');
  cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
  agentLoginForJDK21(agentUserName, agentPwd);
  cy.get('button.logout')
    .should('exist')
    .and('be.visible')
    .and('have.attr', 'title', 'Sign Out');
  return getToken().then((token) => {
    return getCustomerIdWithAgentToken(token, customerUid);
  });
}

export function getToken(): Promise<string> {
  return new Promise((resolve) => {
    cy.wait(2000);
    cy.wait(2000);
    cy.window().should('have.property', 'localStorage');
    cy.window().then((win) => {
      const spartacusAuth = win.localStorage.getItem('spartacus⚿⚿auth');
      if (spartacusAuth) {
        const authObj = JSON.parse(spartacusAuth);
        const token = authObj.token.access_token;
        cy.log('--> get token: ' + token);
        resolve(token);
      }
    });
  });
}

export function getCustomerIdWithAgentToken(
  token,
  customerUid
): Promise<string> {
  return new Promise((resolve, reject) => {
    cy.request({
      method: 'get',
      url:
        `${Cypress.env('API_URL')}${Cypress.env('OCC_PREFIX')}/${Cypress.env(
          'BASE_SITE'
        )}/users/` + customerUid,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        resolve(response.body.customerId);
      } else {
        reject(response.status);
      }
    });
  });
}

export function getInactiveCartIdAndAddProducts(
  customerEmail,
  customerPwd,
  productCode?,
  quantity?
) {
  let token = null;
  return new Promise((resolve, reject) => {
    fetchingToken(customerEmail, customerPwd, false).then((res) => {
      token = res.body.access_token;
      createInactiveCart(token)
        .then((inactiveCartId) => {
          if (!!productCode && quantity) {
            addToCartWithProducts(
              inactiveCartId,
              productCode,
              quantity,
              token
            ).then((response) => {
              if (response.status === 200) {
                resolve(inactiveCartId);
              } else {
                reject(response.status);
              }
            });
          } else {
            resolve(inactiveCartId);
          }
        })
        .catch((status) => reject(status));
    });
  });
}

export function getInactiveCartIdAndAddProductsForJDK21(
  customerEmail,
  customerPwd,
  productCode?,
  quantity?
) {
  return new Promise((resolve, reject) => {
    checkout.visitHomePage();
    cy.getLoginRegisterLink({ clickAndWait: true });
    loginCustomerWithNameAndPassword(customerEmail, customerPwd);
    getToken().then((token) => {
      createInactiveCart(token)
        .then((inactiveCartId) => {
          if (!!productCode && quantity) {
            addToCartWithProducts(
              inactiveCartId,
              productCode,
              quantity,
              token
            ).then((response) => {
              if (response.status === 200) {
                resolve(inactiveCartId);
              } else {
                reject(response.status);
              }
            });
          } else {
            resolve(inactiveCartId);
          }
        })
        .catch((status) => reject(status));
    });
  });
}

export function getCurrentCartIdAndAddProducts(
  customerName,
  customerPwd,
  productCode?,
  quantity?
) {
  return new Promise((resolve, reject) => {
    fetchingToken(customerName, customerPwd, false).then((res) => {
      const token = res.body.access_token;
      createCart(token).then((response) => {
        if (response.status === 201) {
          const activeCartId = response.body.code;
          if (!!productCode && quantity) {
            addToCartWithProducts(
              activeCartId,
              productCode,
              quantity,
              token
            ).then((response) => {
              if (response.status === 200) {
                resolve(activeCartId);
              } else {
                reject(response.status);
              }
            });
          } else {
            resolve(activeCartId);
          }
        } else {
          reject(response.status);
        }
      });
    });
  });
}

export function getCurrentCartIdAndAddProductsForJdk21(
  customerName,
  customerPwd,
  productCode?,
  quantity?
) {
  return new Promise((resolve, reject) => {
    checkout.visitHomePage();
    cy.getLoginRegisterLink({ clickAndWait: true });
    loginCustomerWithNameAndPassword(customerName, customerPwd);
    getToken().then((token) => {
      createCart(token).then((response) => {
        if (response.status === 201) {
          const activeCartId = response.body.code;
          if (!!productCode && quantity) {
            addToCartWithProducts(
              activeCartId,
              productCode,
              quantity,
              token
            ).then((response) => {
              if (response.status === 200) {
                resolve(activeCartId);
              } else {
                reject(response.status);
              }
            });
          } else {
            resolve(activeCartId);
          }
        } else {
          reject(response.status);
        }
      });
    });
  });
}

export function registerUser() {
  clearAllStorage();
  const customer = getSampleUser();
  checkout.visitHomePage();
  checkout.registerUser(false, customer);
  return customer;
}
