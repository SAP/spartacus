/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider, StaticProvider } from '@angular/core';
import {
  LoggerService,
  MULTI_ERROR_HANDLER,
  SERVER_REQUEST_ORIGIN,
  SERVER_REQUEST_URL,
} from '@spartacus/core';

import { PropagatingToServerErrorHandler } from '../error-handling/multi-error-handlers';
import { getRequestOrigin } from '../express-utils/express-request-origin';
import { getRequestUrl } from '../express-utils/express-request-url';
import { serverLoggerServiceFactory } from '../logger';
import { REQUEST } from '../tokens/express.tokens';
import { ServerOptions } from './model';
import { serverRequestOriginFactory } from './server-request-origin';
import { serverRequestUrlFactory } from './server-request-url';

/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideServer(options?: ServerOptions): Provider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: serverRequestOriginFactory(options),
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: serverRequestUrlFactory(options),
    },
    {
      provide: LoggerService,
      useFactory: serverLoggerServiceFactory,
    },
    {
      provide: MULTI_ERROR_HANDLER,
      useExisting: PropagatingToServerErrorHandler,
      multi: true,
    },
  ];
}
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export function getServerRequestProviders(): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: getRequestOrigin,
      deps: [REQUEST],
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: getRequestUrl,
      deps: [REQUEST],
    },
  ];
}
