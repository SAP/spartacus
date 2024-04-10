/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ServerErrorResponseFactory } from './server-error-response-factory';
import {
  CmsPageNotFoundServerErrorResponse,
  CxServerErrorResponse,
} from '../server-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { OccEndpointsService, Priority } from '@spartacus/core';

/**
 * A factory responsible for creating {@link CmsPageNotFoundServerErrorResponse}.
 * The factory is applicable when the error response occurs during HTTP call for CMS pages.
 */
@Injectable({
  providedIn: 'root',
})
export class CmsPageNotFoundServerErrorResponseFactory
  implements ServerErrorResponseFactory
{
  endpointsService: OccEndpointsService;
  constructor() {
    this.endpointsService = inject(OccEndpointsService);
  }

  hasMatch(error: unknown): boolean {
    const pagesEndpoint = this.endpointsService.buildUrl('pages');
    console.log('pagesEndpoint', pagesEndpoint);
    return (
      this.isHttpErrorResponse(error) &&
      (error.url ?? '').startsWith(pagesEndpoint)
    );
  }

  getPriority(): number {
    return Priority.LOW;
  }

  create(error: any): CxServerErrorResponse {
    const message = 'CMS page not found';
    return new CmsPageNotFoundServerErrorResponse({
      message,
      cause: error,
    });
  }

  protected isHttpErrorResponse(error: any): error is HttpErrorResponse {
    return error instanceof HttpErrorResponse;
  }
}
