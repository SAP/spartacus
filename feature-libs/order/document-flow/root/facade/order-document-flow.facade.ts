/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '../model';

import { facadeFactory } from '@spartacus/core';
import { ORDER_DOCUMENT_FLOW_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OrderDocumentFlowFacade,
      feature: ORDER_DOCUMENT_FLOW_FEATURE,
      methods: [
        'getOrderSubsequentDocuments',
        'getOrderSubsequentDocumentEntries',
      ],
    }),
})
export abstract class OrderDocumentFlowFacade {
  /**
   * Get order document flow
   */
  abstract getOrderSubsequentDocuments(
    orderId: string
  ): Observable<OrderSubsequentDocument[]>;

  /**
   * Get order document entries
   */
  abstract getOrderSubsequentDocumentEntries(
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<OrderSubsequentDocumentEntry[]>;
}
