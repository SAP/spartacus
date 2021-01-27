import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { AdobeLaunchModule } from '@spartacus/tms/adobe-launch';
import { TmsConfig } from '@spartacus/tms/core';
import { GoogleTagManagerModule } from '@spartacus/tms/gtm';

/**
 * Main TMS module, that includes all TMS implementation supported by Spartacus.
 *
 */
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
