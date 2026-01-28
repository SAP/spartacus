/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';
import { OrderAttachments } from '../model';
import { facadeFactory } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OrderAttachmentsFacade,
      feature: ORDER_CORE_FEATURE,
      methods: ['getOrderAttachments', 'downloadOrderAttachment'],
    }),
})
export abstract class OrderAttachmentsFacade {
  /**
   * Get all order attachments
   */
  abstract getOrderAttachments(orderId: string): Observable<OrderAttachments>;

  /**
   * Download order attachment blob
   */
  abstract downloadOrderAttachment(
    orderId: string,
    attachmentId: string
  ): Observable<Blob>;
}
