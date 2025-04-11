/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  UserIdService,
} from '@spartacus/core';
import { Observable, switchMap, take } from 'rxjs';
import { OrderAttachmentsFacade } from './order-attachments.facade';
import { OrderAttachments } from '../../root/model';
import { OrderAttachmentsConnector } from '../connector';

@Injectable()
export class OrderAttachmentsService implements OrderAttachmentsFacade {

  constructor(
    protected orderAttachmentsConnector: OrderAttachmentsConnector,
    protected userIdService: UserIdService,
  ) {}

  getOrderAttachments(orderId: string): Observable<OrderAttachments> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap(userId => this.orderAttachmentsConnector.getOrderAttachments(userId, orderId))
    );
  }

  getOrderAttachment(orderId: string, attachmentId: string): Observable<Blob> {
    return this.userIdService.takeUserId().pipe(
      take(1),
      switchMap(userId => this.orderAttachmentsConnector.getOrderAttachment(userId, orderId, attachmentId))
    );
  }

}
