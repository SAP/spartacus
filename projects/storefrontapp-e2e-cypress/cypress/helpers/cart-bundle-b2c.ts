/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import * as cartBundle from './cart-bundle-b2c';
import { login } from '../support/utils/login';
import * as checkout from './checkout-flow';
import { getSampleUser } from '../sample-data/checkout-flow';
import * as textfieldConfiguration from './textfield-configuration';
const FONT_SIZE = 'Font Size';

const FONT_SIZE_NUM_FIVE = '15';
const FONT_SIZE_NUM_SIX = '16';
export const PRODUCK_INDEX = 10;
export const cartBundleUser = {
  user: 'standard',
  registrationData: {
    firstName: 'Winston',
    lastName: 'Rumfoord',
    password: 'pw4all',
    titleCode: 'mr',
    email: 'keenreviewer1@hybris.com',
  },
};
let ACCESS_TOKEN = '';
let CART_CODE = '';
const user = getSampleUser();

/**
 * Creat test data for bundle one
 *
 */
export function getCartBundleOneData() {
  login(
    cartBundle.cartBundleUser.registrationData.email,
    cartBundle.cartBundleUser.registrationData.password,
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

      // 3, creat a bundles（Camera Component）
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
          quantity: 2,
          templateId: 'PhotoOTGCameraComponent',
        },
      }).then((itm) => {
        console.log('itm bundles', itm);
      });

      // 4, agssin a product to entrygroup （Accessory Component）
      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env('BASE_SITE')}/users/current/carts/${response.body.code}/entrygroups/3`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
        body: {
          quantity: 1,
          product: {
            code: '805693',
          },
        },
      });
    });
  });
}

/**
 * Creat test data for bundle two
 */
export function getCartBundleTwoData() {
  cy.wait(2000).then(() => {
    // 1, creat a bundles（Camera Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/bundles`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        productCode: 1382080,
        quantity: 1,
        templateId: 'ProDSLRComponent',
      },
    }).then((itm) => {
      console.log('itm bundles', itm);
    });

    // 2, agssin a product to entrygroup （Included Lens Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/8`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        quantity: 1,
        product: {
          code: '832382',
        },
      },
    });
    // 3, agssin a product to entrygroup （Additional Lens Component）
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
          code: '493683',
        },
      },
    });
    // 4, agssin a product to entrygroup （Power Supply Componen - Changer Component:）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/11`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        quantity: 1,
        product: {
          code: '278688',
        },
      },
    });
    // 5, agssin a product to entrygroup （Power Supply Componen - Battery Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/12`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        quantity: 1,
        product: {
          code: '3965240',
        },
      },
    });
    // 6, agssin a product to entrygroup （Power Supply Componen - Battery Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/12`,
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
  });
}

/**
 * Creat test data for three bundles
 */
export function getCartBundleThreeData() {
  cy.wait(2000).then(() => {
    // 2, creat a bundles（Camera Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/bundles`,
      headers: {
        Authorization: `bearer ${ACCESS_TOKEN}`,
      },
      body: {
        productCode: 816802,
        quantity: 1,
        templateId: 'PhotoAutoPickCameraComponent',
      },
    }).then((itm) => {
      console.log('itm bundles', itm);
    });

    // 3, agssin a product to entrygroup （Battery Component）
    cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/users/current/carts/${CART_CODE}/entrygroups/15`,
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
  });
}

/**
 * Creat a regular product
 */
export function getRegularData() {
  cy.wait(5000).then(() => {
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
}

/**
 * Retrieves attribute ID.
 *
 * @param {string} attributeName - Attribute name
 * @return {string} - Attribute ID
 */
export function getAttributeId(attributeName: string): string {
  const trimmedName = attributeName.replace(/\s/g, '');
  cy.log("Trimmed name: '" + trimmedName);
  return `cx-configurator-textfieldlabel${trimmedName}`;
}

/**
 * Selects value of the corresponding attribute.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} value - Value name
 */
export function setAttributeFontSize(
  attributeName: string,
  value?: string
): void {
  const attributeId = getAttributeId(attributeName);
  cy.wait(1000);
  cy.get(`#${attributeId}`)
    .next('.form-group')
    .children('input')
    .clear()
    .type(value);
}

//login and reload the cart page
export function loginReloadPage() {
  cart.loginCartUser(cartBundle.cartBundleUser);
  cy.visit('/cart');
  cy.wait(5000);
  cy.reload();
  cy.wait(2000);
}

//operate bundle 1
export function operateBundleOne() {
  //check bundle 1 display
  cy.get('.node-title').should('contain', 'Photo On The Go Package');
  cy.get('.cx-hierarchy-node-title')
    .eq(0)
    .children('button')
    .should('contain', 'Remove');
  cy.get('.leaf-node-title').eq(0).should('contain', 'Camera Component');
  cy.get('.leaf-node-title').eq(1).should('contain', 'Accessory Component');
  cy.get('.leaf-node-title').eq(0).next().should('contain', 'Edit');
  cy.get('.leaf-node-title').eq(1).next().should('contain', 'Edit');

  cy.get('.cx-table-item-container')
    .find('.cx-name')
    .children('a')
    .should('not.be.empty');

  cy.get('.cx-table-item-container')
    .eq(0)
    .find('.cx-name')
    .children('a')
    .should('contain', 'PowerShot A480');

  cy.get('.cx-table-item-container')
    .eq(1)
    .find('.cx-name')
    .children('a')
    .should('contain', 'Series Battery');

  cy.get('.cx-code').should('not.be.empty');
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');

  //product 1934793 change configurable attribute: Front Size 14 -> 16
  textfieldConfiguration.clickOnEditConfigurationLink(0);
  cartBundle.setAttributeFontSize(FONT_SIZE, FONT_SIZE_NUM_SIX);
  cy.wait(1000);
  textfieldConfiguration.clickAddToCartButton('electronics-spa');
  cy.wait(1000);
  textfieldConfiguration.clickOnEditConfigurationLink(0);
  cartBundle.setAttributeFontSize(FONT_SIZE, FONT_SIZE_NUM_FIVE);
  cy.wait(1000);
  textfieldConfiguration.clickAddToCartButton('electronics-spa');
  //click product 1934793 picture & name
  cy.get('.cx-table-item-container').eq(0).children('a').click();
  cy.visit('/cart');
  cy.wait(1000);
  cy.get('.cx-table-item-container')
    .eq(0)
    .find('.cx-name')
    .children('a')
    .click();
  cy.visit('/cart');
  //product 805693 quantity +1
  cy.get('tr[cx-cart-item-list-row] cx-item-counter')
    .get(`[aria-label="Add one more"]`)
    .eq(1)
    .click();
  cy.get('.cx-total').eq(2).children('.cx-value').should('contain', '273');
  cy.wait(2000);
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('contain', 2);
  //product 805693 quantity -1
  cy.get('tr[cx-cart-item-list-row] cx-item-counter')
    .get(`[aria-label="Remove one"]`)
    .eq(1)
    .click();
  cy.get('.cx-total').eq(2).children('.cx-value').should('contain', '136');
  cy.get(`[aria-label="Quantity"]`).eq(1).invoke('val').should('contain', 1);
  cy.wait(2000);
  //product 805693 set quantity 2
  cy.get(`[aria-label="Quantity"]`).eq(1).clear().type('2').blur();
  cy.get('.cx-total').eq(2).children('.cx-value').should('contain', '273');
  cy.get(`[aria-label="Quantity"]`).eq(1).invoke('val').should('contain', 2);
}

//operate bundle 2
export function operateBundleTwo() {
  //product 832382 click "Free Pickup In Store" radio: search key "Tokyo", select "Nakano" store
  cy.get('[aria-label="Free Pickup In Store"]').eq(1).click();
  cy.wait(1000);
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.wait(1000);
  cy.get('#btnFindStores').click();
  cy.get('[data-pickup-in-store-button = "Nakano"]').click();
  cy.get('[data-pickup-location = "Nakano"]').eq(0).should('contain', 'Nakano');

  //product 493683 click "Free Pickup In Store" radio: search key "Tokyo", select "Tokio Flexstay Nippori Inn" store
  cy.wait(1000);
  cy.get('[aria-label="Free Pickup In Store"]').eq(2).click();
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.wait(1000);
  cy.get('#btnFindStores').click();
  cy.get(
    '[data-pickup-in-store-button = "Tokio Flexstay Nippori Inn"]'
  ).click();
  cy.get('[data-pickup-location = "Tokio Flexstay Nippori Inn"]').should(
    'contain',
    'Tokio Flexstay Nippori Inn'
  );

  //product 3965240 click "Free Pickup In Store" radio: search key "Tokyo", select "Nakano" store
  cy.get('[aria-label="Free Pickup In Store"]').eq(4).click();
  cy.wait(1000);
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.wait(1000);
  cy.get('#btnFindStores').click();
  cy.get('[data-pickup-in-store-button = "Nakano"]').click();
  cy.get('[data-pickup-location = "Nakano"]').eq(1).should('contain', 'Nakano');
}

//operate bundle 3
export function operateBundleThree() {
  //product 816802, click "Free Pickup In Store" radio: search key "Tokyo", select "Koto" store
  cy.get('[aria-label="Free Pickup In Store"]').eq(0).click();
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.get('#btnFindStores').should('be.visible').click();
  cy.wait(2000);
  cy.get('[data-pickup-in-store-button="Koto"]').click();
  cy.get('[data-pickup-location = "Koto"]').eq(0).should('contain', 'Koto');
  //search key "Tokyo", select other store, such as "Tokio Cerulean Tower Tokyu Hotel" store
  cy.get('[data-store-location-link="change"]')
    .eq(0)
    .should('contain', 'Change Store')
    .click();
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.get('#btnFindStores').should('be.visible').click();
  cy.wait(2000);
  cy.get(
    '[data-pickup-in-store-button="Tokio Cerulean Tower Tokyu Hotel"]'
  ).click();
  cy.wait(2000);
  cy.get('[data-pickup-location = "Tokio Cerulean Tower Tokyu Hotel"]')
    .eq(0)
    .should('contain', 'Tokio Cerulean Tower Tokyu Hotel');

  //product 816802, click "Ship it" radio
  cy.get('[aria-label="Ship It (Free Return)"]').eq(0).click();
  cy.get('[aria-label="Ship It (Free Return)"]')
    .invoke('attr', 'aria-checked')
    .should('contain', 'true');
  //product 805693, set quantity to 0
  cy.get('[aria-label="Quantity"]').eq(1).clear().type('0');
  //  remove product 816802
  cy.wait(4000);
  cy.get('[aria-label="Remove Product from Cart"]').eq(0).click().blur();
  cy.wait(3000);
}

//operate regular
export function operateRegularDetail() {
  //product 553637 click "Free Pickup In Store" radio: search key "Tokyo", select "Tokio Flexstay Nippori Inn" store
  cy.get('[aria-label="Free Pickup In Store"]').eq(0).click();
  cy.wait(800);
  cy.get('#txtFindAStore').clear().type('Tokyo');
  cy.get('#btnFindStores').should('be.visible').click();
  cy.wait(1000);
  cy.get('[data-pickup-in-store-button="Tokio Flexstay Nippori Inn"]').click();
  cy.get('[data-pickup-location = "Tokio Flexstay Nippori Inn"]');
}

//check cart summary 1 by 1: subtotal, shipping fee, tax, total, saved
export function checkSummaryDetail() {
  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(0)
    .find('.cx-summary-label')
    .should('contain', 'Subtotal after discounts:');
  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(0)
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(1)
    .find('.cx-summary-label')
    .should('contain', 'Estimated shipping:');
  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(1)
    .find('.cx-summary-amount')
    .should('contain', 'TBD');

  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(2)
    .should('contain', 'The order total includes tax of');

  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(3)
    .find('.cx-summary-label')
    .should('contain', 'Total:');
  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(3)
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.get('.cx-summary-partials')
    .children('.cx-summary-row')
    .eq(4)
    .should('not.be.empty');
}

//operate delivery Mode Phase
export function operateDliveryModePhase() {
  // click process to checkout
  cy.get('.cx-progress-button-container')
    .should('contain', 'Proceed to Checkout')
    .click();

  //check shipping address,check selected shipping address
  cartBundle.doesElementAddressExist('cx-delivery-address');
  //check the one radio was selected
  cy.get('[type="radio"]')
    .eq(0)
    .should('have.attr', 'aria-checked')
    .and('contain', 'true');

  //in delivery mode, every product leaf-node display content: name, id, unit price, total price, quantity;
  cy.get('.cx-name').should('not.be.empty');
  cy.get('.cx-code').should('not.be.empty');
  cy.get('.cx-info')
    .children('.cx-price')
    .find('cx-value')
    .should('not.be.empty');
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
  cy.get('.cx-total').children('.cx-value').should('not.be.empty');

  //product 1934793 special display
  cy.get('.cx-cart-addons')
    .eq(4)
    .children('cx-configurator-cart-entry-info')
    .find('.cx-configuration-info')
    .children('.cx-value')
    .should('not.be.empty');
}

// check the product detail
export function checkProductDetail() {
  cy.get('.cx-name').children('a').should('not.be.empty');
  cy.get('.cx-code').should('not.be.empty');
  cy.get('.cx-price').find('cx-value').should('not.be.empty');
  cy.get(`[aria-label="Quantity"]`).invoke('val').should('not.be.empty');
  cy.get('.cx-total').children('.cx-value').should('not.be.empty');
}

//click product 1934793 "Dispaly configuration"
export function clickConfigurationBtn() {
  cy.get('.cx-cart-addons')
    .eq(4)
    .within(() => {
      cy.get('.cx-action-link')
        .should('contain', 'Display Configuration')
        .click();
    });
  cy.wait(2000).then(() => {
    cy.go('back');
  });
  //click product 3965240 picture & name
  cy.get('.cx-table-item-container').eq(2).children('a').click();
  cy.wait(2000).then(() => {
    cy.go('back');
  });
  cy.get('.cx-table-item-container')
    .eq(2)
    .children('.cx-info')
    .find('.cx-name')
    .children('a')
    .click();
  cy.wait(2000).then(() => {
    cy.go('back');
  });
}

/**
 * click product 493683 picture & name
 *
 * @param {number} proIndex - product index
 */
export function clickProDetail(proIndex: number): void {
  cy.get('.cx-item-list-items')
    .eq(proIndex)
    .within(() => {
      cy.get('.cx-table-item-container').children('a').click();
      cy.wait(1000).then(() => {
        cy.go('back');
      });
      cy.get('.cx-name').children('a').click();
      cy.wait(1000).then(() => {
        cy.go('back');
      });
    });
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
        cy.get('cx-card').eq(0).click();
        cy.wait(5000).then(() => {
          cy.get('.card-header').should('contain', 'Selected');
          cy.get('.cx-card-title').should('not.be.empty');
          cy.get('.cx-card-label-bold').should('not.be.empty');
          cy.get('.cx-card-label-bold').should('not.be.empty');
          for (let i = 0; i < 6; i++) {
            cy.get('.cx-card-label').eq(i).should('not.be.empty');
          }
          cy.get('.btn-primary').should('contain', 'Continue').click();
        });
      }
    });
  });
}

export function doesElementPaymentExist(selector: string) {
  cy.wait(3000).then(() => {
    cy.get(selector).then(($w) => {
      if ($w.children('.cx-checkout-text').length) {
        cy.get('cx-card').click();
        cy.wait(3000);
        cy.get('.btn-primary').should('contain', 'Continue').click();
      } else {
        checkout.fillPaymentFormWithCheapProduct();
      }
    });
  });
}

/**
 * content is grouped by delivery mode
 *
 * @param {string} mode  - mode String
 */
export function checkProOperationMode(mode: string): void {
  //ship to section, delivery mode section or review mode section, "Items to be shipped" title, "Item/QTY/Total" header, product contents
  if (mode == 'deliveryMode') {
    cy.get('.cx-delivery-mode-header').should('contain', 'Items to be Shipped');
    cy.get('.emptyList')
      .find('.cx-item-list-header')
      .children('.cx-item-list-desc')
      .should('contain', 'Item');
    cy.get('.emptyList')
      .find('.cx-item-list-header')
      .children('.cx-item-list-qty')
      .should('contain.text', 'Qty');
    cy.get('.emptyList')
      .find('.cx-item-list-header')
      .children('.cx-item-list-total')
      .should('contain.text', 'Total');
  } else {
    cy.get('cx-checkout-review-shipping').within(() => {
      cy.get('.cx-review-header').should('contain', 'Items to be Shipped');
      cy.get('.emptyList')
        .find('.cx-item-list-header')
        .children('.cx-item-list-desc')
        .should('contain', 'Item');
      cy.get('.emptyList')
        .find('.cx-item-list-header')
        .children('.cx-item-list-qty')
        .should('contain.text', 'Qty');
      cy.get('.emptyList')
        .find('.cx-item-list-header')
        .children('.cx-item-list-total')
        .should('contain.text', 'Total');
    });
  }

  //check product contents in "ship to" group / bundle 1(Photo On The Go Package)
  cy.get('.cx-pickup-items-details-heading').should(
    'contain.text',
    'Items to be Picked Up'
  );
  cy.get('cx-hierarchy')
    .eq(1)
    .within(() => {
      cy.get('.node-title')
        .should('not.be.empty')
        .and('contain.text', 'Photo On The Go Package');
      cy.get('.leaf-node-title').eq(0).should('contain', 'Camera Component');
      cy.get('.cx-code').eq(0).should('contain.text', '1934793');
      cy.get('.leaf-node-title').eq(1).should('contain', 'Accessory Component');
      cy.get('.cx-code').eq(1).should('contain.text', '805693');
    });
  // bundle 2(Professional Photography Package)
  cy.get('cx-hierarchy')
    .eq(0)
    .within(() => {
      cy.get('.node-title')
        .should('not.be.empty')
        .and('contain.text', 'Professional Photography Package');
      cy.get('.leaf-node-title').eq(0).should('contain', 'Camera Component');
      cy.get('.leaf-node-title')
        .eq(1)
        .should('contain', 'Digital SLR Component');
      cy.get('.cx-code').eq(0).should('contain.text', '1382080');

      cy.get('.leaf-node-title')
        .eq(2)
        .should('contain', 'Power Supply Component');
      cy.get('.leaf-node-title').eq(3).should('contain', 'Charger Component');
      cy.get('.cx-code').eq(1).should('contain.text', '278688');

      cy.get('.leaf-node-title').eq(4).should('contain', 'Battery Component');
      cy.get('.cx-code').eq(3).should('contain.text', '805693');
    });

  //in bopis group - Pick Up Store section(Store info. Store hours), "Items to be Picked Up" title
  cy.get('.cx-pickup-items-details-heading').should(
    'contain.text',
    'Items to be Picked Up'
  );
  cy.get('.cx-pickup-items-details').each(($e, _) => {
    cy.wrap($e).within(() => {
      cy.get('.cx-store-name').should('not.be.empty');
      cy.get('.cx-store-full-address').children().should('not.be.empty');
      cy.get('.cx-store-schedule-title').should('not.be.empty');
      cy.get('.cx-store-schedule-opening-times')
        .children()
        .should('not.be.empty');
    });
  });
  // product contents in "Nakano" bopis group
  cy.get('cx-hierarchy')
    .eq(2)
    .within(() => {
      //product 832382
      cy.get('.node-title')
        .should('not.be.empty')
        .and('contain.text', 'Professional Photography Package');
      cy.get('.leaf-node-title').eq(0).should('contain', 'Camera Component');
      cy.get('.leaf-node-title').eq(1).should('contain', 'Lens Component');
      cy.get('.leaf-node-title')
        .eq(2)
        .should('contain', 'Included Lens Component');
      cy.get('.cx-code').eq(0).should('contain.text', '832382');
      //product 3965240
      cy.get('.leaf-node-title')
        .eq(3)
        .should('contain', 'Power Supply Component');
      cy.get('.leaf-node-title').eq(4).should('contain', 'Battery Component');
      cy.get('.cx-code').eq(1).should('contain.text', '3965240');
    });

  //product contents in "Tokio Flexstay Nippori Inn" bopis
  cy.get('.cx-hierarchy')
    .eq(3)
    .within(() => {
      cy.get('.leaf-node-title').eq(0).should('contain', 'Camera Component');
      cy.get('.leaf-node-title').eq(1).should('contain', 'Lens Component');
      cy.get('.leaf-node-title')
        .eq(2)
        .should('contain', 'Additional Lens Component');
      cy.get('.cx-code').eq(0).should('contain.text', '493683');
    });
  cy.get('.cx-pickup-items-list')
    .eq(1)
    .within(() => {
      cy.get('.cx-code').eq(0).should('contain', '553637');
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
