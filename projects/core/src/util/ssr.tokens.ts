/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * The url of the server request when running SSR
 * */
export const SERVER_REQUEST_URL = new InjectionToken<string>(
  'SERVER_REQUEST_URL'
);

/**
 * The url of the server request host when running SSR
 * */
export const SERVER_REQUEST_ORIGIN = new InjectionToken<string>(
  'SERVER_REQUEST_ORIGIN'
);

/**
 * ssr request logging service
 */
export const SSR_REQUEST_LOGGING = new InjectionToken<any>(
  'SSR_REQUEST_LOGGING'
);

/**
 * whether log before timeout when running SSR
 */
export const SSR_LOG_BEFORE_TIMEOUT = new InjectionToken<string[]>(
  'SSR_LOG_BEFORE_TIMEOUT'
);
