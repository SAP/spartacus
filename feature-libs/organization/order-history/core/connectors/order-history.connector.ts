import { Injectable } from '@angular/core';
import { EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';
import { OrderHistoryAdapter } from './order-approval.adapter';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryConnector {
  constructor(protected adapter: OrderHistoryAdapter) {}

  get(userId: string, orderApprovalCode: string): Observable<OrderApproval> {
    return this.adapter.load(userId, orderApprovalCode);
  }

  getList(
    userId: string,
    params?: SearchConfig
  ): Observable<EntitiesModel<OrderApproval>> {
    return this.adapter.loadList(userId, params);
  }

  makeDecision(
    userId: string,
    orderApprovalCode: string,
    orderApprovalDecision: OrderApprovalDecision
  ): Observable<OrderApprovalDecision> {
    return this.adapter.makeDecision(
      userId,
      orderApprovalCode,
      orderApprovalDecision
    );
  }
}
