/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../../../helpers/asm';
import { login } from '../../../helpers/auth-forms';
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import { signOutUser } from '../../../helpers/login';
import * as savedCart from '../../../helpers/saved-cart';
import {
  getASMB2CCustomer,
  getASMB2CCustomer2,
  getB2CAgent,
  getProductCode,
  getTicketDetails,
} from '../../../sample-data/asm-flow';
import * as sampleData from '../../../sample-data/saved-cart';
import { visitLoginPage } from '../../../support/utils/login';

import {
  doPlaceOrderForB2CCustomer,
  doPlaceOrderForB2CCustomerForJDK21,
  emulateExistedCustomerPrepare,
  getCurrentCartIdAndAddProducts,
  getCurrentCartIdAndAddProductsForJdk21,
  getCustomerId,
  getCustomerIdForJDK21,
  getCustomerIdWithAgentToken,
  getInactiveCartIdAndAddProducts,
  getInactiveCartIdAndAddProductsForJDK21,
  getToken,
} from '../../../helpers/asm';

import { waitForPage } from '../../../helpers/navigation';

const b2cAgent = getB2CAgent();
const productCode = getProductCode();
const testTicketDetails = getTicketDetails();

context('Assisted Service Module', () => {
  describe('Customer Support Agent - Emulation&deeplink', () => {
    it('should emulate customer with deeplink before agent login (CXSPA-3113)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> Login in user');
      cy.whenJDK17(() => {
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          asm.agentLogin(b2cAgent.userName, b2cAgent.password);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');
        });
      });
      cy.whenJDK21(() => {
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');
        });
      });
    });

    it('should emulate customer and navigate to order with deeplink before agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();
      cy.log('--> Agent logging in with deeplink');
      cy.visit('/');

      cy.whenJDK17(() => {
        visitLoginPage();
        login(customer.email, customer.password);
        cy.get('cx-login .cx-login-greet').should('be.visible');
        doPlaceOrderForB2CCustomer(
          customer.email,
          customer.password,
          productCode
        ).then((orderData: any) => {
          signOutUser();

          const orderId = orderData.body.code;
          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&orderId=' +
                orderId
            );
            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            asm.agentLogin(b2cAgent.userName, b2cAgent.password);

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.url().should('contain', 'order/' + orderId);
          });
        });
      });

      cy.whenJDK21(() => {
        cy.getLoginRegisterLink({ clickAndWait: true });
        doPlaceOrderForB2CCustomerForJDK21(
          customer.email,
          customer.password,
          productCode
        ).then((orderData: any) => {
          signOutUser();

          const orderId = orderData.body.code;

          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&orderId=' +
                orderId
            );
            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.url().should('contain', 'order/' + orderId);
          });
        });
      });
    });

    it('should emulate customer and navigate to support ticket with deeplink before agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> Agent logging in with deeplink');
      cy.visit('/');

      cy.log('--> Login in user');
      cy.whenJDK17(() => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        visitLoginPage();
        cy.wait(`@${loginPage}`);
      });

      cy.whenJDK21(() => {
        cy.getLoginRegisterLink({ clickAndWait: true });
      });
      login(customer.email, customer.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');

      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.verifyTicketListingTableContent();
      customerTicketing
        .getIdInRow(1)
        .invoke('text')
        .then((text) => {
          const ticketId = text.trim();
          signOutUser();

          cy.whenJDK17(() => {
            getCustomerId(
              b2cAgent.userName,
              b2cAgent.password,
              customer.email
            ).then((customerId) => {
              cy.visit(
                '/assisted-service/emulate?customerId=' +
                  customerId +
                  '&ticketId=' +
                  ticketId
              );
              cy.get('cx-asm-main-ui').should('exist');
              cy.get('cx-asm-main-ui').should('be.visible');

              cy.log('--> Should has assignCart');
              cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

              cy.url().should('contain', 'support-ticket/' + ticketId);
            });
          });

          cy.whenJDK21(() => {
            getCustomerIdForJDK21(
              b2cAgent.userName,
              b2cAgent.password,
              customer.email
            ).then((customerId) => {
              cy.visit(
                '/assisted-service/emulate?customerId=' +
                  customerId +
                  '&ticketId=' +
                  ticketId
              );
              cy.get('cx-asm-main-ui').should('exist');
              cy.get('cx-asm-main-ui').should('be.visible');

              cy.get(
                '.cx-asm-customer-list .cx-asm-customer-list-link'
              ).click();

              cy.log('--> Should has assignCart');
              cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

              cy.url().should('contain', 'support-ticket/' + ticketId);
            });
          });
        });
    });

    it('should emulate customer and navigate to saved cart with deeplink before agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();
      cy.visit('/');

      cy.log('--> Login in user');
      cy.whenJDK17(() => {
        const loginPage = waitForPage('/login', 'getLoginPage');
        visitLoginPage();
        cy.wait(`@${loginPage}`);
      });

      cy.whenJDK21(() => {
        cy.getLoginRegisterLink({ clickAndWait: true });
      });
      login(customer.email, customer.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');

      savedCart.addProductToCart(sampleData.products[2], 2);
      cy.intercept('save?saveCartName=test1*');
      savedCart.saveActiveCart(false);

      cy.visit('my-account/saved-carts');

      cy.get('td.cx-saved-cart-list-cart-id').then((els) => {
        const savedCartId = els[0].innerText;

        signOutUser();

        cy.log('--> Agent logging in with deeplink');

        cy.whenJDK17(() => {
          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&cartId=' +
                savedCartId +
                '&cartType=saved'
            );

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            asm.agentLogin(b2cAgent.userName, b2cAgent.password);

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.url().should('contain', 'saved-cart/' + savedCartId);
          });
        });

        cy.whenJDK21(() => {
          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&cartId=' +
                savedCartId +
                '&cartType=saved'
            );

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.get('.cx-asm-customer-list .cx-asm-customer-list-link').click();

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.url().should('contain', 'saved-cart/' + savedCartId);
          });
        });
      });
    });

    it('should emulate customer with deeplink after agent login (CXSPA-3113)', () => {
      let customer = getASMB2CCustomer();

      // get customerId via token
      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');
        });
      });

      cy.whenJDK21(() => {
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');
        });
      });
    });

    it('should switched emulated customer with deeplink when click switch customer after agent login (CXSPA-3380)', () => {
      let customerOld = getASMB2CCustomer();
      const customerNew = getASMB2CCustomer2();

      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        // get customerId via token
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customerOld.email
        ).then((customerOldId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerOldId);

          cy.log('--> Should has emulated old customer');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customerOld.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customerOld.email
          );

          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customerNew.email
          ).then((customerNewId) => {
            cy.visit('/assisted-service/emulate?customerId=' + customerNewId);

            cy.log('--> Switch emulated customer dialog should be exist');
            cy.get('cx-asm-switch-customer-dialog').should('exist');

            cy.log('--> Click switch button to switch to emulate new customer');
            cy.get(
              'cx-asm-switch-customer-dialog .cx-dialog-footer .btn-primary'
            )
              .should('exist')
              .click();

            cy.log('--> Should has emulated new customer');
            cy.get('.cx-asm-customerInfo .cx-asm-name').should(
              'have.text',
              customerNew.fullName
            );
            cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
              'have.text',
              customerNew.email
            );
          });
        });
      });

      cy.whenJDK21(() => {
        // get customerId via token
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customerOld.email
        ).then((customerOldId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerOldId);

          cy.log('--> Should has emulated old customer');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customerOld.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customerOld.email
          );
          getToken().then((token) => {
            getCustomerIdWithAgentToken(token, customerNew.email).then(
              (customerNewId) => {
                cy.visit(
                  '/assisted-service/emulate?customerId=' + customerNewId
                );

                cy.log('--> Switch emulated customer dialog should be exist');
                cy.get('cx-asm-switch-customer-dialog').should('exist');

                cy.log(
                  '--> Click switch button to switch to emulate new customer'
                );
                cy.get(
                  'cx-asm-switch-customer-dialog .cx-dialog-footer .btn-primary'
                )
                  .should('exist')
                  .click();

                cy.log('--> Should has emulated new customer');
                cy.get('.cx-asm-customerInfo .cx-asm-name').should(
                  'have.text',
                  customerNew.fullName
                );
                cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
                  'have.text',
                  customerNew.email
                );
              }
            );
          });
        });
      });
    });
    it('should not to switch emulated customer with deeplink when click cancel after agent login (CXSPA-3380)', () => {
      let customerA = getASMB2CCustomer();
      const customerB = getASMB2CCustomer2();

      // get customerId via token

      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customerA.email
        ).then((customerId1) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId1);

          cy.log('--> Should has emulated customerA');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customerA.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customerA.email
          );

          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customerB.email
          ).then((customerId2) => {
            cy.visit('/assisted-service/emulate?customerId=' + customerId2);

            cy.log('--> Switch emulated customer dialog should be exist');
            cy.get('cx-asm-switch-customer-dialog').should('exist');

            cy.log('--> Click cancel button to not switch customer');
            cy.get(
              'cx-asm-switch-customer-dialog .cx-dialog-footer .btn-secondary'
            ).should('exist');
            cy.findByText(/Cancel/i).click();

            cy.log('--> Should still emulated customerA');
            cy.get('.cx-asm-customerInfo .cx-asm-name').should(
              'have.text',
              customerA.fullName
            );
            cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
              'have.text',
              customerA.email
            );
          });
        });
      });

      cy.whenJDK21(() => {
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customerA.email
        ).then((customerId1) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId1);

          cy.log('--> Should has emulated customerA');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customerA.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customerA.email
          );

          getToken().then((token) => {
            getCustomerIdWithAgentToken(token, customerB.email).then(
              (customerId2) => {
                cy.visit('/assisted-service/emulate?customerId=' + customerId2);

                cy.log('--> Switch emulated customer dialog should be exist');
                cy.get('cx-asm-switch-customer-dialog').should('exist');

                cy.log('--> Click cancel button to not switch customer');
                cy.get(
                  'cx-asm-switch-customer-dialog .cx-dialog-footer .btn-secondary'
                ).should('exist');
                cy.findByText(/Cancel/i).click();

                cy.log('--> Should still emulated customerA');
                cy.get('.cx-asm-customerInfo .cx-asm-name').should(
                  'have.text',
                  customerA.fullName
                );
                cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
                  'have.text',
                  customerA.email
                );
              }
            );
          });
        });
      });
    });

    it('should diaplay global error with deeplink when the switched customerId not exist after agent login (CXSPA-3380)', () => {
      let customer = getASMB2CCustomer();

      // get customerId via token
      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has emulated customerA');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customer.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customer.email
          );

          cy.visit('/assisted-service/emulate?customerId=notexist');
          cy.log('--> global error message should be display');
          cy.get('cx-global-message .alert-danger').should('be.visible');
        });
      });

      cy.whenJDK21(() => {
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit('/assisted-service/emulate?customerId=' + customerId);

          cy.log('--> Should has emulated customerA');
          cy.get('.cx-asm-customerInfo .cx-asm-name').should(
            'have.text',
            customer.fullName
          );
          cy.get('.cx-asm-customerInfo .cx-asm-uid').should(
            'have.text',
            customer.email
          );

          cy.visit('/assisted-service/emulate?customerId=notexist');
          cy.log('--> global error message should be display');
          cy.get('cx-global-message .alert-danger').should('be.visible');
        });
      });
    });

    it('should emulate customer and navigate to order with deeplink after agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> login in user');

      cy.log('--> Place an order then login as agent');
      cy.whenJDK17(() => {
        cy.visit('/?asm=true');
        visitLoginPage();
        login(customer.email, customer.password);
        cy.get('cx-login .cx-login-greet').should('be.visible');
        doPlaceOrderForB2CCustomer(
          customer.email,
          customer.password,
          productCode
        ).then((orderData: any) => {
          signOutUser();

          const orderId = orderData.body.code;

          asm.agentLogin(b2cAgent.userName, b2cAgent.password);

          cy.log('--> Agent visting URL with deeplink');
          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&orderId=' +
                orderId
            );
            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.get('cx-asm-main-ui').should('be.visible');
            cy.get('cx-asm-main-ui').should('exist');

            cy.url().should('contain', 'order/' + orderId);
          });
        });
      });

      cy.whenJDK21(() => {
        doPlaceOrderForB2CCustomerForJDK21(
          customer.email,
          customer.password,
          productCode
        ).then((orderData: any) => {
          signOutUser();

          const orderId = orderData.body.code;

          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&orderId=' +
                orderId
            );
            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.get('cx-asm-main-ui').should('be.visible');
            cy.get('cx-asm-main-ui').should('exist');

            cy.url().should('contain', 'order/' + orderId);
          });
        });
      });
    });

    it('should emulate customer and navigate to support ticket with deeplink after agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> Login in user');

      cy.whenJDK17(() => {
        cy.visit('/?asm=true');
      });

      cy.whenJDK21(() => {
        cy.visit('/');
        cy.getLoginRegisterLink({ clickAndWait: true });
      });

      visitLoginPage();
      login(customer.email, customer.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');

      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.verifyTicketListingTableContent();
      customerTicketing
        .getIdInRow(1)
        .invoke('text')
        .then((text) => {
          const ticketId = text.trim();
          signOutUser();

          cy.log('--> login as agent');
          cy.whenJDK17(() => {
            asm.agentLogin(b2cAgent.userName, b2cAgent.password);
          });

          cy.log('--> Agent visting URL with deeplink');

          cy.whenJDK17(() => {
            getCustomerId(
              b2cAgent.userName,
              b2cAgent.password,
              customer.email
            ).then((customerId) => {
              cy.visit(
                '/assisted-service/emulate?customerId=' +
                  customerId +
                  '&ticketId=' +
                  ticketId
              );

              cy.log('--> Should has assignCart');
              cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

              cy.get('cx-asm-main-ui').should('exist');
              cy.get('cx-asm-main-ui').should('be.visible');

              cy.url().should('contain', 'support-ticket/' + ticketId);
            });
          });

          cy.whenJDK21(() => {
            getCustomerIdForJDK21(
              b2cAgent.userName,
              b2cAgent.password,
              customer.email
            ).then((customerId) => {
              cy.visit(
                '/assisted-service/emulate?customerId=' +
                  customerId +
                  '&ticketId=' +
                  ticketId
              );

              cy.log('--> Should has assignCart');
              cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

              cy.get('cx-asm-main-ui').should('exist');
              cy.get('cx-asm-main-ui').should('be.visible');

              cy.url().should('contain', 'support-ticket/' + ticketId);
            });
          });
        });
    });

    it('should emulate customer and navigate to saved cart with deeplink after agent login (CXSPA-3263)', () => {
      const customer = getASMB2CCustomer();

      cy.whenJDK17(() => {
        cy.visit('/?asm=true');
      });

      cy.whenJDK21(() => {
        cy.visit('/');
        cy.getLoginRegisterLink({ clickAndWait: true });
      });
      visitLoginPage();
      login(customer.email, customer.password);
      cy.get('cx-login .cx-login-greet').should('be.visible');

      savedCart.addProductToCart(sampleData.products[2], 2);
      cy.intercept('save?saveCartName=test1*');
      savedCart.saveActiveCart(false);

      cy.visit('my-account/saved-carts');

      cy.get('td.cx-saved-cart-list-cart-id').then((els) => {
        const savedCartId = els[0].innerText;

        signOutUser();

        cy.whenJDK17(() => {
          asm.agentLogin(b2cAgent.userName, b2cAgent.password);
        });

        cy.log('--> Agent logging in with deeplink');

        cy.whenJDK17(() => {
          getCustomerId(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&cartId=' +
                savedCartId +
                '&cartType=saved'
            );

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.url().should('contain', 'saved-cart/' + savedCartId);
          });
        });
        cy.whenJDK21(() => {
          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              '/assisted-service/emulate?customerId=' +
                customerId +
                '&cartId=' +
                savedCartId +
                '&cartType=saved'
            );

            cy.log('--> Should has assignCart');
            cy.get('.cx-asm-assignCart-input-show-no-button').should('exist');

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.url().should('contain', 'saved-cart/' + savedCartId);
          });
        });
      });
    });

    it('should emulate customer and navigate to active cart with deeplink after agent login (CXSPA-3507)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> Agent logging in with deeplink');

      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          getCurrentCartIdAndAddProducts(
            customer.email,
            customer.password,
            '1934793',
            '2'
          ).then((activeCartId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${activeCartId}&cartType=active`
            );

            cy.log('--> Should navigate to current cart page');
            cy.get('.cart-details-wrapper .cx-total').should(
              'contain',
              activeCartId
            );

            cy.log('--> Should navigate to current cart page');
            cy.get('.cart-details-wrapper .cx-total').should(
              'have.text',
              `  Cart #${activeCartId} `
            );

            cy.url().should('contain', '/cart');
          });
        });
      });

      cy.whenJDK21(() => {
        getCurrentCartIdAndAddProductsForJdk21(
          customer.email,
          customer.password,
          '1934793',
          '2'
        ).then((activeCartId) => {
          signOutUser();

          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${activeCartId}&cartType=active`
            );

            cy.log('--> Should navigate to current cart page');
            cy.get('.cart-details-wrapper .cx-total').should(
              'contain',
              activeCartId
            );

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.url().should('contain', '/cart');
            cy.log('--> test end');
          });
        });
      });
    });

    it('should emulate customer and navigate to active cart with deeplink ticketId and active cartId after agent login (CXSPA-3507)', () => {
      const customer = getASMB2CCustomer();

      cy.log('--> Agent logging in with deeplink');
      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          getCurrentCartIdAndAddProducts(
            customer.email,
            customer.password,
            '1934793',
            '2'
          ).then((activeCartId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&ticketId=00000008&cartId=${activeCartId}&cartType=active`
            );

            cy.log('--> Should navigate to current cart page');
            cy.get('.cart-details-wrapper .cx-total').should(
              'contain',
              activeCartId
            );

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.url().should('contain', '/cart');
          });
        });
      });

      cy.whenJDK21(() => {
        getCurrentCartIdAndAddProductsForJdk21(
          customer.email,
          customer.password,
          '1934793',
          '2'
        ).then((activeCartId) => {
          signOutUser();
          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&ticketId=00000008&cartId=${activeCartId}&cartType=active`
            );

            cy.log('--> Should navigate to current cart page');
            cy.get('.cart-details-wrapper .cx-total').should(
              'contain',
              activeCartId
            );

            cy.get('cx-asm-main-ui').should('exist');
            cy.get('cx-asm-main-ui').should('be.visible');

            cy.url().should('contain', '/cart');

            cy.log('--> test end');
          });
        });
      });
    });

    it('should not emulate customer if uid is invalid - end emulation session is expected (CXSPA-3113)', () => {
      const customer = getASMB2CCustomer();

      // get customerId via token
      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit(
            '/assisted-service/emulate?customerId=' + customerId + 'invalid end'
          );

          cy.log('--> Should not has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('not.exist');
        });
      });

      cy.whenJDK21(() => {
        getCustomerIdForJDK21(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          cy.visit(
            '/assisted-service/emulate?customerId=' + customerId + 'invalid end'
          );

          cy.log('--> Should not has assignCart');
          cy.get('.cx-asm-assignCart-input-show-no-button').should('not.exist');
        });
      });
    });

    it('should save inactive cart in deeplink after agent login (CXSPA-3278)', () => {
      let customer = getASMB2CCustomer();

      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);
        getCustomerId(
          b2cAgent.userName,
          b2cAgent.password,
          customer.email
        ).then((customerId) => {
          getInactiveCartIdAndAddProducts(
            customer.email,
            customer.password,
            '1934793',
            '2'
          ).then((inactiveCartId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
            );
            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart-input-show-no-button', {
              timeout: 15000,
            }).should('exist');
            cy.get('button[id=asm-save-inactive-cart-btn]').should('exist');
            cy.get(
              'cx-customer-emulation input[formcontrolname="cartNumber"]'
            ).should('have.value', inactiveCartId);
            cy.get('cx-asm-main-ui cx-message').should('exist');

            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart', { timeout: 15000 }).should('exist');
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

            cy.get('.cx-card-label').should('contain', inactiveCartId);
            cy.get('cx-saved-cart-details-action .btn-primary').should(
              'be.enabled'
            );
            cy.url().should('include', 'saved-cart');
            cy.url().should('include', inactiveCartId);
          });
        });
      });
      cy.whenJDK21(() => {
        getInactiveCartIdAndAddProductsForJDK21(
          customer.email,
          customer.password,
          '1934793',
          '2'
        ).then((inactiveCartId) => {
          signOutUser();
          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
            );

            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart-input-show-no-button', {
              timeout: 15000,
            }).should('exist');
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

            cy.log('--> test end');
          });
        });
      });
    });

    it('should not save empty inactive cart in deeplink after agent login (CXSPA-3278)', () => {
      let customer = getASMB2CCustomer();

      cy.whenJDK17(() => {
        emulateExistedCustomerPrepare(b2cAgent.userName, b2cAgent.password);

        getInactiveCartIdAndAddProducts(customer.email, customer.password).then(
          (inactiveCartId) => {
            cy.log('--> create inactive cart');
            // get customerId via token
            getCustomerId(
              b2cAgent.userName,
              b2cAgent.password,
              customer.email
            ).then((customerId) => {
              cy.visit(
                `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
              );

              cy.log(
                '--> Should has assign inactive cart to input and display alert info'
              );
              cy.get('.cx-asm-assignCart-input-show-no-button', {
                timeout: 15000,
              }).should('exist');
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
              cy.get(
                'cx-asm-save-cart-dialog .cx-message-warning button cx-icon'
              )
                .should('exist')
                .click();
              cy.get('.cx-dialog-item.item-right-text').should(
                'have.text',
                ` ${inactiveCartId}  0  $0.00 `
              );
              cy.get('button[id=asm-save-cart-dialog-btn]').should(
                'be.disabled'
              );
              cy.findByText(/Cancel/i).click();
            });
          }
        );
      });

      cy.whenJDK21(() => {
        getInactiveCartIdAndAddProductsForJDK21(
          customer.email,
          customer.password
        ).then((inactiveCartId) => {
          cy.log('--> create inactive cart');
          signOutUser();
          getCustomerIdForJDK21(
            b2cAgent.userName,
            b2cAgent.password,
            customer.email
          ).then((customerId) => {
            cy.visit(
              `/assisted-service/emulate?customerId=${customerId}&cartId=${inactiveCartId}&cartType=inactive`
            );

            cy.log(
              '--> Should has assign inactive cart to input and display alert info'
            );
            cy.get('.cx-asm-assignCart-input-show-no-button', {
              timeout: 15000,
            }).should('exist');
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

            cy.log('--> test end');
          });
        });
      });
    });
  });
});
