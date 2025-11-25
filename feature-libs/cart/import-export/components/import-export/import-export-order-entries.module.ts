/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { ExportOrderEntriesModule } from '../export-entries';
import { importOrderEntriesModule } from '../import-to-cart';
import { importExportOrderEntriesComponent } from './import-export-order-entries.component';

@NgModule({
  imports: [
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        importExportOrderEntriesComponent: {
          component: importExportOrderEntriesComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
    importOrderEntriesModule,
    ExportOrderEntriesModule,
    CommonModule,
    importExportOrderEntriesComponent,
  ],
  exports: [importExportOrderEntriesComponent],
})
export class importExportOrderEntriesModule {}
