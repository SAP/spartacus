import { NgModule } from '@angular/core';
import { InteractiveConfigurationModule } from './storefront/variant-configurator/interactive-configuration.module';
import { OverviewModule } from './storefront/variant-configurator/overview.module';

@NgModule({
  imports: [InteractiveConfigurationModule, OverviewModule],
  declarations: [],
  exports: [],
  entryComponents: [],
})
export class ProductConfigurationModule {}
