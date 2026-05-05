/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import { login } from '../support/utils/login';
import { getSampleUser } from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';

let ACCESS_TOKEN = '';
let CART_CODE = '';
const user = getSampleUser();

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
      // Drill Component: 3755211 / id:StarterDrillComponent
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${response.body.code}/bundles`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
        body: {
          productCode: 3755211,
          quantity: 1,
          templateId: 'StarterDrillComponent',
        },
      }).then((itm) => {
        console.log('itm bundles', itm);
      });
    });
  });
}

//add product 3755207 * 1 to bundle 1 Screwdriver Component
export function creatProduct() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/bundles`,
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
    body: {
      productCode: 3755207,
      quantity: 1,
      templateId: 'StarterScrewdriverComponent',
    },
  }).then((itm) => {
    console.log('itm bundles', itm);
  });
}

// add product 3755213 * 2 to bundle 1 Screwdriver Component
export function creatProductInScredriver() {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/6`,
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
    body: {
      quantity: 2,
      product: {
        code: '3755213',
      },
    },
  });
}

// add bundle 2 data
export function getBundleTwoData() {
  // Drill Component: 3755211 / id:StarterDrillComponent
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/bundles`,
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
    body: {
      productCode: 3755211,
      quantity: 1,
      templateId: 'StarterDrillComponent',
    },
  }).then((itm) => {
    console.log('itm bundles', itm);
  });

  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/${Cypress.env(
      'OCC_PREFIX'
    )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/9`,
    headers: {
      Authorization: `bearer ${ACCESS_TOKEN}`,
    },
    body: {
      quantity: 1,
      product: {
        code: '3755213',
      },
    },
  });
}

//check bundle 1 display
export function checkBundleDisplay() {
  cy.get('.node-title').should('contain', 'Starter Toolkit Package');
  cy.get('.cx-hierarchy-node-title')
    .eq(0)
    .children('button')
    .should('contain', 'Remove');
  cy.get('.leaf-node-title').eq(0).should('contain', 'Drill Component');
  cy.get('.leaf-node-title').eq(1).should('contain', 'Screwdriver Component');
  cy.get('.leaf-node-title').eq(0).next().should('contain', 'Edit');
  cy.get('.leaf-node-title').eq(1).next().should('contain', 'Edit');
  cy.get('.cx-table-item-container').within(() => {
    cy.get('.cx-name').children('a').should('not.be.empty');
  });
  cy.get('.cx-code').should('not.be.empty');
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
}

// check product 3755207 * 1 in Screwdriver Component
export function checkProDetail() {
  cy.get('.node-title').eq(0).should('contain', 'Starter Toolkit Package');
  cy.get('.leaf-node-title').eq(0).should('contain', 'Drill Component');
  cy.get('.leaf-node-title').eq(1).should('contain', 'Screwdriver Component');
  cy.get('.cx-name').eq(0).children('a').should('not.be.empty');
  cy.get('.cx-code').eq(0).should('contain', '3755207');
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
}

// check product 3755207 * 1, 3755213 * 2 in Screwdriver Component;
export function checkBundleProduct(index: number): void {
  cy.get('cx-hierarchy')
    .eq(index)
    .within(() => {
      cy.get('.node-title').should('contain', 'Starter Toolkit Package');
      cy.get('.leaf-node-title').eq(0).should('contain', 'Drill Component');
      cy.get('.leaf-node-title')
        .eq(1)
        .should('contain', 'Screwdriver Component');
      cy.get('.cx-name').children('a').should('not.be.empty');
      cy.get('.cx-code').should('not.be.empty');
    });
}

// go to  checkout
export function goToCheckPage() {
  // click process to checkout
  cy.get('.cx-progress-button-container')
    .should('contain', 'Proceed to Checkout')
    .click();
}
// check shipping address,check selected shipping address
export function doesElementAddressExist(selector: string) {
  cy.wait(5000).then(() => {
    cy.get(selector).then(($w) => {
      console.log(
        "$w.find('cx-address-form').length===>",
        $w.children('cx-address-form'),
        $w.children('cx-address-form').length
      );

      if ($w.children('cx-address-form').length) {
        checkout.proceedWithIncorrectShippingAddressForm({
          ...user,
          firstName: 'Lin',
        });
        cy.wait(3000).then(() => {
          cy.get('.btn-primary').should('contain', 'Continue').click();
        });
      } else {
        cy.get('.btn-secondary').eq(0).click();
        cy.wait(5000).then(() => {
          checkout.proceedWithIncorrectShippingAddressForm({
            ...user,
            firstName: 'Lin',
          });
          cy.wait(3000).then(() => {
            cy.get('.btn-primary').should('contain', 'Continue').click();
          });
        });
      }
    });
  });
}

//check the review page/ Section: Purchase Order Number, Method of Payment, Cost Center, Ship To, Delivery Method & Products are displayed
export function checkReviewPageDetail() {
  cy.get('.cx-review-payment-col').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-label').should('not.be.empty');
    cy.get('.cx-card-paragraph-title').should('not.be.empty');
  });

  cy.get('.cx-review-card-address').within(() => {
    cy.get('.cx-card-label').should('not.be.empty');
  });

  cy.get('.cx-review-card-shipping').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-label').should('not.be.empty');
  });
}

//check the product in Review page, every product leaf-node display content: name, id, unit price, total price, quantity;
export function checkEveryProductDetail() {
  cy.get('cx-cart-item-list').within(() => {
    cy.get('.cx-name').children('a').should('not.be.empty');
    cy.get('.cx-code').should('not.be.empty');
    cy.get('.cx-price').children('.cx-value').should('not.be.empty');
    cy.get('input[type="number"]').invoke('val').should('not.be.empty');
    cy.get('.cx-total').children('.cx-value').should('not.be.empty');
  });
}

function goBackPage() {
  cy.wait(1000).then(() => {
    cy.go('back');
  });
}
/**
 * click product 3755211 picture & name
 *
 * @param {number} proIndex - product index
 */
export function clickProNameDetail(proIndex: number): void {
  cy.get('.cx-item-list-items')
    .eq(proIndex)
    .within(() => {
      cy.get('.cx-table-item-container').eq(0).children('a').click();
      goBackPage();
      cy.get('.cx-name').eq(0).children('a').click();
      goBackPage();
    });
}

//check the reveiew cart summary 1 by 1: subtotal, shipping fee, tax, total, saved
export function chechReviewSummaryDetail() {
  cy.get('.cx-summary-partials').within(() => {
    cy.get('.cx-summary-label').should('not.be.empty');
    cy.get('.cx-summary-amount').should('not.be.empty');
    cy.get('.cx-summary-row').eq(2).should('not.be.empty');
    cy.get('.cx-summary-row').eq(4).should('not.be.empty');
  });
}

//select and click the place order
export function submitPlaceOrder() {
  cy.get('cx-place-order').within(() => {
    cy.get('input[type="checkbox"]').click();
    cy.wait(500);
    cy.get('.btn-primary').click();
  });
}
