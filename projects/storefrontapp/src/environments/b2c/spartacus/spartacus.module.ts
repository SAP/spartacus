import { NgModule } from '@angular/core';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusSetupModule } from './spartacus-setup.module';
import { StorefinderModule } from './features/storefinder.module';

@NgModule({
  imports: [
    SpartacusSetupModule,
    SpartacusConfigurationModule,

    // Features
    StorefinderModule,
  ],
  exports: [SpartacusSetupModule],
})
export class SpartacusModule {}
