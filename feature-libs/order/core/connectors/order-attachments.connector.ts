/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAttachmentsAdapter } from './order-attachments.adapter';
import { OrderAttachments } from '@spartacus/order/root';

@Injectable()
export class OrderAttachmentsConnector {
  protected adapter = inject(OrderAttachmentsAdapter);

  public getOrderAttachments(
    userId: string,
    orderId: string
  ): Observable<OrderAttachments> {
    return this.adapter.getOrderAttachments(userId, orderId);
  }

  public downloadOrderAttachment(
    userId: string,
    orderId: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.adapter.downloadOrderAttachment(userId, orderId, attachmentId);
  }
}
