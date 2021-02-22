import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGoogleAnalyticsConfig } from './config/default-ga.config';

@NgModule({
  providers: [provideDefaultConfig(defaultGoogleAnalyticsConfig)],
})
export class GaModule {}
