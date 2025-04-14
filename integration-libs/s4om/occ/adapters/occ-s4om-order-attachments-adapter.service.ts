/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { S4omOrderAttachmentsAdapter } from '../../core/connector';
import { S4omOrderAttachments } from '../../root/model';

@Injectable()
export class OccS4omOrderAttachmentsAdapter
  implements S4omOrderAttachmentsAdapter
{
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  getOrderAttachments(
    userId: string,
    orderId: string
  ): Observable<S4omOrderAttachments> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get(this.getOrderAttachmentsUrl(orderId, userId), { headers })
      .pipe(
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  downloadOrderAttachment(
    userId: string,
    orderId: string,
    attachmentId: string
  ): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json',
    };

    return this.http
      .get<Blob>(
        this.getDownloadOrderAttachmentUrl(userId, orderId, attachmentId),
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected getOrderAttachmentsUrl(orderId: string, userId: string): string {
    return this.occEndpoints.buildUrl('orderAttachments', {
      urlParams: {
        userId,
        orderId,
      },
    });
  }

  protected getDownloadOrderAttachmentUrl(
    userId: string,
    orderId: string,
    attachmentId: string
  ) {
    return this.occEndpoints.buildUrl('downloadOrderAttachment', {
      urlParams: {
        userId,
        orderId,
        attachmentId,
      },
    });
  }
}
