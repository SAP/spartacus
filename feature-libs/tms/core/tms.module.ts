import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { AdobeLaunchModule } from './adobe-launch/adobe-launch.module';
import { TmsConfig } from './config/tms-config';
import { GoogleTagManagerModule } from './gtm/gtm.module';

@NgModule({
  imports: [GoogleTagManagerModule, AdobeLaunchModule],
})
export class TmsModule {
  static forRoot(config?: TmsConfig): ModuleWithProviders<TmsModule> {
    return {
      ngModule: TmsModule,
      providers: [provideConfig(config)],
    };
  }
}
