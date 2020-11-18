import {
  cancellableOrder,
  cancelledReturnRequest,
  ORDER_CODE,
  returnableOrder,
  returnRequestDetails,
  returnRequestList,
  RMA,
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

export function visitReturnOrderPage() {
  const alias = waitForPage(
    `/my-account/order/return/${ORDER_CODE}`,
    'returnOrderPage'
  );

  cy.visit(`/my-account/order/return/${ORDER_CODE}`);
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

export function confirmReturnOrder() {
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns?*`,
    returnRequestDetails
  );
}

export function getStubbedReturnRequestList() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns?*`,
    returnRequestList
  ).as('return_request_list');
}

export function visitReturnRequestListPage() {
  const alias = waitForPage('/my-account/orders', 'returnRequestListPage');

  cy.visit(`/my-account/orders`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function getStubbedReturnRequestDetails() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns/${RMA}?*`,
    returnRequestDetails
  ).as('return_request_details');
}

export function visitReturnRequestDetailsPage() {
  const alias = waitForPage(
    `/my-account/return-request/${RMA}`,
    'returnRequestDetailsPage'
  );

  cy.visit(`/my-account/return-request/${RMA}`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function cancelReturnRequest() {
  cy.server();
  cy.route(
    'PATCH',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns/${RMA}?*`,
    {}
  );
}

export function getStubbedReturnRequestListAfterCancel() {
  returnRequestList.returnRequests.pop();
  returnRequestList.returnRequests.push(cancelledReturnRequest);

  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns?*`,
    returnRequestList
  ).as('return_request_list_after_cancel');
}

export function getStubbedReturnRequestDetailsAfterCancel() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderReturns/${RMA}?*`,
    cancelledReturnRequest
  ).as('return_request_details_after_cancel');
}
