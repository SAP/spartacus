/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider, StaticProvider, inject } from '@angular/core';
import {
  LoggerService,
  MULTI_ERROR_HANDLER,
  SERVER_REQUEST_ORIGIN,
  SERVER_REQUEST_URL,
  provideFeatureTogglesFactory,
} from '@spartacus/core';

import { ENABLE_SSR_ERROR_HANDLING } from '../error-handling/enable-ssr-error-handling';
import { ServerRespondingErrorHandler } from '../error-handling/multi-error-handlers';
import { provideServerErrorResponseFactories } from '../error-handling/server-error-response-factory/provide-server-error-response-factories';
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
      provide: MULTI_ERROR_HANDLER, // we're going to provide it, but we'll enable this feature in other place
      useExisting: ServerRespondingErrorHandler,
      multi: true,
    },
    provideServerErrorResponseFactories(), // we're going to provide it, but we'll enable this feature in other place
    // TBD: to ensure that the necessary feature toggles are available if the feature is enabled
    provideFeatureTogglesFactory(() => {
      const isSsrErrorHandlingEnabled = inject(ENABLE_SSR_ERROR_HANDLING);
      return {
        ngrxErrorHandling: isSsrErrorHandlingEnabled,
        httpErrorHandling: isSsrErrorHandlingEnabled,
      };
    }),
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
