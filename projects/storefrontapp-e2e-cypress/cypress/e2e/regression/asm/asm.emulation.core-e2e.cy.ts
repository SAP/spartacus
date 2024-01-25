/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { login } from '../../../helpers/auth-forms';
import * as checkout from '../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../helpers/checkout-flow';
import { getErrorAlert } from '../../../helpers/global-message';
import { navigateToCategory, waitForPage } from '../../../helpers/navigation';
import { APPAREL_BASESITE } from '../../../helpers/variants/apparel-checkout-flow';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Assisted Service Module', () => {
  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();

    it('should checkout as customer', () => {
      const customer = getSampleUser();

      cy.log('--> Agent logging in');
      checkout.visitHomePage('asm=true');
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customer);

      cy.log('--> Add product to cart and go to checkout');
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer();

      cy.log('--> Go through delivery form');
      cy.contains('Continue').click();
      checkout.fillAddressFormWithCheapProduct();

      cy.log('--> Choose delivery method');
      checkout.verifyDeliveryMethod();

      cy.log('--> Fill payment form and continue');
      checkout.fillPaymentForm();

      cy.log('--> Place order');
      checkout.placeOrderWithCheapProduct();
    });
  });

  describe('When a customer session and an asm agent session are both active', () => {
    let customer;

    before(() => {
      clearAllStorage();

      cy.visit('/', { qs: { asm: true } });

      customer = getSampleUser();
      checkout.registerUser(false, customer);
    });

    it('Customer should not be able to login when there is an active CS agent session.', () => {
      const loginPage = waitForPage('/login', 'getLoginPage');
      cy.visit('/login?asm=true');
      cy.wait(`@${loginPage}`);

      asm.agentLogin('asagent', 'pw4all');
      login(customer.email, customer.password);
      getErrorAlert().should(
        'contain',
        'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.'
      );
    });

    // TODO(#3974): fix the bug to enable e2e test for this scenario
    it.skip('agent login when user is logged in should start this user emulation', () => {
      cy.visit('/login');
      login(customer.email, customer.password);

      checkout.visitHomePage('asm=true');

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Agent logging in');
      asm.agentLogin('asagent', 'pw4all');

      cy.get('cx-csagent-login-form').should('not.exist');
      cy.get('cx-customer-selection').should('not.exist');
      cy.get('cx-customer-emulation').should('be.visible');
    });

    // TODO(#7221): enable this case
    it.skip('agent logout when user was logged and emulated should restore the session', () => {
      checkout.visitHomePage('asm=true');

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Agent logging in');
      asm.agentLogin('asagent', 'pw4all');

      cy.log('--> Starting customer emulation');
      asm.startCustomerEmulation(customer);

      cy.log('--> Agent sign out');
      asm.agentSignOut();

      cy.get('cx-csagent-login-form').should('exist');
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

      cy.visit('/', { qs: { asm: true } });

      const customer = getSampleUser();
      checkout.registerUser(false, customer);

      asm.agentLogin('asagent', 'pw4all');

      asm.startCustomerEmulation(customer);

      navigateToCategory('Brands', 'brands', true);
      cy.get('cx-product-list').should('exist');
      cy.get('cx-product-list cx-product-grid-item').should(
        'have.length.at.least',
        1
      );

      navigateToCategory('Streetwear', 'streetwear', true);
      cy.get('cx-product-list').should('exist');
      cy.get('cx-product-list cx-product-grid-item').should(
        'have.length.at.least',
        1
      );

      navigateToCategory('Snow', 'snow', true);
      cy.get('cx-product-list').should('exist');
    });
  });
});
