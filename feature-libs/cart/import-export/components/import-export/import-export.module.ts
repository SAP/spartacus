import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { CartTypes } from '@spartacus/cart/import-export/core';
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
            importButtonDisplayPages: ['savedCarts', 'savedCartsDetails'],
            exportButtonDisplayPages: ['savedCartsDetails', 'cart'],
            routesCartMapping: new Map<string, CartTypes>([
              ['savedCarts', CartTypes.NEW_SAVED_CART],
              ['savedCartsDetails', CartTypes.SAVED_CART],
              ['cart', CartTypes.ACTIVE_CART],
            ]),
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
