/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class CostCenterModule {
  static forRoot(): ModuleWithProviders<CostCenterModule> {
    return {
      ngModule: CostCenterModule,
      providers: [],
    };
  }
}
