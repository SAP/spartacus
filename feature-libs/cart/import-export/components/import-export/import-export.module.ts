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
import { ImportExportComponent } from './import-export.component';

@NgModule({
  imports: [
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        ImportExportComponent: {
          component: ImportExportComponent,
          data: {
            importButtonDisplayRoutes: [
              'cart',
              'savedCarts',
              'savedCartsDetails',
            ],
            exportButtonDisplayRoutes: ['cart', 'savedCartsDetails'],
          },
        },
      },
    }),
    I18nModule,
    UrlModule,
    ImportToCartModule,
    ExportEntriesModule,
    CommonModule,
  ],
  exports: [ImportExportComponent],
  declarations: [ImportExportComponent],
})
export class ImportExportComponentModule {}
