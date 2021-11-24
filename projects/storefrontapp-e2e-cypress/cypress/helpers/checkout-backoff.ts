import * as sampleData from '../sample-data/checkout-flow';
import { waitForPage } from './checkout-flow';

export function waitForShippingAddressdata() {
  cy.window().then((win) => {
    const { token } = JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth'));

    cy.requireShippingAddressAdded(sampleData.user.address, token);
  });
}

export function visitCheckoutShippingAddressPage() {
  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddressPage'
  );
  cy.visit('/checkout/shipping-address');
  cy.wait(`@${shippingAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);
  cy.get('cx-shipping-address h2').should('contain', 'Shipping Address');
}

export function visitCheckoutDeliveryModePage() {
  const deliveryModePage = waitForPage(
    '/checkout/delivery-mode',
    'getDeliveryModePage'
  );
  cy.visit('/checkout/delivery-mode');
  cy.wait(`@${deliveryModePage}`).its('response.statusCode').should('eq', 200);
  cy.get('cx-delivery-mode h2').should('contain', 'Shipping Method');
}
