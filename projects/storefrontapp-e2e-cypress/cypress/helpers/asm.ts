import * as addressBook from '../helpers/address-book';
import * as checkout from '../helpers/checkout-flow';
import * as consent from '../helpers/consent-management';
import * as loginHelper from '../helpers/login';
import * as profile from '../helpers/update-profile';
import { login } from './auth-forms';
import { getErrorAlert } from './global-message';

let customer: any;

export function asmTests(isMobile: boolean) {
  describe('ASM Test Suite', () => {
    before(() => {
      checkout.visitHomePage();
      customer = checkout.registerUser();
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

    describe('Customer Support Agent - Start', () => {
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

    describe('Customer Emulation - Checkout', () => {
      it('agent should add a product to cart and begin checkout.', () => {
        checkout.clickCheapProductDetailsFromHomePage();
        checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
      });

      it('agent should fill in address form', () => {
        checkout.fillAddressFormWithCheapProduct();
      });

      it('agent should choose delivery', () => {
        checkout.verifyDeliveryMethod();
      });

      it('agent should fill in payment form', () => {
        checkout.fillPaymentFormWithCheapProduct();
      });

      it('agent should review and place order', () => {
        checkout.placeOrderWithCheapProduct();
      });

      it('agent should see summary page', () => {
        checkout.verifyOrderConfirmationPageWithCheapProduct();
      });
    });

    describe('Customer Emulation - My Account', () => {
      it('agent should be able to check order in order history', () => {
        // hack: visit other page to trigger store -> local storage sync
        cy.selectUserMenuOption({
          option: 'Personal Details',
          isMobile,
        });
        cy.waitForOrderToBePlacedRequest();
        checkout.viewOrderHistoryWithCheapProduct();
      });

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

      it('agent should delete address', () => {
        cy.selectUserMenuOption({
          option: 'Address Book',
          isMobile,
        });
        cy.get('cx-card').should('have.length', 1);
        addressBook.deleteFirstAddress();
        cy.get('cx-card').should('have.length', 0);
      });

      it('agent should create new address', () => {
        addressBook.createNewAddress();
        cy.get('cx-card').should('have.length', 1);
        addressBook.verifyNewAddress();
      });

      it('agent should see the payment details created during checkout', () => {
        cy.selectUserMenuOption({
          option: 'Payment Details',
          isMobile,
        });
        cy.get('.cx-payment .cx-body').then(() => {
          cy.get('cx-card').should('have.length', 1);
        });
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
      it('customer should see the order placed by the agent.', () => {
        checkout.viewOrderHistoryWithCheapProduct();
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

      it('customer should see the payment details created by the agent', () => {
        cy.selectUserMenuOption({
          option: 'Payment Details',
          isMobile,
        });
        cy.get('.cx-payment .cx-body').then(() => {
          cy.get('cx-card').should('have.length', 1);
        });
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
      it('asm ui should only display a message that the session in progress is a regular session.', () => {
        const loginPage = checkout.waitForPage('/login', 'getLoginPage');
        cy.visit('/login?asm=true');
        cy.wait(`@${loginPage}`).its('status').should('eq', 200);

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
}

function listenForAuthenticationRequest(): string {
  const aliasName = 'csAgentAuthentication';
  cy.server();
  cy.route('POST', `/authorizationserver/oauth/token`).as(aliasName);
  return `@${aliasName}`;
}
export function listenForCustomerSearchRequest(): string {
  const aliasName = 'customerSearch';
  cy.server();
  cy.route('GET', `/assistedservicewebservices/customers/search?*`).as(
    aliasName
  );
  return `@${aliasName}`;
}

function listenForUserDetailsRequest(): string {
  const aliasName = 'userDetails';
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/*`
  ).as(aliasName);
  return `@${aliasName}`;
}

export function agentLogin(): void {
  const authRequest = listenForAuthenticationRequest();

  cy.get('cx-csagent-login-form').should('exist');
  cy.get('cx-customer-selection').should('not.exist');
  cy.get('cx-csagent-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').type('asagent');
    cy.get('[formcontrolname="password"]').type('123456');
    cy.get('button[type="submit"]').click();
  });

  cy.wait(authRequest).its('status').should('eq', 200);
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
  cy.wait(customerSearchRequestAlias).its('status').should('eq', 200);

  cy.get('cx-customer-selection div.asm-results button').click();
  cy.get('button[type="submit"]').click();

  cy.wait(userDetailsRequestAlias).its('status').should('eq', 200);
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
  cy.wait(authRequest).its('status').should('eq', 200);
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
