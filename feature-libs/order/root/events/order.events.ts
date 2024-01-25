/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';
import { Order } from '../model/order.model';
import { ReplenishmentOrder } from '../model/replenishment-order.model';

/**
 * An abstract event for all the order events.
 */
export abstract class OrderEvent extends CxEvent {
  userId?: string;
  /**
   * Usually set via `getCartIdByUserId()` util method,
   * It is an abstraction over the different properties
   * used for anonymous and logged-in users' carts:
   * - `code` for logged-in users
   * - `guid` for anonymous users
   */
  cartId?: string;
  /**
   * All carts have the `code` property assigned to them,
   * regardless of whether they are anonymous or logged-in.
   * In case of logged-in users, the `cartCode` and `cartId` are the same.
   */
  cartCode?: string;
}

/**
 * Indicates that a user has successfully placed an order.
 */
export class OrderPlacedEvent extends OrderEvent {
  /**
   * Event's type
   */
  static readonly type = 'OrderPlacedEvent';
  /**
   * Order
   */
  order: Order;
}

/**
 * Indicates that a user has successfully placed scheduled an order.
 */
export class ReplenishmentOrderScheduledEvent extends OrderEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReplenishmentOrderScheduledEvent';
  /**
   * Replenishment Order
   */
  replenishmentOrder: ReplenishmentOrder;
}

/**
 * Indicates that a user has click on 'Download Invoices' button on Order details page
 */
export class DownloadOrderInvoicesEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'DownloadOrderInvoicesEvent';
  /**
   * Order
   */
  order: Order;
}
