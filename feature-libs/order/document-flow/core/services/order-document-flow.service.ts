/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable, switchMap } from 'rxjs';

import { OrderDocumentFlowConnector } from '../connectors';
import { OrderDocumentFlowFacade } from '@spartacus/order/document-flow/root';
import {
  SapOrderSubsequentDocument,
  SapOrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

@Injectable()
export class OrderDocumentFlowService implements OrderDocumentFlowFacade {
  protected orderAttachmentsConnector = inject(OrderDocumentFlowConnector);
  protected userIdService = inject(UserIdService);

  getOrderSubsequentDocuments(
    orderId: string
  ): Observable<SapOrderSubsequentDocument[]> {
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
  ): Observable<SapOrderSubsequentDocumentEntry[]> {
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
