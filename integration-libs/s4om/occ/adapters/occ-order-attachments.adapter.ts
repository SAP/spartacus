/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderAttachmentsAdapter } from '../../core';
import { OrderAttachments } from '../../root/model';

@Injectable()
export class OccOrderAttachmentsAdapter implements OrderAttachmentsAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService,
  ) {
  }

  getOrderAttachments(userId: string, orderId: string): Observable<OrderAttachments> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get(this.getOrderAttachmentsEndpoint(orderId, userId), { headers })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        }),
      );
  }

  getOrderAttachment(userId: string, orderId: string, attachmentId: string): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json',
    };

    return this.http
      .get<Blob>(this.buildOrderAttachmentUrl(userId, orderId, attachmentId), options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected getOrderAttachmentsEndpoint(orderId: string, userId: string): string {
    return this.occEndpoints.buildUrl('orderAttachments', {
      urlParams: {
        userId,
        orderId,
      },
    });
  }

  protected buildOrderAttachmentUrl(userId: string, orderId: string, attachmentId: string) {
    return this.occEndpoints.buildUrl('downloadOrderAttachment', {
      urlParams: {
        userId,
        orderId,
        attachmentId
      },
    });
  }
}
