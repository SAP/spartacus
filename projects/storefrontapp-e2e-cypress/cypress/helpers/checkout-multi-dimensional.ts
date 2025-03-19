/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSampleUser } from '../sample-data/checkout-flow';
import {
  cartWithMultipleVariantProducts,
  cartWithTotalVariantProduct,
  multiDBaseProduct,
  multiDProduct,
} from '../sample-data/multi-dimensional-flow';
import { assertAddressForm } from './address-book';
import { addProductToCart } from './applied-promotions';
import { login } from './auth-forms';
import * as guestCheckout from './checkout-as-guest';
import * as checkout from './checkout-flow';
import { searchForProduct } from './product-search';
import { validateUpdateProfileForm } from './update-profile';

export function testCheckoutMultiDAsGuest() {
  it('should perform checkout as guest, create an account and verify guest data', () => {
    const multiDUser = getSampleUser();
    checkout.visitHomePage();
    checkout.clickHamburger();

    searchForProduct(multiDBaseProduct.code);

    goToMultiDProductFromPLP();

    selectVariant();

    checkout.addCheapProductToCartAndProceedToCheckout(multiDProduct);

    guestCheckout.loginAsGuest(multiDUser);

    checkout.checkSummaryAmount(cartWithTotalVariantProduct);

    checkout.fillAddressFormWithCheapProduct(multiDUser);

    checkout.verifyDeliveryOptions();

    checkout.fillPaymentFormWithCheapProduct(multiDUser, undefined);

    checkout.placeOrderWithCheapProduct(
      multiDUser,
      cartWithTotalVariantProduct,
      checkout.ELECTRONICS_CURRENCY
    );

    checkout.verifyOrderConfirmationPageWithCheapProduct(
      multiDUser,
      multiDProduct
    );

    guestCheckout.createAccountFromGuest(multiDUser.password);

    cy.selectUserMenuOption({
      option: 'Personal Details',
    });

    cy.selectUserMenuOption({
      option: 'Address Book',
    });

    assertAddressForm(
      {
        firstName: multiDUser.firstName,
        lastName: multiDUser.lastName,
        phone: '',
        cellphone: '',
        address: multiDUser.address,
      },
      'US'
    );

    cy.selectUserMenuOption({
      option: 'Payment Details',
    });

    cy.get('.cx-payment .cx-body').then(() => {
      cy.get('cx-card').should('exist');
    });

    cy.selectUserMenuOption({
      option: 'Personal Details',
    });

    validateUpdateProfileForm('Mr.', multiDUser.firstName, multiDUser.lastName);
    checkout.signOut();
  });
}

export function testCheckoutMultiDAsGuestAndVerifyCart() {
  it('should perform checkout as guest, create an account and verify guest data, and verify cart persists after registering', () => {
    const multiDUser = getSampleUser();

    checkout.visitHomePage();
    checkout.clickHamburger();

    searchForProduct(multiDBaseProduct.code);

    goToMultiDProductFromPLP();

    selectVariantAndAddToCart('Pink');
    selectVariantAndAddToCart('Black');
    selectVariant('Blue');

    checkout.addCheapProductToCartAndProceedToCheckout(multiDProduct);

    guestCheckout.loginAsGuest(multiDUser);

    checkout.checkSummaryAmount(cartWithMultipleVariantProducts);

    checkout.fillAddressFormWithCheapProduct(multiDUser);

    checkout.verifyDeliveryOptions();

    checkout.fillPaymentFormWithCheapProduct(multiDUser, undefined);

    checkout.placeOrderWithCheapProduct(
      multiDUser,
      cartWithMultipleVariantProducts,
      checkout.ELECTRONICS_CURRENCY
    );

    checkout.verifyOrderConfirmationPageWithCheapProduct(
      multiDUser,
      multiDProduct
    );
    guestCheckout.createAccountFromGuest(multiDUser.password);

    searchForProduct(multiDBaseProduct.code);

    goToMultiDProductFromPLP();

    selectVariant('Blue');

    cy.intercept(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts?fields*`
    ).as('carts');

    checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer(
      multiDProduct
    );

    cy.wait('@carts').its('response.statusCode').should('eq', 200);

    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    cy.get('cx-mini-cart .count').contains('1');

    checkout.signOut();

    const loginPage = checkout.waitForPage('/login', 'getLoginPage');

    cy.findByText(/Sign in \/ Register/i).click();
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

    cy.intercept(
      'GET',
      `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/carts?fields*`
    ).as('carts');

    login(multiDUser.email, multiDUser.password);

    cy.get('cx-login div.cx-login-greet').should('exist');

    cy.wait('@carts').its('response.statusCode').should('eq', 200);

    cy.get('cx-mini-cart .count').contains('1');

    const cartPage = checkout.waitForPage('/cart', 'getCartPage');
    cy.get('cx-mini-cart').click();
    cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

    cy.get('cx-cart-item-list')
      .contains('tr[cx-cart-item-list-row]', multiDProduct.code)
      .within(() => {
        cy.get('cx-item-counter input').should('have.value', '1');
      });
    checkout.signOut();
  });
}

export function testCheckoutRegisteredUser() {
  it('should perform checkout with a registered user', () => {
    const regMultiDUser = getSampleUser();
    checkout.visitHomePage();

    checkout.clickHamburger();

    checkout.registerUser(false, regMultiDUser);

    searchForProduct(multiDBaseProduct.code);

    goToMultiDProductFromPLP();

    selectVariant();

    checkout.addCheapProductToCartAndLogin(regMultiDUser, multiDProduct);

    checkout.checkSummaryAmount(cartWithTotalVariantProduct);

    checkout.fillAddressFormWithCheapProduct(regMultiDUser);
    checkout.verifyDeliveryOptions();
    checkout.fillPaymentFormWithCheapProduct(regMultiDUser, undefined);
    checkout.placeOrderWithCheapProduct(
      regMultiDUser,
      cartWithTotalVariantProduct,
      checkout.ELECTRONICS_CURRENCY
    );
    checkout.verifyOrderConfirmationPageWithCheapProduct(
      regMultiDUser,
      multiDBaseProduct
    );
  });
}

function selectVariantAndAddToCart(color: string = 'Blue') {
  cy.get('cx-product-multi-dimensional-selector')
    .find(`img[title*="${color}"]`)
    .click();

  cy.get('cx-product-multi-dimensional-selector')
    .find(`button[aria-label*="Selected, ${color} Color"]`)
    .should('be.visible');

  addProductToCart();

  cy.get('cx-added-to-cart-dialog.d-block.fade.modal.show')
    .should('be.visible')
    .find('button.close[aria-label="Close Modal"]')
    .click();

  cy.get('cx-added-to-cart-dialog.d-block.fade.modal.show').should('not.exist');
}

export function selectVariant(color: string = 'Blue') {
  cy.get('cx-product-multi-dimensional-selector')
    .find(`img[title*="${color}"]`)
    .click();

  cy.get('cx-product-multi-dimensional-selector')
    .find(`button[aria-label*="Selected, ${color} Color"]`)
    .should('be.visible');
}

export function goToMultiDProductFromPLP() {
  cy.get('cx-product-list-item.cx-product-search-list')
    .find(`a[href*="${multiDBaseProduct.code}"]`)
    .should('be.visible')
    .first()
    .click();

  cy.get('cx-product-multi-dimensional-selector').should('be.visible');
}
