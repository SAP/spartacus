/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CxEvent } from '@spartacus/core';
import { Order } from '@spartacus/order/root';

export class DownloadOrderInvoicesEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'DownloadOrderInvoicesEvent';
  order: Order;
}
