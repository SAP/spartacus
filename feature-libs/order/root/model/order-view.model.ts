/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

export interface ConsignmentView extends Consignment {
  consignmentTracking?: ConsignmentTracking;
}

export interface OrderHistoryView extends OrderHistory {
  entries?: OrderEntry[];
  consignments?: Consignment[];
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
