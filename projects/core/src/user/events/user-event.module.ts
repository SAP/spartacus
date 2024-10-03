/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserEventBuilder } from './user-event.builder';

@NgModule({})
export class UserEventModule {
  constructor(_userEventBuilder: UserEventBuilder) {
    // Intentional empty constructor
  }
}
