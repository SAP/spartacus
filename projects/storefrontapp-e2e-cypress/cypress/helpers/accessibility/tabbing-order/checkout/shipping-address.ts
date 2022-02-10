import { user } from '../../../../sample-data/checkout-flow';
import { waitForPage } from '../../../checkout-flow';
import { fillShippingAddress } from '../../../checkout-forms';
import { checkoutNextStep, verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = 'cx-page-layout.MultiStepCheckoutSummaryPageTemplate';

export function checkoutShippingAddressNewTabbingOrder(config: TabElement[]) {
  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddress'
  );
  cy.visit('/checkout/shipping-address');
  cy.wait(`@${shippingAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);

  const { firstName, lastName, phone, address } = user;
  fillShippingAddress({ firstName, lastName, phone, address }, false);

  verifyTabbingOrder(containerSelector, config);

  checkoutNextStep('/checkout/delivery-mode');
}

export function checkoutShippingAddressExistingTabbingOrder(
  config: TabElement[]
) {
  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddress'
  );
  cy.visit('/checkout/shipping-address');
  cy.wait(`@${shippingAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-actions .cx-card-link').click({ force: true });
  });

  cy.get('cx-card .card-header').should('contain', 'Selected');

  verifyTabbingOrder(containerSelector, config);
  checkoutNextStep('/checkout/delivery-mode');
}

export function checkoutShippingAddressAccount(config: TabElement[]) {
  const shippingAddressPage = waitForPage(
    '/checkout/shipping-address',
    'getShippingAddress'
  );

  cy.intercept({
    method: 'PUT',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/**/addresses/delivery*`,
  }).as('setAddress');

  cy.visit('/checkout/shipping-address');
  cy.wait(`@${shippingAddressPage}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.wait('@setAddress').its('response.statusCode').should('eq', 200);

  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-order-summary .cx-summary-partials .cx-summary-row')
    .first()
    .find('.cx-summary-amount')
    .should('not.be.empty');

  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/carts/*`,
  }).as('getCart');
  cy.get('cx-card').within(() => {
    cy.get('.cx-card-label-bold').should('not.be.empty');
    cy.get('.cx-card-actions .cx-card-link').click({ force: true });
  });

  cy.wait('@getCart');
  cy.get('cx-card .card-header').should('contain', 'Selected');

  verifyTabbingOrder(containerSelector, config);

  checkoutNextStep('/checkout/delivery-mode');
}
