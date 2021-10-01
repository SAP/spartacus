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
import { ImportToNewSavedCartFormComponent } from './import-entries-dialog/import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';
import { ImportEntriesFormComponent } from './import-entries-dialog/import-entries-form/import-entries-form.component';
import { ImportEntriesSummaryComponent } from './import-entries-dialog/import-entries-summary/import-entries-summary.component';

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
        },
      },
    }),
  ],
  declarations: [
    ImportEntriesComponent,
    ImportEntriesDialogComponent,
    ImportEntriesFormComponent,
    ImportEntriesSummaryComponent,
    ImportToNewSavedCartFormComponent,
  ],
  exports: [
    ImportEntriesComponent,
    ImportEntriesDialogComponent,
    ImportEntriesFormComponent,
    ImportEntriesSummaryComponent,
    ImportToNewSavedCartFormComponent,
  ],
  providers: [provideConfig(defaultImportEntriesLayoutConfig)],
})
export class ImportToCartModule {}
