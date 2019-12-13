import { user } from '../sample-data/checkout-flow';
import * as checkoutAsPersistentUser from './checkout-as-persistent-user';
import * as checkout from './checkout-flow';
import { waitForPage } from './checkout-flow';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';

interface TestProduct {
  code: string;
  type?: string;
  name?: string;
  price?: number;
}

export function checkoutFromWishList(products: TestProduct[]) {
  goToCartAndCheckout(products);
  fillAddressForm();
  checkout.verifyDeliveryMethod();
  fillPaymentForm();
  placeOrderWithProducts(products);
  verifyOrderConfirmationPage(products);
}

function goToCartAndCheckout(products: TestProduct[]) {
  const cartPage = waitForPage('/cart', 'getCartPage');
  cy.get('cx-mini-cart').click();
  cy.wait(`@${cartPage}`);

  for (const product of products) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }

  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddressPage'
  );
  cy.getByText(/proceed to checkout/i).click();
  cy.wait(`@${shippingAddressPage}`);
}

function fillAddressForm(shippingAddressData: AddressData = user) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );
  fillShippingAddress(shippingAddressData);
  cy.wait(`@${deliveryPage}`)
    .its('status')
    .should('eq', 200);
}

function fillPaymentForm(
  paymentDetailsData: PaymentDetails = user,
  billingAddress?: AddressData
) {
  cy.get('.cx-checkout-title').should('contain', 'Payment');
  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');
  fillPaymentDetails(paymentDetailsData, billingAddress);
  cy.wait(`@${reviewPage}`)
    .its('status')
    .should('eq', 200);
}

function placeOrderWithProducts(products: TestProduct[]) {
  cy.get('.cx-review-title').should('contain', 'Review');

  for (const product of products) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }

  cy.getByText('Terms & Conditions')
    .should('have.attr', 'target', '_blank')
    .should(
      'have.attr',
      'href',
      '/electronics-spa/en/USD/terms-and-conditions'
    );
  cy.get('.form-check-input').check();
  const orderConfirmationPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order button.btn-primary').click();
  cy.wait(`@${orderConfirmationPage}`)
    .its('status')
    .should('eq', 200);
}

function verifyOrderConfirmationPage(products: TestProduct[]) {
  cy.get('.cx-page-title').should('contain', 'Confirmation of Order');
  cy.get('h2').should('contain', 'Thank you for your order!');

  for (const product of products) {
    cy.get('cx-cart-item-list').contains('cx-cart-item', product.code);
  }
}

export function checkoutFromCart(products: TestProduct[]) {
  goToCartAndCheckout(products);
  checkoutAsPersistentUser.selectShippingAddress();
  checkoutAsPersistentUser.selectDeliveryMethod();
  checkoutAsPersistentUser.selectPaymentMethod();
  placeOrderWithProducts(products);
  verifyOrderConfirmationPage(products);
}

export function goToProductPageFromCategory() {
  // click big banner
  cy.get('.Section1 cx-banner cx-generic-link')
    .first()
    .find('cx-media')
    .click();
  // click small banner number 6 (would be good if label or alt text would be available)
  cy.get('.Section2 cx-banner:nth-of-type(6) a cx-media').click();
  cy.get('cx-product-intro').within(() => {
    cy.get('.code').should('contain', product.code);
  });
  cy.get('cx-breadcrumb').within(() => {
    cy.get('h1').should('contain', product.name);
  });
}

export function addProductToCart() {
  cy.get('cx-item-counter')
    .getByText('+')
    .click();
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.getByText(/view cart/i).click();
  });
  cy.get('cx-breadcrumb').should('contain', 'Your Shopping Cart');
}
