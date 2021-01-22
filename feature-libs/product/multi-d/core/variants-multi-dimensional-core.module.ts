import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class VariantsMultiDimensionalCoreModule {
  static forRoot(): ModuleWithProviders<VariantsMultiDimensionalCoreModule> {
    return {
      ngModule: VariantsMultiDimensionalCoreModule,
    };
  }
}
