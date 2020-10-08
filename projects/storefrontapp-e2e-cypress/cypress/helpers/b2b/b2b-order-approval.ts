import { AccountData } from '../../support/require-logged-in.commands';
import { visitHomePage } from '../checkout-flow';
import {
  pendingOrder,
  approvalOrderList,
  b2bApprover,
  b2bUser,
} from '../../sample-data/b2b-order-approval';

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
