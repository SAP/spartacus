/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { interceptPutDeliveryModeEndpoint } from '../../../../helpers/b2b/b2b-checkout';
import { waitForProductPage } from '../../../../helpers/checkout-flow';
import * as login from '../../../../helpers/login';
import { waitForPage } from '../../../../helpers/navigation';
import { interceptOrdersEndpoint } from '../../../../helpers/order-history';
import {
  POWERTOOLS_BASESITE,
  products,
} from '../../../../sample-data/b2b-checkout';
import { visitLoginPage } from '../../../../support/utils/login';

const OPF_B2B_TEST_EMAIL = 'william.hunter@rustic-hw.com';
const OPF_B2B_TEST_PASSWORD = 'pw4all';
const OPF_B2B_ACCOUNT_PAYMENT_OPTION_ID = '2720';

context('OPF B2B - Account Checkout flow', () => {
  before(() => {
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
  });

  it('Should checkout using an account payment type (CXSPA-9698)', () => {
    // Login as OPF B2B user
    visitLoginPage();
    login.listenForTokenAuthenticationRequest();

    cy.get('cx-login-form').within(() => {
      cy.get('[formcontrolname="userId"]').type(OPF_B2B_TEST_EMAIL);
      cy.get('[formcontrolname="password"]').type(OPF_B2B_TEST_PASSWORD);
      cy.get('button[type="submit"]').click();
    });

    cy.wait('@tokenAuthentication')
      .its('response.statusCode')
      .should('eq', 200);

    // Go to PDP and add product to cart
    const productCode = products[0].code;
    const productName = products[0].name;
    const productPage = waitForProductPage(productCode, 'getProductPage');

    cy.visit(`${POWERTOOLS_BASESITE}/en/USD/product/${productCode}`);
    cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

    cy.get('cx-product-intro').within(() => {
      cy.get('.code').should('contain', productCode);
    });
    cy.get('cx-breadcrumb').within(() => {
      cy.get('h1').should('contain', productName);
    });

    cy.get('cx-add-to-cart').findByText('Add to cart').click();
    cy.get('cx-added-to-cart-dialog').within(() => {
      cy.get('.cx-name .cx-link').should('contain', productName);
    });

    // Go to checkout
    const paymentTypePage = waitForPage(
      '/checkout/opf-payment-type',
      'getPaymentType'
    );
    cy.findByText('proceed to checkout').click();
    cy.wait(`@${paymentTypePage}`).its('response.statusCode').should('eq', 200);

    cy.intercept({
      method: 'GET',
      pathname: '**/active-configurations**',
    }).as('activeConfigurations');

    cy.wait(`@activeConfigurations`)
      .its('response.statusCode')
      .should('eq', 200);

    cy.intercept({
      method: 'PUT',
      pathname: '**/paymentOption**',
    }).as('paymentOption');
    cy.get('cx-opf-b2b-checkout-payment-type').within(() => {
      cy.get(`input#paymentId-${OPF_B2B_ACCOUNT_PAYMENT_OPTION_ID}`)
        .should('be.visible')
        .check({ force: true });

      cy.wait(`@paymentOption`).its('response.statusCode').should('eq', 200);

      cy.findByText('Continue').click();
    });

    // Select shipping address
    cy.wait(3000);
    cy.findByText('Continue').click();

    // Select delivery mode
    const deliveryModeAlias = interceptPutDeliveryModeEndpoint();
    cy.wait(`@${deliveryModeAlias}`)
      .its('response.statusCode')
      .should('eq', 200);
    cy.findByText('Continue').click();

    // Place order
    cy.findByText('Place Order').click();

    const ordersAlias = interceptOrdersEndpoint();
    cy.wait(`@${ordersAlias}`).its('response.statusCode').should('eq', 200);
    cy.get('cx-order-confirmation-thank-you-message').within(() => {
      cy.get('.cx-order-confirmation-message').should(
        'contain',
        'Thank you for your order!'
      );
    });
  });
});
