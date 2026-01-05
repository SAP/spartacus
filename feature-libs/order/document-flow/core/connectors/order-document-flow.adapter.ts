/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

export abstract class OrderDocumentFlowAdapter {
  /**
   * Abstract method used to fetch subsequent documents.
   *
   * @param userId The `userId` for given user
   * @param orderId The `orderId` of an existing order
   */
  abstract getOrderSubsequentDocuments(
    userId: string,
    orderId: string
  ): Observable<OrderSubsequentDocument[]>;

  /**
   * Abstract method used to fetch subsequent document entries.
   *
   * @param userId The `userId` for given user
   * @param orderId The `orderId` of an existing order
   * @param documentId The 'documentId' for which entries are fetched
   */
  abstract getOrderSubsequentDocumentEntries(
    userId: string,
    orderId: string,
    documentCategory: string,
    documentId: string
  ): Observable<OrderSubsequentDocumentEntry[]>;
}
