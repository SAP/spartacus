/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable, switchMap } from 'rxjs';

import { OrderDocumentFlowConnector } from '../connectors';
import {
  OrderDocumentFlowFacade,
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

@Injectable()
export class OrderDocumentFlowService implements OrderDocumentFlowFacade {
  protected orderAttachmentsConnector = inject(OrderDocumentFlowConnector);
  protected userIdService = inject(UserIdService);

  getOrderSubsequentDocuments(
    orderId: string
  ): Observable<OrderSubsequentDocument[]> {
    return this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) =>
          this.orderAttachmentsConnector.getOrderSubsequentDocuments(
            userId,
            orderId
          )
        )
      );
  }

  getOrderSubsequentDocumentEntries(
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<OrderSubsequentDocumentEntry[]> {
    return this.userIdService
      .takeUserId()
      .pipe(
        switchMap((userId) =>
          this.orderAttachmentsConnector.getOrderSubsequentDocumentEntries(
            userId,
            orderId,
            documentCategory,
            documentId
          )
        )
      );
  }
}
