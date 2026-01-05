/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDocumentFlowAdapter } from './order-document-flow.adapter';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

@Injectable()
export class OrderDocumentFlowConnector {
  protected adapter = inject(OrderDocumentFlowAdapter);

  getOrderSubsequentDocuments(
    userId: string,
    orderId: string
  ): Observable<OrderSubsequentDocument[]> {
    return this.adapter.getOrderSubsequentDocuments(userId, orderId);
  }

  getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<OrderSubsequentDocumentEntry[]> {
    return this.adapter.getOrderSubsequentDocumentEntries(
      userId,
      orderId,
      documentCategory,
      documentId
    );
  }
}
