import { inject, Injectable } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { StateWithOrder, OrderSelectors } from '@spartacus/order/core';
@Injectable({
  providedIn: 'root',
})
export class OccOmfOrderHistoryAdapter extends OccOrderHistoryAdapter {
  protected route = inject(ActivatedRoute);
  protected store = inject(Store<StateWithOrder>);

  getOrderGuid(orderCode: string): Observable<string | undefined> {
    return this.route.queryParams.pipe(
      switchMap((queryParams) => {
        if (queryParams.guid) {
          // when navigating from Order History to Order Details page
          return of(queryParams.guid);
        } else {
          // when loading Order History page in case of My-Account-V2
          return this.store.pipe(
            select(OrderSelectors.getOrdersState),
            map((orderListState) => orderListState.value),
            map((orderList) => {
              const currentOrder = (orderList?.orders ?? []).find(
                (order) => order.code === orderCode
              );
              return currentOrder?.guid;
            })
          );
        }
      })
    );
  }

  public load(userId: string, orderCode: string): Observable<Order> {
    return this.getOrderGuid(orderCode).pipe(
      switchMap((guid) => {
        const url = this.occEndpoints.buildUrl('orderDetail', {
          urlParams: { userId, orderId: orderCode },
        });

        let headers = new HttpHeaders();
        if (guid) {
          headers = headers.set('guid', guid);
        }
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
