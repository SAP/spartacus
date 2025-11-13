/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { EntitiesModel, SearchConfig } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';
import { OrderApprovalAdapter } from './order-approval.adapter';

@Injectable({
  providedIn: 'root',
})
export class OrderApprovalConnector {
  protected adapter = inject(OrderApprovalAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
