import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProductVariantsGuard } from './guards/product-variants.guard';

@NgModule({})
export class VariantsCoreModule {
  static forRoot(): ModuleWithProviders<VariantsCoreModule> {
    return {
      ngModule: VariantsCoreModule,
      providers: [ProductVariantsGuard],
    };
  }
}
