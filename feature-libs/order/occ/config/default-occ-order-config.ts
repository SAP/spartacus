/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        /* eslint-disable max-len */
        orderHistory: 'users/${userId}/orders',
        orderDetail: 'users/${userId}/orders/${orderId}?fields=FULL',
        consignmentTracking:
          'users/${userId}/orders/${orderCode}/consignments/${consignmentCode}/tracking',
        cancelOrder: 'users/${userId}/orders/${orderId}/cancellation',
        returnOrder:
          'users/${userId}/orderReturns?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        orderReturns: 'users/${userId}/orderReturns?fields=BASIC',
        orderReturnDetail:
          'users/${userId}/orderReturns/${returnRequestCode}?fields=BASIC,returnEntries(BASIC,refundAmount(formattedValue),orderEntry(basePrice(formattedValue),product(name,code,baseOptions,images(DEFAULT,galleryIndex)))),deliveryCost(formattedValue),totalPrice(formattedValue),subTotal(formattedValue)',
        cancelReturn: 'users/${userId}/orderReturns/${returnRequestCode}',
        /* eslint-enable */

        /** scheduled replenishment endpoints start */
        replenishmentOrderDetails:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderDetailsHistory:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}/orders',
        cancelReplenishmentOrder:
          'users/${userId}/replenishmentOrders/${replenishmentOrderCode}?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType,user',
        replenishmentOrderHistory:
          'users/${userId}/replenishmentOrders?fields=FULL,replenishmentOrders(FULL, purchaseOrderNumber)',
        /** scheduled replenishment endpoints end */

        /** placing an order endpoints start **/
        placeOrder: 'users/${userId}/orders?fields=FULL',
        /** placing an order endpoints end **/
      },
    },
  },
};
