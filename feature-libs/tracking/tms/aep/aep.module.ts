import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAdobeExperiencePlatformConfig } from './config/default-aep.config';

@NgModule({
  providers: [provideDefaultConfig(defaultAdobeExperiencePlatformConfig)],
})
export class AepModule {}
