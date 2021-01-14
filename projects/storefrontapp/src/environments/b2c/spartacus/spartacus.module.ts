import { NgModule } from '@angular/core';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';
import { StorefinderModule } from './features/storefinder.module';
import { BaseStorefrontModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    BaseStorefrontModule,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,

    // Features
    StorefinderModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModule {}
