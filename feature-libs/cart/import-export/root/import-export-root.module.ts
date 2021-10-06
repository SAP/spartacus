import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { ImportProductsFromCsvService } from '../components/import-to-cart/import-products-from-csv.service';
import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';

@NgModule({
  providers: [
    SavedCartService,
    ImportProductsFromCsvService,
    provideDefaultConfig({
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          cmsComponents: ['ImportExportComponent'],
        },
      },
    }),
  ],
})
export class ImportExportRootModule {}
