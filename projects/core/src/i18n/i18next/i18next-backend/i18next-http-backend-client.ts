/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import type { HttpBackendOptions, RequestCallback } from 'i18next-http-backend';

export type I18nextHttpBackendClient = HttpBackendOptions['request'];

/**
 * Function to be used by the `i18next-http-backend` plugin for loading translations via http.
 */
export const I18NEXT_HTTP_BACKEND_CLIENT = new InjectionToken<
  HttpBackendOptions['request']
>('I18NEXT_HTTP_BACKEND_CLIENT', {
  providedIn: 'root',
  factory: (): I18nextHttpBackendClient => {
    const httpClient = inject(HttpClient);

    // Function appropriate for i18next to make http calls for lazy-loaded translation files.
    // See docs for `i18next-http-backend`: https://github.com/i18next/i18next-http-backend#backend-options
    //
    // It uses Angular HttpClient under the hood, so it works in SSR.
    return (
      _options: HttpBackendOptions,
      url: string,
      _payload: string | object,
      callback: RequestCallback
    ) => {
      httpClient.get(url, { responseType: 'text' }).subscribe({
        next: (data) => callback(null, { status: 200, data }),
        error: (error) =>
          callback(error, {
            // a workaround for https://github.com/i18next/i18next-http-backend/issues/82
            data: null as any,
            status: error.status,
          }),
      });
    };
  },
});
