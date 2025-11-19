/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function mockOrderList(orderSummary) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/current/orders*`,
    {
      orders: [
        {
          code: orderSummary.code,
          placed: orderSummary.created ?? orderSummary.placed,
          statusDisplay: orderSummary.statusDisplay,
          total: {
            formattedValue:
              orderSummary.totalPrice?.formattedValue ??
              orderSummary.total?.formattedValue,
          },
          orgCustomer: null,
          costCenter: null,
        },
      ],
      pagination: {
        currentPage: 0,
        pageSize: 5,
        totalPages: 1,
        totalResults: 1,
      },
      sorts: [
        { code: 'byDate', selected: true },
        { code: 'byOrderNumber', selected: false },
      ],
    }
  ).as('mockOrders');
}

export function mockOrderDetails(orderFull) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/users/current/orders/${orderFull.code}*`,
    {
      code: orderFull.code,
      entries: orderFull.entries ?? [
        {
          product: {
            name: orderFull.product?.name,
            code: orderFull.product?.code,
          },
          quantity: 1,
        },
      ],
      totalPrice: {
        formattedValue: orderFull.totalPrice?.formattedValue,
      },
    }
  ).as('mockOrderDetails');
}
