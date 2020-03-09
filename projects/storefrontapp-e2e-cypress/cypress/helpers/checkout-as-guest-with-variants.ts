import {
  addTwoProductVariantsToCart,
  visitProductWithoutVariantPage,
  addMutipleProductWithoutVariantToCart,
  displaySummaryPageForOrderWithMultipleProducts,
  addProductVariant,
} from './checkout-with-variants';
import {
  user,
  variantProduct,
} from '../sample-data/checkout-with-variants-data';
import {
  fillShippingAddress,
  AddressData,
  fillPaymentDetails,
  PaymentDetails,
} from './checkout-forms';
import {
  goToProductPageFromCategory,
  verifyAndPlaceOrder,
  displaySummaryPage,
  selectDeliveryMethod,
} from './checkout-as-persistent-user';

export function checkoutAsGuestWithVariantsTest() {
  describe('select single variant product, add to cart, and complete checkout as guest user.', () => {
    it('should add product to cart and go to login', () => {
      cy.visit('/');
      goToProductPageFromCategory(variantProduct, '4');
      addProductVariant();
    });

    it('should porceed to checkout page', () => {
      proceedToCheckout();
    });

    it('should login as guest', () => {
      loginAsGuest();
    });

    it('should add shipping address', () => {
      fillShippingAddressForm(user);
    });

    it('should verify delivery method', () => {
      selectDeliveryMethod('apparel-uk-spa');
    });

    it('should fill payment information', () => {
      fillPaymentInformation(user);
    });

    it('should verify and place order', () => {
      verifyAndPlaceOrder();
    });

    it('should display summary page', () => {
      displaySummaryPage(variantProduct.code);
    });

    it('should visit the product with variants page', () => {
      cy.visit('/apparel-uk-spa/en/GBP');
      goToProductPageFromCategory(variantProduct, '4');
    });
  });

  describe('Add different variants of same product and N number of SKUs without variants to cart and complete checkout as guest user', () => {
    it('should add two variants of same product to cart', () => {
      addTwoProductVariantsToCart();
    });

    it('should visit the product without variants page', () => {
      visitProductWithoutVariantPage();
    });

    it('should add N number of SKUs to cart', () => {
      addMutipleProductWithoutVariantToCart();
    });

    it('should porceed to checkout page', () => {
      proceedToCheckout();
    });

    it('should login as guest', () => {
      loginAsGuest();
    });

    it('should add shipping address', () => {
      fillShippingAddressForm(user);
    });

    it('should verify delivery method', () => {
      selectDeliveryMethod('apparel-uk-spa');
    });

    it('should fill payment information', () => {
      fillPaymentInformation(user);
    });

    it('should verify and place order', () => {
      verifyAndPlaceOrder();
    });

    it('should display summary page for order with multiple product', () => {
      displaySummaryPageForOrderWithMultipleProducts();
    });
  });
}

export function fillShippingAddressForm(
  shippingAddressData: AddressData = user
) {
  fillShippingAddress(shippingAddressData);
}

export function loginAsGuest() {
  cy.get('.register').getByText(/Guest Checkout/i);
  cy.get('.register')
    .getByText(/Guest Checkout/i)
    .click();
  cy.get('cx-checkout-login').within(() => {
    cy.get('[formcontrolname="email"]')
      .clear()
      .type(user.email);
    cy.get('[formcontrolname="emailConfirmation"]')
      .clear()
      .type(user.email);
    cy.get('button[type=submit]').click();
  });
}

export function fillPaymentInformation(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  fillPaymentDetails(paymentDetailsData, billingAddress);
}

export function proceedToCheckout() {
  cy.getByText(/proceed to checkout/i).click();
}
