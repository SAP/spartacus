import {
  getSampleUser,
  SampleCartProduct,
  SampleProduct,
  SampleUser,
} from '../sample-data/checkout-flow';
import * as checkout from './checkout-flow';
import { AddressData, PaymentDetails } from './checkout-forms';
import * as productSearchFlow from './product-search';

export const firstAddToCartSelector = `${productSearchFlow.productItemSelector} cx-add-to-cart:first`;

export function searchResultAddToCart() {
  productSearchFlow.searchResult();
}

export function registerUser() {
  const user = getSampleUser();
  checkout.visitHomePage();
  checkout.clickHamburger();
  checkout.registerUser(false, user);
  return user;
}

export function addFirstResultToCartFromSearchAndLogin(sampleUser: SampleUser) {
  cy.get(firstAddToCartSelector)
    .findByText(/Add To Cart/i)
    .click();
  const loginPage = checkout.waitForPage('/login', 'getLoginPage');
  cy.findByText(/proceed to checkout/i).click();
  cy.wait(`@${loginPage}`);
  checkout.loginUser(sampleUser);
}

export function fillFormAndCheckout(
  sampleUser: SampleUser,
  cart: SampleCartProduct,
  product: SampleProduct
) {
  checkout.fillAddressFormWithCheapProduct(sampleUser as AddressData, cart);
  checkout.verifyDeliveryMethod();
  checkout.fillPaymentFormWithCheapProduct(sampleUser as PaymentDetails);
  checkout.placeOrderWithCheapProduct(sampleUser, cart);
  checkout.verifyOrderConfirmationPageWithCheapProduct(sampleUser, product);
}
