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

import {
  cartWithTotalVariantProduct,
  products,
  variantProduct,
} from '../sample-data/apparel-checkout-flow';

export function testCheckoutVariantAsGuest(variantUser){

    it('should perform checkout as guest, create an account and verify guest data', () => {
        checkout.goToCheapProductDetailsPage(products[0]);
        addVariantOfSameProductToCart();
  
        visitProductWithoutVariantPage();
        addMutipleProductWithoutVariantToCart();
  
        checkout.goToCheapProductDetailsPage(products[0]);
        checkout.addCheapProductToCartAndProceedToCheckout(variantProduct);
  
        guestCheckout.loginAsGuest(variantUser);
  
        checkout.fillAddressFormWithCheapProduct(
          variantUser,
          cartWithTotalVariantProduct
        );
  
        checkout.verifyDeliveryMethod();
  
        checkout.fillPaymentFormWithCheapProduct(
          variantUser,
          undefined,
          cartWithTotalVariantProduct
        );
  
        checkout.placeOrderWithCheapProduct(
          variantUser,
          cartWithTotalVariantProduct,
          APPAREL_CURRENCY
        );
  
        checkout.verifyOrderConfirmationPageWithCheapProduct(
          variantUser,
          variantProduct,
          cartWithTotalVariantProduct,
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
          'mr',
          variantUser.firstName,
          variantUser.lastName
        );
        checkout.signOut();
      });
}

export function testCheckoutRegisteredUser(variantUser){

    it('should perform checkout with a registered user', () => {
        checkout.visitHomePage();
  
        checkout.clickHamburger();
  
        checkout.registerUser(false, variantUser);
        checkout.goToCheapProductDetailsPage(products[0]);
        addVariantOfSameProductToCart();
        visitProductWithoutVariantPage();
        addMutipleProductWithoutVariantToCart();
        checkout.goToCheapProductDetailsPage(products[0]);
        checkout.addCheapProductToCartAndLogin(variantUser, products[0]);
        checkout.fillAddressFormWithCheapProduct(
          variantUser,
          cartWithTotalVariantProduct
        );
        checkout.verifyDeliveryMethod();
        checkout.fillPaymentFormWithCheapProduct(
          variantUser,
          undefined,
          cartWithTotalVariantProduct
        );
        checkout.placeOrderWithCheapProduct(
          variantUser,
          cartWithTotalVariantProduct,
          APPAREL_CURRENCY
        );
        checkout.verifyOrderConfirmationPageWithCheapProduct(
          variantUser,
          products[0],
          cartWithTotalVariantProduct,
          true
        );
      });
}