/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import { login } from '../support/utils/login';
import * as cartBundle from './cart-bundle-b2c';

let ACCESS_TOKEN = '';
let CART_CODE = '';
const saveName: string = 'Mmysavedcart1';
const saveListUrl = '/en/USD/my-account/saved-carts';
let cartId: string = '';

const cartBundleUser = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'pw4all',
    titleCode: 'mr',
    email: 'mark.rivers@rustic-hw.com',
  },
};

//login and reload the cart page
export function loginReloadPage() {
  cart.loginCartUser(cartBundleUser);
  cy.visit('/cart');
  cy.wait(5000);
  cy.reload();
  cy.wait(2000);
}

export function getCartBundleData() {
  login(
    cartBundleUser.registrationData.email,
    cartBundleUser.registrationData.password,
    false
  ).then((res) => {
    expect(res.status).to.eq(200);
    cy.log('token', res.body.access_token);
    console.log('token', res.body.access_token);
    ACCESS_TOKEN = res.body.access_token;
    // 1, creat a cart
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        fields: 'DEFAULT',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      console.log('cart_id', response.body.code, response.status);
      CART_CODE = response.body.code;
      // Camera Component: 1934793 / id: PhotoOTGCameraComponent / bopis - Nakano
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${response.body.code}/bundles`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
        body: {
          productCode: 1934793,
          quantity: 1,
          templateId: 'PhotoOTGCameraComponent',
        },
      }).then((itm) => {
        console.log('itm bundles', itm);
      });

      // Accessory Component: 805693
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/3`,
        headers: {
          Authorization: `bearer ${ACCESS_TOKEN}`,
        },
        body: {
          quantity: 1,
          product: {
            code: '805693',
          },
        },
      });

      // regular product 553637
      cy.wait(300).then(() => {
        cy.request({
          method: 'POST',
          url: `${Cypress.env('API_URL')}/${Cypress.env(
            'OCC_PREFIX'
          )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entries`,
          headers: {
            Authorization: `bearer ${ACCESS_TOKEN}`,
          },
          body: {
            quantity: 1,
            product: {
              code: '553637',
            },
          },
        }).then(() => {});
      });
    });
  });
}

export function getCartIncompleteBundleData() {
  login(
    cartBundleUser.registrationData.email,
    cartBundleUser.registrationData.password,
    false
  ).then((res) => {
    expect(res.status).to.eq(200);
    cy.log('token', res.body.access_token);
    console.log('token', res.body.access_token);
    ACCESS_TOKEN = res.body.access_token;
    // 1, creat a cart
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        fields: 'DEFAULT',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      console.log('cart_id', response.body.code, response.status);
      CART_CODE = response.body.code;
      // Camera Component: 1934793 / id: PhotoOTGCameraComponent / bopis - Nakano
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${response.body.code}/bundles`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
        body: {
          productCode: 1934793,
          quantity: 1,
          templateId: 'PhotoOTGCameraComponent',
        },
      }).then((itm) => {
        console.log('itm bundles', itm);
      });
    });
  });
}
//check bundle 1 display
export function checkBundleDisplay() {
  //check product 553637
  cy.get('.cx-item-list-items')
    .eq(0)
    .within(() => {
      cy.get('.cx-name').children('a').should('not.be.empty');
      cy.get('.cx-code').should('contain', '553637');
      cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
      cy.get('.cx-total').children('.cx-value').should('not.be.empty');
    });
  //check bundle product
  cy.get('cx-hierarchy').within(() => {
    cy.get('.cx-name').children('a').should('not.be.empty');
    cy.get('.cx-code').should('not.be.empty');
    cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
    cy.get('.cx-total').children('.cx-value').should('not.be.empty');
  });

  cy.get('.cx-add-to-saved-cart-container').within(() => {
    cy.get('.cx-action-link').children().should('not.be.empty');
  });
  cy.get('.clear-cart-btn').should('contain', 'Clear Cart');
}

// product 1934793, click "Free Pickup In Store" radio: search key "Tokyo", select "Nakano" store
export function selectPickUpInStore() {
  cy.get('[aria-label="Free Pickup In Store"]').eq(1).click();
  cy.wait(1000);
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.wait(1000);
  cy.get('#btnFindStores').click();
  cy.get('[data-pickup-in-store-button = "Nakano"]').click();
  cy.get('[data-pickup-location = "Nakano"]').eq(0).should('contain', 'Nakano');
}

/**
 * Go to "Saved Cart List" page, then go back to cart page
 * Click "Save cart for later", enter name & description, like "mysavedcart1"
 *
 * @param { string } newPage  New page name
 * @param { number } itemIndex Index of clicked elemen
 * @param { boolean } isSaveCart
 */
export function goToSaveCartPage(
  newPage: string,
  itemIndex: number,
  isSaveCart?: boolean
) {
  cy.get('.cx-add-to-saved-cart-container').within(() => {
    cy.get('.cx-action-link').eq(itemIndex).click();
    cy.window().its('location.href').should('include', newPage);
    if (!isSaveCart) {
      cy.wait(500).then(() => {
        cy.go('back');
      });
    }
  });
  if (isSaveCart) {
    cy.get('.cx-saved-cart-form-body').within(() => {
      cy.get('input[type=text][formcontrolname=name]').clear().type(saveName);
      cy.get('textarea[formcontrolname=description]')
        .clear()
        .type('this is my description');
      cy.get('.btn-primary').click();
      cy.wait(2000);
      cy.reload();
    });
  }
}

// My Account / Saved Carts, go to Saved Carts List page
export function goToSaveListPage() {
  cy.get('button[aria-label="My Account"]').click();
  cy.get('.wrapper')
    .eq(0)
    .within(() => {
      cy.get('[role="listitem"]').eq(2).click();
      cy.window().its('location.href').should('include', saveListUrl);
    });

  cy.get('.cx-saved-cart-list-table').within(() => {
    cy.get('[role="row"]')
      .eq(1)
      .within(() => {
        cy.get('.cx-saved-cart-list-cart-name')
          .children('a')
          .should('contain', saveName);
        cy.get('.cx-saved-cart-list-cart-id')
          .children('a')
          .should('not.be.empty');
        cy.get('.cx-saved-cart-list-quantity')
          .children('a')
          .should('contain', '3');
        cy.get('.cx-saved-cart-list-total')
          .children('a')
          .should('not.be.empty');
        cy.get('.cx-saved-cart-list-make-cart-active')
          .children('button')
          .should('contain', 'Make cart active');

        cy.get('.cx-saved-cart-list-cart-id')
          .children('a')
          .invoke('text')
          .then((text) => {
            console.log('text', text);
            cartId = text;
          });
      });
  });
}

//click saved cart name, go to saved cart details page
export function goToSaveCartPageDetail() {
  let cartSaveDetailUrl = `my-account/saved-cart/${cartId}`;
  cy.get('.cx-saved-cart-list-table').within(() => {
    cy.get('[role="row"]')
      .eq(1)
      .within(() => {
        cy.get('.cx-saved-cart-list-cart-name')
          .children('a')
          .should('contain', saveName)
          .click();
        cy.window().its('location.href').should('include', cartSaveDetailUrl);
      });
  });
  cy.wait(500).then(() => {
    cy.get('.btn-primary').should('contain', 'Make cart active');
    goBackPage();
  });
  //click "Make Cart Active" button of mysavedcart1
  cy.get('.cx-saved-cart-list-table').within(() => {
    cy.get('[role="row"]')
      .eq(1)
      .within(() => {
        cy.get('.cx-saved-cart-list-make-cart-active')
          .children('button')
          .should('contain', 'Make cart active')
          .click();
      });
  });
  cy.wait(500).then(() => {
    cy.get('.btn-primary').click();
    cy.window().its('location.href').should('include', saveListUrl);
  });
  //go to cart page
  cy.wait(1000);
  cy.visit('/cart');
  //click "Clear Cart" link
  cy.window().its('location.href').should('include', '/en/USD/cart');
  cy.get('.clear-cart-btn').click();
  cy.wait(800).then(() => {
    cy.get('.btn-primary').eq(0).should('contain', 'Clear Cart').click();
  });
}

export function goBackPage() {
  cy.wait(1000).then(() => {
    cy.go('back');
  });
}

export function operateIncompleteBundle() {
  //check bundle product
  cy.get('cx-hierarchy').within(() => {
    cy.get('.cx-name').children('a').should('not.be.empty');
    cy.get('.cx-code').should('not.be.empty');
    cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
    cy.get('.cx-total').children('.cx-value').should('not.be.empty');
  });

  cy.get('.cx-add-to-saved-cart-container').within(() => {
    cy.get('.cx-action-link').children().should('not.be.empty');
  });
  cy.get('.clear-cart-btn').should('contain', 'Clear Cart');

  // click process to checkout
  cy.get('.cx-progress-button-container')
    .should('contain', 'Proceed to Checkout')
    .click();

  //check shipping address,check selected shipping address
  cartBundle.doesElementAddressExist('cx-delivery-address');
}
