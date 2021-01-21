import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class VariantGenericCoreModule {
  static forRoot(): ModuleWithProviders<VariantGenericCoreModule> {
    return {
      ngModule: VariantGenericCoreModule,
    };
  }
}
