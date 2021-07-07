import { NgModule } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ImportToCartService } from '@spartacus/cart/import-export/components';

@NgModule({
  providers: [
    ImportToCartService,
    SavedCartService,
    provideDefaultConfig({
      featureModules: {
        cartImportExport: {
          cmsComponents: [
            'ExportOrderEntriesComponent',
            'ImportProductsComponent',
          ],
        },
      },
    }),
  ],
})
export class ImportExportRootModule {}
