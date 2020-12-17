import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccConfiguratorProductConfig } from './default-occ-configurator-product-config';

@NgModule({
  providers: [provideDefaultConfig(defaultOccConfiguratorProductConfig)],
})
export class CommonConfiguratorOccModule {}
