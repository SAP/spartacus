import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultGoogleTagManagerConfig } from './config/default-gtm.config';

@NgModule({
  providers: [provideDefaultConfig(defaultGoogleTagManagerConfig)],
})
export class GtmModule {}
