import {
  cancellableOrder,
  ORDER_CODE,
  returnableOrder,
} from '../sample-data/order-cancellations-returns';
import { waitForPage } from './checkout-flow';

export function visitOrderDetailPage() {
  const alias = waitForPage(
    `/my-account/order/${ORDER_CODE}`,
    'orderDetailPage'
  );

  cy.visit(`/my-account/order/${ORDER_CODE}`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function visitCancelOrderPage() {
  const alias = waitForPage(
    `/my-account/order/cancel/${ORDER_CODE}`,
    'cancelOrderPage'
  );

  cy.visit(`/my-account/order/cancel/${ORDER_CODE}`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function visitConfirmCancelOrderPage() {
  const alias = waitForPage(
    `/my-account/order/cancel/confirm/${ORDER_CODE}`,
    'confirmCancelOrderPage'
  );

  cy.visit(`/my-account/order/cancel/confirm/${ORDER_CODE}`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function getStubbedCancellableOrderDetails() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}?*`,
    cancellableOrder
  );
}

export function getStubbedReturnableOrderDetails() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}?*`,
    returnableOrder
  );
}

export function confirmCancelOrder() {
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/${ORDER_CODE}/cancellation?*`,
    {}
  );
}
