/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserAccountEventListener } from './user-account-event.listener';

@NgModule({})
export class UserAccountEventModule {
  constructor(_userAccountEventListener: UserAccountEventListener) {
    // Intentional empty constructor
  }
}
