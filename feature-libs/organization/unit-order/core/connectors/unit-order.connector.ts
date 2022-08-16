import { Injectable } from '@angular/core';
import {
  ConsignmentTracking,
  Order,
  OrderHistoryList,
} from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { UnitOrderAdapter } from './unit-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UnitOrderConnector {
  constructor(protected adapter: UnitOrderAdapter) {}

  public get(userId: string, orderCode: string): Observable<Order> {
    return this.adapter.load(userId, orderCode);
  }

  public getUnitOrderHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadUnitOrderHistory(
      userId,
      pageSize,
      currentPage,
      sort
    );
  }

  public getConsignmentTracking(
    orderCode: string,
    consignmentCode: string,
    userId?: string
  ): Observable<ConsignmentTracking> {
    return this.adapter.getConsignmentTracking(
      orderCode,
      consignmentCode,
      userId
    );
  }
}
