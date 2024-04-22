/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StaticProvider } from '@angular/core';
import { CommonEngine } from '@angular/ssr';
import { CxServerErrorResponse } from '../error-handling/server-error-response';
import { PROPAGATE_SERVER_ERROR_RESPONSE } from '../error-handling/server-error-response/propagate-server-error-response';
import { RenderOptions } from './ng-express-engine';

/**
 * Wraps the CommonEngine render method to handle propagated server responses caught during server-side rendering.
 */

export function cxCommonEngineWrapper(
  engine: CommonEngine,
  renderOptions: RenderOptions,
  callback: (err?: Error | null, html?: string) => void
) {
  const propagatedServerErrorResponses: (CxServerErrorResponse | string)[] = [];

  const propagateServerErrorResponseProvider = {
    provide: PROPAGATE_SERVER_ERROR_RESPONSE,
    useFactory: () => {
      return (serverErrorResponse: CxServerErrorResponse) => {
        propagatedServerErrorResponses.push(serverErrorResponse);
      };
    },
  };

  return engine
    .render({
      ...renderOptions,
      providers: [
        propagateServerErrorResponseProvider,
        ...(renderOptions.providers ?? []),
      ] as StaticProvider[],
    })
    .then((html) => propagatedServerErrorResponses.push(html))
    .catch((err) => propagatedServerErrorResponses.push(err))
    .finally(async () => {
      const serverResponse = propagatedServerErrorResponses[0];
      // If the first event is a CxServerErrorResponse, we call the callback with the error.
      // which will be handled by the error handler in the ExpressJS server.
      // Otherwise, we call the callback with the rendered html.
      if (serverResponse instanceof CxServerErrorResponse) {
        callback(serverResponse, undefined);
      } else {
        callback(undefined, serverResponse);
      }
    });
}
