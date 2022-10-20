/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

import * as OCC_USER_IDS from './occ-user-ids';

export { OCC_USER_IDS };

export * from './interceptor-util';
export * from './occ-constants';
export * from './occ-url-util';
export * from './occ-http-token';

export const OCC_USER_ID_CONSTANTS = new InjectionToken<{
  [identifier: string]: string;
}>('List of OCC constants that pass for user IDs.', {
  providedIn: 'root',
  factory: () => OCC_USER_IDS,
});
