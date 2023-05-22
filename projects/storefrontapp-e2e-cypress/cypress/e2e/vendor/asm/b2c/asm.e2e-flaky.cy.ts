/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../../helpers/asm';
import { login } from '../../../../helpers/auth-forms';
import * as checkout from '../../../../helpers/checkout-flow';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import { getErrorAlert } from '../../../../helpers/global-message';
import {
  navigateToCategory,
  waitForPage,
} from '../../../../helpers/navigation';
import { doPlaceOrder } from '../../../../helpers/order-history';
import { APPAREL_BASESITE } from '../../../../helpers/variants/apparel-checkout-flow';
import { getSampleUser } from '../../../../sample-data/checkout-flow';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { signOutUser } from '../../../../helpers/login';
import * as customerTicketing from '../../../../helpers/customer-ticketing/customer-ticketing';
import * as savedCart from '../../../../helpers/saved-cart';
import * as sampleData from '../../../../sample-data/saved-cart';

const agentToken = {
  userName: 'asagent',
  pwd: 'pw4all',
};

context('Assisted Service Module', () => {
  describe.only('Customer Support Agent - Emulation', () => {
    // asm.testCustomerEmulation();

    it('should emulate customer with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();

      cy.log('--> Agent logging in with deeplink');
      cy.visit('/assisted-service/emulate?customerId=' + customer.email);
      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      asm.agentLogin(agentToken.userName, agentToken.pwd);

      cy.log('--> Should has assignCart');
      cy.get('.cx-asm-assignCart').should('exist');

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();
    });

    it('should emulate customer order with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();

      cy.log('--> Agent logging in with deeplink');
      cy.visit('/');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      login(customer.email, customer.password);
      cy.wait(1000);
      doPlaceOrder().then((orderData: any) => {
        signOutUser();

        const orderId = orderData.body.code;

        cy.visit(
          '/assisted-service/emulate?customerId=' +
            customer.email +
            '&orderId=' +
            orderId
        );
        cy.get('cx-asm-main-ui').should('exist');
        cy.get('cx-asm-main-ui').should('be.visible');

        asm.agentLogin(agentToken.userName, agentToken.pwd);

        cy.log('--> Should has assignCart');
        cy.get('.cx-asm-assignCart').should('exist');

        cy.url().should('contain', 'order/' + orderId);

        cy.log('--> sign out and close ASM UI');
        asm.agentSignOut();
      });
    });

    it('should emulate customer ticket with deeplink before agent login (CXSPA-3113)', () => {
      const testTicketDetails = {
        subject: 'for pagination',
        message: 'tgest pagination',
        ticketCategory: {
          id: 'ENQUIRY',
          name: 'Complaint',
        },
        //ticketCategory: {
        //  id: TestCategory.complaint.toUpperCase(),
        //  name: TestCategory.complaint,
        //},
      };

      const customer = getSampleUser();

      cy.log('--> Agent logging in with deeplink');
      cy.visit('/');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      login(customer.email, customer.password);
      cy.wait(1000);
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.verifyTicketListingTableContent();
      customerTicketing
        .getIdInRow(1)
        .invoke('text')
        .then((text) => {
          const ticketId = text.trim();
          console.log(ticketId);
          //cy.wait(1000);
          signOutUser();
          cy.visit(
            '/assisted-service/emulate?customerId=' +
              customer.email +
              '&ticketId=' +
              ticketId
          );
          cy.get('cx-asm-main-ui').should('exist');
          cy.get('cx-asm-main-ui').should('be.visible');

          asm.agentLogin(agentToken.userName, agentToken.pwd);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart').should('exist');

          cy.url().should('contain', 'support-ticket/' + ticketId);

          cy.log('--> sign out and close ASM UI');
          asm.agentSignOut();
        });
    });

    it('should emulate customer active cart with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();

      cy.log('--> Agent logging in with deeplink');
      cy.visit(
        '/assisted-service/emulate?customerId=' +
          customer.email +
          '&activeCartId=123'
      );

      cy.get('cx-asm-main-ui').should('exist');
      cy.get('cx-asm-main-ui').should('be.visible');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      asm.agentLogin(agentToken.userName, agentToken.pwd);

      cy.log('--> Should has assignCart');
      cy.get('.cx-asm-assignCart').should('exist');
    });

    it.only('should emulate customer saved cart with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();

      cy.visit('/');
      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      login(customer.email, customer.password);
      cy.wait(1000);

      savedCart.addProductToCart(sampleData.products[2], 2);
      cy.intercept('save?saveCartName=test1*');
      savedCart.saveActiveCart(false);

      cy.visit('my-account/saved-carts');

      cy.get('td.cx-saved-cart-list-cart-id').then((els) => {
        const savedCartId = els[0].innerText;

        signOutUser();

        cy.log('--> Agent logging in with deeplink');
        cy.visit(
          '/assisted-service/emulate?customerId=' +
            customer.email +
            '&savedCartId=' +
            savedCartId
        );

        cy.get('cx-asm-main-ui').should('exist');
        cy.get('cx-asm-main-ui').should('be.visible');

        asm.agentLogin(agentToken.userName, agentToken.pwd);

        cy.log('--> Should has assignCart');
        cy.get('.cx-asm-assignCart').should('exist');

        cy.url().should('contain', 'saved-cart/' + savedCartId);

        cy.log('--> sign out and close ASM UI');
        asm.agentSignOut();
      });
    });

    it('should emulate customer with deeplink after agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();

      cy.log('--> Register user');
      checkout.visitHomePage('asm=true');
      checkout.registerUser(false, customer);

      cy.log('--> login as agent');
      asm.agentLogin(agentToken.userName, agentToken.pwd);

      cy.log('--> Agent visting URL with deeplink');
      cy.visit('/assisted-service/emulate?customerId=' + customer.email);

      cy.log('--> Should has assignCart');
      cy.get('.cx-asm-assignCart').should('exist');

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();
    });

    it('should not emulate customer if uid is invalid - end emulation session is expected (CXSPA-3113)', () => {
      const customer = getSampleUser();
      checkout.visitHomePage('asm=true');

      cy.log('--> Register user');
      checkout.registerUser(false, customer);

      asm.agentLogin(agentToken.userName, agentToken.pwd);

      cy.log('--> Agent logging in deeplink with valid id');
      cy.visit('/assisted-service/emulate?customerId=' + customer.email);

      cy.log('--> Should has assignCart');
      cy.get('.cx-asm-assignCart').should('exist');

      cy.log('--> Agent logging in deeplink with invalid id');
      cy.visit(
        '/assisted-service/emulate?customerId=' + customer.email + 'invalidTail'
      );

      cy.log('--> Should not has assignCart');
      cy.get('.cx-asm-assignCart').should('not.exist');

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();
    });

    it('should end session of emulated customer and emulate new customer if valid uid shows in URL (CXSPA-3113)', () => {
      const customerOld = getSampleUser();
      const customerNew = getSampleUser();

      cy.log('--> Register 2 users');
      checkout.visitHomePage('asm=true');
      checkout.registerUser(false, customerOld);
      checkout.visitHomePage('asm=true');
      checkout.registerUser(false, customerNew);

      asm.agentLogin(agentToken.userName, agentToken.pwd);

      cy.log('--> Agent logging in deeplink with old customer');
      cy.visit('/assisted-service/emulate?customerId=' + customerOld.email);

      cy.log('--> Should has assignCart and uid is old customer');
      cy.get('.cx-asm-assignCart').should('exist');
      cy.get('.cx-asm-uid').should('have.text', customerOld.email);

      cy.log('--> Agent logging in deeplink with new customer');
      cy.visit('/assisted-service/emulate?customerId=' + customerNew.email);

      cy.log('--> Should has assignCart and uid is new customer');
      cy.get('.cx-asm-assignCart').should('exist');
      cy.get('.cx-asm-uid').should('have.text', customerNew.email);

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();
    });

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

      cy.log('--> sign out and close ASM UI');
      asm.agentSignOut();
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

    // TODO(#9445): Add e2e test for this scenario
    it.skip('agent login when user is logged in should start this user emulation', () => {});

    // TODO(#9445): Add e2e test for this scenario
    it.skip('agent logout when user was logged and emulated should restore the session', () => {});
  });

  describe('Apparel Site', () => {
    before(() => {
      Cypress.env('BASE_SITE', APPAREL_BASESITE);
    });

    after(() => {
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
    });

    // This test only works if "sap-commerce-cloud-user-id" is added to the allowed headers of "corsfilter.commercewebservices.allowedHeaders" on the Commerce Cloud side. (CXSPA-1355)
    it.skip("should fetch products in a category based on the emulated user's authentication", () => {
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

      navigateToCategory('Snow', 'snow', true);

      cy.get('cx-product-list').should('exist');
    });
  });
});
