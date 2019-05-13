import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderHistoryList } from '@spartacus/core';
import { OrderAdapter } from './order.adapter';

@Injectable({
  providedIn: 'root',
})
export class OrderConnector {
  constructor(private adapter: OrderAdapter) {}

  public place(userId: string, cartId: string): Observable<Order> {
    return this.adapter.place(userId, cartId);
  }

  public get(userId: string, orderCode: string): Observable<Order> {
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
}
