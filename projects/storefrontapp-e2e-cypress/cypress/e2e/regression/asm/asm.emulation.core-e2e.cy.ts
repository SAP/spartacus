/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { agentLoginForJDK21, login } from '../../../helpers/auth-forms';
import * as checkout from '../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../helpers/checkout-flow';
import { getErrorAlert } from '../../../helpers/global-message';
import { navigateToCategory, waitForPage } from '../../../helpers/navigation';
import { APPAREL_BASESITE } from '../../../helpers/variants/apparel-checkout-flow';
import { getB2CAgent } from '../../../sample-data/asm-flow';
import { visitLoginPage } from '../../../support/utils/login';

const b2cAgent = getB2CAgent();
context('Assisted Service Module', () => {
  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();

    it('should checkout as customer (CXSPA-7026)', () => {
      const customer = asm.registerUser();
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

      cy.log('--> Add product to cart and go to checkout');
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();

      cy.log('--> Go through delivery form');
      cy.contains('Continue').click();
      checkout.fillAddressFormWithCheapProduct();

      cy.log('--> Choose delivery options');
      checkout.verifyDeliveryOptions();

      cy.log('--> Fill payment form and continue');
      checkout.fillPaymentForm();

      cy.log('--> Place order');
      checkout.placeOrderWithCheapProduct();

      cy.log('--> Starting customer emulation with customer order ID');
      cy.get('.cx-page-title').then((el) => {
        const orderNumber = el.text().match(/\d+/)[0];
        cy.log('--> End session');
        const homepage = waitForPage('homepage', 'getHomePage');
        cy.get('cx-customer-emulation')
          .findByText(/End Session/i)
          .click();
        // Make sure homepage is visible
        cy.wait(`@${homepage}`).its('response.statusCode').should('eq', 200);
        cy.get('cx-global-message div').should(
          'contain',
          'You have successfully signed out.'
        );
        cy.wait(1000);
        asm.startCustomerEmulationWithOrderID(orderNumber, customer);
      });
    });
  });

  describe('When a customer session and an asm agent session are both active', () => {
    it('Customer should not be able to login when there is an active CS agent session (CXSPA-10932)', () => {
      const customer = asm.registerUser();
      cy.whenJDK17(() => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        cy.visit('/login?asm=true');
        cy.wait(`@${loginPage}`);
        asm.agentLogin(b2cAgent.userName, b2cAgent.password);
        login(customer.email, customer.password);
        getErrorAlert().should(
          'contain',
          'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.'
        );
      });

      cy.whenJDK21(() => {
        checkout.visitHomePage('asm=true');
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
        cy.get('cx-login').find('a[role="link"]').should('not.exist');
      });
    });

    // TODO(#3974): fix the bug to enable e2e test for this scenario
    it('agent login when user is logged in should start this user emulation', () => {
      const customer = asm.registerUser();
      cy.whenJDK17(() => {
        visitLoginPage();
      });
      cy.whenJDK21(() => {
        checkout.visitHomePage('asm=true');
        cy.get('button.close[title="Close ASM"]').click();
        cy.get('a[role="link"]').contains('Sign In / Register').click();
      });
      login(customer.email, customer.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');
      checkout.visitHomePage('asm=true');

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Agent logging in');
      cy.whenJDK17(() => {
        asm.agentLogin(b2cAgent.userName, b2cAgent.password);
        cy.get('cx-customer-emulation').should('be.visible');
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
      });

      cy.get('cx-csagent-login-form').should('not.exist');
      cy.get('cx-customer-selection').should('not.exist');
    });

    // TODO(#7221): enable this case
    it('agent logout when user was logged and emulated should restore the session', () => {
      const customer = asm.registerUser();
      checkout.visitHomePage('asm=true');

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Agent logging in');
      cy.whenJDK17(() => {
        asm.agentLogin(b2cAgent.userName, b2cAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
      });

      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customer);

      cy.log('--> Agent sign out');
      asm.agentSignOut();

      cy.whenJDK17(() => {
        cy.get('cx-csagent-login-form').should('exist');
      });
      cy.whenJDK21(() => {
        cy.contains('a.cx-asm-customer-list-link', 'Sign In as Agent').should(
          'exist'
        );
      });
      cy.get('cx-customer-emulation').should('not.exist');
    });
  });

  describe('Apparel Site', () => {
    before(() => {
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
    });

    after(() => {
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
    });

    it("should fetch products in a category based on the emulated user's authentication", () => {
      cy.cxConfig({
        context: {
          baseSite: ['apparel-uk-spa'],
          currency: ['GBP'],
        },
      });

      const customer = asm.registerUser();

      cy.visit('/', { qs: { asm: true } });

      cy.whenJDK17(() => {
        asm.agentLogin(b2cAgent.userName, b2cAgent.password);
      });

      cy.whenJDK21(() => {
        cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();
        agentLoginForJDK21(b2cAgent.userName, b2cAgent.password);
      });
      asm.startCustomerEmulation(customer);

      navigateToCategory('Brands', 'brands', true);
      cy.get('cx-product-list').should('exist');
      cy.get('cx-product-list cx-product-grid-item').should(
        'have.length.at.least',
        1
      );
      cy.get('cx-page-slot cx-breadcrumb h1').should('contain', 'Brands');

      navigateToCategory('Streetwear', 'streetwear', true);
      cy.get('cx-product-list').should('exist');
      cy.get('cx-product-list cx-product-grid-item').should(
        'have.length.at.least',
        1
      );
      cy.get('cx-page-slot cx-breadcrumb h1').should('contain', 'Streetwear');

      navigateToCategory('Snow', 'snow', true);
      cy.get('cx-page-slot cx-banner cx-generic-link').should(
        'have.length.at.least',
        1
      );
    });
  });
});
