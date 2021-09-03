import * as sampleData from '../../sample-data/b2b-order-approval';
import {
  approvalOrderDetail,
  approvalOrderList,
  approvedOrderDetails,
  pendingOrder,
  rejectedOrderDetails,
} from '../../sample-data/b2b-order-approval';
import { waitForPage } from '../checkout-flow';

export function visitOrderApprovalListPage() {
  const alias = waitForPage(
    '/my-account/approval-dashboard',
    'approvalListPage'
  );

  cy.visit(`/my-account/approval-dashboard`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function visitOrderApprovalDetailPage() {
  const alias = waitForPage(
    `/my-account/approval/${sampleData.approvalOrderDetail.code}`,
    'approvalDetailPage'
  );

  cy.visit(`/my-account/approval/${sampleData.approvalOrderDetail.code}`);
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

export function loginB2bUser() {
  cy.requireLoggedIn(sampleData.b2bUserAccount);
}

export function loginB2bApprover() {
  cy.requireLoggedIn(sampleData.b2bApproverAccount);
}

export function getStubbedPendingOrderDetails() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orders/*`,
    },
    { body: pendingOrder }
  );
}

export function getStubbedOrderApprovalList() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderapprovals?*`,
    },
    { body: approvalOrderList }
  ).as('order_approval_list');
}

export function getStubbedOrderApprovalDetail() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    },
    { body: approvalOrderDetail }
  ).as('orderApprovalPending');
}

export function makeStubbedDecision() {
  cy.intercept(
    {
      method: 'POST',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderapprovals/${approvalOrderDetail.code}/decision?*`,
    },
    { body: {} }
  );
}

export function getStubbedRejectedOrderApprovalDetail() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    },
    { body: rejectedOrderDetails }
  ).as('orderApprovalRejected');
}

export function getStubbedApprovedOrderApprovalDetail() {
  cy.intercept(
    {
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
        'BASE_SITE'
      )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    },
    { body: approvedOrderDetails }
  ).as('orderApprovalApproved');
}

export function checkApprovalDashboardMenuOptionExistence(exists: boolean) {
  cy.get('cx-navigation > cx-navigation-ui').within(() => {
    cy.get('nav > cx-generic-link')
      .contains('Approval Dashboard')
      .should(exists ? 'exist' : 'not.exist');
  });
}
