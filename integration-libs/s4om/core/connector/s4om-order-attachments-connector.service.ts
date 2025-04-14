/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { S4omOrderAttachmentsAdapter } from './s4om-order-attachments.adapter';
import { S4omOrderAttachments } from '../../root/model';

@Injectable()
export class S4omOrderAttachmentsConnector {
  protected adapter = inject(S4omOrderAttachmentsAdapter);

  public getOrderAttachments(
    userId: string,
    orderId: string,
  ): Observable<S4omOrderAttachments> {
    return this.adapter.getOrderAttachments(userId, orderId);
  }

  public downloadOrderAttachment(userId: string, orderId: string, attachmentId: string): Observable<Blob> {
    return this.adapter.downloadOrderAttachment(userId, orderId, attachmentId);
  }
}
