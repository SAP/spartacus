/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function mockOrdersListEN() {
  cy.intercept(
    {
      method: 'GET',
      url: '**/users/current/orders?pageSize=5&lang=en&curr=USD*',
    },
    { fixture: 'orders/orders-list-en.json' }
  ).as('ordersEN');
}

export function mockOrdersListDE() {
  cy.intercept(
    {
      method: 'GET',
      url: /\/users\/current\/orders(\?.*)?.*lang=de.*/,
    },
    { fixture: 'orders/orders-list-de.json' }
  ).as('ordersDE');
}

export function mockOrdersListSorted() {
  cy.intercept(
    {
      method: 'GET',
      url: /\/users\/current\/orders(\?.*)?.*sort=byOrderNumber.*/,
    },
    { fixture: 'orders/orders-list-sorted-en.json' }
  ).as('ordersSorted');
}

export function mockOrderDetails() {
  cy.intercept('GET', '**/users/current/orders/*', {
    fixture: 'orders/order-details.json',
  }).as('orderDetails');
}
