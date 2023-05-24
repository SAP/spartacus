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
import { APPAREL_BASESITE } from '../../../../helpers/variants/apparel-checkout-flow';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

import { getSampleUser } from '../../../../sample-data/checkout-flow';
import { login as fetchingToken } from '../../../../support/utils/login';

import { addToCart, createInactiveCart } from '../../../../support/utils/cart';

const agentToken = {
  userName: 'asagent',
  pwd: 'pw4all',
};

context('Assisted Service Module', () => {
  describe('Customer Support Agent - Emulation', () => {
    asm.testCustomerEmulation();

    it('should emulate customer with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();
      cy.log('--> Register new user');
      cy.visit('/?asm=true');
      checkout.registerUser(false, customer);

      getCustomerId(agentToken.userName, agentToken.pwd, customer.email).then(
        (customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);
          asm.agentLogin(agentToken.userName, agentToken.pwd);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart').should('exist');

          cy.log('--> sign out and close ASM UI');
          asm.agentSignOut();
        }
      );
    });

    it('should emulate customer with deeplink after agent login (CXSPA-3113)', () => {
      const customer = getSampleUser();
      cy.log('--> Register new user');
      cy.visit('/?asm=true');
      checkout.registerUser(false, customer);

      cy.visit('/?asm=true');
      asm.agentLogin(agentToken.userName, agentToken.pwd);
      // get customerId via token
      getCustomerId(agentToken.userName, agentToken.pwd, customer.email).then(
        (customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart').should('exist');

          cy.log('--> sign out and close ASM UI');
          asm.agentSignOut();
        }
      );
    });

    it('should not emulate customer if uid is invalid - end emulation session is expected (CXSPA-3113)', () => {
      const customer = getSampleUser();
      cy.log('--> Register new user');
      cy.visit('/?asm=true');
      checkout.registerUser(false, customer);

      cy.log('--> login as agent');
      cy.visit('/?asm=true');
      asm.agentLogin(agentToken.userName, agentToken.pwd);
      // get customerId via token
      getCustomerId(agentToken.userName, agentToken.pwd, customer.email).then(
        (customerId) => {
          cy.visit(
            '/assisted-service/emulate?customerId=' + customerId + 'invalid end'
          );

          cy.log('--> Should not has assignCart');
          cy.get('.cx-asm-assignCart').should('not.exist');

          cy.log('--> sign out and close ASM UI');
          asm.agentSignOut();
        }
      );
    });

    it('should end session of emulated customer and emulate new customer if valid uid shows in URL (CXSPA-3113)', () => {
      const oldCustomer = getSampleUser();
      const newCustomer = getSampleUser();

      cy.log('--> Register 2 users');
      checkout.visitHomePage('asm=true');
      checkout.registerUser(false, oldCustomer);
      checkout.visitHomePage('asm=true');
      checkout.registerUser(false, newCustomer);

      cy.log('--> login as agent');
      cy.visit('/?asm=true');
      asm.agentLogin(agentToken.userName, agentToken.pwd);
      // get customerId via token
      getCustomerId(
        agentToken.userName,
        agentToken.pwd,
        oldCustomer.email
      ).then((customerId) => {
        const oldCustomerId = customerId;
        getCustomerId(
          agentToken.userName,
          agentToken.pwd,
          newCustomer.email
        ).then((customerId) => {
          const newCustomerId = customerId;

          cy.log('--> Agent logging in deeplink with old customer');
          cy.visit('/assisted-service/emulate?customerId=' + oldCustomerId);

          cy.log('--> Should has assignCart and uid is old customer');
          cy.get('.cx-asm-assignCart').should('exist');
          cy.get('.cx-asm-uid').should('have.text', oldCustomer.email);

          cy.log('--> Agent logging in deeplink with new customer');
          cy.visit('/assisted-service/emulate?customerId=' + newCustomerId);

          cy.log('--> Should has assignCart and uid is new customer');
          cy.get('.cx-asm-assignCart').should('exist');
          cy.get('.cx-asm-uid').should('have.text', newCustomer.email);

          cy.log('--> sign out and close ASM UI');
          asm.agentSignOut();
        });
      });
    });

    it('should save inative cart in deeplink after agent login (CXSPA-3278)', () => {
      let customer = emulateCustomerPrepare();
      getInactiveCartIdAndAddProducts(
        customer.email,
        customer.password,
        '1934793',
        '2'
      ).then((inactiveCartId) => {
        // get customerId via token
        getCustomerId(agentToken.userName, agentToken.pwd, customer.email).then(
          (customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
            );

            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart').should('exist');
            cy.get('button[id=asm-save-inactive-cart-btn]').should('exist');
            cy.get(
              'cx-customer-emulation input[formcontrolname="cartNumber"]'
            ).should('have.value', inactiveCartId);
            cy.get('cx-asm-main-ui cx-message').should('exist');

            cy.log('--> Click save button the dialog shold display');
            cy.get('button[id=asm-save-inactive-cart-btn]').click();
            cy.get('cx-asm-save-cart-dialog').should('exist');
            cy.get('cx-asm-save-cart-dialog .cx-message-info button cx-icon')
              .should('exist')
              .click();
            cy.get('.cx-dialog-item.item-right-text').should(
              'have.text',
              ` ${inactiveCartId}  2  $199.70 `
            );
            cy.get('button[id=asm-save-cart-dialog-btn]')
              .should('be.enabled')
              .click();

            cy.log(
              '--> Click save button will navigate to the cart detail page'
            );

            cy.get('.cx-card-label').should('contain', inactiveCartId);
            cy.get('cx-saved-cart-details-action .btn-primary').should(
              'be.enabled'
            );
            cy.url().should('include', 'saved-cart');
            cy.url().should('include', inactiveCartId);
            cy.log('--> sign out and close ASM UI');
            asm.agentSignOut();
          }
        );
      });
    });

    it('should not save empty inative cart in deeplink after agent login (CXSPA-3278)', () => {
      let customer = emulateCustomerPrepare();
      getInactiveCartIdAndAddProducts(customer.email, customer.password).then(
        (inactiveCartId) => {
          cy.log('--> create inactive cart');
          // get customerId via token
          getCustomerId(
            agentToken.userName,
            agentToken.pwd,
            customer.email
          ).then((customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
            );

            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart').should('exist');
            cy.get('button[id=asm-save-inactive-cart-btn]').should('exist');
            cy.get(
              'cx-customer-emulation input[formcontrolname="cartNumber"]'
            ).should('have.value', inactiveCartId);
            cy.get('cx-asm-main-ui cx-message').should('exist');

            cy.log(
              '--> Click save button the dialog shold display, but the save button is disable'
            );
            cy.get('button[id=asm-save-inactive-cart-btn]').click();
            cy.get('cx-asm-save-cart-dialog').should('exist');
            cy.get('cx-asm-save-cart-dialog .cx-message-warning button cx-icon')
              .should('exist')
              .click();
            cy.get('.cx-dialog-item.item-right-text').should(
              'have.text',
              ` ${inactiveCartId}  0  $0.00 `
            );
            cy.get('button[id=asm-save-cart-dialog-btn]').should('be.disabled');
            cy.findByText(/Cancel/i).click();

            cy.log('--> sign out and close ASM UI');
            asm.agentSignOut();
          });
        }
      );
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

  function emulateCustomerPrepare() {
    const customer = getSampleUser();
    cy.log('--> Register new user');
    cy.visit('/?asm=true');
    checkout.registerUser(false, customer);
    asm.agentLogin(agentToken.userName, agentToken.pwd);
    return customer;
  }

  function getCustomerId(agentUserName, agentPwd, customerUid) {
    return new Promise((resolve, reject) => {
      fetchingToken(agentUserName, agentPwd, false).then((res) => {
        // get customerId of it
        cy.request({
          method: 'get',
          url:
            `${Cypress.env('API_URL')}/${Cypress.env(
              'OCC_PREFIX'
            )}/${Cypress.env('BASE_SITE')}/users/` + customerUid,
          headers: {
            Authorization: `bearer ${res.body.access_token}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            resolve(response.body.customerId);
          } else {
            reject(response.status);
          }
        });
      });
    });
  }

  function getInactiveCartIdAndAddProducts(
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
              addToCart(inactiveCartId, productCode, quantity, token).then(
                (response) => {
                  if (response.status === 200) {
                    resolve(inactiveCartId);
                  } else {
                    reject(response.status);
                  }
                }
              );
            } else {
              resolve(inactiveCartId);
            }
          })
          .catch((status) => reject(status));
      });
    });
  }
});
