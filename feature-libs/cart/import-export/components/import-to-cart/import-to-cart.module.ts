import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import { ImportEntriesComponent } from './import-entries/import-entries-component';
import { ImportEntriesDialogComponent } from './import-entries-dialog/import-entries-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { defaultImportEntriesLayoutConfig } from './default-import-entries-layout.config';
import { ImportToSavedCartFormComponent } from './import-entries-dialog/import-to-saved-cart-form/import-to-saved-cart-form.component';
import { ImportEntriesFormComponent } from './import-entries-dialog/import-entries-form/import-entries-form.component';
import { ImportEntriesSummaryComponent } from './import-entries-dialog/import-entries-summary/import-entries-summary.component';
import { NameSource } from '@spartacus/cart/import-export/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    IconModule,
    KeyboardFocusModule,
    FileUploadModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportProductsComponent: {
          component: ImportEntriesComponent,
          data: {
            fileValidity: {
              maxSize: 1,
              allowedExtensions: [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'text/csv',
                '.csv',
              ],
            },
            cartNameGeneration: {
              source: NameSource.FILE_NAME,
            },
          },
        },
      },
    }),
  ],
  declarations: [
    ImportEntriesComponent,
    ImportEntriesDialogComponent,
    ImportEntriesFormComponent,
    ImportEntriesSummaryComponent,
    ImportToSavedCartFormComponent,
  ],
  exports: [
    ImportEntriesComponent,
    ImportEntriesDialogComponent,
    ImportEntriesFormComponent,
    ImportEntriesSummaryComponent,
    ImportToSavedCartFormComponent,
  ],
  providers: [provideConfig(defaultImportEntriesLayoutConfig)],
})
export class ImportToCartModule {}
