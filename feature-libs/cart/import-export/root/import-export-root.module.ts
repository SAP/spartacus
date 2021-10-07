import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderDetailsService } from '@spartacus/order/components';
import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';

@NgModule({
  providers: [
    OrderDetailsService,
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
