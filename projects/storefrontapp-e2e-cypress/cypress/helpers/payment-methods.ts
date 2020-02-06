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

export function checkAnonymous() {
  it('should redirect anonymous user to login page', () => {
    cy.visit('/my-account/payment-details');
    cy.location('pathname').should('contain', '/login');
  });
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
  const request = getWaitAliases();

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

  // checkout steps
  cy.wait(`@${request.shippingPage}`)
    .its('status')
    .should('eq', 200);

  fillShippingAddress(user);

  cy.wait(`@${request.deliveryPage}`)
    .its('status')
    .should('eq', 200);

  cy.get('#deliveryMode-standard-net').check({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${request.paymentPage}`)
    .its('status')
    .should('eq', 200);

  // fill in payment method
  fillPaymentDetails(user);

  cy.wait(`@${request.reviewPage}`)
    .its('status')
    .should('eq', 200);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment .cx-body').then(() => {
    cy.get('cx-card').should('exist');
  });
}

export function addSecondaryPaymentCard() {
  const waitAliases = getWaitAliases();

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

  cy.wait(`@${waitAliases.shippingPage}`)
    .its('status')
    .should('eq', 200);

  // select shipping address
  cy.getByText(/Ship to this address/i).click({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${waitAliases.deliveryPage}`)
    .its('status')
    .should('eq', 200);

  // set delivery method
  cy.get('#deliveryMode-standard-net').check({ force: true });
  cy.get('button.btn-primary').click({ force: true });

  cy.wait(`@${waitAliases.paymentPage}`)
    .its('status')
    .should('eq', 200);

  // fill in payment method
  cy.getByText('Add New Payment').click({ force: true });

  fillPaymentDetails(secondPayment);

  cy.wait(`@${waitAliases.reviewPage}`)
    .its('status')
    .should('eq', 200);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment-card').should('have.length', 2);
}

export function setOtherPaymentToDefault() {
  cy.getByText('Set as default').click({ force: true });

  const firstCard = cy.get('.cx-payment-card').first();
  firstCard.should('contain', 'Default Payment Method');
  firstCard.should('contain', '1111');
  firstCard.should('contain', `Expires: 7/2022`);
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

export function paymentMethodsTest() {
  it('should render page with no payment methods', () => {
    verifyText();
  });

  it('should render payment method', () => {
    paymentDetailCard();
  });

  it('should add a second payment method', () => {
    addSecondaryPaymentCard();
  });

  it('should set additional payment method as default', () => {
    setOtherPaymentToDefault();
  });

  it('should be able to delete payment method', () => {
    deletePayment();
  });
}

function getWaitAliases() {
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

  const reviewPage = waitForPage('/checkout/review-order', 'getReviewPage');

  return { shippingPage, deliveryPage, paymentPage, reviewPage };
}
