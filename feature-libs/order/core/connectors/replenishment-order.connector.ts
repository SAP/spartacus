import { Injectable } from '@angular/core';
import {
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ReplenishmentOrderAdapter } from './replenishment-order.adapter';

@Injectable()
export class ReplenishmentOrderConnector {
  constructor(protected adapter: ReplenishmentOrderAdapter) {}

  public load(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.load(userId, replenishmentOrderCode);
  }

  public loadReplenishmentDetailsHistory(
    userId: string,
    replenishmentOrderCode: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<OrderHistoryList> {
    return this.adapter.loadReplenishmentDetailsHistory(
      userId,
      replenishmentOrderCode,
      pageSize,
      currentPage,
      sort
    );
  }

  public cancelReplenishmentOrder(
    userId: string,
    replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.cancelReplenishmentOrder(
      userId,
      replenishmentOrderCode
    );
  }

  public loadHistory(
    userId: string,
    pageSize?: number,
    currentPage?: number,
    sort?: string
  ): Observable<ReplenishmentOrderList> {
    return this.adapter.loadHistory(userId, pageSize, currentPage, sort);
  }
}
