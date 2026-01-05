/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, isDevMode } from '@angular/core';
import {
  OCC_USER_ID_ANONYMOUS,
  InterceptorUtil,
  USE_CLIENT_TOKEN,
  Occ,
} from '@spartacus/core';
import { OccOrderHistoryAdapter } from '@spartacus/order/occ';
import { Order, ORDER_NORMALIZER } from '@spartacus/order/root';
import { HttpHeaders } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StateWithOrder, OrderSelectors } from '@spartacus/order/core';
import { OmfConfig } from './config/omf-config';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OccOmfOrderHistoryAdapter extends OccOrderHistoryAdapter {
  protected route = inject(ActivatedRoute);
  protected store = inject(Store<StateWithOrder>);
  protected config = inject(OmfConfig);

  protected getOrderDetailsValue(code: string): Observable<Order | undefined> {
    return this.store.select(OrderSelectors.getOrdersState).pipe(
      map((orderListState) => orderListState.value),
      map((orderList) => {
        return (orderList?.orders ?? []).find((order) => order.code === code);
      })
    );
  }
  getOrderGuid(orderCode: string): Observable<string | undefined> {
    return this.route.queryParams.pipe(
      switchMap((queryParams) => {
        if (queryParams.guid) {
          // when navigating from Order History to Order Details page
          return of(queryParams.guid);
        } else {
          // when loading Order History page in case of My-Account-V2
          return this.getOrderDetailsValue(orderCode).pipe(
            map((order) => (order ? order.guid : undefined))
          );
        }
      })
    );
  }

  getRequestHeader(guid: string | undefined): HttpHeaders {
    let headers = new HttpHeaders();
    if (!this.config.omf?.guidHttpHeaderName && isDevMode()) {
      this.logger.warn(
        `There is no guidHttpHeaderName configured in OMF configuration`
      );
    }
    const guidHeader = this.config.omf?.guidHttpHeaderName?.toLowerCase?.();
    if (guid && guidHeader) {
      headers = headers.set(guidHeader, guid);
    }
    return headers;
  }

  public load(userId: string, orderCode: string): Observable<Order> {
    return this.getOrderGuid(orderCode).pipe(
      switchMap((guid) => {
        const url = this.occEndpoints.buildUrl('orderDetail', {
          urlParams: { userId, orderId: orderCode },
        });
        let headers = this.getRequestHeader(guid);
        if (userId === OCC_USER_ID_ANONYMOUS) {
          headers = InterceptorUtil.createHeader(
            USE_CLIENT_TOKEN,
            true,
            headers
          );
        }
        return this.http
          .get<Occ.Order>(url, { headers })
          .pipe(this.converter.pipeable(ORDER_NORMALIZER));
      })
    );
  }
}
