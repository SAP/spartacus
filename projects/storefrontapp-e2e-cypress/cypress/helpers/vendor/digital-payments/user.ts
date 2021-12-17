import { waitForPage } from '../../checkout-flow';
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
};

export function checkoutShippingAddress() {
  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  cy.get('cx-shipping-address').within(() => {
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
