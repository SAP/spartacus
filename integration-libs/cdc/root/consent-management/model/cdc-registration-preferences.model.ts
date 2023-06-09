/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class RegisterPreferences {
  preferences?: any;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare module '@spartacus/user/profile/root' {
  interface UserSignUp extends RegisterPreferences {}
}
