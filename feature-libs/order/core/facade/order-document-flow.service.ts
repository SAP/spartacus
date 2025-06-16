/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable, switchMap, take } from 'rxjs';
import {
  SapOrderSubsequentDocuments,
  OrderDocumentFlowFacade,
} from '@spartacus/order/root';
import { OrderDocumentFlowConnector } from '../connectors';
import { SapOrderSubsequentDocumentEntry } from '../../root/model';

@Injectable()
export class OrderDocumentFlowService implements OrderDocumentFlowFacade {
  protected orderAttachmentsConnector = inject(OrderDocumentFlowConnector);
  protected userIdService = inject(UserIdService);

  getOrderSubsequentDocuments(orderId: string): Observable<SapOrderSubsequentDocuments> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.orderAttachmentsConnector.getOrderSubsequentDocuments(userId, orderId)
      ),
      // map(() => {
      //   throw new Error('')
      // }),
      //map(() => ({sapOrderSubsequentDocuments: []})),
    );
  }

  getOrderSubsequentDocumentEntries(orderId: string, documentId: string): Observable<SapOrderSubsequentDocumentEntry[]> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.orderAttachmentsConnector.getOrderSubsequentDocumentEntries(userId, orderId, documentId)
      ),
      // map(() => {
      //   throw new Error('')
      // })
      //map(() => []),
    );
  }
}
