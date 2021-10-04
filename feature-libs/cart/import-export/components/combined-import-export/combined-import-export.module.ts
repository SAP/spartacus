import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { ExportEntriesModule } from '../export-entries';
import { ImportToCartModule } from '../import-to-cart';
import { CombinedImportExportComponent } from './combined-import-export.component';

@NgModule({
  imports: [
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CombinedImportExportComponent: {
          component: CombinedImportExportComponent,
        },
      },
    }),
    I18nModule,
    UrlModule,
    ImportToCartModule,
    ExportEntriesModule,
    CommonModule,
  ],
  exports: [CombinedImportExportComponent],
  declarations: [CombinedImportExportComponent],
})
export class CombinedImportExportModule {}
