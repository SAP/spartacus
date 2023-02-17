/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { ExportOrderEntriesComponent } from './export-order-entries.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ExportOrderEntriesComponent: {
          component: ExportOrderEntriesComponent,
        },
      },
    }),
    // TODO:(CXSPA-1695) for next major release remove below feature config
    FeaturesConfigModule,
  ],
  exports: [ExportOrderEntriesComponent],
  declarations: [ExportOrderEntriesComponent],
})
export class ExportOrderEntriesModule {}
