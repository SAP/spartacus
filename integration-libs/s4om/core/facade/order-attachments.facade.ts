/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderAttachments } from '../../root/model';
import { S4OM_FEATURE } from '../../root/feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OrderAttachmentsFacade,
      feature: S4OM_FEATURE,
      methods: ['getOrderAttachments', 'getOrderAttachment'],
    }),
})
export abstract class OrderAttachmentsFacade {
  /**
   * Get all order attachments
   */
  abstract getOrderAttachments(orderId: string): Observable<OrderAttachments>;
  /**
   * Get order attachment
   */
  abstract getOrderAttachment(orderId: string, attachmentId: string): Observable<Blob>;
}
