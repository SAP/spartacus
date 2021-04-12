import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

@NgModule({
  providers: [
    // TODO: Avoid using duplicated config #11931
    provideDefaultConfig({
      importExport: {
        fileValidity: {
          maxSize: 1,
          allowedExtensions: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
          ],
          checkEmptyFile: true,
        },
        file: {
          separator: ',',
        },
      },
    }),
  ],
})
export class ImportExportCoreModule {
  static forRoot(): ModuleWithProviders<ImportExportCoreModule> {
    return {
      ngModule: ImportExportCoreModule,
    };
  }
}
