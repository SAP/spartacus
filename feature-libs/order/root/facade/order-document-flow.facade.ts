/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';
import { SapOrderSubsequentDocumentEntry, SapOrderSubsequentDocuments } from '../model';
import { facadeFactory } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OrderDocumentFlowFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['getOrderSubsequentDocuments', 'getOrderSubsequentDocumentEntries'],
    }),
})
export abstract class OrderDocumentFlowFacade {
  /**
   * Get order document flow
   */
  abstract getOrderSubsequentDocuments(orderId: string): Observable<SapOrderSubsequentDocuments>;

  /**
   * Get order document entries
   */
  abstract getOrderSubsequentDocumentEntries(orderId: string, documentId: string): Observable<SapOrderSubsequentDocumentEntry[]>;
}
