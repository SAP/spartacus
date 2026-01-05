/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { BtnLikeLinkModule, ListNavigationModule } from '@spartacus/storefront';
import { UnitLevelOrdersViewerGuard } from '@spartacus/organization/unit-order/core';
import { UnitLevelOrderHistoryFilterModule } from './filter/unit-level-order-history-filter.module';
import { UnitLevelOrderHistoryComponent } from './unit-level-order-history.component';

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
    BtnLikeLinkModule,
    FeaturesConfigModule,
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
