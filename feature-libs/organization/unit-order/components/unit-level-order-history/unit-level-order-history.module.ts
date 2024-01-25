/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { UnitLevelOrderHistoryComponent } from './unit-level-order-history.component';
import { UnitLevelOrderHistoryFilterModule } from './filter/unit-level-order-history-filter.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    UnitLevelOrderHistoryFilterModule,
  ],
  declarations: [UnitLevelOrderHistoryComponent],
  exports: [UnitLevelOrderHistoryComponent],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        UnitLevelOrderHistoryComponent: {
          component: UnitLevelOrderHistoryComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
      },
    } as CmsConfig),
  ],
})
export class UnitLevelOrderHistoryModule {}
