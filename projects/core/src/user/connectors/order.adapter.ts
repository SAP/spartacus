import { Observable } from 'rxjs';
import { Order, OrderHistoryList } from '@spartacus/core';

export interface OrderAdapter {
  place(userId: string, cartId: string): Observable<Order>;

  load(userId: string, orderCode: string): Observable<Order>;

  loadHistory(
    userId: string,
    pageSize: number,
    currentPage: number,
    sort: string
  ): Observable<OrderHistoryList>;
}
