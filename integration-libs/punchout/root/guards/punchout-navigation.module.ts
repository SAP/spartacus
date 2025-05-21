/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BEFORE_CMS_PAGE_GUARD } from '@spartacus/storefront';

import { NgModule } from '@angular/core';
import { PunchoutNavigationGuard } from './punchout-navigation.guard';
import { PunchoutProtectedRoutesGuard } from './punchout-protected-routes.guard';
import { ProtectedRoutesGuard } from '@spartacus/core';

@NgModule({
  providers: [
    {
      provide: BEFORE_CMS_PAGE_GUARD,
      useClass: PunchoutNavigationGuard,
      multi: true,
    },
    {
      provide: ProtectedRoutesGuard,
      useClass: PunchoutProtectedRoutesGuard,
    },
  ],
})
export class PunchoutNavigationModule {}
