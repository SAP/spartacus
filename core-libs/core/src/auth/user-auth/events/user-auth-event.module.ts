/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { UserAuthEventBuilder } from './user-auth-event.builder';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(UserAuthEventBuilder);
    }),
  ],
})
export class UserAuthEventModule {}
