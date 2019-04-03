import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { VendorConfig } from './vendor-config';

@NgModule({})
export class VendorModule {
  static withConfig(config?: VendorConfig): ModuleWithProviders {
    return {
      ngModule: VendorModule,
      providers: [provideConfig(config)],
    };
  }
}
