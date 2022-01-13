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
import { verifyTabbingOrder } from './accessibility/tabbing-order';
import { tabbingOrderConfig as config } from './accessibility/tabbing-order.config';
import * as sampleData from '../sample-data/order-cancellations-returns';

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

export function testCancelOrder() {
  describe('should cancel order', () => {
    it('should cancel', () => {
      getStubbedCancellableOrderDetails();
      visitCancelOrderPage();

      assertButtons();
      assertOrderItems(sampleData.orderDetails);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.cancelOrReturnOrder
      );

      // validate input
      validateInput();

      // cancel one item
      cancelItem();
    });

    it('should confirm cancel', () => {
      assertButtons(true);
      assertOrderItems(sampleData.orderDetails, true);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.confirmCancelOrReturnOrder
      );

      // confirm cancel
      confirmCancelOrder();
      cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
      cy.get('cx-global-message').should(
        'contain',
        `Your cancellation request was submitted (original order ${sampleData.ORDER_CODE} will be updated)`
      );
      cy.get('cx-breadcrumb').should('contain', 'Order History');
    });
  });
}

export function testReturnOrder() {
  describe('should return order', () => {
    it('should return', () => {
      getStubbedReturnableOrderDetails();
      visitReturnOrderPage();

      assertButtons();
      assertOrderItems(sampleData.orderDetails);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.cancelOrReturnOrder
      );

      // validate input
      validateInput();

      // return one item
      returnItem();
    });

    it('should confirm return', () => {
      assertButtons(true);
      assertOrderItems(sampleData.orderDetails, true);

      // accessibility
      verifyTabbingOrder(
        'cx-page-layout.AccountPageTemplate',
        config.confirmCancelOrReturnOrder
      );

      // confirm return
      confirmReturnOrder();
      cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
      cy.get('cx-global-message').should(
        'contain',
        `Your return request (${sampleData.RMA}) was submitted`
      );
      cy.get('cx-breadcrumb').should('contain', 'Return Request Details');
    });
  });
}

function assertButtons(isConfirm = false) {
  cy.get('cx-amend-order-actions a.btn').should('contain', 'Back');
  if (isConfirm) {
    cy.get('cx-amend-order-actions .btn-primary').should(
      'contain',
      'Submit Request'
    );
  } else {
    cy.get('cx-amend-order-actions .btn-primary').should('contain', 'Continue');
  }
}

function assertOrderItems(order: any, isConfirm = false) {
  if (!isConfirm) {
    cy.get('cx-amend-order-items button.cx-action-link').should(
      'contain',
      'Set all quantities to maximum '
    );
  }

  cy.get('cx-amend-order-items').within(() => {
    cy.get('.cx-item-list-row').should('have.length', order.entries.length);
  });

  order.entries.forEach((entry, index) => {
    cy.get('cx-amend-order-items .cx-item-list-row')
      .eq(index)
      .within(() => {
        cy.get('.cx-list-item-desc').should('contain', entry.product.name);
        cy.get('.cx-list-item-desc').should('contain', entry.product.code);
        cy.get('.cx-price').should('contain', entry.basePrice.formattedValue);
        if (isConfirm) {
          cy.get('.cx-quantity').should('contain', 1);
          cy.get('.cx-total').should('contain', entry.basePrice.formattedValue);
        } else {
          cy.get('.cx-request-qty').should('contain', 1);
          cy.get('cx-item-counter').should('exist');
        }
      });
  });
}

function validateInput() {
  cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
  cy.get('cx-form-errors').should('contain', 'Select at least one item');

  cy.get('cx-item-counter button').eq(1).click();
  cy.get('cx-form-errors').should('not.contain', 'Select at least one item');
}

function cancelItem() {
  cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
  cy.get('cx-breadcrumb').should('contain', 'Cancel Order Confirmation');
}

function returnItem() {
  cy.get('cx-amend-order-actions .btn-primary').eq(0).click();
  cy.get('cx-breadcrumb').should('contain', 'Return Order Confirmation');
}
