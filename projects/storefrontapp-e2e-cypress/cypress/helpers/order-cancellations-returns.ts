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
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function visitCancelOrderPage() {
  const alias = waitForPage(
    `/my-account/order/cancel/${ORDER_CODE}`,
    'cancelOrderPage'
  );

  cy.visit(`/my-account/order/cancel/${ORDER_CODE}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function visitReturnOrderPage() {
  const alias = waitForPage(
    `/my-account/order/return/${ORDER_CODE}`,
    'returnOrderPage'
  );

  cy.visit(`/my-account/order/return/${ORDER_CODE}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function getStubbedCancellableOrderDetails() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orders/${ORDER_CODE}`,
    },
    { body: cancellableOrder }
  );
}

export function getStubbedReturnableOrderDetails() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orders/${ORDER_CODE}`,
    },
    { body: returnableOrder }
  );
}

export function confirmCancelOrder() {
  cy.intercept(
    {
      method: 'POST',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orders/${ORDER_CODE}/cancellation`,
    },
    { body: {} }
  );
}

export function confirmReturnOrder() {
  cy.intercept(
    {
      method: 'POST',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns`,
    },
    { body: returnRequestDetails }
  );
}

export function getStubbedReturnRequestList() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns`,
    },
    { body: returnRequestList }
  ).as('return_request_list');
}

export function visitReturnRequestListPage() {
  const alias = waitForPage('/my-account/orders', 'returnRequestListPage');

  cy.visit(`/my-account/orders`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function getStubbedReturnRequestDetails() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns/${RMA}`,
    },
    { body: returnRequestDetails }
  ).as('return_request_details');
}

export function visitReturnRequestDetailsPage() {
  const alias = waitForPage(
    `/my-account/return-request/${RMA}`,
    'returnRequestDetailsPage'
  );

  cy.visit(`/my-account/return-request/${RMA}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function cancelReturnRequest() {
  cy.intercept(
    {
      method: 'PATCH',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns/${RMA}`,
    },
    { body: {} }
  );
}

export function getStubbedReturnRequestListAfterCancel() {
  returnRequestList.returnRequests.pop();
  returnRequestList.returnRequests.push(cancelledReturnRequest);

  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns`,
    },
    { body: returnRequestList }
  ).as('return_request_list_after_cancel');
}

export function getStubbedReturnRequestDetailsAfterCancel() {
  cy.intercept(
    {
      method: 'GET',
      pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderReturns/${RMA}`,
    },
    { body: cancelledReturnRequest }
  ).as('return_request_details_after_cancel');
}
