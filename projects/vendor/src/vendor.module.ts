import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { YotpoConfig } from './yotpo';

@NgModule({})
export class VendorModule {
  static withConfig(config?: YotpoConfig): ModuleWithProviders<VendorModule> {
    return {
      ngModule: VendorModule,
      providers: [provideConfig(config)],
    };
  }
}
