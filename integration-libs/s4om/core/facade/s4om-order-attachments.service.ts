/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { UserIdService } from '@spartacus/core';
import { Observable, switchMap, take } from 'rxjs';
import { S4omOrderAttachmentsFacade } from './s4om-order-attachments-facade';
import { S4omOrderAttachments } from '../../root/model';
import { S4omOrderAttachmentsConnector } from '../connector';

@Injectable()
export class S4omOrderAttachmentsService implements S4omOrderAttachmentsFacade {
  protected orderAttachmentsConnector = inject(S4omOrderAttachmentsConnector);
  protected userIdService = inject(UserIdService);

  getOrderAttachments(orderId: string): Observable<S4omOrderAttachments> {
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
