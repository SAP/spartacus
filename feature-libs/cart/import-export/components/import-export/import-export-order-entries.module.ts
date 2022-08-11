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
import { ImportOrderEntriesModule } from '../import-to-cart';
import { ImportExportOrderEntriesComponent } from './import-export-order-entries.component';

@NgModule({
  imports: [
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportExportOrderEntriesComponent: {
          component: ImportExportOrderEntriesComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
    ImportOrderEntriesModule,
    ExportOrderEntriesModule,
    CommonModule,
  ],
  exports: [ImportExportOrderEntriesComponent],
  declarations: [ImportExportOrderEntriesComponent],
})
export class ImportExportOrderEntriesModule {}
