import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { defaultSmartEditConfig } from './config/default-smart-edit-config';
import { SmartEditLauncherService } from './services/smart-edit-launcher.service';

export function smartEditFactory(
  smartEditLauncherService: SmartEditLauncherService
) {
  const isReady = () => {
    smartEditLauncherService.load();
  };
  return isReady;
}

@NgModule({
  imports: [CommonModule, PageComponentModule],
  providers: [
    provideDefaultConfig(defaultSmartEditConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: smartEditFactory,
      deps: [SmartEditLauncherService],
      multi: true,
    },
  ],
})
export class SmartEditRootModule {}
