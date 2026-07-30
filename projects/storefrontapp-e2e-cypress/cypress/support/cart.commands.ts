/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { addProductToB2BCart, addToCart, createCart } from './utils/cart';

declare namespace Cypress {
  interface Chainable {
    /**
       * Creates a new cart and adds items to it
       * @memberof Cypress.Chainable
       * @example
        ```
        cy.addToCart(productCode, quantity, accessToken)
        ```
       */
    addToCart: (itemId: string, quantity: string, accessToken: string) => void;

    /**
       * Creates a new cart and adds items to B2B Cart
       * @memberof Cypress.Chainable
       * @example
        ```
        cy.addProductToB2BCart(productCode, quantity, accessToken)
        ```
       */
    addProductToB2BCart: (
      itemId: string,
      quantity: string,
      accessToken: string
    ) => void;
  }
}

Cypress.Commands.add(
  'addToCart',
  (productCode: string, quantity: string, accessToken: string) => {
    createCart(accessToken).then((response) => {
      const cartId = response.body.code;
      addToCart(cartId, productCode, quantity, accessToken).then(() => {
        Cypress.log({
          name: 'addToCart',
          displayName: 'Add to cart',
          message: [`🛒 Product(s) added to cart`],
          consoleProps: () => {
            return {
              'Cart ID': cartId,
              'Product code': productCode,
              Quantity: quantity,
            };
          },
        });

        cy.wrap(cartId);
      });
    });
  }
);

Cypress.Commands.add(
  'addToCartForJDK21',
  (productCode: string, quantity: string, customer: string, pwd: string) => {
    cy.visit('/');

    cy.contains('a[role="link"]', 'Sign In / Register').should(
      'have.attr',
      'href',
      '/electronics-spa/en/USD/sign-in'
    );

    cy.contains('a[role="link"]', 'Sign In / Register').click();
    cy.get('input[name="username"]').clear().type(customer);
    cy.get('input[name="password"]').clear().type(pwd);
    cy.contains('button.btn-primary', 'Sign In').should('be.visible');
    cy.intercept('POST', '/authorizationserver/oauth/token').as(
      'tokenResponse'
    );
    cy.contains('button.btn-primary', 'Sign In').click();

    cy.wait('@tokenResponse').then((interception) => {
      const tokenResponse = interception.response.body;
      cy.wrap(tokenResponse.access_token).as('token');

      createCart(tokenResponse.access_token).then((response) => {
        const cartId = response.body.code;
        addToCart(
          cartId,
          productCode,
          quantity,
          tokenResponse.access_token
        ).then(() => {
          Cypress.log({
            name: 'addToCart',
            displayName: 'Add to cart',
            message: [`🛒 Product(s) added to cart`],
            consoleProps: () => {
              return {
                'Cart ID': cartId,
                'Product code': productCode,
                Quantity: quantity,
              };
            },
          });

          cy.wrap(cartId);
        });
      });
    });
  }
);

Cypress.Commands.add(
  'addProductToB2BCart',
  (productCode: string, quantity: string, accessToken: string) => {
    createCart(accessToken).then((response) => {
      const cartId = response.body.code;
      addProductToB2BCart(cartId, productCode, quantity, accessToken).then(
        () => {
          Cypress.log({
            name: 'addToCart',
            displayName: 'Add to B2B cart',
            message: [`🛒 Product(s) added to cart`],
            consoleProps: () => {
              return {
                'Cart ID': cartId,
                'Product code': productCode,
                Quantity: quantity,
              };
            },
          });

          cy.wrap(cartId);
        }
      );
    });
  }
);

Cypress.Commands.add(
  'addProductToB2BCartForJDK21',
  (productCode: string, quantity: string, customer: string, pwd: string) => {
    let token;
    cy.contains('a[role="link"]', 'Sign In / Register').should(
      'have.attr',
      'href',
      '/powertools-spa/en/USD/sign-in'
    );

    cy.contains('a[role="link"]', 'Sign In / Register').click();
    cy.log('Waiting for SSR timeout to pass (8s)');
    cy.wait(8000);
    cy.get('input[name="username"]').clear().type(customer);
    cy.get('input[name="password"]').clear().type(pwd);
    cy.contains('button.btn-primary', 'Sign In').should('be.visible');
    cy.contains('button.btn-primary', 'Sign In').click();

    cy.get('cx-login .cx-login-greet').should('be.visible');

    cy.window().should('have.property', 'localStorage');

    cy.window().then((win) => {
      const spartacusAuth = win.localStorage.getItem('spartacus⚿⚿auth');
      if (spartacusAuth) {
        const authObj = JSON.parse(spartacusAuth);

        token = authObj.token.access_token;
      }
      createCart(token).then((response) => {
        const cartId = response.body.code;
        addProductToB2BCart(cartId, productCode, quantity, token).then(() => {
          Cypress.log({
            name: 'addToCart',
            displayName: 'Add to B2B cart',
            message: [`🛒 Product(s) added to cart`],
            consoleProps: () => {
              return {
                'Cart ID': cartId,
                'Product code': productCode,
                Quantity: quantity,
              };
            },
          });

          cy.wrap(cartId);
        });
      });
    });
  }
);
