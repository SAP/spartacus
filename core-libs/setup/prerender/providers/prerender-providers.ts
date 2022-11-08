/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, StaticProvider } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';

/**
 * Returns the providers for the prerender.
 */
export function getPrerenderProviders(options: {
  /**
   * A domain (origin) from which the HTTP requests are being made.
   * Specify without trailing slash, e.g. "https://my.domain.com"
   */
  requestOrigin: string;
}): StaticProvider[] {
  return [
    {
      provide: SERVER_REQUEST_ORIGIN,
      useValue: options.requestOrigin,
    },
    {
      provide: SERVER_REQUEST_URL,
      useFactory: () => options.requestOrigin + inject(INITIAL_CONFIG).url,
    },
  ];
}
