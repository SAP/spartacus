/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import '@spartacus/order/root';
import { Consignment, ReturnRequest } from '@spartacus/order/root';

declare module '@spartacus/order/root' {
  interface OrderHistory {
    //purchaseType?: string; //?? Question: Purchased Online or Purchased Instore
    //-> check the field 'Positions and Prices->Common->Sales Application'
    //totalItems?: number; //  - gets data from: /users/current/orders/{code}
    thumbnail?: any[]; //thumbnail images of all items in the order
    //any array of Observable of Type 'Images'
    pickupConsignments?: Consignment[]; //same as from feature-libs/order/components/order-details/order-detail-items/order-detail-items.component.ts line 30
    deliveryConsignments?: Consignment[];
    unconsignedEntries?: OrderEntry[];
    pickupUnconsignedEntries?: OrderEntry[]; // "
    deliveryUnconsignedEntries?: OrderEntry[]; // "
    returnRequests?: ReturnRequest[];
    // IMPORTANT: have to alter this based on comment from Bhanu. if 1 order can have only 1 return request, then make it into single item.
    // else kept it the same.
  }
}

// declare module '@spartacus/order/root' {
//   interface Consignment {
//     tracking?: ConsignmentTracking;
//   }
// }
