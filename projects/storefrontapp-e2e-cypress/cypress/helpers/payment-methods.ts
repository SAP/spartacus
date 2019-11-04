import { user } from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';
import {
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';

export const secondPayment: PaymentDetails = {
  fullName: 'Bar Foo',
  payment: {
    card: 'Mastercard',
    number: '5400540054005400',
    expires: {
      month: '12',
      year: '2025',
    },
    cvv: '123',
  },
};

export function accessPageAsAnonymous() {
  cy.visit('/my-account/payment-details');
  cy.location('pathname').should('contain', '/login');
}

export function verifyText() {
  cy.get('cx-payment-methods').within(() => {
    cy.get('.cx-payment .cx-header').should('contain', 'Payment methods');
    cy.get('.cx-payment .cx-body').should(
      'contain',
      'New payment methods are added during checkout.'
    );
  });
}

export function paymentDetailCard() {
  const request = requestPages();

  // go to product page
  const productId = '3595723';
  cy.visit(`/product/${productId}`);

  // add product to cart and go to checkout
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click({ force: true });
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/proceed to checkout/i).click({ force: true });
  });

  cy.wait(`@${request.shippingPage}`);

  // go to shipping address
  fillShippingAddress(user);

  cy.wait(`@${request.deliveryPage}`);

  // set delivery method
  cy.get('#deliveryMode-standard-gross').check({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${request.paymentPage}`);

  // fill in payment method
  fillPaymentDetails(user);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment .cx-body').then(() => {
    cy.get('cx-card').should('exist');
  });
}

export function addSecondaryPaymentCard() {
  const request = requestPages();

  // go to product page
  const productId = '3595723';
  cy.visit(`/product/${productId}`);

  // add product to cart and go to checkout
  cy.get('cx-add-to-cart')
    .getByText(/Add To Cart/i)
    .click({ force: true });
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/proceed to checkout/i).click({ force: true });
  });

  cy.wait(`@${request.shippingPage}`);

  // select shipping address
  cy.getByText(/Ship to this address/i).click({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${request.deliveryPage}`);

  // set delivery method
  cy.get('#deliveryMode-standard-gross').check({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${request.paymentPage}`);

  // fill in payment method
  cy.getByText('Add New Payment').click({ force: true });
  fillPaymentDetails(secondPayment);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment-card').should('have.length', 2);
}

export function setSecondPaymentToDefault() {
  cy.getByText('Set as default').click({ force: true });

  const firstCard = cy.get('.cx-payment-card').first();
  firstCard.should('contain', 'Default Payment Method');
  // Comment out when #2572 is fixed
  // firstCard.should('contain', 'Bar Foo');
}

export function deletePayment() {
  cy.getAllByText('Delete')
    .first()
    .click({ force: true });

  // should see confirmation message
  cy.get('.cx-card-delete-msg').should(
    'contain',
    'Are you sure you want to delete this payment method?'
  );

  // click cancel
  cy.get('.btn-secondary').should('contain', 'Cancel');
  cy.get('.btn-secondary').click({ force: true });
  cy.get('.cx-card-body__delete-ms').should(
    'not.contain',
    'Are you sure you want to delete this payment method?'
  );

  // delete the payment
  cy.getAllByText('Delete')
    .first()
    .click({ force: true });
  cy.get('.btn-primary').should('contain', 'Delete');
  cy.get('.btn-primary').click({ force: true });
  cy.get('.cx-payment-card').should('have.length', 1);

  // verify remaining address is now the default one
  const defaultCard = cy.get('.cx-payment-card');
  defaultCard.should('contain', 'Default Payment Method');
  defaultCard.should('contain', 'Winston Rumfoord');
}

export function checkAnonymous() {
  it('should redirect to login page for anonymouse user', () => {
    accessPageAsAnonymous();
  });
}

export function paymentMethodsTest() {
  it('should see title and some messages', () => {
    verifyText();
  });

  it('should see payment method card', () => {
    paymentDetailCard();
  });

  it('should be able to add a second payment card', () => {
    addSecondaryPaymentCard();
  });

  it('should be able to set secondary card as default', () => {
    setSecondPaymentToDefault();
  });

  it('should be able to delete the payment', () => {
    deletePayment();
  });
}

function requestPages() {
  const shippingPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingPage'
  );

  const deliveryPage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryPage'
  );

  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );

  return { shippingPage, deliveryPage, paymentPage };
}
