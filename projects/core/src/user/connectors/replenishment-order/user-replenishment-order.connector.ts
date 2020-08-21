import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { UserReplenishmentOrderAdapter } from './user-replenishment-order.adapter';

@Injectable({
  providedIn: 'root',
})
export class UserReplenishmentOrderConnector {
  constructor(protected adapter: UserReplenishmentOrderAdapter) {}

  public get(
    userId: string,
    orderCode: string
  ): Observable<ReplenishmentOrder> {
    return this.adapter.get(userId, orderCode);
  }
}
