import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsignmentTracking } from '../../../model/consignment-tracking.model';
import { Order, OrderHistoryList } from '../../../model/order.model';
import { UserOrderAdapter } from './user-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserOrderConnector {
  constructor(protected adapter: UserOrderAdapter) {}

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

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string
  ): Observable<ConsignmentTracking> {
    return this.adapter.getConsignmentTracking(orderCode, consignmentCode);
  }
}
