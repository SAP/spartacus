import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { YotpoConfig } from './yotpo';

@NgModule({})
export class VendorModule {
  static withConfig(config?: YotpoConfig): ModuleWithProviders {
    return {
      ngModule: VendorModule,
      providers: [provideConfig(config)],
    };
  }
}
