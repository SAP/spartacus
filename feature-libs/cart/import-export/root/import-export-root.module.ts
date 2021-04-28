import { NgModule } from '@angular/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ImportToCartService } from '../components/public_api';

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
