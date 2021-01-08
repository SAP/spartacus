import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { TmsConfig } from './config/tms-config';
import { GoogleTagManagerModule } from './gtm/gtm.module';

@NgModule({
  imports: [GoogleTagManagerModule],
})
export class TmsModule {
  static forRoot(config?: TmsConfig): ModuleWithProviders<TmsModule> {
    return {
      ngModule: TmsModule,
      providers: [provideConfig(config)],
    };
  }
}
