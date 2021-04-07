import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultImportExportConfig } from './config/default-import-export-config';

@NgModule({
  providers: [provideDefaultConfig(defaultImportExportConfig)],
})
export class ImportExportCoreModule {
  static forRoot(): ModuleWithProviders<ImportExportCoreModule> {
    return {
      ngModule: ImportExportCoreModule,
    };
  }
}
