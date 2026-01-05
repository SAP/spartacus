/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable, switchMap, take } from 'rxjs';
import {
  OrderAttachmentsFacade,
  OrderAttachments,
} from '@spartacus/order/root';
import { OrderAttachmentsConnector } from '../connectors';

@Injectable()
export class OrderAttachmentsService implements OrderAttachmentsFacade {
  protected orderAttachmentsConnector = inject(OrderAttachmentsConnector);
  protected userIdService = inject(UserIdService);

  getOrderAttachments(orderId: string): Observable<OrderAttachments> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.orderAttachmentsConnector.getOrderAttachments(userId, orderId)
      )
    );
  }

  downloadOrderAttachment(
    orderId: string,
    attachmentId: string
  ): Observable<Blob> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap((userId) =>
        this.orderAttachmentsConnector.downloadOrderAttachment(
          userId,
          orderId,
          attachmentId
        )
      )
    );
  }
}
