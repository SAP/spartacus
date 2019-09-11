import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserOrderAdapter } from './user-order.adapter';
import { Order, OrderHistoryList } from '../../../model/order.model';
import { GUID_PATTERN } from '../../../util/regex-pattern';
import { ANONYMOUS_USERID } from '../../../cart/facade/cart-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserOrderConnector {
  constructor(protected adapter: UserOrderAdapter) {}

  public get(userId: string, orderCode: string): Observable<Order> {
    if (this.isGuid(orderCode)) {
      return this.adapter.load(ANONYMOUS_USERID, orderCode);
    }
    return this.adapter.load(userId, orderCode);
  }

  public getHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
  }

  protected isGuid(str: string): boolean {
    return str.match(GUID_PATTERN) ? true : false;
  }
}
