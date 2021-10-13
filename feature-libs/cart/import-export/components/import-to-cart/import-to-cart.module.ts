import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideConfig } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
} from '@spartacus/storefront';
import { defaultImportEntriesLayoutConfig } from './default-import-entries-layout.config';
import { ImportEntriesDialogComponent } from './import-entries-dialog/import-entries-dialog.component';
import { ImportEntriesFormComponent } from './import-entries-dialog/import-entries-form/import-entries-form.component';
import { ImportEntriesSummaryComponent } from './import-entries-dialog/import-entries-summary/import-entries-summary.component';
import { ImportToNewSavedCartFormComponent } from './import-entries-dialog/import-to-new-saved-cart-form/import-to-new-saved-cart-form.component';
import { ImportEntriesComponent } from './import-entries/import-entries-component';

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
