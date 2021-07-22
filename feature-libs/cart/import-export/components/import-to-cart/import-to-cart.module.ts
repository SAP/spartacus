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
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { defaultImportEntriesLayoutConfig } from './default-import-to-cart.config';
import { FileUploadModule } from '../../../../../projects/storefrontlib/src/shared';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    IconModule,
    KeyboardFocusModule,
    FileUploadModule,
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
          },
        },
      },
    }),
  ],
  declarations: [ImportEntriesComponent, ImportEntriesDialogComponent],
  exports: [ImportEntriesComponent, ImportEntriesDialogComponent],
  providers: [provideConfig(defaultImportEntriesLayoutConfig)],
})
export class ImportToCartModule {}
