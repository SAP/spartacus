/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { S4omOrderAttachments } from '../../root/model';

export abstract class S4omOrderAttachmentsAdapter {
  /**
   * Abstract method used to reorder an order.
   *
   * @param userId The `userId` for given user
   * @param orderId The `orderId` of an existing order
   */
  abstract getOrderAttachments(
    userId: string,
    orderId: string
  ): Observable<S4omOrderAttachments>;

  /**
   * Abstract method used to download order attachment.
   *
   * @param userId The `userId` for given user
   * @param orderId The `orderId` of an existing order
   * @param attachmentId The `attachmentId` of an existing attachment
   */
  abstract downloadOrderAttachment(
    userId: string,
    orderId: string,
    attachmentId: string
  ): Observable<Blob>;
}
