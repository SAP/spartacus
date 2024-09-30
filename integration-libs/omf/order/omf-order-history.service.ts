/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { OrderHistoryService } from '@spartacus/order/core';
import { Order, OrderHistoryFacade } from '@spartacus/order/root';

@Injectable()
export class OmfOrderHistoryService
  extends OrderHistoryService
  implements OrderHistoryFacade
{
  getQueryParams(order: Order): Params | null {
    return order.guid
      ? {
          guid: order.guid,
        }
      : null;
  }
}
