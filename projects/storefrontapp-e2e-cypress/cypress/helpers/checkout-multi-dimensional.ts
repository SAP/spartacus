/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { assertAddressForm } from './address-book';
import { login } from './auth-forms';
import * as guestCheckout from './checkout-as-guest';
import * as checkout from './checkout-flow';
import { validateUpdateProfileForm } from './update-profile';
import {
  cartWithMultipleVariantProducts,
  cartWithTotalVariantProduct,
  multiDBaseProduct,
  multiDProduct,
} from '../sample-data/multi-dimensional-flow';
import { getSampleUser } from '../sample-data/checkout-flow';
import { searchForProduct } from './product-search';
import { addProductToCart } from './applied-promotions';

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

    checkout.verifyDeliveryMethod();

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

    checkout.verifyDeliveryMethod();

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

    const deliveryAddressPage = checkout.waitForPage(
      '/checkout/delivery-address',
      'getDeliveryAddressPage'
    );

    searchForProduct(multiDBaseProduct.code);

    goToMultiDProductFromPLP();

    selectVariant('Blue');

    checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer(
      multiDProduct
    );

    cy.wait(`@${deliveryAddressPage}`)
      .its('response.statusCode')
      .should('eq', 200);

    cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
    cy.get('cx-mini-cart .count').contains('1');

    checkout.signOut();

    const loginPage = checkout.waitForPage('/login', 'getLoginPage');

    cy.findByText(/Sign in \/ Register/i).click();
    cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);

    login(multiDUser.email, multiDUser.password);

    cy.get('cx-login div.cx-login-greet').should('exist');
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
    checkout.verifyDeliveryMethod();
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

  cy.wait(2000);

  addProductToCart();

  cy.get('cx-added-to-cart-dialog.d-block.fade.modal.show')
    .find('button.close[aria-label="Close Modal"]')
    .click();

  cy.get('cx-added-to-cart-dialog.d-block.fade.modal.show').should('not.exist');
}

export function selectVariant(color: string = 'Blue') {
  cy.get('cx-product-multi-dimensional-selector')
    .find(`img[title*="${color}"]`)
    .click();

  cy.wait(2000);
}

export function goToMultiDProductFromPLP() {
  cy.get('cx-product-list-item.cx-product-search-list')
    .find(`a[href*="${multiDBaseProduct.code}"]`)
    .should('be.visible')
    .first()
    .click();

  cy.wait(2000);
}
