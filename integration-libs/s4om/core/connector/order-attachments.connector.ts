/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAttachmentsAdapter } from './order-attachments.adapter';
import { OrderAttachments } from '../../root/model';

@Injectable()
export class OrderAttachmentsConnector {
  constructor(protected adapter: OrderAttachmentsAdapter) {
  }

  public getOrderAttachments(
    userId: string,
    orderId: string,
  ): Observable<OrderAttachments> {
    return this.adapter.getOrderAttachments(userId, orderId);
  }

  public getOrderAttachment(userId: string, orderId: string, attachmentId: string): Observable<Blob> {
    return this.adapter.getOrderAttachment(userId, orderId, attachmentId);
  }
}
