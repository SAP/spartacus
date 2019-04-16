import { user } from '../sample-data/checkout-flow';
import {
  fillShippingAddress,
  fillPaymentDetails,
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

export function verifySpinner() {
  cy.get('cx-payment-methods .cx-body').then(() =>
    cy.get('cx-spinner').should('exist')
  );
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
  // go to product page
  const productId = '3595723';
  cy.visit(`/product/${productId}`);

  // add product to cart and go to checkout
  cy.get('cx-product-summary cx-add-to-cart button').click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/proceed to checkout/i).click();
  });

  // go to shipping address
  fillShippingAddress(user);

  // set delivery method
  cy.get('#deliveryMode-standard-gross').check();
  cy.get('button.btn-primary').click();

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
  // go to product page
  const productId = '3595723';
  cy.visit(`/product/${productId}`);

  // add product to cart and go to checkout
  cy.get('cx-product-summary cx-add-to-cart button').click();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.getByText(/proceed to checkout/i).click();
  });

  // select shipping address
  cy.getByText(/Ship to this address/i).click();
  cy.get('button.btn-primary').click();

  // set delivery method
  cy.get('#deliveryMode-standard-gross').check();
  cy.get('button.btn-primary').click();

  // fill in payment method
  cy.getByText('Add New Payment').click();
  fillPaymentDetails(secondPayment);

  // go to payment details page
  cy.get('cx-review-submit').should('exist');

  cy.visit('/my-account/payment-details');
  cy.get('.cx-payment-card').should('have.length', 2);
}

export function setSecondPaymentToDefault() {
  cy.getByText('Set as default').click();

  const firstCard = cy.get('.cx-payment-card').first();
  firstCard.should('contain', 'DEFAULT');
  firstCard.should('contain', 'Bar Foo');
}

export function deletePayment() {
  cy.getByText('Delete')
    .first()
    .click();
  // cy.get('.card-link').click({ force: true });

  // should see confirmation message
  cy.get('.cx-card-body__delete-msg').should(
    'contain',
    'Are you sure you want to delete this payment method?'
  );

  // click cancel
  cy.get('.btn-secondary').should('contain', 'Cancel');
  cy.get('.btn-secondary').click();
  cy.get('.cx-card-body__delete-ms').should(
    'not.contain',
    'Are you sure you want to delete this payment method?'
  );

  // delete the payment
  cy.getByText('Delete')
    .first()
    .click();
  cy.get('.btn-primary').should('contain', 'delete');
  cy.get('.btn-primary').click();
  cy.get('.cx-payment-card').should('have.length', 1);

  // verify remaining address is now the default one
  const defaultCard = cy.get('.cx-payment-card');
  // After bug https://github.com/SAP/cloud-commerce-spartacus-storefront/issues/1905 is fixed,
  // change the assertion to be 'DEFAULT'
  defaultCard.should('contain', 'Set as default');
  defaultCard.should('contain', 'Winston Rumfoord');
}
