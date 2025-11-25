/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  IconModule,
  KeyboardFocusModule,
  MessageComponentModule,
} from '@spartacus/storefront';
import { defaultimportEntriesLayoutConfig } from './default-import-entries-layout.config';
import { importEntriesDialogComponent } from './import-entries-dialog/import-entries-dialog.component';
import { importEntriesFormComponent } from './import-entries-dialog/import-entries-form/import-entries-form.component';
import { importEntriesSummaryComponent } from './import-entries-dialog/import-entries-summary/import-entries-summary.component';
import { importToNewSavedCartFormComponent } from './import-entries-dialog/import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';
import { importOrderEntriesComponent } from './import-entries/import-order-entries.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
    IconModule,
    KeyboardFocusModule,
    FileUploadModule,
    I18nModule,
    MessageComponentModule,
    FeaturesConfigModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        importOrderEntriesComponent: {
          component: importOrderEntriesComponent,
        },
      },
    }),
    FeaturesConfigModule,
    importOrderEntriesComponent,
    importEntriesDialogComponent,
    importEntriesFormComponent,
    importEntriesSummaryComponent,
    importToNewSavedCartFormComponent,
  ],
  exports: [
    importOrderEntriesComponent,
    importEntriesDialogComponent,
    importEntriesFormComponent,
    importEntriesSummaryComponent,
    importToNewSavedCartFormComponent,
  ],
  providers: [provideDefaultConfig(defaultimportEntriesLayoutConfig)],
})
export class importOrderEntriesModule {}
