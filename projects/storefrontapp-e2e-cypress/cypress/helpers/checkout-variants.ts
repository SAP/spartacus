/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  cartWithTotalVariantProduct,
  getApparelCheckoutUser,
  products,
  variantProduct,
} from '../sample-data/apparel-checkout-flow';
import { assertAddressForm } from './address-book';
import { login } from './auth-forms';
import * as guestCheckout from './checkout-as-guest';
import * as checkout from './checkout-flow';
import { validateUpdateProfileForm } from './update-profile';
import {
  addMutipleProductWithoutVariantToCart,
  addVariantOfSameProductToCart,
  APPAREL_CURRENCY,
  visitProductWithoutVariantPage,
} from './variants/apparel-checkout-flow';

export let variantUser;
export function generateVariantGuestUser() {
  variantUser = getApparelCheckoutUser();
}

export function testCheckoutVariantAsGuest() {
  it('should perform checkout as guest, create an account and verify guest data', () => {
    checkout.goToCheapProductDetailsPage(products[0]);
    addVariantOfSameProductToCart();

    visitProductWithoutVariantPage();
    addMutipleProductWithoutVariantToCart();

    checkout.goToCheapProductDetailsPage(products[0]);
    checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);

    guestCheckout.loginAsGuest(variantUser);

    checkout.checkSummaryAmount(cartWithTotalVariantProduct);

    checkout.fillAddressFormWithCheapProduct(variantUser);

    checkout.verifyDeliveryMethod();

    checkout.fillPaymentFormWithCheapProduct(variantUser, undefined);

    checkout.placeOrderWithCheapProduct(
      variantUser,
      cartWithTotalVariantProduct,
      APPAREL_CURRENCY
    );

    checkout.verifyOrderConfirmationPageWithCheapProduct(
      variantUser,
      variantProduct,
      true
    );
    guestCheckout.createAccountFromGuest(variantUser.password);

    cy.selectUserMenuOption({
      option: 'Personal Details',
    });

    cy.selectUserMenuOption({
      option: 'Address Book',
    });

    assertAddressForm(
      {
        firstName: variantUser.firstName,
        lastName: variantUser.lastName,
        phone: '',
        address: variantUser.address,
      },
      'GB'
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

    validateUpdateProfileForm(
      'Mr.',
      variantUser.firstName,
      variantUser.lastName
    );
    checkout.signOut();
  });
}

export function testCheckoutVariantAsGuestAndVerifyCart() {
  it('should perform checkout as guest, create an account and verify guest data, and verify cart persists after registering', () => {
    checkout.goToCheapProductDetailsPage(products[0]);
    addVariantOfSameProductToCart();

    visitProductWithoutVariantPage();
    addMutipleProductWithoutVariantToCart();

    checkout.goToCheapProductDetailsPage(products[0]);
    checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);

    guestCheckout.loginAsGuest(variantUser);

    checkout.checkSummaryAmount(cartWithTotalVariantProduct);

    checkout.fillAddressFormWithCheapProduct(variantUser);

    checkout.verifyDeliveryMethod();

    checkout.fillPaymentFormWithCheapProduct(variantUser, undefined);

    checkout.placeOrderWithCheapProduct(
      variantUser,
      cartWithTotalVariantProduct,
      APPAREL_CURRENCY
    );

    checkout.verifyOrderConfirmationPageWithCheapProduct(
      variantUser,
      variantProduct,
      true
    );
    guestCheckout.createAccountFromGuest(variantUser.password);

    const deliveryAddressPage = checkout.waitForPage(
      '/checkout/delivery-address',
      'getDeliveryAddressPage'
    );

    checkout.goToCheapProductDetailsPage(products[0]);
    checkout.addCheapProductToCartAndBeginCheckoutForSignedInCustomer(
      variantProduct
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

    login(variantUser.email, variantUser.password);

    cy.get('cx-login div.cx-login-greet').should('exist');
    cy.get('cx-mini-cart .count').contains('1');

    const cartPage = checkout.waitForPage('/cart', 'getCartPage');
    cy.get('cx-mini-cart').click();
    cy.wait(`@${cartPage}`).its('response.statusCode').should('eq', 200);

    cy.get('cx-cart-item-list')
      .contains('tr[cx-cart-item-list-row]', variantProduct.code)
      .within(() => {
        cy.get('cx-item-counter input').should('have.value', '1');
      });
    checkout.signOut();
  });
}

export function testCheckoutRegisteredUser() {
  it('should perform checkout with a registered user', () => {
    const regVariantUser = getApparelCheckoutUser();
    checkout.visitHomePage();

    checkout.clickHamburger();

    checkout.registerUser(false, regVariantUser);
    checkout.goToCheapProductDetailsPage(products[0]);
    addVariantOfSameProductToCart();
    visitProductWithoutVariantPage();
    addMutipleProductWithoutVariantToCart();
    checkout.goToCheapProductDetailsPage(products[0]);
    checkout.addCheapProductToCartAndLogin(regVariantUser, products[0]);
    checkout.checkSummaryAmount(cartWithTotalVariantProduct);
    checkout.fillAddressFormWithCheapProduct(regVariantUser);
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct(regVariantUser, undefined);
    checkout.placeOrderWithCheapProduct(
      regVariantUser,
      cartWithTotalVariantProduct,
      APPAREL_CURRENCY
    );
    checkout.verifyOrderConfirmationPageWithCheapProduct(
      regVariantUser,
      products[0],
      true
    );
  });
}
