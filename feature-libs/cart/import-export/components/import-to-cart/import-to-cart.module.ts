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

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsModule,
    IconModule,
    KeyboardFocusModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportProductsComponent: {
          component: ImportEntriesComponent,
        },
      },
    }),
  ],
  declarations: [ImportEntriesComponent, ImportEntriesDialogComponent],
  exports: [ImportEntriesComponent, ImportEntriesDialogComponent],
  providers: [provideConfig(defaultImportEntriesLayoutConfig)],
})
export class ImportToCartModule {}
