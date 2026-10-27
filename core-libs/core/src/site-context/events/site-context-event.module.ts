/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { SiteContextEventBuilder } from './site-context-event.builder';

@NgModule({
  providers: [
    provideAppInitializer(() => {
      inject(SiteContextEventBuilder);
    }),
  ],
})
export class SiteContextEventModule {}
