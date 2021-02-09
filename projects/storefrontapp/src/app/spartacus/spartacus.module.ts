import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from '@spartacus/storefront';
import { SpartacusFeaturesModule } from './spartacus-features.module';
import { SpartacusB2bConfigurationModule } from './spartacus-b2b-configuration.module';
import { environment } from '../../environments/environment';
import { SpartacusB2cConfigurationModule } from './spartacus-b2c-configuration.module';

let SpartacusConfigurationModule = SpartacusB2cConfigurationModule;

if (environment.b2b) {
  SpartacusConfigurationModule = SpartacusB2bConfigurationModule;
}

@NgModule({
  imports: [
    BaseStorefrontModule,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
  ],
  exports: [BaseStorefrontModule],
})
export class SpartacusModule {}
