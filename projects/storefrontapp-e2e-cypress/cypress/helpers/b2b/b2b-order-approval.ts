import {
  approvalOrderDetail,
  approvalOrderList,
  b2bApprover,
  b2bUser,
  pendingOrder,
  rejectedOrderDetails,
  approvedOrderDetails,
} from '../../sample-data/b2b-order-approval';
import { AccountData } from '../../support/require-logged-in.commands';
import { visitHomePage, waitForPage } from '../checkout-flow';
import * as sampleData from '../../sample-data/b2b-order-approval';

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
  const user: AccountData = {
    user: '',
    registrationData: {
      firstName: '',
      lastName: '',
      password: '12341234',
      titleCode: 'mr',
      email: b2bUser.uid,
    },
  };
  cy.requireLoggedIn(user);
  visitHomePage();
}

export function loginB2bApprover() {
  const approver: AccountData = {
    user: '',
    registrationData: {
      firstName: '',
      lastName: '',
      password: '12341234',
      titleCode: 'mr',
      email: b2bApprover.uid,
    },
  };
  cy.requireLoggedIn(approver);
  visitHomePage();
}

export function getPendingOrderDetails() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orders/*`,
    pendingOrder
  );
}

export function getOrderApprovalList() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals?*`,
    approvalOrderList
  );
}

export function getOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    approvalOrderDetail
  );
}

export function makeDecision() {
  cy.server();
  cy.route(
    'POST',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}/decision?*`,
    {}
  );
}

export function getRejectedOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    rejectedOrderDetails
  );
}

export function getApprovedOrderApprovalDetail() {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/users/current/orderapprovals/${approvalOrderDetail.code}?*`,
    approvedOrderDetails
  );
}
