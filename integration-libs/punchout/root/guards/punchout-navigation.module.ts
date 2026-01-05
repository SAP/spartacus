/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BEFORE_CMS_PAGE_GUARD } from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { PunchoutNavigationGuard } from './punchout-navigation.guard';

@NgModule({
  providers: [
    {
      provide: BEFORE_CMS_PAGE_GUARD,
      useClass: PunchoutNavigationGuard,
      multi: true,
    },
  ],
})
export class PunchoutNavigationModule {}
