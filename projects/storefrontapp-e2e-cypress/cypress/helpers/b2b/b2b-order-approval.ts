import * as sampleData from '../../sample-data/b2b-order-approval';
import {
  approvalOrderDetail,
  approvalOrderList,
  approvedOrderDetails,
  pendingOrder,
  rejectedOrderDetails,
} from '../../sample-data/b2b-order-approval';
import { verifyTabbingOrder } from '../accessibility/tabbing-order';
import { TabElement } from '../accessibility/tabbing-order.model';
import { waitForPage } from '../checkout-flow';

export function visitOrderApprovalListPage() {
  const alias = waitForPage(
    '/my-account/approval-dashboard',
    'approvalListPage'
  );

  cy.visit(`/my-account/approval-dashboard`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function visitOrderApprovalDetailPage() {
  const alias = waitForPage(
    `/my-account/approval/${sampleData.approvalOrderDetail.code}`,
    'approvalDetailPage'
  );

  cy.visit(`/my-account/approval/${sampleData.approvalOrderDetail.code}`);
  cy.wait(`@${alias}`).its('status').should('eq', 200);
}

export function loginB2bUser() {
  cy.requireLoggedIn(sampleData.b2bUserAccount);
}

export function loginB2bApprover() {
  cy.requireLoggedIn(sampleData.b2bApproverAccount);
}

export function getStubbedPendingOrderDetails() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/*`,
    pendingOrder
  );
}

export function getStubbedOrderApprovalList() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals?*`,
    approvalOrderList
  ).as('order_approval_list');
}

export function getStubbedOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    approvalOrderDetail
  ).as('orderApprovalPending');
}

export function makeStubbedDecision() {
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}/decision?*`,
    {}
  );
}

export function getStubbedRejectedOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    rejectedOrderDetails
  ).as('orderApprovalRejected');
}

export function getStubbedApprovedOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    approvedOrderDetails
  ).as('orderApprovalApproved');
}

export function approvalListTabbingOrder(config: TabElement[]) {
  getStubbedOrderApprovalList();
  cy.visit('/my-account/approval-dashboard');
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function approvalDetailTabbingOrder(config: TabElement[]) {
  getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function approvalFormTabbingOrder(config: TabElement[]) {
  getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  cy.get('cx-order-approval-detail-form .btn-primary').eq(1).click();
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}

export function rejectionFormTabbingOrder(config: TabElement[]) {
  getStubbedOrderApprovalDetail();
  cy.visit(`/my-account/approval/${approvalOrderDetail.code}`);
  cy.get('cx-order-approval-detail-form .btn-primary').eq(0).click();
  verifyTabbingOrder('cx-page-layout.AccountPageTemplate', config);
}
