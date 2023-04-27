/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { finalOrder } from '../model/order/finalOrder';
import { order } from '../model/orderDetail/order';
import { product } from '../model/ImageDetail/product';

export abstract class CdpOrderFacade {
  abstract getOrder(page_size: number): Observable<finalOrder>;
  abstract fetchOrder(page: number, page_size: number): Observable<finalOrder>;
  abstract fetchOrderDetail(
    finalResult: finalOrder
  ): Promise<Record<string, order>>;
  abstract fetchOrderStatus(
    detail: Record<string, order>,
    orderStatus: Record<string, Record<string, number>>
  ): void;
  abstract fetchOrderImage(
    detail: Record<string, order>
  ): Record<string, product[]>;
}
