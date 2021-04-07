import { ModuleWithProviders, NgModule } from '@angular/core';

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
