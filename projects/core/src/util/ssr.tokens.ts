/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
