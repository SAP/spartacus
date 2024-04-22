/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import { OccConfig, OccEndpointsService, Priority } from '@spartacus/core';
import {
  CmsPageNotFoundServerErrorResponse,
  CxServerErrorResponse,
} from '../server-error-response';
import { ServerErrorResponseFactory } from './server-error-response-factory';

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
  protected config = inject(OccConfig);
  protected injector = inject(Injector);

  hasMatch(error: unknown): boolean {
    // OccEndpointsService could not be injected in the constructor, due to a circular dependency:
    //   ErrorHandler -> *CmsPageNotFoundServerErrorResponseFactory* -> OccEndpointsService ->
    //   -> BaseSiteService -> NgRx -> ErrorHandler
    const occEndpointsService = this.injector.get(OccEndpointsService);
    const expectedUrl = occEndpointsService.buildUrl('pages');
    return (
      error instanceof HttpErrorResponse &&
      error.status === 404 &&
      (error.url ?? '').startsWith(expectedUrl)
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
}
