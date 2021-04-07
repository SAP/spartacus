import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class ImportExportCoreModule {
  static forRoot(): ModuleWithProviders<ImportExportCoreModule> {
    return {
      ngModule: ImportExportCoreModule,
    };
  }
}
