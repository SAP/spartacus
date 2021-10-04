import { NgModule } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ImportToCartService } from '@spartacus/cart/import-export/components';
import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';

@NgModule({
  providers: [
    ImportToCartService,
    SavedCartService,
    provideDefaultConfig({
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          cmsComponents: [
            'ExportOrderEntriesComponent',
            'ImportProductsComponent',
            'ImportExportComponent',
          ],
        },
      },
    }),
  ],
})
export class ImportExportRootModule {}
