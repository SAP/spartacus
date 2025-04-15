/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { S4omOrderAttachments } from '../../root/model';
import { S4OM_FEATURE } from '../../root/feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: S4omOrderAttachmentsFacade,
      feature: S4OM_FEATURE,
      methods: ['getOrderAttachments', 'downloadOrderAttachment'],
    }),
})
export abstract class S4omOrderAttachmentsFacade {
  /**
   * Get all order attachments
   */
  abstract getOrderAttachments(
    orderId: string
  ): Observable<S4omOrderAttachments>;
  /**
   * Get order attachment
   */
  abstract downloadOrderAttachment(
    orderId: string,
    attachmentId: string
  ): Observable<Blob>;
}
