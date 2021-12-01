//import * as addressBook from './address-book';
import { login } from './auth-forms';
//import * as checkout from './checkout-flow';
//import { fillShippingAddress } from './checkout-forms';
//import * as consent from './consent-management';
//import { getErrorAlert } from './global-message';
import * as loginHelper from './login';
//import * as profile from './update-profile';
//import { getSampleUser } from '../sample-data/checkout-flow';
//import { clearAllStorage } from '../support/utils/clear-all-storage';
import {
  interceptDelete,
  interceptGet,
  interceptPost,
} from '../support/utils/intercept';

//export let customer: any;

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

export function listenForUserDetailsRequest(): string {
  return interceptGet('userDetails', '/users/*');
}

export function agentLogin(): void {
  const authRequest = listenForAuthenticationRequest();
  cy.get('cx-storefront').within(() => {
    cy.get('cx-csagent-login-form').should('exist');
    cy.get('cx-customer-selection').should('not.exist');
    cy.get('cx-csagent-login-form form').within(() => {
      cy.get('[formcontrolname="userId"]').type('asagent');
      cy.get('[formcontrolname="password"]').type('pw4all');
      cy.get('button[type="submit"]').click();
    });
  });

  cy.wait(authRequest);
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
}

export function startCustomerEmulation(customer): void {
  const customerSearchRequestAlias = listenForCustomerSearchRequest();
  const userDetailsRequestAlias = listenForUserDetailsRequest();

  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('exist');
  cy.get('cx-customer-selection form').within(() => {
    cy.get('[formcontrolname="searchTerm"]').type(customer.email);
  });
  cy.wait(customerSearchRequestAlias);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('button[type="submit"]').click();

  cy.wait(userDetailsRequestAlias);
  cy.get('cx-customer-emulation input')
    .invoke('attr', 'placeholder')
    .should('contain', customer.fullName);
  cy.get('cx-csagent-login-form').should('not.exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-customer-emulation').should('exist');
}

export function loginCustomerInStorefront(customer) {
  const authRequest = listenForAuthenticationRequest();

  login(customer.email, customer.password);
  cy.wait(authRequest);
}

export function agentSignOut() {
  const tokenRevocationAlias = loginHelper.listenForTokenRevocationRequest();
  cy.get('button[title="Sign Out"]').click();
  cy.wait(tokenRevocationAlias);
  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
}

export function assertCustomerIsSignedIn() {
  cy.get('cx-login div.cx-login-greet').should('exist');
}

export function deleteFirstAddress() {
  interceptDelete('deleteAddresses', '/users/*/addresses/*?lang=en&curr=USD');
  interceptGet('fetchAddresses', '/users/*/addresses/*?lang=en&curr=USD');

  const firstCard = cy.get('cx-card').first();
  firstCard.contains('Delete').click();
  cy.get('.cx-card-delete button.btn-primary').click();
  cy.wait('@deleteAddress');
  cy.wait('@fetchAddresses');
}
