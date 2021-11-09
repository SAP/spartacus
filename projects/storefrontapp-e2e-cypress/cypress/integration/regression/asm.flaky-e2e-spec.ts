import * as addressBook from '../../helpers/address-book';
import { login } from '../../helpers/auth-forms';
import * as checkout from '../../helpers/checkout-flow';
import { fillShippingAddress } from '../../helpers/checkout-forms';
import * as consent from '../../helpers/consent-management';
import { getErrorAlert } from '../../helpers/global-message';
import * as loginHelper from '../../helpers/login';
import * as profile from '../../helpers/update-profile';
import { viewportContext } from '../../helpers/viewport-context';
import { getSampleUser } from '../../sample-data/checkout-flow';

let customer: any;

context('ASM e2e Test', () => {
  viewportContext(['mobile', 'desktop'], () => {
    let isMobile: boolean;

    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
      checkout.visitHomePage();
      cy.onMobile(() => {
        isMobile = true;
        checkout.clickHamburger();
      });
      cy.onDesktop(() => {
        isMobile = false;
      });
      customer = getSampleUser();
      checkout.registerUser(false, customer);
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    describe('UI display.', () => {
      it('storefront should have ASM UI disabled by default', () => {
        checkout.visitHomePage();
        cy.get('cx-asm-main-ui').should('not.exist');
      });
    });

    describe('Customer Support Agent - Start Emulation', () => {
      it('agent should see the asm UI when ?asm=true is passed to the url', () => {
        checkout.visitHomePage('asm=true');
        cy.get('cx-asm-main-ui').should('exist');
        cy.get('cx-asm-main-ui').should('be.visible');
      });

      it('agent should authenticate.', () => {
        agentLogin();
      });

      it('agent should start customer emulation.', () => {
        startCustomerEmulation();
      });
    });

    describe('Customer Emulation - My Account', () => {
      it('agent should update personal details.', () => {
        cy.selectUserMenuOption({
          option: 'Personal Details',
          isMobile,
        });
        profile.updateProfile();
        customer.firstName = profile.newFirstName;
        customer.lastName = profile.newLastName;
        customer.fullName = `${profile.newFirstName} ${profile.newLastName}`;
        customer.titleCode = profile.newTitle;
      });

      it('agent should create new address', () => {
        cy.selectUserMenuOption({
          option: 'Address Book',
          isMobile,
        });
        cy.get('cx-card').should('have.length', 0);
        fillShippingAddress(addressBook.newAddress);
        cy.get('cx-card').should('have.length', 1);
        addressBook.verifyNewAddress();
      });

      it('agent should add a consent', () => {
        cy.selectUserMenuOption({
          option: 'Consent Management',
          isMobile,
        });
        consent.giveConsent();
      });
    });

    describe('Customer Support Agent - End', () => {
      it('agent should stop customer emulation using My Account -> Sign Out.', () => {
        checkout.signOutUser();
        cy.get('cx-csagent-login-form').should('not.exist');
        cy.get('cx-customer-selection').should('exist');
      });

      it('agent session should be intact and should be able to start another customer emulation', () => {
        startCustomerEmulation();
      });

      it('agent should stop customer emulation using the end session button in the ASM UI', () => {
        cy.get('cx-customer-emulation button').click();
        cy.get('cx-customer-emulation').should('not.exist');
        cy.get('cx-customer-selection').should('exist');
      });

      it('agent should sign out.', () => {
        agentSignOut();
      });

      it('agent should close the ASM UI.', () => {
        cy.get('button[title="Close ASM"]').click();
        cy.get('cx-asm-main-ui').should('exist');
        cy.get('cx-asm-main-ui').should('not.be.visible');
      });
    });

    describe('Customer Self Verification', () => {
      it('customer should sign in.', () => {
        cy.visit('/login');
        loginCustomerInStorefront();
        assertCustomerIsSignedIn(isMobile);
      });

      it('customer should see personal details updated by the agent.', () => {
        cy.selectUserMenuOption({
          option: 'Personal Details',
          isMobile,
        });
        profile.verifyUpdatedProfile();
      });

      it('customer should see the address created by the agent.', () => {
        cy.selectUserMenuOption({
          option: 'Address Book',
          isMobile,
        });
        cy.get('cx-card').should('have.length', 1);
        addressBook.verifyNewAddress();
      });

      it('customer should see the consent given by agent', () => {
        cy.selectUserMenuOption({
          option: 'Consent Management',
          isMobile,
        });
        cy.get('input[type="checkbox"]').first().should('be.checked');
      });

      it('customer should sign out.', () => {
        checkout.signOutUser();
      });
    });

    describe('When a regular customer session and an asm agent session are both active', () => {
      it('Customer should not be able to login when there is an active CS agent session.', () => {
        const loginPage = checkout.waitForPage('/login', 'getLoginPage');
        cy.visit('/login?asm=true');
        cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

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
});

function listenForAuthenticationRequest(): string {
  const aliasName = 'csAgentAuthentication';
  cy.intercept({ method: 'POST', path: `/authorizationserver/oauth/token` }).as(
    aliasName
  );
  return `@${aliasName}`;
}
export function listenForCustomerSearchRequest(): string {
  const aliasName = 'customerSearch';
  cy.intercept({
    method: 'GET',
    path: `/assistedservicewebservices/customers/search?*`,
  }).as(aliasName);
  return `@${aliasName}`;
}

function listenForUserDetailsRequest(): string {
  const aliasName = 'userDetails';
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`,
  }).as(aliasName);
  return `@${aliasName}`;
}

export function agentLogin(): void {
  const authRequest = listenForAuthenticationRequest();

  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-csagent-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').type('asagent');
    cy.get('[formcontrolname="password"]').type('pw4all');
    cy.get('button[type="submit"]').click();
  });

  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
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
  cy.wait(customerSearchRequestAlias)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('button[type="submit"]').click();

  cy.wait(userDetailsRequestAlias).its('response.statusCode').should('eq', 200);
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
  cy.wait(authRequest).its('response.statusCode').should('eq', 200);
}

function agentSignOut() {
  const tokenRevocationAlias = loginHelper.listenForTokenRevocationRequest();
  cy.get('button[title="Sign Out"]').click();
  cy.wait(tokenRevocationAlias);
  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
}

function assertCustomerIsSignedIn(isMobile: boolean) {
  if (isMobile) {
    clickHambergerMenu();
  }
  cy.get('cx-login div.cx-login-greet').should('exist');
  if (isMobile) {
    clickHambergerMenu();
  }
}

function clickHambergerMenu() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click({ force: true });
}

export function deleteFirstAddress() {
  cy.intercept({
    method: 'DELETE',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/addresses/*?lang=en&curr=USD`,
  }).as('deleteAddress');
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/*/addresses?lang=en&curr=USD`,
  }).as('fetchAddresses');

  const firstCard = cy.get('cx-card').first();
  firstCard.contains('Delete').click();
  cy.get('.cx-card-delete button.btn-primary').click();
  cy.wait('@deleteAddress').its('response.statusCode').should('eq', 200);
  cy.wait('@fetchAddresses').its('response.statusCode').should('eq', 200);
}
