/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SapOrderSubsequentDocuments } from '@spartacus/order/root';
import { OrderDocumentFlowAdapter } from './order-document-flow.adapter';
import { SapOrderSubsequentDocumentEntry } from '../../root/model';

@Injectable()
export class OrderDocumentFlowConnector {
  protected adapter = inject(OrderDocumentFlowAdapter);

  public getOrderSubsequentDocuments(
    userId: string,
    orderId: string
  ): Observable<SapOrderSubsequentDocuments> {
    return this.adapter.getOrderSubsequentDocuments(userId, orderId);
  }

  public getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentId: string
  ): Observable<SapOrderSubsequentDocumentEntry[]> {
    return this.adapter.getOrderSubsequentDocumentEntries(userId, orderId, documentId);
  }
}
