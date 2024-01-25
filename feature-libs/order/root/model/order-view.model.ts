/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { ConsignmentTracking } from './consignment-tracking.model';
import {
  Consignment,
  OrderHistory,
  ReturnRequest,
  OrderHistoryList,
  Order,
} from './order.model';

// for my-account-v2: contains tracking information along with consignment details
export interface ConsignmentView extends Consignment {
  consignmentTracking?: ConsignmentTracking;
}

// for my-account-v2: contains extra details for order history
export interface OrderHistoryView extends OrderHistory {
  entries?: OrderEntry[];
  consignments?: ConsignmentView[];
  unconsignedEntries?: OrderEntry[];
  returnRequests?: ReturnRequest[];
  totalItems?: number;
  returnable?: boolean;
}

export interface OrderHistoryListView extends OrderHistoryList {
  orders?: OrderHistoryView[];
}

export interface OrderView extends Order {
  consignments?: ConsignmentView[];
}
