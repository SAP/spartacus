/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ServerErrorResponseTransformer } from './server-error-response-transformers';
import {
  CmsPageNotFoundServerErrorResponse,
  CxServerErrorResponse,
} from '../server-errors';
import { HttpErrorResponse } from '@angular/common/http';
import { OccEndpointsService, Priority } from '@spartacus/core';

/**
 * A transformer responsible for transforming an HTTP error response into a {@link CmsPageNotFoundServerErrorResponse}.
 * The transformer is applicable when the error the URL contains 'cms/pages'.
 */
@Injectable({
  providedIn: 'root',
})
export class CmsPageNotFoundServerErrorResponseTransformer
  implements ServerErrorResponseTransformer
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

  transform(error: any): CxServerErrorResponse {
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
