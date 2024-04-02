/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserAuthEventBuilder } from './user-auth-event.builder';

@NgModule({})
export class UserAuthEventModule {
  constructor(_userAuthEventBuilder: UserAuthEventBuilder) {
    // Intentional empty constructor
  }
}
