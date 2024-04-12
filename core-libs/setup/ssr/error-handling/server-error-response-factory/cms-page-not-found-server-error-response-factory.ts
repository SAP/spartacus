/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { OccConfig, Priority } from '@spartacus/core';
import {
  CmsPageNotFoundServerErrorResponse,
  CxServerErrorResponse,
} from '../server-errors';
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

  hasMatch(error: unknown): boolean {
    const occConfig = this.config.backend?.occ;
    if (occConfig) {
      const { baseUrl, prefix, endpoints } = occConfig;
      const pagesEndpoint = endpoints?.pages;
      const endpoint =
        pagesEndpoint &&
        (typeof pagesEndpoint === 'string'
          ? pagesEndpoint
          : pagesEndpoint.default);
      // The OccEndpointsService can't be used due to circular dependency injection
      // Optional BaseSiteService depends on ngrx, which has dependency on the ErrorHandler
      const expectedUrlRegex = this.buildUrlRegex({
        baseUrl,
        prefix,
        endpoint,
      });
      return (
        error instanceof HttpErrorResponse &&
        expectedUrlRegex.test(error.url ?? '')
      );
    }
    return false;
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

  protected escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  protected buildUrlRegex({
    baseUrl,
    prefix,
    endpoint,
  }: Record<string, string | undefined>): RegExp {
    const escapedBaseUrl = this.escapeRegExp(baseUrl ?? '');
    const escapedPrefix = this.escapeRegExp(prefix ?? '');
    const escapedEndpoint = this.escapeRegExp(endpoint ?? '');
    return new RegExp(
      `^${escapedBaseUrl}${escapedPrefix}[^/]+/${escapedEndpoint}`
    );
  }
}
