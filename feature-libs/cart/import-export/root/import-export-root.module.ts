import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        cartImportExport: {
          cmsComponents: [
            'ExportOrderEntriesComponent',
            'ImportProductsLinkComponent',
          ],
        },
      },
    }),
  ],
})
export class ImportExportRootModule {}
