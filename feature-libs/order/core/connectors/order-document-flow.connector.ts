/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDocumentFlowAdapter } from './order-document-flow.adapter';
import { SapOrderSubsequentDocument, SapOrderSubsequentDocumentEntry } from '@spartacus/order/root';

@Injectable()
export class OrderDocumentFlowConnector {
  protected adapter = inject(OrderDocumentFlowAdapter);

  public getOrderSubsequentDocuments(
    userId: string,
    orderId: string
  ): Observable<SapOrderSubsequentDocument[]> {
    return this.adapter.getOrderSubsequentDocuments(userId, orderId);
  }

  public getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<SapOrderSubsequentDocumentEntry[]> {
    return this.adapter.getOrderSubsequentDocumentEntries(userId, orderId, documentCategory, documentId);
  }
}
