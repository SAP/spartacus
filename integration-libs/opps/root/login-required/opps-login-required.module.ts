/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CX_PAGE_GUARD_TOKEN } from '@spartacus/storefront';
import { OppsLoginRequiredGuard } from './opps-login-required.guard';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    {
      provide: CX_PAGE_GUARD_TOKEN,
      useValue: OppsLoginRequiredGuard,
      multi: true,
    },
  ],
})
export class OppsLoginRequiredModule {}
