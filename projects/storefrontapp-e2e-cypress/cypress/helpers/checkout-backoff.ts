import * as sampleData from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';

export function waitForShippingAddressAndDeliveryModeSetdata() {
  cy.window().then((win) => {
    const { token } = JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth'));

    cy.requireShippingAddressAdded(sampleData.user.address, token);
    cy.requireShippingMethodSelected(token);
  });
}

export function visitCheckoutPaymentDetailsPage() {
  const paymentPage = waitForPage(
    '/checkout/payment-details',
    'getPaymentPage'
  );
  cy.visit('/checkout/payment-details');
  cy.wait(`@${paymentPage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-payment-method h2').should('contain', 'Payment');
}
