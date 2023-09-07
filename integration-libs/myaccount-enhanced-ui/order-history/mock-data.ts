/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReturnRequestList, OrderHistoryList } from '@spartacus/order/root';

export const mockReturnRequestList: ReturnRequestList = {
  returnRequests: [
    {
      code: '1',
      rma: '1',
      order: {
        code: '0005000003',
      },
    },
    {
      code: '2',
      rma: '2',
      order: {
        code: '0005000005',
      },
    },
    {
      code: '3',
      rma: '3',
      order: {
        code: '0005000003',
      },
    },
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

export const mock_order_with_details_and_returns: OrderHistoryList = {
  orders: [
    {
      code: '0005000003',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
      purchaseType: '???',
      totalItems: 2,
      total: {
        currencyIso: 'USD',
        formattedValue: '$1,220.76',
        value: 1220.76,
      },
      unconsignedEntries: [],
      deliveryConsignments: [],
      pickupConsignments: [],
      pickupUnconsignedEntries: [],
      deliveryUnconsignedEntries: [],
      returnRequests: [
        {
          code: '1',
          rma: '1',
          order: {
            code: '0005000003',
          },
        },
        {
          code: '3',
          rma: '3',
          order: {
            code: '0005000003',
          },
        },
      ],
      thumbnail: [
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
      ],
    },
    {
      code: '0005000005',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
      purchaseType: '???',
      totalItems: 2,
      total: {
        currencyIso: 'USD',
        formattedValue: '$6,220.76',
        value: 6220.76,
      },
      unconsignedEntries: [],
      deliveryConsignments: [],
      pickupConsignments: [],
      pickupUnconsignedEntries: [],
      deliveryUnconsignedEntries: [],
      returnRequests: [
        {
          code: '2',
          rma: '2',
          order: {
            code: '0005000005',
          },
        },
      ],
      thumbnail: [
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
      ],
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 2,
  },
  sorts: [
    { code: 'byDate', selected: true },
    {
      code: 'byOrderNumber',
      selected: false,
    },
  ],
};

export const mock_order_with_details: OrderHistoryList = {
  orders: [
    {
      code: '0005000003',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
      purchaseType: '???',
      totalItems: 2,
      total: {
        currencyIso: 'USD',
        formattedValue: '$1,220.76',
        value: 1220.76,
      },
      unconsignedEntries: [],
      deliveryConsignments: [],
      pickupConsignments: [],
      pickupUnconsignedEntries: [],
      deliveryUnconsignedEntries: [],
      returnRequests: [],
      thumbnail: [
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
      ],
    },
    {
      code: '0005000005',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
      purchaseType: '???',
      totalItems: 2,
      total: {
        currencyIso: 'USD',
        formattedValue: '$6,220.76',
        value: 6220.76,
      },
      unconsignedEntries: [],
      deliveryConsignments: [],
      pickupConsignments: [],
      pickupUnconsignedEntries: [],
      deliveryUnconsignedEntries: [],
      returnRequests: [],
      thumbnail: [
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
        {
          PRIMARY: {
            cartIcon: {},
            product: {},
            thumbnail: {},
            zoom: {},
          },
        },
      ],
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 2,
  },
  sorts: [
    { code: 'byDate', selected: true },
    {
      code: 'byOrderNumber',
      selected: false,
    },
  ],
};

export const mock_orderDetails_1 = {
  code: '0005000003',
  guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
  totalItems: 2,
};

export const mock_orderDetails_2 = {
  code: '0005000005',
  guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24301',
  totalItems: 2,
};

export const mock_orderHistoryList: OrderHistoryList = {
  orders: [
    {
      code: '0005000003',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24300',
      purchaseType: '???',
      total: {
        currencyIso: 'USD',
        formattedValue: '$1,220.76',
        value: 1220.76,
      },
    },
    {
      code: '0005000005',
      guid: 'efc8eee6-cb2a-4622-87c7-c43b9dc24301',
      purchaseType: '???',
      total: {
        currencyIso: 'USD',
        formattedValue: '$6,220.76',
        value: 6220.76,
      },
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byDate',
    totalPages: 1,
    totalResults: 2,
  },
  sorts: [
    { code: 'byDate', selected: true },
    {
      code: 'byOrderNumber',
      selected: false,
    },
  ],
};
