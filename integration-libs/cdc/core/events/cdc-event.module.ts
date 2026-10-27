/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { CdcEventBuilder } from './cdc-event.builder';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(CdcEventBuilder);
    }),
  ],
})
export class CdcEventModule {}
