/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Optional, StaticProvider } from '@angular/core';
import { INITIAL_CONFIG, PlatformConfig } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import {
  EXPRESS_SERVER_REQUEST_ORIGIN,
  EXPRESS_SERVER_REQUEST_URL,
} from '../engine-decorator/tokens';
import { getRequestOrigin } from '../util/request-origin';
import { getRequestUrl } from '../util/request-url';

/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideSsrAndPrerendering(options?: {
  /**
   * Specify a domain (origin) from which the HTTP requests are being made.
   * Should be without the trailing slash, e.g. "https://my.domain.com"
   */
  serverRequestOrigin?: string;
}): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useFactory: (expressRequestOrigin?: string): string | undefined =>
        options?.serverRequestOrigin ?? expressRequestOrigin,
      deps: [[new Optional(), EXPRESS_SERVER_REQUEST_ORIGIN]],
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: (
        platformConfig: PlatformConfig,
        serverRequestOrigin?: string,
        expressRequestUrl?: string
      ): string | undefined => {
        if (expressRequestUrl) {
          return expressRequestUrl;
        }

        return (serverRequestOrigin ?? '') + platformConfig.url;
      },
      deps: [
        INITIAL_CONFIG,
        [new Optional(), SERVER_REQUEST_ORIGIN],
        [new Optional(), EXPRESS_SERVER_REQUEST_URL],
      ],
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
      provide: EXPRESS_SERVER_REQUEST_ORIGIN,
      useFactory: getRequestOrigin,
      deps: [REQUEST],
    },
    {
      provide: EXPRESS_SERVER_REQUEST_URL,
      useFactory: getRequestUrl,
      deps: [REQUEST],
    },
  ];
}
