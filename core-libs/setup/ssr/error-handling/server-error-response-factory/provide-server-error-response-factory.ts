/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CmsPageNotFoundServerErrorResponseFactory } from './cms-page-not-found-server-error-response-factory';
import { UnknownServerErrorResponseFactory } from './unknown-server-error-response-factory';
import { SERVER_ERROR_RESPONSE_FACTORY } from './server-error-response-factory';

/**
 * This file provides the default server error response factories.
 */
export const provideServerErrorResponseFactory = (): Provider[] => [
  {
    provide: SERVER_ERROR_RESPONSE_FACTORY,
    useExisting: CmsPageNotFoundServerErrorResponseFactory,
    multi: true,
  },
  {
    provide: SERVER_ERROR_RESPONSE_FACTORY,
    useExisting: UnknownServerErrorResponseFactory,
    multi: true,
  },
];
