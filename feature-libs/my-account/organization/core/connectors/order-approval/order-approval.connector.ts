import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EntitiesModel,
  OrderApproval,
  OrderApprovalDecision,
} from '@spartacus/core';
import { OrderApprovalAdapter } from './order-approval.adapter';
import { B2BSearchConfig } from '../../model/search-config';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalConnector {
  constructor(protected adapter: OrderApprovalAdapter) {}

  get(userId: string, orderApprovalCode: string): Observable<OrderApproval> {
    return this.adapter.load(userId, orderApprovalCode);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
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
