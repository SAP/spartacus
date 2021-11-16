import * as addressBook from '../../helpers/address-book';
import { login } from '../../helpers/auth-forms';
import * as checkout from '../../helpers/checkout-flow';
import { fillShippingAddress } from '../../helpers/checkout-forms';
import * as consent from '../../helpers/consent-management';
import { getErrorAlert } from '../../helpers/global-message';
import * as loginHelper from '../../helpers/login';
import * as profile from '../../helpers/update-profile';
import { getSampleUser } from '../../sample-data/checkout-flow';
import { clearAllStorage } from '../../support/utils/clear-all-storage';
import {
  interceptDelete,
  interceptGet,
  interceptPost,
} from '../../support/utils/intercept';

let customer: any;

context('Assisted Service Module', () => {
  before(() => {
    clearAllStorage();

    cy.visit('/');

    customer = getSampleUser();
    checkout.registerUser(false, customer);
  });

  describe('Customer Support Agent - Emulation', () => {
    it('should test customer emulation', () => {
      // storefront should have ASM UI disabled by default
      checkout.visitHomePage();
      cy.get('cx-asm-main-ui').should('not.exist');

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      agentLogin();

      cy.log('--> Starting customer emulation');
      startCustomerEmulation();

      cy.log('--> Update personal details');
      cy.visit('/my-account/update-profile');
      profile.updateProfile();
      customer.firstName = profile.newFirstName;
      customer.lastName = profile.newLastName;
      customer.fullName = `${profile.newFirstName} ${profile.newLastName}`;
      customer.titleCode = profile.newTitle;

      cy.log('--> Create new address');
      cy.visit('/my-account/address-book');
      cy.get('cx-card').should('have.length', 0);
      fillShippingAddress(addressBook.newAddress);
      cy.get('cx-card').should('have.length', 1);
      addressBook.verifyNewAddress();

      cy.log('--> Add a consent');

      cy.visit('/my-account/consents');
      consent.giveConsent();

      cy.log('--> Stop customer emulation');
      cy.get('cx-customer-emulation button').click();
      cy.get('cx-csagent-login-form').should('not.exist');
      cy.get('cx-customer-selection').should('exist');

      // Without this wait, the test fails b/c the customer search box is disabled
      cy.wait(1000);

      cy.log('--> Start another emulation session');
      startCustomerEmulation();

      cy.log(
        '--> Stop customer emulation using the end session button in the ASM UI'
      );
      cy.get('cx-customer-emulation button').click();
      cy.get('cx-customer-emulation').should('not.exist');
      cy.get('cx-customer-selection').should('exist');

      cy.log('--> sign out and close ASM UI');
      agentSignOut();

      cy.get('button[title="Close ASM"]').click();
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('not.be.visible');
    });
  });

  describe('Customer Self Verification', () => {
    it('checks data changes made by the agent', () => {
      cy.log('--> customer sign in');
      cy.visit('/login');
      loginCustomerInStorefront();
      assertCustomerIsSignedIn();

      cy.log('Check personal details updated by the agent');
      cy.selectUserMenuOption({
        option: 'Personal Details',
      });
      profile.verifyUpdatedProfile();

      cy.log('--> check address created by the agent');
      cy.selectUserMenuOption({
        option: 'Address Book',
      });
      cy.get('cx-card').should('have.length', 1);
      addressBook.verifyNewAddress();

      cy.log('--> Check consent given by agent');
      cy.selectUserMenuOption({
        option: 'Consent Management',
      });
      cy.get('input[type="checkbox"]').first().should('be.checked');

      checkout.signOutUser();
    });
  });

  describe('When a customer session and an asm agent session are both active', () => {
    it('Customer should not be able to login when there is an active CS agent session.', () => {
      const loginPage = checkout.waitForPage('/login', 'getLoginPage');
      cy.visit('/login?asm=true');
      cy.wait(`@${loginPage}`);

      agentLogin();
      login(customer.email, customer.password);
      getErrorAlert().should(
        'contain',
        'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.'
      );
    });

    // TODO(#9445): Add e2e test for this scenario
    it.skip('agent login when user is logged in should start this user emulation', () => {});

    // TODO(#9445): Add e2e test for this scenario
    it.skip('agent logout when user was logged and emulated should restore the session', () => {});
  });
});

function listenForAuthenticationRequest(): string {
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

function listenForUserDetailsRequest(): string {
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

function startCustomerEmulation(): void {
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

function loginCustomerInStorefront() {
  const authRequest = listenForAuthenticationRequest();

  login(customer.email, customer.password);
  cy.wait(authRequest);
}

function agentSignOut() {
  const tokenRevocationAlias = loginHelper.listenForTokenRevocationRequest();
  cy.get('button[title="Sign Out"]').click();
  cy.wait(tokenRevocationAlias);
  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
}

function assertCustomerIsSignedIn() {
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
