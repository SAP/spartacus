import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  provideConfig,
  provideConfigValidator,
  provideDefaultConfig,
} from '@spartacus/core';
import { CdsConfig, cdsConfigValidator, DEFAULT_CDS_CONFIG } from './config';
import { MerchandisingModule } from './merchandising';
import {
  ProfileTagModule,
  ProfileTagPushEventsService,
  TrackingModule,
} from './profiletag';

@NgModule({
  imports: [ProfileTagModule, TrackingModule, MerchandisingModule],
})
export class CdsModule {
  static forRoot(config?: CdsConfig): ModuleWithProviders<CdsModule> {
    return {
      ngModule: CdsModule,
      providers: [
        provideDefaultConfig(DEFAULT_CDS_CONFIG),
        provideConfig(config),
        provideConfigValidator(cdsConfigValidator),
        ProfileTagPushEventsService,
      ],
    };
  }
}
