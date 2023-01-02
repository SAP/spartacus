/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
