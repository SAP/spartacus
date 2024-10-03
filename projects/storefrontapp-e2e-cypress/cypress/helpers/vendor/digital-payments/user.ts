/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { waitForPage } from '../../checkout-flow';
export const paymentDetails = {
  accountHolderName: 'James John',
  billingAddress: {
    country: {
      isocode: 'CA',
    },
    defaultAddress: false,
    email: 'new@mail.com',
    firstName: 'Billing',
    formattedAddress: 'xxx1, xxx2, Montreal, 21000',
    id: '8796127035415',
    lastName: 'User',
    fullname: 'Billing User',
    address_line_2: 'Montreal, CA',
    line1: 'xxx1',
    line2: 'xxx2',
    postalCode: '21000',
    town: 'Montreal',
    state: 'Quebec',
  },
  cardNumber: '5105105105105100',
  cardType: {
    code: 'DPVI',
  },
  defaultPayment: false,
  expiryMonth: '08',
  expiryYear: '2030',
  id: '8796126249002',
  saved: true,
  subscriptionId: 'WSVC6ERAMM4MP7FP5FYT34C7',
};
export const my_user = {
  fullName: 'New Customer',
  email: 'new@mail.com',
  password: '1234',
  address: {
    street_name: 'default street name',
    street_number: '7',
    town: 'dummyTown',
    postalcode: '147002',
    country: 'AD',
  },
  payment: {
    number: '5105105105105100',
    expires: {
      month: '08',
      year: '2030',
    },
  },
  billingAddress: {
    firstName: paymentDetails.billingAddress.firstName,
    lastName: paymentDetails.billingAddress.lastName,
    phone: '1234567890',
    cellphone: '1234567890',
    address: {
      line1: paymentDetails.billingAddress.line1,
      line2: paymentDetails.billingAddress.line2,
      country: 'Canada',
      state: paymentDetails.billingAddress.state,
      postal: paymentDetails.billingAddress.postalCode,
      city: paymentDetails.billingAddress.town,
    },
  },
};

export function checkoutShippingAddress() {
  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  cy.get('cx-delivery-address').within(() => {
    cy.findByText('Selected');
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText(my_user.fullName);
        cy.findByText(my_user.address.street_name);
        cy.findByText(my_user.address.street_number);
        cy.findByText(my_user.address.town + ', ' + my_user.address.country);
        cy.findByText(my_user.address.postalcode);
      });
    cy.findByText('Continue').click();
  });
  cy.wait(`@${deliveryModePage}`).its('response.statusCode').should('eq', 200);
}

export function checkoutDeliveryMode() {
  const PaymentDetailsPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentDetailsPage'
  );
  cy.get('[formcontrolname="deliveryModeId"]').eq(0).click();
  cy.get('cx-delivery-mode').within(() => {
    cy.wait(3000);
    cy.findByText('Continue').click();
  });
  cy.wait(`@${PaymentDetailsPage}`)
    .its('response.statusCode')
    .should('eq', 200);
}

export function checkoutPaymentDetails() {
  const ReviewOrderPage = waitForPage(
    '/checkout/review-order',
    'getReviewOrderPage'
  );
  cy.get('cx-payment-method').within(() => {
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText(my_user.fullName);
        cy.findByText(my_user.payment.number);
        cy.findByText(
          'Expires: ' +
            my_user.payment.expires.month +
            '/' +
            my_user.payment.expires.year
        );
        cy.findByText('Use this payment').click();
      });
    cy.findByText('Continue').click();
  });
  cy.wait(`@${ReviewOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function reviewAndPlaceOrder() {
  const ConfirmOrderPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-review-submit').within(() => {
    cy.get('cx-card')
      .eq(0)
      .within(() => {
        cy.findByText(my_user.payment.number);
        cy.findByText(
          'Expires: ' +
            my_user.payment.expires.month +
            '/' +
            my_user.payment.expires.year
        );
      });
  });
  cy.get('cx-place-order').within(() => {
    cy.get('[formcontrolname="termsAndConditions"]').check();
    cy.findByText('Place Order').click();
  });
  cy.wait(`@${ConfirmOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function orderConfirmation() {
  cy.get('cx-breadcrumb').within(() => {
    cy.findByText('Order Confirmation');
  });
  cy.get('cx-order-confirmation-thank-you-message');
  cy.findByText(my_user.payment.number);
  cy.findByText(
    'Expires: ' +
      my_user.payment.expires.month +
      '/' +
      my_user.payment.expires.year
  );
}

export function interceptDigitalPaymentsRequest() {
  cy.intercept('POST', `**/payment/digitalPayments/request?**`, {
    statusCode: 200,
    body: {
      parameters: {
        entry: [
          {
            key: 'signature',
            value: 'IIfHAXzkDmlXZetMvZQqKglTJ/0=',
          },
          {
            key: 'session_id',
            value: '18fdd43a270f3814e497cf04e04aebf4068bcc6ed34',
          },
        ],
      },
      postUrl:
        '/electronics-spa/en/USD/checkout/payment-details?x-card-registration-status=SUCCESSFUL',
    },
  }).as('getDigitalPaymentsRequest');
}

export function interceptDigitalPaymentsResponse() {
  cy.intercept('POST', `**/payment/digitalPayments/response?**`, {
    statusCode: 200,
    body: {
      ...paymentDetails,
    },
  }).as('getDigitalPaymentsResponse');
}

export function placeOrder() {
  const ConfirmOrderPage = waitForPage(
    '/order-confirmation',
    'getOrderConfirmationPage'
  );
  cy.get('cx-place-order').within(() => {
    cy.get('[formcontrolname="termsAndConditions"]').check();
    cy.findByText('Place Order').click();
  });
  cy.wait(`@${ConfirmOrderPage}`).its('response.statusCode').should('eq', 200);
}

export function reviewOrder() {
  cy.get('cx-checkout-review-payment').within(() => {
    cy.get('.cx-review-summary-card')
      .eq(1)
      .should('contain', 'Payment')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(paymentDetails.accountHolderName);
      });
    cy.get('.cx-review-summary-card')
      .eq(0)
      .should('contain', 'Billing address')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(paymentDetails.billingAddress.fullname);
        cy.findByText(paymentDetails.billingAddress.line1);
        cy.findByText(paymentDetails.billingAddress.address_line_2);
      });
  });
}
export function reviewPlacedOrder() {
  cy.get('cx-order-detail-billing').within(() => {
    cy.get('.cx-review-summary-card')
      .eq(0)
      .should('contain', 'Payment')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(paymentDetails.accountHolderName);
      });
    cy.get('.cx-review-summary-card')
      .eq(1)
      .should('contain', 'Billing address')
      .find('.cx-card-container')
      .within(() => {
        cy.findByText(paymentDetails.billingAddress.fullname);
        cy.findByText(paymentDetails.billingAddress.line1);
        cy.findByText(paymentDetails.billingAddress.address_line_2);
      });
  });
}
