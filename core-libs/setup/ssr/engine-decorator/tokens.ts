/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * The url of the server request host when running SSR through express engine
 * */
export const EXPRESS_SERVER_REQUEST_ORIGIN = new InjectionToken<string>(
  'EXPRESS_SERVER_REQUEST_ORIGIN'
);

/**
 * The url of the server request when running SSR through express engine
 * */
export const EXPRESS_SERVER_REQUEST_URL = new InjectionToken<string>(
  'EXPRESS_SERVER_REQUEST_URL'
);
