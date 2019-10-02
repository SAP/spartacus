import * as addressBook from '../helpers/address-book';
import * as asm from '../helpers/asm';
import * as checkout from '../helpers/checkout-flow';
import * as consent from '../helpers/consent-management';
import * as profile from '../helpers/update-profile';
import { login } from './auth-forms';
let customer: any;

export function asmTests() {
  describe('ASM Test Suite', () => {
    before(() => {
      checkout.visitHomePage();
      customer = checkout.registerUser();
    });

    describe('UI display.', () => {
      it('should storefront have ASM feature enabled', () => {
        checkout.visitHomePage();
        cy.get('cx-asm').should('exist');
      });

      it('should storefront have ASM UI hidden by default', () => {
        checkout.visitHomePage();
        cy.get('cx-asm-main-ui').should('not.exist');
      });
    });
    describe('Customer Support Agent - Start', () => {
      it('should agent see the asm UI when ?asm=true is passed to the url', () => {
        checkout.visitHomePage('asm=true');
        cy.get('cx-asm-main-ui').should('exist');
      });
      it('should agent authenticate.', () => {
        const authenticationRequestAlias = asm.listenForAuthenticationRequest();
        cy.get('cx-csagent-login-form').should('exist');
        cy.get('cx-customer-selection').should('not.exist');
        cy.get('cx-csagent-login-form form').within(() => {
          cy.get('[formcontrolname="userId"]').type('asagent');
          cy.get('[formcontrolname="password"]').type('123456');
          cy.get('button[type="submit"]').click();
        });

        cy.wait(authenticationRequestAlias)
          .its('status')
          .should('eq', 200);
        cy.get('cx-csagent-login-form').should('not.exist');
        cy.get('cx-customer-selection').should('exist');
      });
      it('should agent start cusrtomer emulation.', () => {
        const customerSearchRequestAlias = asm.listenForCusrtomerSearchRequest();
        const userDetailsRequestAlias = asm.listenForUserDetailsRequest();

        cy.get('cx-csagent-login-form').should('not.exist');
        cy.get('cx-customer-selection').should('exist');
        cy.get('cx-customer-selection form').within(() => {
          cy.get('[formcontrolname="searchTerm"]').type(customer.email);
          cy.get('button[type="submit"]').click();
        });
        cy.wait(customerSearchRequestAlias)
          .its('status')
          .should('eq', 200);
        cy.wait(userDetailsRequestAlias)
          .its('status')
          .should('eq', 200);
        cy.get('div.cx-customer-emulation input')
          .invoke('attr', 'placeholder')
          .should('contain', `${customer.fullName}, ${customer.email}`);
        cy.get('cx-csagent-login-form').should('not.exist');
        cy.get('cx-customer-selection').should('not.exist');
      });
    });
    describe('Customer Emulation - Checkout', () => {
      it('should agent add a product to cart and begin checkout.', () => {
        checkout.clickCheapProductDetailsFromHomePage();
        checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
      });

      it('should agent fill in address form', () => {
        checkout.fillAddressFormWithCheapProduct();
      });

      it('should agent choose delivery', () => {
        checkout.chooseDeliveryMethod();
      });

      it('should agent fill in payment form', () => {
        checkout.fillPaymentFormWithCheapProduct();
      });

      it('should agent review and place order', () => {
        checkout.placeOrderWithCheapProduct();
      });

      it('should agent see summary page', () => {
        checkout.verifyOrderConfirmationPageWithCheapProduct();
      });
    });
    describe('Customer Emulation - My Account', () => {
      it('should agent be able to check order in order history', () => {
        checkout.viewOrderHistoryWithCheapProduct();
      });

      it('should agent update personal details.', () => {
        cy.selectUserMenuOption({
          option: 'Personal Details',
        });
        profile.updateProfile();
      });

      it('should agent delete address', () => {
        cy.selectUserMenuOption({
          option: 'Address Book',
        });
        cy.get('cx-address-card').should('have.length', 1);
        addressBook.deleteFirstAddress();
        cy.get('cx-address-card').should('have.length', 0);
      });

      it('should agent create new address', () => {
        addressBook.createNewAddress();
        cy.get('cx-address-card').should('have.length', 1);
        addressBook.verifyNewAddress();
      });

      it('should agent see the payment details created during checkout', () => {
        cy.selectUserMenuOption({
          option: 'Payment Details',
        });
        cy.get('.cx-payment .cx-body').then(() => {
          cy.get('cx-card').should('have.length', 1);
        });
      });

      it('should agent add a consent', () => {
        cy.selectUserMenuOption({
          option: 'Consent Management',
        });
        consent.giveConsent();
      });
    });
    describe('Customer Support Agent - End', () => {
      it('should agent stop customer emulation.', () => {
        checkout.signOutUser();
        cy.get('cx-csagent-login-form').should('not.exist');
        cy.get('cx-customer-selection').should('exist');
      });
      it('should agent sign out.', () => {
        cy.get('a[title="Sign Out"]').click();
        cy.get('cx-csagent-login-form').should('exist');
        cy.get('cx-customer-selection').should('not.exist');
      });

      it('should agent close the ASM UI.', () => {
        cy.get('a[title="Close ASM"]').click();
        cy.get('cx-asm-main-ui').should('not.exist');
      });
    });
    describe('Customer Self Verification', () => {
      it('should customer sign in.', () => {
        cy.visit('/login');
        login(customer.email, customer.password);
      });
      it('should customer see the order placed by the agent.', () => {
        checkout.viewOrderHistoryWithCheapProduct();
      });

      it('should customer see personal details updated by the agent.', () => {
        cy.selectUserMenuOption({
          option: 'Personal Details',
        });
        profile.verifyUpdatedProfile();
      });

      it('should customer see the address created by the agent.', () => {
        cy.selectUserMenuOption({
          option: 'Address Book',
        });
        cy.get('cx-address-card').should('have.length', 1);
        addressBook.verifyNewAddress();
      });

      it('should customer see the payment details created by the agent', () => {
        cy.selectUserMenuOption({
          option: 'Payment Details',
        });
        cy.get('.cx-payment .cx-body').then(() => {
          cy.get('cx-card').should('have.length', 1);
        });
      });

      it('should customer see the consent given by agent', () => {
        cy.selectUserMenuOption({
          option: 'Consent Management',
        });
        cy.get('input[type="checkbox"]')
          .first()
          .should('be.checked');
      });

      it('should customer sign out.', () => {
        checkout.signOutUser();
      });
    });
  });
}

export function listenForAuthenticationRequest(): string {
  const aliasName = 'csAgentAuthentication';
  cy.server();
  cy.route('POST', `/authorizationserver/oauth/token`).as(aliasName);
  return `@${aliasName}`;
}
export function listenForCusrtomerSearchRequest(): string {
  const aliasName = 'customerSearch';
  cy.server();
  cy.route(
    'GET',
    `/assistedservicewebservices/customers/search?baseSite=electronics-spa&query=*`
  ).as(aliasName);
  return `@${aliasName}`;
}
export function listenForUserDetailsRequest(): string {
  const aliasName = 'userDetails';
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/users/*').as(aliasName);
  return `@${aliasName}`;
}
