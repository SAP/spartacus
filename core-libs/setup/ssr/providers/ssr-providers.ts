/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaticProvider } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import {
  SERVER_REQUEST_ORIGIN,
  SERVER_REQUEST_URL,
  SSR_REQUEST_LOGGING,
} from '@spartacus/core';
import { getRequestOrigin } from '../express-utils/express-request-origin';
import { getRequestUrl } from '../express-utils/express-request-url';
import { LoggingInterceptor } from '../optimized-engine/logging.interceptor';
import { RequestLoggingService } from '../optimized-engine/request-logging.service';
import { ServerOptions } from './model';
import { serverRequestOriginFactory } from './server-request-origin';
import { serverRequestUrlFactory } from './server-request-url';

/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideServer(options?: ServerOptions): StaticProvider[] {
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
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      deps: [SSR_REQUEST_LOGGING],
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
    {
      provide: SSR_REQUEST_LOGGING,
      useClass: RequestLoggingService,
      deps: [REQUEST],
    },
  ];
}
