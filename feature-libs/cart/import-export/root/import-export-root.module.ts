import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        [CART_IMPORT_EXPORT_FEATURE]: {
          cmsComponents: [
            'ImportExportOrderEntriesComponent',
            'ImportOrderEntriesComponent',
            'ExportOrderEntriesComponent',
          ],
        },
      },
    }),
  ],
})
export class ImportExportRootModule {}
